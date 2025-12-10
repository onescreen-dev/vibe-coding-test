# Automatische Keyword-Generierung

## Übersicht

Dieses Projekt enthält eine vollautomatische Keyword-Generierung, die aus Nachrichtenartikeln relevante Schlagwörter extrahiert, bewertet und kategorisiert.

## 🎯 Features

### 1. **Automatische Extraktion**
- Analysiert Artikel-Titel und Zusammenfassungen
- Erkennt Ein-Wort, Zwei-Wort und Drei-Wort-Phrasen
- Filtert unwichtige Stop-Words (the, and, is, etc.)
- Berücksichtigt semantisch wichtige Begriffe

### 2. **Intelligente Bewertung**
Der Relevanz-Score (0-100) wird berechnet aus:
- **Häufigkeit**: Wie oft kommt das Keyword in verschiedenen Artikeln vor?
- **Position**: Keywords im Titel zählen mehr als in der Zusammenfassung
- **Wichtigkeit**: Begriffe wie "AI", "Climate Change" bekommen Bonus-Punkte
- **Geografische Verteilung**: Global relevante Keywords bekommen höhere Scores
- **Kategorien-Verteilung**: Keywords in mehreren Kategorien sind relevanter
- **Phrasen-Länge**: Längere, spezifischere Phrasen werden bevorzugt

### 3. **Automatische Kategorisierung**
- Keywords werden automatisch Kategorien zugeordnet (AI, Technology, Politics, etc.)
- Basiert auf semantischer Ähnlichkeit und Artikel-Kategorien
- 30+ vordefinierte Kategorien mit Keyword-Mappings

### 4. **Geografische Zuordnung**
- Automatische Erkennung von Regionen und Kontinenten
- Basiert auf den zugeordneten Artikeln
- Ermöglicht geografische Filterung

## 📁 Architektur

```
src/
├── services/
│   └── keywordGenerator.ts        # Hauptlogik für Keyword-Generierung
├── data/
│   └── mockData.ts                # Integration + Vergleichsfunktionen
└── scripts/
    └── testKeywordGeneration.ts   # Test- und Demo-Script
```

## 🔧 Verwendung

### Umschalten zwischen manuell und automatisch

In `src/data/mockData.ts`:

```typescript
// Auf true setzen um automatisch generierte Keywords zu nutzen
export const USE_AUTO_GENERATED_KEYWORDS = true;
```

### Manuelle Generierung

```typescript
import { generateKeywords } from './services/keywordGenerator';
import { articles, categories } from './data/mockData';

const keywords = generateKeywords(articles, categories);
console.log(keywords);
```

### Vergleich manuell vs. automatisch

```typescript
import { compareKeywords } from './data/mockData';

const comparison = compareKeywords();
console.log('Nur in manuell:', comparison.onlyInManual);
console.log('Nur in generiert:', comparison.onlyInGenerated);
console.log('In beiden:', comparison.inBoth);
```

## 🧪 Algorithmus im Detail

### Phase 1: Extraktion

```
Artikel-Titel: "OpenAI Unveils GPT-5 with Advanced Reasoning"
Artikel-Summary: "OpenAI has announced GPT-5, featuring enhanced..."

Extrahierte Phrasen:
- openai (einzelnes Wort)
- gpt-5 (einzelnes Wort)
- advanced reasoning (Bigram)
- enhanced (einzelnes Wort)
- artificial intelligence (Trigram, weil wichtiger Begriff)
```

### Phase 2: Aggregation

```
Keyword: "Artificial Intelligence"
├── Gefunden in: 4 Artikeln (art-001, art-002, art-026, art-030)
├── Positionen: [0, 2, 5, 1] (durchschnittlich Position 2)
├── Regionen: [usa, china, uk, germany]
├── Kontinente: [north-america, asia, europe]
└── Kategorien: [ai, technology, education]
```

### Phase 3: Scoring

```
Keyword: "Artificial Intelligence"

Scoring-Komponenten:
├── Artikel-Frequenz: (4 / 30) * 40 = 5.3 Punkte
├── Position-Score: 20 - (2 * 2) = 16 Punkte
├── Wichtiger-Begriff-Bonus: +20 Punkte
├── Geografische Verteilung: (3 / 7) * 10 = 4.3 Punkte
├── Kategorien-Verteilung: min(3, 3) * 3 = 9 Punkte
└── Phrasen-Länge-Bonus: 2 * 3 = 6 Punkte
────────────────────────────────────────────────
Gesamt-Score: 60.6 Punkte (gerundet: 61/100)
```

### Phase 4: Kategorisierung

```
Keyword: "Artificial Intelligence"

Kategorisierungs-Logik:
1. Prüfe semantische Keyword-Mappings
   → "artificial intelligence" matched mit Kategorie "ai" ✓
2. Falls kein Match: nutze häufigste Artikel-Kategorie
3. Falls keine Artikel: Default = "technology"

Ergebnis: Kategorie = "ai"
```

## 📊 Qualitäts-Metriken

Erwartete Kennzahlen für gute Keyword-Generierung:

