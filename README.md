# Global Trends - Interactive Trend Research Platform

Eine moderne, interaktive Webseite für Trendforscher, die gesellschaftlich relevante Themen weltweit visualisiert und analysiert.

## 🌟 Features

### Kernfunktionalität
- **Interactive Word Cloud**: Schlagwörter werden nach Relevanz skaliert dargestellt
- **Automatic Keyword Generation**: Intelligente Extraktion und Bewertung von Keywords aus Artikeln
- **Geographic Filtering**: Filter nach Kontinenten und Ländern
- **Topic Clustering**: 30+ Themenkategorien (Economics, Technology, Politics, Environment, etc.)
- **Search Function**: Volltext-Suche über alle Trends und Keywords
- **Deep Dive Pages**: Detailseiten für jedes Schlagwort mit verwandten Artikeln

### Technische Highlights
- **Mobile-First Design**: Optimiert für alle Bildschirmgrößen
- **Modern UI**: Minimalistisches Design mit Tailwind CSS
- **Fast Performance**: Vite Build-Tool für optimale Ladezeiten
- **Type-Safe**: Vollständig in TypeScript implementiert
- **Responsive**: Perfekte Darstellung auf Desktop, Tablet und Mobile

## 🎯 Zielgruppe

Die Webseite richtet sich an:
- Trendforscher und Analysten
- Wirtschafts- und Politikberater
- Journalisten und Medienvertreter
- Strategieabteilungen von Unternehmen
- Personen, die sich mit globalen Entwicklungen beschäftigen

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 oder höher)
- npm oder yarn

### Installation

```bash
# Repository klonen
git clone <repository-url>
cd vibe-coding-test

# Dependencies installieren
npm install

# Development Server starten
npm run dev
```

Der Dev-Server läuft standardmäßig auf `http://localhost:5173`

### Build für Production

```bash
# Production Build erstellen
npm run build

# Preview des Production Builds
npm run preview
```

## 🚀 Deployment

### GitHub Pages

Die Anwendung ist für automatisches Deployment auf GitHub Pages konfiguriert.

**Setup:**

1. Gehe zu deinem GitHub Repository Settings
2. Navigiere zu **Settings** → **Pages**
3. Unter **Source** wähle: **GitHub Actions**
4. Die Seite wird automatisch bei jedem Push zum `main` oder `claude/trend-word-cloud-site-01YEs7HZdxukmSqfrrj7Wsga` Branch deployed

**Workflow:**
- Bei jedem Push wird automatisch der Build-Prozess gestartet
- Die GitHub Action (`deploy.yml`) baut die Anwendung
- Das Build-Artefakt wird auf GitHub Pages veröffentlicht
- Die Seite ist erreichbar unter: `https://<username>.github.io/vibe-coding-test/`

**Manuelles Deployment:**
- Gehe zu **Actions** Tab im Repository
- Wähle den "Deploy to GitHub Pages" Workflow
- Klicke auf "Run workflow" für ein manuelles Deployment

## 📁 Projektstruktur

```
vibe-coding-test/
├── src/
│   ├── components/          # React Komponenten
│   │   ├── FilterBar.tsx    # Filter für Geography & Topics
│   │   ├── Header.tsx       # Hauptnavigation
│   │   ├── SearchBar.tsx    # Suchfunktion
│   │   └── WordCloudComponent.tsx  # Word Cloud Visualisierung
│   ├── pages/               # Seiten
│   │   ├── HomePage.tsx     # Landing Page mit Word Cloud
│   │   └── KeywordDetailPage.tsx  # Detail-Seite für Keywords
│   ├── data/
│   │   └── mockData.ts      # Mock-Daten für Trends, Artikel, etc.
│   ├── types/
│   │   └── index.ts         # TypeScript Typdefinitionen
│   ├── App.tsx              # Haupt-App-Komponente mit Routing
│   ├── main.tsx             # Entry Point
│   └── index.css            # Tailwind CSS Styles
├── public/                  # Statische Assets
├── index.html               # HTML Template
└── package.json             # Dependencies
```

## 🌍 Datenquellen

Die Plattform aggregiert Daten von führenden globalen Nachrichtenportalen:
- Reuters
- BBC News
- Bloomberg
- The Guardian
- Financial Times
- TechCrunch
- CNBC
- Wall Street Journal
- Nature
- MIT Technology Review
- und weitere

## 🎨 Design-Prinzipien

1. **Minimalistisch**: Fokus auf Inhalte, keine Ablenkungen
2. **Mobile-First**: Optimale Nutzererfahrung auf allen Geräten
3. **Interaktiv**: Intuitive Bedienung mit direktem Feedback
4. **Accessible**: Klare Hierarchien und lesbare Typographie
5. **Performance**: Schnelle Ladezeiten und flüssige Animationen

## 🔧 Technologie-Stack

- **Frontend Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS 3
- **Routing**: React Router DOM
- **Visualization**: react-tagcloud
- **Icons**: react-icons

## 📊 Features im Detail

### Word Cloud
- Größe der Wörter = Relevanz-Score (0-100)
- Hover-Effekte für bessere Interaktivität
- Click-to-Navigate zu Detail-Seiten

### Filter-System
- **Geography**: Global, Europa, Asien, Nord-Amerika, Süd-Amerika, Afrika, Ozeanien
- **Countries**: Dynamische Länderliste basierend auf Kontinent
- **Topics**: Top 30 Themenkategorien mit Artikel-Anzahl

### Detail-Seiten
- Vollständige Artikel-Zusammenfassungen
- Quellen-Attribution
- Geographic Coverage
- Related Keywords
- Direkte Links zu Originalartikel

## 🤖 Automatische Keyword-Generierung

Dieses Projekt enthält eine vollautomatische Keyword-Generierung, die aus Nachrichtenartikeln intelligente Schlagwörter extrahiert:

- **NLP-basierte Extraktion**: Erkennt wichtige Ein-, Zwei- und Drei-Wort-Phrasen
- **Intelligentes Scoring**: Bewertet Keywords nach Häufigkeit, Position und Relevanz
- **Automatische Kategorisierung**: Ordnet Keywords automatisch Themenkategorien zu
- **Geografische Zuordnung**: Erkennt regionale und globale Trends

**📚 Ausführliche Dokumentation**: Siehe [KEYWORD_GENERATION.md](./KEYWORD_GENERATION.md)

**Aktivierung**: In `src/data/mockData.ts` die Variable `USE_AUTO_GENERATED_KEYWORDS` auf `true` setzen.

## 🔄 Zukünftige Erweiterungen

- Live-Daten-Integration mit News APIs
- Echtzeit-Updates
- Personalisierte Trend-Alerts
- Export-Funktionalität (PDF, CSV)
- Multi-Language Support
- Dark Mode Toggle
- Trend-Analyse-Dashboard mit Charts
- Machine Learning für bessere Keyword-Qualität

## 📝 Lizenz

Dieses Projekt wurde als Coding-Test erstellt.

## 👤 Autor

Erstellt von Claude für Vibe Coding Test

---

**Note**: Die aktuell verwendeten Daten sind Mock-Daten zu Demonstrationszwecken. Für einen Production-Einsatz würden echte News-APIs integriert werden.
