Ja, genau. 👍 **Das Repo kann ich ansehen**, und für deine README musst du mir **keinen Schreibzugriff** geben.

Hier ist eine Version, die du direkt als `README.md` ins Repo kopieren kannst:

````markdown
# Cyberskills

## Überblick

**Cyberskills** ist ein Webprojekt, das aktuell aus mehreren eigenständigen Webbereichen besteht und über **Vercel** deployed wird.

**Produktive Domain:** https://cyberskills.li

Das Repository sollte nicht als ein einziges Frontend verstanden werden. Es enthält mehrere Projektbereiche, die innerhalb derselben Repository- und Deployment-Struktur liegen.

Der wichtigste Punkt für zukünftige Entwickler und KI-Agenten:

> Wenn von **„Cyberskills“** gesprochen wird, ist normalerweise die öffentliche Cyberskills-Website bzw. Landingpage gemeint. Wenn von **„Robot Fight“** gesprochen wird, ist das eigenständige React-Strategiespiel unter `Cybern/robot/` gemeint.

---

# Projektstruktur

Das Repository ist derzeit im Wesentlichen in zwei Bereiche aufgeteilt:

```text
Cyberskills/
├── Cyber/
└── Cybern/
````

Der relevante Web-/Deployment-Bereich ist **`Cybern/`**.

Innerhalb von `Cybern/` befinden sich zwei unterschiedliche Webprojekte:

```text
Cybern/
├── index.html
├── form.html
├── css/
├── js/
├── assets/
├── robot/
├── dist/
└── vercel.json
```

Dabei sind insbesondere folgende Bereiche wichtig:

| Bereich              | Bedeutung                                   |
| -------------------- | ------------------------------------------- |
| `Cybern/`            | Hauptbereich der Cyberskills-Website        |
| `Cybern/index.html`  | Öffentliche Cyberskills-Landingpage         |
| `Cybern/css/`        | CSS der klassischen Website                 |
| `Cybern/js/`         | JavaScript der klassischen Website          |
| `Cybern/assets/`     | Statische Assets der Website                |
| `Cybern/form.html`   | Formular-/Waitlist-Seite                    |
| `Cybern/robot/`      | Eigenständiges Projekt **Robot Fight**      |
| `Cybern/vercel.json` | Vercel-Routing und Deployment-Konfiguration |

---

# 1. Cyberskills Website

## Was ist „Cyberskills“?

Die normale Cyberskills-Website ist die öffentliche Oberfläche von `cyberskills.li`.

Sie ist **keine React-Anwendung**, sondern basiert hauptsächlich auf:

* HTML
* CSS
* JavaScript

Der zentrale Einstiegspunkt ist:

```text
Cybern/index.html
```

Die Website dient momentan hauptsächlich als Präsentations-/Landingpage für ein kommendes Projekt.

Sie erklärt beispielsweise:

* was Cyberskills ist
* welches Konzept hinter dem Projekt steht
* welche Skills bzw. Themen später behandelt werden sollen
* welche Bereiche zukünftig angeboten werden
* den aktuellen Entwicklungsstand
* die geplante Plattform

Die Website ist damit momentan stärker eine **öffentliche Präsentation des Projekts** als eine vollständig ausgebaute Lernplattform.

---

## Wichtige Dateien der Website

### `Cybern/index.html`

Das ist die Hauptseite.

Wenn ein Auftrag lautet:

> „Ändere den Text auf der Cyberskills-Website.“

ist zunächst diese Datei relevant.

---

### `Cybern/css/`

Hier befinden sich die Stylesheets der klassischen Cyberskills-Website.

Wenn ein Auftrag lautet:

> „Ändere das Design der Cyberskills Landingpage.“

sollte zunächst dieser Ordner untersucht werden.

---

### `Cybern/js/`

Hier befindet sich JavaScript, das für die klassische Website verwendet wird.

Das betrifft beispielsweise Interaktionen und dynamisches Verhalten der Landingpage.

---

### `Cybern/assets/`

Hier befinden sich statische Ressourcen wie Bilder und andere Assets der Website.

---

### `Cybern/form.html`

Diese Seite gehört zur klassischen Website und ist für den Formular-/Waitlist-Bereich relevant.

Sie sollte nicht mit dem Robot-Fight-Projekt verwechselt werden.

---

# 2. Robot Fight

## Was ist Robot Fight?

**Robot Fight** ist ein eigenständiges Strategiespiel innerhalb des Cyberskills-Repositories.

Es ist **kein Teil der normalen HTML/CSS/JavaScript-Landingpage**, sondern ein eigenes Webprojekt.

Der vollständige Projektpfad ist:

```text
Cybern/robot/
```

Das Spiel verwendet:

* React
* TypeScript
* Vite
* React DOM
* Lucide React

Die Projektdefinition befindet sich in:

```text
Cybern/robot/package.json
```

---

# Robot Fight Struktur

```text
Cybern/robot/
├── src/
├── assets/
├── dist/
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── favicon.ico
```

## `Cybern/robot/src/`

Das ist der **wichtigste Ordner des Spiels**.

Hier befindet sich der eigentliche React-/TypeScript-Quellcode.

Wenn jemand sagt:

> „Wir arbeiten gerade an Robot Fight.“

sollte ein Entwickler oder KI-Agent **zuerst `Cybern/robot/src/` untersuchen**.

Änderungen an:

* Gameplay
* Spielmechaniken
* React-Komponenten
* UI
* Spielzuständen
* Interaktionen
* TypeScript-Code

werden normalerweise hier vorgenommen.

---

## `Cybern/robot/assets/`

Assets, die zum Robot-Fight-Projekt gehören.

Diese sind vom allgemeinen Website-Asset-Bereich zu unterscheiden.

---

## `Cybern/robot/dist/`

Das ist der von Vite erzeugte Produktions-Build.

Wichtig:

> `dist/` sollte normalerweise nicht als primäre Quelle des Spiels bearbeitet werden.

Wenn eine Änderung am Spiel benötigt wird, sollte normalerweise:

```text
src/
   ↓
