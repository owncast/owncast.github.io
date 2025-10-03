# Website

This website is built using [Docusaurus](https://docusaurus.io/), a modern static website generator.

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

## Build

```bash
npm run build
```
## Writing documentation

### Linking docs to each other

- Docs with the same tags, who are in the same sidebar category, or have a similar title will be linked to each other as "related docs" at the bottom of the page.
- You can also manually specify related docs by adding a `related` frontmatter field to the doc. For example:
```yaml
related:
  include:
    - /docs/document1
  exclude:
    - /docs/document2
  max: 2
  minScore: 0.08 # Default is 0.06
```
This states that regardless of tags or similarity that `/docs/document1` should be included as a related doc, while `/docs/document2` should be excluded. The `max` and `minScore` fields can be used to tune how many related docs are shown and how similar they need to be to be included.
You can also disable showing related docs completely by setting `related: false`.