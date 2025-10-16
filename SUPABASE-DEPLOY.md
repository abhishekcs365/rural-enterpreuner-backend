# Supabase deploy via GitHub Actions

This project includes a GitHub Actions workflow to deploy the `kv_store` Supabase Edge Function.

What I added
- `.github/workflows/deploy-supabase.yml` — action that runs the Supabase CLI in Docker to deploy `kv_store`.
- `supabase/functions/kv_store/index.ts` — Deno HTTP handler that wraps the existing `src/supabase/functions/server/kv_store.tsx` logic.


Required GitHub repository secrets (add in Settings → Secrets):

- `SUPABASE_PROJECT_REF` — your Supabase project ref (the short id in the Supabase dashboard URL).
- `SUPABASE_ACCESS_TOKEN` — a Supabase access token with permission to deploy functions.

Optional (only if you need service role access inside the function at runtime):
- `SUPABASE_SERVICE_ROLE_KEY` — service role key (store securely, not in code).

Optional (for applying SQL automatically):
- `POSTGRES_CONNECTION_STRING` — a full Postgres connection string for your Supabase database (for example: `postgres://postgres:password@db.host:5432/postgres`). If you provide this secret the workflow can run the SQL file in `src/supabase-setup.sql` when requested. Keep this secret secure.

How to trigger

- From GitHub UI: go to Actions → Deploy Supabase functions → Run workflow (choose branch `main`).
	- The workflow has a `run_sql` input. Set it to `yes` to run the SQL step in the same job (requires `POSTGRES_CONNECTION_STRING` secret).
- Or push to `main` to trigger automatically (default does not run SQL unless you use the workflow_dispatch input).

Notes
- The workflow uses the official Supabase CLI Docker image (no need to install locally).
- If you also want the SQL applied automatically, tell me and I will add a step that runs the SQL; that will require a DB connection string or the service role key in secrets.
