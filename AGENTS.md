<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep marketing pages in normal document flow with native scrolling; section stacking and scroll interception were removed to keep navigation predictable.
- Use the same global semantic design tokens and typography across public pages, authentication, workspace tools, and admin; restrict inverted tokens to intentionally dark feature bands.
- Keep one shared auth-state subscription in AuthProvider; recovery is a public page gated by the recovery event/token, not an ordinary signed-in session, to prevent password changes through an unrelated session.
