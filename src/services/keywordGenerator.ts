import type { Article, Keyword, Category } from '../types';

/**
 * Automatische Keyword-Generierung aus Artikeln
 *
 * Dieser Service extrahiert Keywords aus Artikeln und berechnet deren Relevanz
 * basierend auf Häufigkeit, Position und semantischer Wichtigkeit.
 */

// Stop words die gefiltert werden (häufige unwichtige Wörter)
const STOP_WORDS = new Set([
  'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
  'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
  'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
  'should', 'may', 'might', 'must', 'can', 'this', 'that', 'these', 'those',
  'i', 'you', 'he', 'she', 'it', 'we', 'they', 'what', 'which', 'who',
  'when', 'where', 'why', 'how', 'all', 'each', 'every', 'both', 'few',
  'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'not', 'only',
  'own', 'same', 'so', 'than', 'too', 'very', 'after', 'before', 'between',
  'into', 'through', 'during', 'above', 'below', 'up', 'down', 'out', 'off',
  'over', 'under', 'again', 'further', 'then', 'once', 'here', 'there',
  'also', 'its', 'their', 'our', 'his', 'her', 'my', 'your',
]);

// Wichtige Begriffe die eine höhere Gewichtung bekommen
const IMPORTANT_TERMS = new Set([
  'ai', 'artificial intelligence', 'machine learning', 'deep learning',
  'climate change', 'global warming', 'sustainability', 'renewable energy',
  'cryptocurrency', 'blockchain', 'bitcoin', 'ethereum',
  'quantum computing', 'quantum', 'cybersecurity', 'cyber',
  'pandemic', 'vaccine', 'covid', 'health crisis',
  'geopolitics', 'diplomacy', 'war', 'peace', 'conflict',
  'economy', 'recession', 'inflation', 'gdp', 'market',
  'innovation', 'technology', 'breakthrough', 'research',
  'biotechnology', 'gene therapy', 'crispr', 'genomics',
  'space exploration', 'mars', 'satellite', 'rocket',
]);

// Kategorie-Mapping für automatische Kategorisierung
const CATEGORY_KEYWORDS: Record<string, string[]> = {
  'ai': ['ai', 'artificial intelligence', 'machine learning', 'neural', 'gpt', 'llm', 'algorithm'],
  'technology': ['technology', 'tech', 'digital', 'software', 'hardware', 'computing', 'innovation'],
  'economics': ['economy', 'economic', 'market', 'trade', 'finance', 'financial', 'investment', 'gdp'],
  'politics': ['politics', 'political', 'government', 'policy', 'election', 'democracy', 'parliament'],
  'environment': ['climate', 'environment', 'pollution', 'carbon', 'emission', 'ecosystem', 'biodiversity'],
  'health': ['health', 'medical', 'medicine', 'disease', 'treatment', 'hospital', 'vaccine', 'pandemic'],
  'energy': ['energy', 'power', 'electricity', 'solar', 'wind', 'nuclear', 'fossil', 'renewable'],
  'security': ['security', 'defense', 'military', 'weapon', 'army', 'navy', 'force'],
  'cybersecurity': ['cyber', 'cybersecurity', 'hacking', 'malware', 'encryption', 'breach', 'attack'],
  'crypto': ['crypto', 'cryptocurrency', 'bitcoin', 'blockchain', 'ethereum', 'defi', 'nft'],
  'space': ['space', 'mars', 'satellite', 'rocket', 'astronaut', 'orbit', 'planet', 'nasa'],
  'education': ['education', 'school', 'university', 'student', 'learning', 'teaching', 'curriculum'],
  'transportation': ['transport', 'vehicle', 'car', 'train', 'aviation', 'mobility', 'traffic'],
  'agriculture': ['agriculture', 'farming', 'crop', 'food', 'harvest', 'farm'],
  'workforce': ['work', 'employment', 'job', 'labor', 'worker', 'workplace', 'remote work'],
  'innovation': ['innovation', 'innovative', 'breakthrough', 'research', 'development', 'discovery'],
  'society': ['society', 'social', 'community', 'culture', 'people', 'population'],
};

interface KeywordCandidate {
  text: string;
  score: number;
  positions: number[];
  articles: Set<string>;
  regions: Set<string>;
  continents: Set<string>;
  categories: Set<string>;
}

/**
 * Extrahiert potenzielle Keywords aus einem Text
 */
