// Receives an enquiry, saves it in Supabase, and (if set up) sends a Telegram alert.
module.exports = async (req, res) => {
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed" });

  const base = (process.env.SUPABASE_URL || "").replace(/\/+$/, "");
  const key = process.env.SUPABASE_SERVICE_KEY || "";
  const tgToken = process.env.TELEGRAM_BOT_TOKEN || "";
  const tgChat = process.env.TELEGRAM_CHAT_ID || "";
  if (!base || !key) return res.status(500).json({ error: "Server not configured" });

  let b = req.body || {};
  if (typeof b === "string") { try { b = JSON.parse(b); } catch (e) { b = {}; } }

  // Hidden spam-trap field: real people never fill it
  if (b.website) return res.status(200).json({ ok: true });

  const name = String(b.name || "").trim().slice(0, 100);
  const phone = String(b.phone || "").trim().slice(0, 25);
  const message = String(b.message || "").trim().slice(0, 1000);
  const productId = String(b.product_id || "").trim();
  const digits = phone.replace(/\D/g, "");

  if (!name || digits.length < 8 || digits.length > 15) {
    return res.status(400).json({ error: "Please enter your name and a valid phone number." });
  }

  const headers = { apikey: key, "Content-Type": "application/json" };
  if (key.startsWith("eyJ")) headers.Authorization = "Bearer " + key;

  const idOk = /^[0-9a-f-]{36}$/i.test(productId);
  let productLabel = "";
  try {
    if (idOk) {
      const r = await fetch(base + "/rest/v1/products?id=eq." + productId + "&select=name,make,model", { headers });
      const rows = r.ok ? await r.json() : [];
      if (rows[0]) productLabel = [rows[0].name, rows[0].make, rows[0].model].filter(Boolean).join(" | ");
    }

    const ins = await fetch(base + "/rest/v1/leads", {
      method: "POST",
      headers: { ...headers, Prefer: "return=minimal" },
      body: JSON.stringify({ product_id: idOk ? productId : null, name, phone, message }),
    });
    if (!ins.ok) return res.status(500).json({ error: "Could not save your enquiry. Please try again." });
  } catch (e) {
    return res.status(500).json({ error: "Could not save your enquiry. Please try again." });
  }

  // Telegram alert: only runs once the two Telegram settings are added in Vercel
  if (tgToken && tgChat) {
    const text =
      "New enquiry\n" +
      (productLabel ? "Product: " + productLabel + "\n" : "") +
      "Name: " + name + "\nPhone: " + phone +
      (message ? "\nMessage: " + message : "");
    try {
      await fetch("https://api.telegram.org/bot" + tgToken + "/sendMessage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: tgChat, text }),
      });
    } catch (e) { /* the lead is already saved; ignore alert failure */ }
  }

  return res.status(200).json({ ok: true });
};
