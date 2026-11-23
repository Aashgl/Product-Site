// Adds a matching line-icon to every product card on the catalogue page.
(function () {
  var css =
    ".ico{height:100px;border-radius:8px;background:var(--bg);display:flex;align-items:center;justify-content:center;margin-bottom:6px;color:var(--brand)}" +
    ".ico svg{width:74px;height:74px}" +
    ".ico .a{stroke:#e8912d}.ico .f{fill:#e8912d;stroke:none}";
  var st = document.createElement("style");
  st.textContent = css;
  document.head.appendChild(st);

  var I = {
    olt: '<rect x="4" y="10" width="40" height="28" rx="3"/><path d="M14 10v28M24 10v28M34 10v28M7 32h4M17 32h4M27 32h4M37 32h4"/><circle class="f" cx="9" cy="16" r="1.6"/><circle class="f" cx="19" cy="16" r="1.6"/><circle class="f" cx="29" cy="16" r="1.6"/><circle class="f" cx="39" cy="16" r="1.6"/>',
    oltcard: '<rect x="14" y="5" width="20" height="38" rx="2"/><rect x="18" y="11" width="12" height="6" rx="1"/><rect x="18" y="21" width="12" height="6" rx="1"/><path d="M18 34h12"/><circle class="f" cx="24" cy="38.5" r="1.6"/>',
    ont: '<rect x="6" y="18" width="36" height="18" rx="4"/><circle class="f" cx="15" cy="27" r="1.8"/><circle class="f" cx="22" cy="27" r="1.8"/><circle class="f" cx="29" cy="27" r="1.8"/><path d="M12 40v2M36 40v2"/>',
    ontwifi: '<rect x="6" y="22" width="36" height="16" rx="4"/><circle class="f" cx="15" cy="30" r="1.8"/><circle class="f" cx="22" cy="30" r="1.8"/><path d="M12 22V8M36 22V8"/><path class="a" d="M20 14a6 6 0 0 1 8 0M17 10a11 11 0 0 1 14 0"/>',
    ontout: '<rect x="10" y="8" width="28" height="28" rx="4"/><circle cx="15" cy="13" r="1"/><circle cx="33" cy="13" r="1"/><circle class="f" cx="19" cy="24" r="1.8"/><circle class="f" cx="25" cy="24" r="1.8"/><circle class="f" cx="31" cy="24" r="1.8"/><path d="M19 36v7M29 36v7"/>',
    voip: '<path d="M12 8h8l3 9-5 3c2 5 5 8 10 10l3-5 9 3v8c0 2-2 4-4 4C22 40 8 26 8 12c0-2 2-4 4-4z"/><path class="a" d="M30 8a10 10 0 0 1 10 10M30 14a4 4 0 0 1 4 4"/>',
    catv: '<rect x="5" y="8" width="38" height="26" rx="3"/><path d="M17 42h14M24 34v8"/><circle class="a" cx="24" cy="21" r="4"/>',
    sfp: '<rect x="14" y="12" width="20" height="30" rx="2"/><path d="M18 12V5h12v7M18 17h12"/><rect class="a" x="18" y="33" width="5" height="5" rx="1"/><rect class="a" x="25" y="33" width="5" height="5" rx="1"/>',
    dac: '<rect x="3" y="17" width="11" height="14" rx="2"/><rect x="34" y="17" width="11" height="14" rx="2"/><path d="M14 24c8 0 6 10 10 10s2-10 10-10"/><path class="a" d="M5 21h4M5 27h4M39 21h4M39 27h4"/>',
    switch: '<rect x="3" y="15" width="42" height="18" rx="3"/><rect x="7" y="21" width="4" height="6"/><rect x="13" y="21" width="4" height="6"/><rect x="19" y="21" width="4" height="6"/><rect x="25" y="21" width="4" height="6"/><rect class="a" x="34" y="20" width="4" height="8"/><rect class="a" x="39" y="20" width="3" height="8"/><path d="M8 38v4M40 38v4"/>',
    switchpoe: '<rect x="3" y="22" width="42" height="18" rx="3"/><rect x="7" y="28" width="4" height="6"/><rect x="13" y="28" width="4" height="6"/><rect x="19" y="28" width="4" height="6"/><rect x="25" y="28" width="4" height="6"/><rect x="31" y="28" width="4" height="6"/><path class="a" d="M26 4l-6 9h7l-5 8"/>',
    router: '<circle cx="24" cy="24" r="9"/><path d="M24 4v9M20 8l4-4 4 4M24 44v-9M20 40l4 4 4-4M4 24h9M8 20l-4 4 4 4M44 24h-9M40 20l4 4-4 4"/><circle class="f" cx="24" cy="24" r="2.4"/>',
    firewall: '<path d="M24 4l16 6v12c0 10-7 18-16 22C15 40 8 32 8 22V10z"/><path class="a" d="M12 18h24M12 26h24M20 18v8M30 26v8M16 26v8"/>',
    ap: '<ellipse cx="24" cy="36" rx="16" ry="6"/><circle class="f" cx="24" cy="36" r="2"/><path class="a" d="M12 26a17 17 0 0 1 24 0M17 20a10 10 0 0 1 14 0M21 14a4 4 0 0 1 6 0"/>',
    cpe: '<rect x="12" y="5" width="24" height="26" rx="3"/><circle class="a" cx="24" cy="18" r="6"/><circle class="f" cx="24" cy="18" r="1.8"/><path d="M24 31v9M14 43h20"/>',
    cable: '<circle cx="24" cy="24" r="18"/><circle cx="24" cy="24" r="3" class="a"/><circle cx="32" cy="24" r="2"/><circle cx="28" cy="31" r="2"/><circle cx="20" cy="31" r="2"/><circle cx="16" cy="24" r="2"/><circle cx="20" cy="17" r="2"/><circle cx="28" cy="17" r="2"/>',
    armored: '<circle cx="24" cy="24" r="19"/><circle cx="24" cy="24" r="15" stroke-dasharray="3 2.5"/><circle cx="24" cy="24" r="3" class="a"/><circle cx="31" cy="24" r="2"/><circle cx="27.5" cy="30" r="2"/><circle cx="20.5" cy="30" r="2"/><circle cx="17" cy="24" r="2"/><circle cx="20.5" cy="18" r="2"/><circle cx="27.5" cy="18" r="2"/>',
    adss: '<path d="M8 6v36M40 6v36M3 11h10M35 11h10"/><path class="a" d="M8 13c9 14 23 14 32 0"/>',
    patch: '<rect x="3" y="17" width="12" height="14" rx="2"/><rect x="33" y="17" width="12" height="14" rx="2"/><path d="M15 24c6 0 6 11 9 11s3-11 9-11"/><path class="a" d="M3 24H0M45 24h3"/>',
    pigtail: '<rect x="3" y="18" width="13" height="12" rx="2"/><path d="M16 24h12"/><path class="a" d="M28 24l14-8M28 24h14M28 24l14 8"/>',
    rj45: '<rect x="10" y="16" width="28" height="24" rx="2"/><path d="M18 16V9h12v7"/><path class="a" d="M16 40v-9M20.5 40v-9M25 40v-9M29.5 40v-9M34 40v-9"/>',
    splitter: '<path d="M3 24h13"/><circle class="a" cx="19" cy="24" r="3"/><path d="M22 24c9 0 9-16 20-16M22 24c8 0 8-5 20-5M22 24c8 0 8 5 20 5M22 24c9 0 9 16 20 16"/>',
    cabinet: '<rect x="8" y="4" width="32" height="38" rx="3"/><path d="M24 4v38M6 44h36"/><path class="a" d="M20 22v4M28 22v4"/><path d="M12 10h8M28 10h8"/>',
    box: '<rect x="7" y="8" width="34" height="28" rx="3"/><rect x="12" y="13" width="24" height="18" rx="2"/><circle class="a" cx="24" cy="22" r="5"/><path d="M18 36v7M30 36v7"/>',
    closure: '<rect x="10" y="14" width="28" height="20" rx="7"/><path d="M18 14v20M30 14v20M3 24h7M38 24h7"/><circle class="f" cx="24" cy="24" r="1.8"/>',
    dome: '<path d="M11 38V22a13 13 0 0 1 26 0v16z"/><path d="M8 38h32M24 38v7M11 28h26"/><circle class="f" cx="24" cy="20" r="1.8"/>',
    odf: '<rect x="3" y="12" width="42" height="24" rx="2"/><path d="M3 24h42"/><circle cx="9" cy="18" r="2"/><circle cx="16" cy="18" r="2"/><circle cx="23" cy="18" r="2"/><circle cx="30" cy="18" r="2"/><circle cx="37" cy="18" r="2"/><circle class="a" cx="9" cy="30" r="2"/><circle class="a" cx="16" cy="30" r="2"/><circle cx="23" cy="30" r="2"/><circle cx="30" cy="30" r="2"/><circle cx="37" cy="30" r="2"/>',
    adapter: '<rect x="4" y="16" width="14" height="16" rx="2"/><rect x="30" y="16" width="14" height="16" rx="2"/><rect class="a" x="18" y="20" width="12" height="8"/><path d="M0 24h4M44 24h4"/>',
    splice: '<rect x="6" y="19" width="36" height="10" rx="5"/><path class="a" d="M1 24h46"/>',
    clamp: '<path d="M13 8v18a11 11 0 0 0 22 0V8"/><path class="a" d="M8 8h10M30 8h10"/><path d="M24 37v8"/>',
    bracket: '<path d="M12 5v34h28"/><circle class="a" cx="12" cy="13" r="2"/><circle class="a" cx="12" cy="25" r="2"/><rect x="22" y="22" width="16" height="12" rx="2"/>',
    band: '<rect x="7" y="12" width="34" height="24" rx="9"/><rect class="a" x="19" y="9" width="10" height="7" rx="1"/>',
    duct: '<circle cx="24" cy="24" r="19"/><circle cx="24" cy="24" r="12"/><path class="a" d="M24 12v24"/>',
    microduct: '<circle cx="24" cy="24" r="19"/><circle class="a" cx="24" cy="24" r="3.5"/><circle cx="24" cy="14" r="3.5"/><circle cx="24" cy="34" r="3.5"/><circle cx="15.5" cy="19" r="3.5"/><circle cx="32.5" cy="19" r="3.5"/><circle cx="15.5" cy="29" r="3.5"/><circle cx="32.5" cy="29" r="3.5"/>',
    coupler: '<path d="M4 14h11v20H4zM33 14h11v20H33z"/><rect class="a" x="15" y="11" width="18" height="26" rx="2"/>',
    manhole: '<circle cx="24" cy="24" r="19"/><circle cx="24" cy="24" r="13"/><path class="a" d="M11 24h26M24 11v26M15 15l18 18M33 15L15 33"/>',
    tape: '<circle cx="17" cy="21" r="13"/><circle cx="17" cy="21" r="4"/><rect x="14" y="36" width="31" height="7" rx="1"/><path class="a" d="M21 36l-3 7M28 36l-3 7M35 36l-3 7M42 36l-3 7"/>',
    rack: '<rect x="10" y="3" width="28" height="42" rx="2"/><path d="M10 13h28M10 23h28M10 33h28"/><circle class="f" cx="15" cy="8" r="1.5"/><circle class="f" cx="15" cy="18" r="1.5"/><circle class="f" cx="15" cy="28" r="1.5"/><circle class="f" cx="15" cy="38" r="1.5"/>',
    wallrack: '<path d="M4 4v40"/><rect x="10" y="9" width="30" height="30" rx="2"/><path d="M10 19h30M10 29h30"/><circle class="f" cx="15" cy="14" r="1.5"/><circle class="f" cx="15" cy="24" r="1.5"/>',
    pdu: '<rect x="3" y="17" width="42" height="14" rx="3"/><rect x="8" y="21" width="5" height="6"/><rect x="16" y="21" width="5" height="6"/><rect x="24" y="21" width="5" height="6"/><rect x="32" y="21" width="5" height="6"/><path class="a" d="M45 24h3"/>',
    manager: '<rect x="3" y="14" width="42" height="20" rx="2"/><path d="M11 14v20M19 14v20M27 14v20M35 14v20"/><path class="a" d="M3 24h8M19 24h8M35 24h10"/>',
    shelf: '<path d="M4 20h40v6H4zM8 26v12M40 26v12M4 38h40"/><path class="a" d="M12 14h24"/>',
    ups: '<rect x="8" y="6" width="32" height="36" rx="4"/><path class="a" d="M26 12l-8 12h7l-3 12 10-15h-7z"/>',
    splicer: '<path d="M6 18l6-9h24l6 9"/><rect x="6" y="18" width="36" height="20" rx="3"/><rect class="a" x="13" y="22" width="16" height="9" rx="1"/><circle cx="36" cy="27" r="2"/><circle cx="36" cy="33" r="1.4"/>',
    otdr: '<rect x="6" y="6" width="36" height="36" rx="4"/><rect x="11" y="11" width="26" height="18" rx="1"/><path class="a" d="M13 24l5-1h4l3-8 3 10h4l5 1"/><circle cx="15" cy="36" r="1.8"/><circle cx="24" cy="36" r="1.8"/><circle cx="33" cy="36" r="1.8"/>',
    meter: '<path d="M7 32a17 17 0 0 1 34 0"/><path class="a" d="M24 32l8-11"/><rect x="5" y="32" width="38" height="10" rx="3"/><circle class="f" cx="24" cy="32" r="2"/>',
    vfl: '<path d="M7 41l3-10 21-21 7 7-21 21z"/><path d="M24 17l7 7"/><path class="a" d="M38 6l5-4M42 13l5-1M34 2l1-5"/>',
    cleaver: '<rect x="6" y="24" width="36" height="16" rx="3"/><circle class="a" cx="24" cy="18" r="7"/><path d="M24 11V5M15 32h18"/>',
    stripper: '<path d="M10 43l14-19M38 43L24 24"/><path d="M24 24L15 7M24 24l9-17"/><circle class="a" cx="24" cy="24" r="2.5"/>',
    lantester: '<rect x="8" y="5" width="32" height="38" rx="4"/><rect x="13" y="10" width="9" height="7" rx="1"/><rect x="26" y="10" width="9" height="7" rx="1"/><circle class="f" cx="15" cy="27" r="1.8"/><circle class="f" cx="22" cy="27" r="1.8"/><circle class="f" cx="29" cy="27" r="1.8"/><circle class="f" cx="36" cy="27" r="1.8"/><circle cx="15" cy="35" r="1.8"/><circle cx="22" cy="35" r="1.8"/><circle cx="29" cy="35" r="1.8"/><circle cx="36" cy="35" r="1.8"/>',
    crimp: '<rect x="12" y="6" width="24" height="18" rx="3"/><path class="a" d="M18 15h12"/><path d="M16 24L9 43M32 24l7 19"/>',
    cleankit: '<rect x="12" y="20" width="22" height="24" rx="3"/><path d="M23 20v-8h8"/><path class="a" d="M38 6l2 5 5 2-5 2-2 5-2-5-5-2 5-2z"/>',
    generic: '<rect x="8" y="10" width="32" height="28" rx="4"/><path d="M16 22h16M16 28h10"/><circle class="f" cx="16" cy="16" r="1.8"/>'
  };

  function pick(name, cat) {
    var n = (name || "").toLowerCase();
    if (/line card/.test(n)) return "oltcard";
    if (cat === "OLT") return /uplink|aggregation switch/.test(n) ? "switch" : "olt";
    if (cat === "ONT") {
      if (/voip/.test(n)) return "voip";
      if (/catv/.test(n)) return "catv";
      if (/outdoor|industrial/.test(n)) return "ontout";
      if (/wi-?fi/.test(n)) return "ontwifi";
      return "ont";
    }
    if (cat === "Switches") return /poe|industrial/.test(n) ? "switchpoe" : "switch";
    if (cat === "Routing") return "router";
    if (cat === "Firewall") return "firewall";
    if (cat === "Wireless") return /access point/.test(n) ? "ap" : "cpe";
    if (cat === "Optics" || cat === "PON accessories") return /dac/.test(n) ? "dac" : "sfp";
    if (cat === "Racks & power") {
      if (/\bups\b/.test(n)) return "ups";
      if (/pdu/.test(n)) return "pdu";
      if (/cable manager/.test(n)) return "manager";
      if (/shelf/.test(n)) return "shelf";
      if (/wall/.test(n)) return "wallrack";
      return "rack";
    }
    if (cat === "Tools & testing") {
      if (/splicing/.test(n)) return "splicer";
      if (/otdr/.test(n)) return "otdr";
      if (/power meter/.test(n)) return "meter";
      if (/fault locator/.test(n)) return "vfl";
      if (/cleaver/.test(n)) return "cleaver";
      if (/stripper/.test(n)) return "stripper";
      if (/lan cable/.test(n)) return "lantester";
      if (/rj45|crimp/.test(n)) return "crimp";
      if (/cleaning/.test(n)) return "cleankit";
    }
    if (/splitter/.test(n)) return "splitter";
    if (/bracket/.test(n)) return "bracket";
    if (/fdh|fdt|distribution hub|distribution terminal/.test(n)) return "cabinet";
    if (/ftb|\bfat\b|termination box|access terminal/.test(n)) return "box";
    if (/dome/.test(n)) return "dome";
    if (/closure|joint box/.test(n)) return "closure";
    if (/odf|liu/.test(n)) return "odf";
    if (/adapter/.test(n)) return "adapter";
    if (/pigtail/.test(n)) return "pigtail";
    if (/patch cord/.test(n)) return "patch";
    if (/splice connector|protection sleeve/.test(n)) return "splice";
    if (/clamp/.test(n)) return "clamp";
    if (/banding/.test(n)) return "band";
    if (/microduct/.test(n)) return "microduct";
    if (/coupler|end cap/.test(n)) return "coupler";
    if (/duct/.test(n)) return "duct";
    if (/manhole|handhole/.test(n)) return "manhole";
    if (/marker|tape/.test(n)) return "tape";
    if (/ethernet|cat6/.test(n)) return "rj45";
    if (/adss/.test(n)) return "adss";
    if (/armored/.test(n)) return "armored";
    if (/ofc|ftth|cable/.test(n)) return "cable";
    return "generic";
  }

  var grid = document.getElementById("grid");
  if (!grid) return;

  function decorate() {
    var cards = grid.querySelectorAll(".card");
    for (var i = 0; i < cards.length; i++) {
      var card = cards[i];
      if (card.querySelector(".ico")) continue;
      var h = card.querySelector("h3");
      var tag = card.querySelector(".tag");
      var cat = tag ? tag.textContent.split("·").pop().trim() : "";
      var key = pick(h ? h.textContent : "", cat);
      var d = document.createElement("div");
      d.className = "ico";
      d.setAttribute("aria-hidden", "true");
      d.innerHTML =
        '<svg viewBox="0 0 48 48" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        (I[key] || I.generic) + "</svg>";
      card.insertBefore(d, card.firstChild);
    }
  }

  new MutationObserver(decorate).observe(grid, { childList: true });
  decorate();
})();
