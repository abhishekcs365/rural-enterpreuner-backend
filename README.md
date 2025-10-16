
  # Rural Entrepreneur Information App (Copy)

  This is a code bundle for Rural Entrepreneur Information App (Copy). The original project is available at https://www.figma.com/design/zz4kJ4CimDVEtIfrBiZZ80/Rural-Entrepreneur-Information-App--Copy-.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  
## Deployment

This project is a Vite-built static site. After building, the static output is in the `build/` directory.

Quick steps to build and preview locally:

1. npm install
2. npm run build
3. npm run preview

Deploy options:
- Vercel: Install the Vercel CLI (`npm i -g vercel`) and run `npm run deploy:vercel` (or connect the repo in the Vercel dashboard). The `vercel.json` file is included.
- Netlify: Install the Netlify CLI (`npm i -g netlify-cli`) and run `npm run deploy:netlify` (you may run `netlify deploy` first without `--prod` to test). The `netlify.toml` file is included.
- GitHub Pages / Static host: Upload the contents of the `build/` directory.

Environment variables: If your app uses Supabase or other secrets, configure them in your chosen host's dashboard or in the relevant `context.*.environment` section in `netlify.toml`.