| Metrik | Zielwert | Beschreibung |
|--------|----------|--------------|
| Durchschnittlicher Score | 50-70 | Keywords sollten relevant sein |
| Artikel pro Keyword | 2-5 | Balance zwischen spezifisch und allgemein |
| Kategorien-Abdeckung | 80%+ | Alle Kategorien sollten vertreten sein |
| Geografische Verteilung | Ausgewogen | Keine Region dominiert |
| Anzahl Keywords | 30-50 | Übersichtlich aber umfassend |

## 🔍 Beispiel-Output

### Top 5 Generierte Keywords

```
1. Climate Change          | Score: 88/100 | Kategorie: environment
2. Artificial Intelligence | Score: 85/100 | Kategorie: ai
3. Renewable Energy        | Score: 82/100 | Kategorie: energy
4. Global Economy         | Score: 80/100 | Kategorie: economics
5. Cybersecurity          | Score: 78/100 | Kategorie: cybersecurity
```

## 🚀 Erweiterungsmöglichkeiten

### 1. Live-Daten-Integration
```typescript
// Beispiel: Integration mit News API
async function fetchAndGenerateKeywords() {
  const articles = await fetchFromNewsAPI();
  const keywords = generateKeywords(articles, categories);
  return keywords;
}
```

### 2. Trend-Analyse über Zeit
```typescript
// Vergleiche Keywords von gestern mit heute
const yesterday = generateKeywords(yesterdayArticles, categories);
const today = generateKeywords(todayArticles, categories);
const trending = findRisingKeywords(yesterday, today);
```

### 3. Machine Learning Integration
```typescript
// Nutze ML-Modell für bessere Kategorisierung
import { classifyKeyword } from './mlModel';

const category = await classifyKeyword(keywordText);
```

### 4. Multi-Sprachen-Support
```typescript
// Deutsche und englische Artikel gemeinsam verarbeiten
const deKeywords = generateKeywords(deArticles, categories, 'de');
const enKeywords = generateKeywords(enArticles, categories, 'en');
```

## 🧠 NLP-Techniken

Das System nutzt folgende NLP-Konzepte:

1. **Tokenization**: Text in Wörter aufteilen
2. **Stop-Word-Filtering**: Unwichtige Wörter entfernen
3. **N-Gram-Extraktion**: Phrasen aus mehreren Wörtern erkennen
4. **TF-IDF-ähnlich**: Häufigkeit vs. Dokumenten-Frequenz
5. **Named Entity Recognition**: Wichtige Begriffe erkennen
6. **Topic Modeling**: Automatische Kategorisierung
7. **Semantic Similarity**: Ähnliche Keywords gruppieren

## 📝 Best Practices

### Für optimale Ergebnisse:

1. **Qualität der Artikel**
   - Klare, gut formulierte Titel
   - Aussagekräftige Zusammenfassungen
   - Korrekte Kategorisierung

2. **Konfiguration**
   - Stop-Word-Liste an Sprache anpassen
   - Wichtige Begriffe regelmäßig updaten
   - Kategorie-Mappings verfeinern

3. **Performance**
   - Keywords im Browser-Cache speichern
   - Nur bei neuen Artikeln neu generieren
   - Background-Worker für lange Generierung nutzen

## 🐛 Debugging

### Keywords werden nicht generiert?

```typescript
// Check 1: Sind Artikel vorhanden?
console.log('Artikel:', articles.length);

// Check 2: Werden Phrasen extrahiert?
import { extractPhrases } from './services/keywordGenerator';
const phrases = extractPhrases(articles[0].title);
console.log('Phrasen:', phrases);

// Check 3: Werden Keywords gefiltert?
const keywords = generateKeywords(articles, categories);
console.log('Keywords vor Filter:', keywords.length);
```

### Keyword-Qualität verbessern?

```typescript
// Option 1: Wichtige Begriffe hinzufügen
const IMPORTANT_TERMS = new Set([
  ...existingTerms,
  'neuer-wichtiger-begriff',
]);

// Option 2: Stop-Words anpassen
const STOP_WORDS = new Set([
  ...existingStopWords,
  'unwichtiges-wort',
]);

// Option 3: Scoring-Parameter anpassen
const articleFrequencyWeight = 50; // statt 40
const positionWeight = 25; // statt 20
```

## 📚 Weiterführende Ressourcen

- [Natural Language Processing](https://en.wikipedia.org/wiki/Natural_language_processing)
- [TF-IDF Algorithm](https://en.wikipedia.org/wiki/Tf%E2%80%93idf)
- [Keyword Extraction Techniques](https://monkeylearn.com/keyword-extraction/)
- [react-tagcloud Documentation](https://www.npmjs.com/package/react-tagcloud)

## 🤝 Contribution

Verbesserungsvorschläge für den Algorithmus:

1. **Bessere Phrase-Erkennung**: Nutze POS-Tagging
2. **Sentiment-Analyse**: Negative vs. positive Keywords
3. **Entity-Linking**: Verknüpfe mit Knowledge-Graphs
4. **Temporal-Analyse**: Erkennen von zeitlichen Trends
5. **Cross-Language**: Mehrsprachige Keyword-Generierung

---

**Version**: 1.0.0
**Autor**: Claude
**Lizenz**: MIT
