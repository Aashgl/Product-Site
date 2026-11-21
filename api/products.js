// Sends the product list to the website. Keys stay on the server (set in Vercel).
module.exports = async (req, res) => {
  const base = (process.env.SUPABASE_URL || "").replace(/\/+$/, "");
  const key = process.env.SUPABASE_SERVICE_KEY || "";
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
    if (!r.ok) return res.status(502).json({ error: "Could not load products" });
    const data = await r.json();
    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    return res.status(200).json(data);
  } catch (e) {
    return res.status(502).json({ error: "Could not load products" });
  }
};
