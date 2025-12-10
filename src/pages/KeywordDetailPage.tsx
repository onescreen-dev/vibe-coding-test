import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiExternalLink, FiCalendar, FiMapPin } from 'react-icons/fi';
import { keywords, articles, categories } from '../data/mockData';

export default function KeywordDetailPage() {
  const { keyword } = useParams<{ keyword: string }>();
  const navigate = useNavigate();

  const decodedKeyword = decodeURIComponent(keyword || '');
  const keywordData = keywords.find(
    k => k.text.toLowerCase() === decodedKeyword.toLowerCase()
  );

  if (!keywordData) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Keyword not found
          </h2>
          <Link
            to="/"
            className="text-primary-600 hover:text-primary-700 flex items-center justify-center gap-2"
          >
            <FiArrowLeft /> Back to home
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = articles.filter(article =>
    keywordData.articles.includes(article.id)
  );

  const category = categories.find(c => c.id === keywordData.category);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 mb-6 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to trends</span>
        </button>

        {/* Keyword Header */}
        <div className="bg-gradient-to-r from-primary-500 to-primary-700 rounded-lg p-8 mb-8 text-white">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{keywordData.text}</h1>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Category:</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    {category?.name || 'Unknown'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">Relevance Score:</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    {keywordData.value}/100
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Geographic Coverage */}
          <div className="mt-6 pt-6 border-t border-white/20">
            <h3 className="font-semibold mb-3 flex items-center gap-2">
              <FiMapPin className="w-5 h-5" />
              Geographic Coverage
            </h3>
            <div className="flex flex-wrap gap-2">
              {keywordData.continents.map(continent => (
                <span
                  key={continent}
                  className="bg-white/20 px-3 py-1 rounded-full text-sm capitalize"
                >
                  {continent.replace('-', ' ')}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            Related Articles & Insights
          </h2>

          {relatedArticles.length === 0 ? (
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-8 text-center">
              <p className="text-slate-600 dark:text-slate-400">
                No articles found for this keyword.
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {relatedArticles.map(article => (
                <article
                  key={article.id}
                  className="bg-white dark:bg-slate-800 rounded-lg shadow-md hover:shadow-xl transition-shadow p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-slate-100 mb-3">
                        {article.title}
                      </h3>

                      <p className="text-slate-700 dark:text-slate-300 mb-4 leading-relaxed">
                        {article.summary}
                      </p>

                      {/* Article Meta */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="w-4 h-4" />
                          <span>{new Date(article.publishedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <FiMapPin className="w-4 h-4" />
                          <span>{article.region}</span>
                        </div>
                      </div>

                      {/* Keywords */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        {article.keywords.slice(0, 5).map(kw => (
                          <span
                            key={kw}
                            className="bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-3 py-1 rounded-full text-xs"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>

                      {/* Source & Link */}
                      <div className="flex items-center justify-between pt-4 border-t border-slate-200 dark:border-slate-700">
                        <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
                          Source: {article.source}
                        </span>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-primary-600 hover:text-primary-700 font-medium transition-colors"
                        >
                          Read full article
                          <FiExternalLink className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>

        {/* Related Keywords */}
        <div className="mt-12 bg-slate-50 dark:bg-slate-800/50 rounded-lg p-6">
          <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Explore Related Trends
          </h3>
          <div className="flex flex-wrap gap-2">
            {keywords
              .filter(k =>
                k.category === keywordData.category &&
                k.text !== keywordData.text
              )
              .slice(0, 10)
              .map(relatedKeyword => (
                <Link
                  key={relatedKeyword.text}
                  to={`/keyword/${encodeURIComponent(relatedKeyword.text)}`}
                  className="bg-white dark:bg-slate-700 text-slate-700 dark:text-slate-300 px-4 py-2 rounded-lg
                           hover:bg-primary-500 hover:text-white transition-all duration-200 font-medium"
                >
                  {relatedKeyword.text}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