function extractPhrases(text: string): string[] {
  // Text normalisieren
  const normalized = text.toLowerCase()
    .replace(/[^\w\s-]/g, ' ') // Sonderzeichen entfernen
    .replace(/\s+/g, ' ') // Mehrfache Leerzeichen reduzieren
    .trim();

  const words = normalized.split(' ');
  const phrases: string[] = [];

  // 1. Einzelne wichtige Wörter
  words.forEach((word) => {
    if (word.length > 3 && !STOP_WORDS.has(word)) {
      phrases.push(word);
    }
  });

  // 2. Zwei-Wort-Phrasen (Bigrams)
  for (let i = 0; i < words.length - 1; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];

    if (!STOP_WORDS.has(word1) && !STOP_WORDS.has(word2)) {
      const bigram = `${word1} ${word2}`;
      if (bigram.length > 5) {
        phrases.push(bigram);
      }
    }
  }

  // 3. Drei-Wort-Phrasen (Trigrams) - nur für sehr relevante Kombinationen
  for (let i = 0; i < words.length - 2; i++) {
    const word1 = words[i];
    const word2 = words[i + 1];
    const word3 = words[i + 2];

    if (!STOP_WORDS.has(word1) && !STOP_WORDS.has(word2) && !STOP_WORDS.has(word3)) {
      const trigram = `${word1} ${word2} ${word3}`;
      // Nur Trigrams die wichtige Begriffe enthalten
      if (IMPORTANT_TERMS.has(trigram)) {
        phrases.push(trigram);
      }
    }
  }

  return phrases;
}

/**
 * Berechnet einen Relevanz-Score für ein Keyword basierend auf:
 * - Häufigkeit im Corpus
 * - Position im Text (Titel wichtiger als Summary)
 * - Ob es ein wichtiger Begriff ist
 * - Anzahl der zugeordneten Artikel
 */
function calculateRelevanceScore(
  candidate: KeywordCandidate,
  totalArticles: number
): number {
  let score = 0;

  // 1. Basiswert: Anzahl der Artikel (IDF-ähnlich)
  const articleFrequency = candidate.articles.size / totalArticles;
  score += articleFrequency * 40; // Max 40 Punkte

  // 2. Position im Text (frühe Positionen sind wichtiger)
  const avgPosition = candidate.positions.reduce((a, b) => a + b, 0) / candidate.positions.length;
  const positionScore = Math.max(0, 20 - avgPosition * 2); // Max 20 Punkte
  score += positionScore;

  // 3. Wichtiger Begriff-Bonus
  if (IMPORTANT_TERMS.has(candidate.text)) {
    score += 20;
  }

  // 4. Geografische Verteilung (global relevanter)
  const geoSpread = candidate.continents.size / 7; // Max 7 Kontinente
  score += geoSpread * 10; // Max 10 Punkte

  // 5. Kategorien-Verteilung
  const categorySpread = candidate.categories.size;
  score += Math.min(categorySpread, 3) * 3; // Max 9 Punkte

  // 6. Phrasen-Länge (längere Phrasen sind spezifischer)
  const wordCount = candidate.text.split(' ').length;
  if (wordCount > 1) {
    score += wordCount * 3; // Bonus für Multi-Word-Phrasen
  }

  return Math.min(100, Math.round(score));
}

/**
 * Bestimmt die Kategorie für ein Keyword basierend auf semantischer Ähnlichkeit
 */
function categorizeKeyword(keyword: string, articleCategories: Set<string>): string {
  const lowerKeyword = keyword.toLowerCase();

  // 1. Prüfe ob Keyword direkt in Kategorie-Keywords vorkommt
  for (const [category, keywords] of Object.entries(CATEGORY_KEYWORDS)) {
    if (keywords.some(k => lowerKeyword.includes(k) || k.includes(lowerKeyword))) {
      return category;
    }
  }

  // 2. Nutze die häufigste Kategorie der zugeordneten Artikel
  if (articleCategories.size > 0) {
    const categoryArray = Array.from(articleCategories);
    return categoryArray[0]; // Erste Kategorie als Fallback
  }

  // 3. Default Kategorie
  return 'technology';
}

/**
 * Kapitalisiert ein Keyword ordentlich
 */
