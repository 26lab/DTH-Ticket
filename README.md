
# DTH-Ticket Script
Damit läuft das Skript komplett autonom: Du bist live auf der Übersicht, startest es einmal, und es kümmert sich darum, sobald die Tickets verfügbar sind, in der gewünschten Kategorie und Anzahl die teuerste Variante in deinen Warenkorb zu legen und dich anschließend dorthin zu navigieren.

# 🎟️ DTH Ticket Auto-Booker

Ein einfaches JavaScript-Snippet, das automatisch die gewünschten Tickets aus dem „Die Toten Hosen“ Shop in den Warenkorb legt und dich anschließend dorthin weiterleitet.

## 🚀 Features

- **Polling** der Übersicht bis der Vorverkauf startet  
- Filter nach gewünschter **Ticket-Kategorie** (z.B. SOZIALTICKET, STEHPLATZ)  
- Automatische Auswahl der **teuersten verfügbaren** Variante  
- Automatisches **Hinzufügen** in den Warenkorb via Alpine.js Cart API  
- **Weiterleitung** zur Warenkorb-Seite, sobald alle IDs gebucht sind  
- Umfangreiche **Konsolen-Logs** für jeden Zwischenschritt

## 🖥️ Voraussetzungen

- Browser mit Entwickler-Konsole (z.B. Chrome, Firefox)  
- Zugriff auf die Seite:  
z.B. https://shop.dietotenhosen.de/index.php/n.213/

## ⚙️ Konfiguration

Im Skript ganz oben anpassen:

```javascript
// data-id’s der gewünschten Konzerte
const concertIds   = [1908, 1909];
// Ticket-Kategorie (case-insensitive)
const ticketType   = 'SOZIALTICKET';
// Anzahl Tickets pro Bestellung (1–8)
const quantity     = 2;
// Polling-Intervall in Millisekunden
const pollInterval = 500;
```


## 📋 Nutzung (Schritt für Schritt)

```bash
1️⃣ Seite öffnen
Gehe auf: https://shop.dietotenhosen.de/index.php/n.213/

2️⃣ Konsole öffnen
- Rechtsklick → „Untersuchen”
- Zum Reiter „Konsole” wechseln

3️⃣ Skript einfügen
- Den vollständigen Code aus der Datei oder dem Repository kopieren
- In der Konsole einfügen und mit Enter ausführen
- Das Skript zeigt ein ASCII-Totenkopf-Banner (💀) und startet das Polling
```
    
## ⚠️ Hinweise
- Nur einen Tab geöffnet lassen
- Nicht erneut starten, das Skript pollt automatisch bis die Tickets verfügbar sind
- Es wird die teuerste passende Ticketvariante genommen (z. B. Sozialticket, Innenraum)
- Sobald alle angegebenen Konzert-IDs erfolgreich im Warenkorb liegen, wirst du automatisch weitergeleitet 🛒
## 🎉 Beispiel-Ausgabe in der Konsole

```js
        .-''''-.
       /  _  _  \
      |  (o)(o)  |
      |    __    |
      |  (____)  |
       \        /
        '------'
         26lab.io

🔧 Settings: { concertIds: [1908, 1909], ticketType: "SOZIALTICKET", quantity: 2, pollInterval: 500 }
→ Polling gestartet für Konzert 1908…
→ Polling gestartet für Konzert 1909…
  [1908] ✅ Link gefunden → Hole Detailseite…
  [1908] 🤑 Gewählte Variante: "PK1 SOZIALTICKET" zum Preis 19.90 €
  [1908] ✅ 2× in den Warenkorb gelegt!
  [1909] ✅ Link gefunden → Hole Detailseite…
  [1909] 🤑 Gewählte Variante: "PK1 SOZIALTICKET" zum Preis 19.90 €
  [1909] ✅ 2× in den Warenkorb gelegt!
🎉 Alle Konzerte gebucht, leite zum Warenkorb weiter…

```
## 📁 Lizenz
MIT License — bereitgestellt von 26lab.io
Keine Garantie. Benutzung auf eigenes Risiko. 

