---
title: "Adding type-safe SQL queries"
slug: /adding-type-safe-sql-queries
displayed_sidebar: devSidebar
tags: ["development"]
custom_edit_url: "https://project.owncast.tv/s/dev-docs/p/adding-type-safe-sql-queries-Uhsa2XfuZr"
---
Owncast uses [sqlc](https://sqlc.dev) to turn hand-written SQL into type-safe Go. You write the SQL, sqlc generates the Go. Two pieces work together:

- **Schema** lives in `persistence/migrations/` as numbered [goose](https://github.com/pressly/goose) SQL migrations. These are the source of truth for the table shapes, and they run automatically on startup.
- **Queries** live in `db/query.sql`. sqlc reads them along with the schema (see `sqlc.yaml`) and generates `db/query.sql.go` and `db/models.go`.

There is no `schema.sql`. sqlc derives the schema from the migrations.

## Changing the schema or adding a query

1. Write a migration. Create the next numbered file in `persistence/migrations/`, for example `00005_add_widget_color.sql`. Put the `ALTER TABLE` or `CREATE TABLE` between the goose `Up` markers and write the reverse under `Down`:

```sql
-- +goose Up
-- +goose StatementBegin
ALTER TABLE users ADD COLUMN widget_color TEXT NOT NULL DEFAULT '';
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
ALTER TABLE users DROP COLUMN widget_color;
-- +goose StatementEnd
```

Never edit a migration that has already shipped. Add a new one instead, keep the numbers sequential, and prefer `IF NOT EXISTS` where it makes sense.

2. Update `db/query.sql` if you need to read or write the new column.
3. Regenerate the Go code with `make sqlc`. This installs sqlc into `./bin` on first run. You only need it to change SQL, not to build Owncast.
4. Build with `go build ./...`. The migration applies on the next startup, with no manual step.
5. Commit both your application code and the generated files.

Don't hand-write raw SQL in Go for new work. Add it to `db/query.sql` and regenerate.

## Repositories that aren't sqlc-managed

A few older repositories still use hand-written SQL and aren't wired into sqlc, such as `persistence/webhookrepository/`. For those, `make sqlc` generates nothing. The schema change still goes in a goose migration, but you edit the raw SQL and the matching struct fields by hand. Watch for `SELECT *` paired with a positional `rows.Scan(...)`: a column added by `ALTER TABLE` lands last, so add it to the end of the `Scan` argument list or the scan fails at runtime.

For the full version, see `db/README.md` in the repository.