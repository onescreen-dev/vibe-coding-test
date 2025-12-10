export interface Article {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  publishedAt: string;
  region: string;
  continent: string;
  category: string;
  keywords: string[];
}

export interface Keyword {
  text: string;
  value: number;
  category: string;
  regions: string[];
  continents: string[];
  articles: string[]; // Article IDs
}

export interface Category {
  id: string;
  name: string;
  count: number;
}

export interface Region {
  id: string;
  name: string;
  continent: string;
}

export interface Continent {
  id: string;
  name: string;
}

export interface FilterState {
  continent: string;
  region: string;
  category: string;
  search: string;
}