Code ändern
   ↓
npm run build
   ↓
dist/
```

verwendet werden.

`dist/` ist also hauptsächlich **generierter Output**.

---

## `Cybern/robot/package.json`

Enthält die Projektdefinition und Dependencies von Robot Fight.

Das Projekt verwendet unter anderem React und Vite.

Typische Entwicklungsbefehle:

```bash
cd Cybern/robot
npm install
npm run dev
```

Produktions-Build:

```bash
npm run build
```

---

# 3. Vercel Deployment

Die Domain:

```text
cyberskills.li
```

wird über **Vercel** deployed.

Die relevante Konfiguration befindet sich in:

```text
Cybern/vercel.json
```

Diese Datei ist besonders wichtig, weil sie das Routing zwischen der normalen Website und Robot Fight definiert.

---

## URL-Struktur

Das grundlegende Konzept ist:

```text
https://cyberskills.li/
        │
        ▼
Cyberskills Website
```

und:

```text
https://cyberskills.li/robot
        │
        ▼
Robot Fight
```

Robot Fight wird dabei über den Build unter:

```text
Cybern/robot/dist/
```

ausgeliefert.

Auch die Assets von Robot Fight werden über das entsprechende `/robot/...`-Routing bereitgestellt.

---

# 4. Wichtig: Die beiden Projekte nicht verwechseln

Das Repository enthält **zwei unterschiedliche Arten von Frontend-Code**.

### Cyberskills Website

```text
Cybern/
├── index.html
├── css/
├── js/
└── assets/
```

Technologie:

```text
HTML
CSS
JavaScript
```

Zweck:

```text
Landingpage / Präsentation / Informationen über Cyberskills
```

---

### Robot Fight

```text
Cybern/robot/
├── src/
├── assets/
├── dist/
└── package.json
```

Technologie:

```text
React
TypeScript
Vite
```

Zweck:

```text
Strategiespiel
```

---

# 5. Begriffe für zukünftige Entwickler und KI-Agenten

Damit zukünftige Anweisungen eindeutig sind, sollten folgende Begriffe so verstanden werden:

| Begriff                 | Gemeint ist                                            |
| ----------------------- | ------------------------------------------------------ |
| **Cyberskills**         | Das übergeordnete Projekt bzw. die öffentliche Website |
| **Cyberskills Website** | Die klassische Website unter `Cybern/`                 |
| **Landingpage**         | `Cybern/index.html` + CSS + JS + Assets                |
| **Hauptseite**          | `Cybern/index.html`                                    |
| **Waitlist / Formular** | `Cybern/form.html`                                     |
| **Robot Fight**         | Das Strategiespiel unter `Cybern/robot/`               |
| **Robot Fight Code**    | Vor allem `Cybern/robot/src/`                          |
| **Robot UI**            | React-Code innerhalb von `Cybern/robot/src/`           |
| **Robot Assets**        | `Cybern/robot/assets/`                                 |
| **Robot Build**         | `Cybern/robot/dist/`                                   |
| **Vercel Routing**      | `Cybern/vercel.json`                                   |

---

# 6. Beispiele für zukünftige Aufgaben

## Beispiel 1

> „Ändere den Text auf der Cyberskills Website.“

→ Betroffene Bereiche:

```text
Cybern/index.html
```

ggf.

```text
Cybern/css/
Cybern/js/
```

---

## Beispiel 2

> „Ändere das Design der Landingpage.“

→ Zuerst:

```text
Cybern/css/
```

und gegebenenfalls:

```text
Cybern/index.html
```

---

## Beispiel 3

> „Wir arbeiten gerade an Robot Fight. Ändere die Roboter-Kampfmechanik.“

→ Betroffener Bereich:

```text
Cybern/robot/src/
```

**Nicht** automatisch:

```text
Cybern/index.html
```

---

## Beispiel 4

> „Füge Robot Fight eine neue Spielmechanik hinzu.“

→ Primär:

```text
Cybern/robot/src/
```

Danach gegebenenfalls den Build aktualisieren.

---

## Beispiel 5

> „Robot Fight funktioniert unter `/robot` nicht mehr.“

→ Zuerst prüfen:

```text
Cybern/vercel.json
Cybern/robot/
Cybern/robot/dist/
```

Hier könnte es sich um ein Routing-, Build- oder Deployment-Problem handeln.

---

## Beispiel 6

> „Die normale Cyberskills-Seite funktioniert, aber Robot Fight ist kaputt.“

→ Nicht sofort die Landingpage verändern.

Zuerst:

```text
Cybern/robot/
```

und:

```text
Cybern/vercel.json
```

prüfen.

---

# 7. Architekturübersicht

Das Projekt kann vereinfacht so dargestellt werden:

```text
                         cyberskills.li
                              │
                              ▼
                            Vercel
                              │
                     Cybern/vercel.json
                              │
                 ┌────────────┴────────────┐
                 │                         │
                 ▼                         ▼
          Normale Website                /robot
                 │                         │
                 ▼                         ▼
        Cybern/index.html          Cybern/robot/
                 │                         │
          ┌──────┼──────┐                  ▼
          │      │      │            React + TypeScript
          ▼      ▼      ▼                  │
         CSS     JS    Assets              ▼
                                      Vite Build
                                           │
                                           ▼
                                   robot/dist/
