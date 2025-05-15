(() => {
  const concertIds   = [1908, 1909];
  const ticketType   = 'SOZIALTICKET';  // z.B. 'SOZIALTICKET' oder 'STEHPLATZ'
  const quantity     = 2;               
  const pollInterval = 500;             

  console.log('🔧 Settings:', { concertIds, ticketType, quantity, pollInterval });
  console.log('──────────────────────────────────────────────────');

  concertIds.forEach(id => {
    console.log(`→ Polling gestartet für Konzert ${id}…`);
    let inProgress = false;

    const timer = setInterval(async () => {
      if (inProgress) return;
      inProgress = true;
      console.log(`  [${id}] Polling…`);

      // 1) Listing-Link
      const linkEl = document.querySelector(`a[data-id="${id}"]`);
      if (!linkEl) {
        console.log(`  [${id}] 🔍 Kein Link-Anchor gefunden.`);
        inProgress = false;
        return;
      }
      const href = linkEl.href;
      console.log(`  [${id}] ✅ Link: ${href}`);

      try {
        // 2) Detailseite holen & parsen
        console.log(`  [${id}] Hole Detailseite…`);
        const res    = await fetch(href, { credentials: 'include' });
        console.log(`  [${id}] HTTP-Status:`, res.status);
        const html   = await res.text();
        const detail = new DOMParser().parseFromString(html, 'text/html');
        console.log(`  [${id}] ✅ Detailseite geparst`);

        // 3) Alle addToCart-Forms finden
        const forms = Array.from(detail.querySelectorAll('form[action*="addToCart"]'));
        console.log(`  [${id}] Gefundene Forms insgesamt:`, forms.length);

        // 4) Filter: H2-Text muss ticketType enthalten
        const candidates = forms.map(form => {
          const h2 = form.querySelector('h2');
          const name = h2?.textContent.trim() || '—';
          console.log(`    • Variante-Header: "${name}"`);
          if (!h2 || !name.toLowerCase().includes(ticketType.toLowerCase())) {
            console.log(`      – Überspringe (Header enthält nicht "${ticketType}").`);
            return null;
          }
          console.log(`      – Passt zum Filter "${ticketType}"!`);

          // Preis extrahieren
          const priceText = form.querySelector('.text-3xl.font-bold')?.textContent
                          || form.textContent.match(/\d+\.\d{1,3},\d{2}/)?.[0]
                          || '0,00';
          const price = parseFloat(priceText.replace(/\./g,'').replace(',', '.')) || 0;
          console.log(`      – Preis: ${price} €`);

          // signedId und action
          const signedId = form.querySelector('input[name="requestAddToCart"]')?.value;
          const action   = form.getAttribute('action');
          if (!signedId || !action) {
            console.log('      – Fehlende Daten, ignoriere.');
            return null;
          }
          return { name, price, signedId, action };
        }).filter(v => v);

        console.log(`  [${id}] Kandidaten nach Filter:`, candidates.length);
        if (!candidates.length) {
          console.log(`  [${id}] Noch nichts verfügbar – nächste Runde in ${pollInterval}ms.`);
          inProgress = false;
          return;
        }

        // 5) Teuerste Variante wählen
        candidates.sort((a,b) => b.price - a.price);
        const best = candidates[0];
        console.log(`  [${id}] 🤑 Gewählte Variante: "${best.name}" für ${best.price} €`);

        // 6) POST vorbereiten
        const body = new URLSearchParams({
          requestAddToCart: best.signedId,
          requestAddToCartQuantity: quantity
        });

        // 7) In den Warenkorb
        console.log(`  [${id}] POST an ${best.action} mit:`, body.toString());
        const cartRes = await fetch(best.action, {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: body.toString()
        });
        console.log(`  [${id}] ← Warenkorb-Status:`, cartRes.status);

        if (cartRes.ok) {
          console.log(`  [${id}] ✅ ${quantity}× "${best.name}" im Warenkorb.`);
          clearInterval(timer);
        } else {
          console.error(`  [${id}] ❌ Fehler beim Hinzufügen (Status ${cartRes.status}).`);
        }
      } catch (err) {
        console.error(`  [${id}] ❌ Unerwarteter Fehler:`, err);
      } finally {
        inProgress = false;
      }
    }, pollInterval);
  });
})();
