import { serve } from "https://deno.land/std@0.201.0/http/server.ts";
import * as kv from "../../src/supabase/functions/server/kv_store.tsx";

serve(async (req: Request) => {
  try {
    const url = new URL(req.url);
    const path = url.pathname.replace(/^\/+/, "");
    // API: GET /kv/<key>
    if (req.method === "GET" && path.startsWith("kv/")) {
      const key = decodeURIComponent(path.slice(3));
      const result = await kv.get(key);
      return new Response(JSON.stringify({ value: result }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // API: POST /kv/<key> with JSON body { value: ... }
    if (req.method === "POST" && path.startsWith("kv/")) {
      const key = decodeURIComponent(path.slice(3));
      const body = await req.json();
      await kv.set(key, body.value);
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    // DELETE /kv/<key>
    if (req.method === "DELETE" && path.startsWith("kv/")) {
      const key = decodeURIComponent(path.slice(3));
      await kv.del(key);
      return new Response(JSON.stringify({ ok: true }), { status: 200, headers: { 'Content-Type': 'application/json' } });
    }

    return new Response(JSON.stringify({ error: 'Not Found' }), { status: 404, headers: { 'Content-Type': 'application/json' } });
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
});