```

---

# 8. Entwicklungsphilosophie

Die beiden Projekte sollten logisch getrennt behandelt werden.

## Wenn an Cyberskills gearbeitet wird

Primär:

```text
Cybern/
```

insbesondere:

```text
index.html
css/
js/
assets/
```

## Wenn an Robot Fight gearbeitet wird

Primär:

```text
Cybern/robot/
```

insbesondere:

```text
src/
```

## Wenn das Deployment betroffen ist

Primär:

```text
Cybern/vercel.json
```

---

# 9. Hinweise für KI-Agenten

Dieses Repository kann von zukünftigen KI-Agenten bearbeitet werden.

Vor jeder Änderung sollte ein Agent zuerst feststellen:

1. **Welches Projekt ist gemeint?**
2. **Welche URL bzw. welcher Bereich ist betroffen?**
3. **Ist es die klassische Website oder Robot Fight?**
4. **Ist die Änderung Source Code oder nur Build Output?**
5. **Muss Vercel-Routing verändert werden?**

### Grundregel

Wenn ein Benutzer sagt:

> **„Wir arbeiten an Robot Fight.“**

bedeutet das standardmäßig:

```text
Cybern/robot/
```

und insbesondere:

```text
Cybern/robot/src/
```

Wenn ein Benutzer sagt:

> **„Wir arbeiten an der Cyberskills Website.“**

bedeutet das standardmäßig:

```text
Cybern/
```

mit Fokus auf:

```text
index.html
css/
js/
assets/
```

Wenn ein Benutzer sagt:

> **„Das Deployment / `/robot` Routing ist kaputt.“**

sollte zusätzlich:

```text
Cybern/vercel.json
```

untersucht werden.

---

# 10. Wichtige Unterscheidung bei Build-Dateien

Robot Fight ist ein Vite-Projekt.

Daher gibt es einen Unterschied zwischen:

```text
Cybern/robot/src/
```

und:

```text
Cybern/robot/dist/
```

`src/` ist der **Quellcode**.

`dist/` ist der **generierte Produktions-Build**.

Daher sollte eine Änderung normalerweise hier beginnen:

```text
Cybern/robot/src/
```

und anschließend über den Build-Prozess in:

```text
Cybern/robot/dist/
```

landen.

Ein Agent sollte nicht einfach manuell Dateien in `dist/` verändern, wenn eigentlich die Anwendung geändert werden soll.

---

# 11. Zusammenfassung

Cyberskills ist derzeit ein Repository mit mehreren Webbereichen.

Die zwei wichtigsten Projekte sind:

### Cyberskills Website

```text
Cybern/
```

Klassische:

```text
HTML + CSS + JavaScript
```

Zweck:

```text
Öffentliche Landingpage und Präsentation des kommenden Cyberskills-Projekts.
```

---

### Robot Fight

```text
Cybern/robot/
```

Technologie:

```text
React + TypeScript + Vite
```

Zweck:

```text
Eigenständiges Strategiespiel.
```

---

### Deployment

```text
Vercel
    │
    ├── cyberskills.li
    │       └── Cyberskills Website
    │
    └── cyberskills.li/robot
            └── Robot Fight
```

Die wichtigste Datei für das Deployment-/Routing-Verhalten ist:

```text
Cybern/vercel.json
```

---

## Schnelle Referenz

```text
Cyberskills Website
→ Cybern/

Landingpage
→ Cybern/index.html

Website Styling
→ Cybern/css/

Website JavaScript
→ Cybern/js/

Website Assets
→ Cybern/assets/

Waitlist/Formular
→ Cybern/form.html

Robot Fight
→ Cybern/robot/

Robot Fight Source Code
→ Cybern/robot/src/

Robot Fight Assets
→ Cybern/robot/assets/

Robot Fight Build
→ Cybern/robot/dist/

Robot Fight Dependencies
→ Cybern/robot/package.json

Vercel Routing
→ Cybern/vercel.json

Domain
→ https://cyberskills.li
```

**Merksatz für zukünftige Arbeiten:**

> **„Cyberskills“ = Website.
> „Robot Fight“ = React-Spiel.
> `/robot` = URL des Spiels.
> `robot/src` = eigentlicher Spielcode.
> `vercel.json` = Routing/Deployment.**

```

Damit hast du eine README, die nicht nur die Ordner erklärt, sondern vor allem **den Kontext für zukünftige Menschen und Agents festhält**.
```
