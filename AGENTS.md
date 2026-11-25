<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.

<!-- LOVABLE:END -->

## Prototype architecture

- Keep shared career data, privacy allowlists, validation and deterministic scoring in browser-safe domain modules; server-only AI helpers generate questions and feedback through typed server functions.
- Persist only professional profiles and preliminary assessment outcomes through the shared provider, after hydration; credentials and assistant messages must not be persisted.
- Keep authentication and the career assistant as explicitly labeled frontend previews; only assessments use verified live AI, with separate question/feedback source labels and a rule-based fallback.
- Give each public page its own file route and head metadata; share workspace navigation and layout through presentation components.
- Assessment sessions use encrypted, expiring server-issued tokens to protect answer keys and context; profile persistence remains in the existing hydrated provider to preserve current device-only flows.
- AI assessments use the workspace-permitted Responses endpoint when retention controls block the default; send only canonical fields, numeric experience and allowlisted skill terms, never raw profile text.
