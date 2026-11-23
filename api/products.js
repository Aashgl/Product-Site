// Sends the product list to the website. Keys stay on the server (set in Vercel).
module.exports = async (req, res) => {
  const base = (process.env.SUPABASE_URL || "").trim().replace(/\/+$/, "");
  const key = (process.env.SUPABASE_SERVICE_KEY || "").trim();
  if (!base || !key) return res.status(500).json({ error: "Server not configured" });

  const headers = { apikey: key };
  if (key.startsWith("eyJ")) headers.Authorization = "Bearer " + key;

  const url =
    base +
    "/rest/v1/products?active=eq.true" +
    "&select=id,name,type,category,make,model,key_spec" +
    "&order=type.asc,category.asc,name.asc&limit=1000";

  try {
    const r = await fetch(url, { headers });
    const text = await r.text();
    if (!r.ok) {
      return res.status(502).json({
        error: "Could not load products",
        status: r.status,
        detail: text.slice(0, 300),
        url_start: base.slice(0, 30),
        key_start: key.slice(0, 6),
      });
    }
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json(JSON.parse(text));
  } catch (e) {
    return res.status(502).json({
      error: "Could not load products",
      detail: String(e && e.message ? e.message : e),
      url_start: base.slice(0, 30),
      key_start: key.slice(0, 6),
    });
  }
};
