# Use Context7 for Library Documentation

Always use Context7 via its MCP tools when you need up-to-date documentation,
code examples, API references, or version information for any library, framework,
or tool used in this project.

## Available Tools

- **`search_context7_mcp`** — search the Context7 knowledge base for relevant
  docs, examples, API references, and guides. Use this for broad or conceptual
  queries (e.g., "how to authenticate", "routing setup", "image transformations").
- **`query_docs_filesystem_context7_mcp`** — read documentation pages directly
  using shell-like commands (`head`, `cat`, `rg`, `tree`, `ls`) on a virtual
  filesystem. Use this to get the full content of a specific page.

## Workflow

1. Start with `search_context7_mcp` for broad queries or to find the right page.
2. Drill into details with `query_docs_filesystem_context7_mcp` using `head -80`
   or `rg -C 3 "pattern" /path/file.mdx` on the returned paths.

## When to Use

- Before coding with an unfamiliar API
- When you need version-specific docs (Context7 supports pinning versions with
  `/vX.Y.Z` or `@vX.Y.Z`)
- To avoid hallucinated APIs or outdated patterns
- When integrating third-party libraries into the portfolio

## When NOT to Use

- For trivial language syntax questions (use general knowledge instead)
- For this project's own codebase questions (use grep/file reading instead)