function capitalizeKeyword(keyword: string): string {
  return keyword
    .split(' ')
    .map(word => {
      // Acronyme und bekannte Begriffe
      const upper = word.toUpperCase();
      if (['AI', 'GDP', 'EU', 'UN', 'US', 'UK', 'IT', 'IOT', 'API', 'CEO', 'CTO', 'NFT'].includes(upper)) {
        return upper;
      }
      // Normale Kapitalisierung
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(' ');
}

/**
 * Generiert Keywords automatisch aus einer Liste von Artikeln
 */
export function generateKeywords(articles: Article[], _categories: Category[]): Keyword[] {
  const candidatesMap = new Map<string, KeywordCandidate>();

  // Phase 1: Extraktion und Sammlung
  articles.forEach((article) => {
    // Text-Quellen mit Gewichtung (Titel ist wichtiger)
    const titlePhrases = extractPhrases(article.title);
    const summaryPhrases = extractPhrases(article.summary);

    // Verarbeite Titel-Phrasen (höhere Gewichtung)
    titlePhrases.forEach((phrase, index) => {
      if (!candidatesMap.has(phrase)) {
        candidatesMap.set(phrase, {
          text: phrase,
          score: 0,
          positions: [],
          articles: new Set(),
          regions: new Set(),
          continents: new Set(),
          categories: new Set(),
        });
      }

      const candidate = candidatesMap.get(phrase)!;
      candidate.positions.push(index * 0.5); // Titel-Position zählt mehr
      candidate.articles.add(article.id);
      candidate.regions.add(article.region);
      candidate.continents.add(article.continent);
      candidate.categories.add(article.category);
    });

    // Verarbeite Summary-Phrasen
    summaryPhrases.forEach((phrase, index) => {
      if (!candidatesMap.has(phrase)) {
        candidatesMap.set(phrase, {
          text: phrase,
          score: 0,
          positions: [],
          articles: new Set(),
          regions: new Set(),
          continents: new Set(),
          categories: new Set(),
        });
      }

      const candidate = candidatesMap.get(phrase)!;
      candidate.positions.push(index + titlePhrases.length);
      candidate.articles.add(article.id);
      candidate.regions.add(article.region);
      candidate.continents.add(article.continent);
      candidate.categories.add(article.category);
    });
  });

  // Phase 2: Filterung und Scoring
  const candidates = Array.from(candidatesMap.values())
    // Filter: Mindestens 2 Artikel oder wichtiger Begriff
    .filter(c => c.articles.size >= 2 || IMPORTANT_TERMS.has(c.text))
    // Berechne Relevanz-Scores
    .map(candidate => ({
      ...candidate,
      score: calculateRelevanceScore(candidate, articles.length),
    }))
    // Filter: Mindest-Score
    .filter(c => c.score >= 30)
    // Sortiere nach Score
    .sort((a, b) => b.score - a.score)
    // Top Keywords auswählen
    .slice(0, 50);

  // Phase 3: Konvertierung zu Keyword-Objekten
  const keywords: Keyword[] = candidates.map(candidate => {
    const category = categorizeKeyword(candidate.text, candidate.categories);

    return {
      text: capitalizeKeyword(candidate.text),
      value: candidate.score,
      category,
      regions: Array.from(candidate.regions),
      continents: Array.from(candidate.continents),
      articles: Array.from(candidate.articles),
    };
  });

  return keywords;
}

/**
 * Aktualisiert Keywords basierend auf neuen Artikeln
 */
export function updateKeywords(
  _existingKeywords: Keyword[],
  _newArticles: Article[],
  allArticles: Article[],
  categories: Category[]
): Keyword[] {
  // Generiere Keywords aus allen Artikeln (alte + neue)
  return generateKeywords(allArticles, categories);
}

/**
 * Findet ähnliche Keywords (für Vorschläge)
 */
export function findSimilarKeywords(keyword: string, allKeywords: Keyword[]): Keyword[] {
  const lowerKeyword = keyword.toLowerCase();

  return allKeywords
    .filter(k => {
      const lowerText = k.text.toLowerCase();
      // Levenshtein-ähnliche Ähnlichkeit oder Teilstring
      return lowerText.includes(lowerKeyword) ||
             lowerKeyword.includes(lowerText) ||
             k.text.split(' ').some(word => lowerKeyword.includes(word.toLowerCase()));
    })
    .sort((a, b) => b.value - a.value)
    .slice(0, 5);
}

/**
 * Analysiert Trends über Zeit (Mock-Implementierung)
 */
export function analyzeTrends(keywords: Keyword[], _articles: Article[]): {
  keyword: string;
  trend: 'rising' | 'stable' | 'falling';
  changeRate: number;
}[] {
  // In einer echten Implementierung würde hier historische Daten analysiert
  return keywords.map(k => ({
    keyword: k.text,
    trend: k.value > 70 ? 'rising' : k.value > 50 ? 'stable' : 'falling',
    changeRate: Math.random() * 20 - 10, // Mock: -10% bis +10%
  }));
}
