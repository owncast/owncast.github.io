import React, { useMemo, useRef, useState } from "react";
import { AgGridReact } from "ag-grid-react";
import type { CustomCellRendererProps } from "ag-grid-react";
import {
  AllCommunityModule,
  ModuleRegistry,
  themeQuartz,
  colorSchemeDark,
  type ColDef,
  type GridApi,
  type SortChangedEvent,
  type GridReadyEvent,
} from "ag-grid-community";
import Link from "@docusaurus/Link";
import manifest from "@site/src/data/dev-manifest.json";
import styles from "./styles.module.css";

ModuleRegistry.registerModules([AllCommunityModule]);

// Dark theme tuned to the Owncast palette.
const theme = themeQuartz.withPart(colorSchemeDark).withParams({
  accentColor: "#6544e9",
  fontFamily: "inherit",
  fontSize: 16,
  backgroundColor: "#11141b",
  headerBackgroundColor: "#161a24",
  borderColor: "rgba(255,255,255,0.08)",
});

type Doc = {
  pageId: string;
  title: string;
  slug: string;
  icon: string | null;
  labels: string[];
  updatedAt: string | null;
  author: string | null;
  authorAvatar: string | null;
};

type GroupRow = { __group: string; count: number };
type Row = Doc | GroupRow;
const isGroup = (r: unknown): r is GroupRow => !!r && (r as GroupRow).__group !== undefined;

const UNTAGGED = "Untagged";

function initials(name: string | null): string {
  return (name || "?").split(/\s+/).map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}
function colorFor(name: string | null): string {
  let h = 0;
  for (const ch of name || "") h = (h * 31 + ch.charCodeAt(0)) % 360;
  return `hsl(${h}, 45%, 45%)`;
}
function formatDate(iso: string | null): string {
  return iso
    ? new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" })
    : "";
}

// These render only for document rows; group rows use the full-width renderer.
function TitleCell({ data }: CustomCellRendererProps) {
  if (!data) return null;
  return (
    <Link to={data.slug} className={styles.cellTitle}>
      <span className={styles.cellIcon}>{data.icon || "📄"}</span>
      {data.title}
    </Link>
  );
}

function TagsCell({ value }: CustomCellRendererProps) {
  return (
    <span className={styles.cellTags}>
      {((value as string[]) || []).map((t) => (
        <span key={t} className={styles.tag}>
          {t}
        </span>
      ))}
    </span>
  );
}

function AuthorCell({ data }: CustomCellRendererProps) {
  if (!data) return null;
  return (
    <span className={styles.cellAuthor}>
      {data.authorAvatar ? (
        <img className={styles.avatar} src={data.authorAvatar} alt="" />
      ) : (
        <span className={styles.avatar} style={{ backgroundColor: colorFor(data.author) }} aria-hidden>
          {initials(data.author)}
        </span>
      )}
      {data.author}
    </span>
  );
}

// Clickable "Tags" column header that returns the table to the grouped view.
// (Sorting any other column flattens it; clicking Tags re-groups.)
function TagsHeader(props: any) {
  return (
    <button
      type="button"
      className={styles.tagsHeader}
      title="Group by tag"
      onClick={() => props.context?.regroup?.()}
    >
      {props.displayName ?? "Tags"}
    </button>
  );
}

// Full-width row: the tag section header (only shown in grouped mode).
function GroupHeader({ data }: CustomCellRendererProps) {
  if (!isGroup(data)) return null;
  return (
    <div className={styles.groupHeader}>
      <span>{data.__group}</span>
      <span className={styles.groupCount}>{data.count}</span>
    </div>
  );
}

export default function DevDocsTable(): React.ReactElement {
  const docs = manifest as Doc[];
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<string | null>(null);
  // Grouped-by-tag is the default. A real column sort switches to a flat list.
  const [sorted, setSorted] = useState(false);
  const apiRef = useRef<GridApi | null>(null);

  const allTags = useMemo(
    () => Array.from(new Set(docs.flatMap((d) => d.labels))).sort(),
    [docs],
  );

  // Search + tag-chip filtered docs (each doc once).
  const base = useMemo(() => {
    const q = search.trim().toLowerCase();
    let f = q
      ? docs.filter(
          (d) =>
            d.title.toLowerCase().includes(q) ||
            d.labels.some((l) => l.toLowerCase().includes(q)) ||
            (d.author || "").toLowerCase().includes(q),
        )
      : docs;
    if (activeTag) f = f.filter((d) => d.labels.includes(activeTag));
    return f;
  }, [docs, search, activeTag]);

  // Flat when a column sort is active (AG Grid sorts it); grouped otherwise.
  const rows = useMemo<Row[]>(() => {
    if (sorted) return base;

    const byTag = new Map<string, Doc[]>();
    for (const d of base) {
      const keys = d.labels.length ? d.labels : [UNTAGGED];
      for (const k of keys) {
        if (activeTag && k !== activeTag) continue;
        if (!byTag.has(k)) byTag.set(k, []);
        byTag.get(k)!.push(d);
      }
    }
    const order = [...byTag.keys()].sort((a, b) =>
      a === UNTAGGED ? 1 : b === UNTAGGED ? -1 : a.localeCompare(b),
    );
    const out: Row[] = [];
    for (const tag of order) {
      const items = byTag
        .get(tag)!
        .slice()
        .sort((a, b) => (b.updatedAt || "").localeCompare(a.updatedAt || ""));
      out.push({ __group: tag, count: items.length });
      out.push(...items);
    }
    return out;
  }, [base, sorted, activeTag]);

  const columnDefs = useMemo<ColDef[]>(
    () => [
      { headerName: "Title", field: "title", flex: 2, sortable: true, cellRenderer: TitleCell },
      // Tags is the grouping dimension: clicking its header re-groups.
      {
        headerName: "Tags",
        field: "labels",
        flex: 2,
        sortable: false,
        cellRenderer: TagsCell,
        headerComponent: TagsHeader,
      },
      { headerName: "Author", field: "author", flex: 1, sortable: true, cellRenderer: AuthorCell },
      {
        headerName: "Updated",
        field: "updatedAt",
        flex: 1,
        sortable: true,
        valueFormatter: (p) => formatDate(p.value),
      },
    ],
    [],
  );

  const onSortChanged = (e: SortChangedEvent) => {
    setSorted(e.api.getColumnState().some((c) => c.sort));
  };
  const onGridReady = (e: GridReadyEvent) => {
    apiRef.current = e.api;
  };
  const groupByTag = () => {
    apiRef.current?.applyColumnState({ defaultState: { sort: null } });
    setSorted(false);
  };

  return (
    <div>
      <div className={styles.tableControls}>
        <input
          className={styles.search}
          type="search"
          placeholder="Search docs…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          aria-label="Search developer docs"
        />
        <div className={styles.tagFilter}>
          {allTags.map((t) => (
            <button
              key={t}
              type="button"
              className={`${styles.tag} ${styles.tagButton} ${activeTag === t ? styles.tagActive : ""}`}
              onClick={() => setActiveTag(activeTag === t ? null : t)}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <AgGridReact<Row>
        theme={theme}
        rowData={rows}
        columnDefs={columnDefs}
        defaultColDef={{ resizable: true }}
        context={{ regroup: groupByTag }}
        isFullWidthRow={(p) => isGroup(p.rowNode.data)}
        fullWidthCellRenderer={GroupHeader}
        getRowHeight={(p) => (isGroup(p.data) ? 38 : 48)}
        onSortChanged={onSortChanged}
        onGridReady={onGridReady}
        domLayout="autoHeight"
        suppressCellFocus
        animateRows
      />
    </div>
  );
}
