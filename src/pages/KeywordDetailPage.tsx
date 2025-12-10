import { useParams, Link, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiExternalLink, FiCalendar, FiMapPin } from 'react-icons/fi';
import { useTranslation } from 'react-i18next';
import { keywords, articles, categories } from '../data/mockData';

export default function KeywordDetailPage() {
  const { t, i18n } = useTranslation();
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
          <h2 className="text-2xl font-bold text-slate-800 mb-4">
            Keyword not found
          </h2>
          <Link
            to="/"
            className="text-sky-600 hover:text-sky-700 flex items-center justify-center gap-2"
          >
            <FiArrowLeft /> {t('detail.back')}
          </Link>
        </div>
      </div>
    );
  }

  const relatedArticles = articles
    .filter(article => keywordData.articles.includes(article.id))
    .slice(0, 10); // Limit to top 10 articles

  const category = categories.find(c => c.id === keywordData.category);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-sky-600 hover:text-sky-700 mb-6 transition-colors"
        >
          <FiArrowLeft className="w-5 h-5" />
          <span className="font-medium">{t('detail.back')}</span>
        </button>

        {/* Keyword Header */}
        <div className="bg-gradient-to-r from-sky-500 via-blue-600 to-indigo-600 rounded-lg p-8 mb-8 text-white shadow-xl border-2 border-sky-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{keywordData.text}</h1>
              <div className="flex flex-wrap gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{t('detail.category')}:</span>
                  <span className="bg-white/20 px-3 py-1 rounded-full">
                    {category ? t(`categories.${category.id}`) : 'Unknown'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{t('detail.relevance')}:</span>
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
              {t('detail.geographic')}
            </h3>
            <div className="flex flex-wrap gap-2">
              {keywordData.continents.map(continent => (
                <span
                  key={continent}
                  className="bg-white/20 px-3 py-1 rounded-full text-sm"
                >
                  {t(`continents.${continent}`)}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Articles Section */}
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-slate-800 mb-6">
            {t('detail.related_articles')} {relatedArticles.length > 0 && `(Top ${relatedArticles.length})`}
          </h2>

          {relatedArticles.length === 0 ? (
            <div className="bg-white rounded-lg shadow-lg border-2 border-sky-100 p-8 text-center">
              <p className="text-slate-600">
                {t('detail.no_articles')}
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {relatedArticles.map(article => (
                <article
                  key={article.id}
                  className="bg-white rounded-lg shadow-lg border-2 border-sky-100 hover:shadow-xl hover:border-sky-300 transition-all p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl md:text-2xl font-bold text-slate-800 mb-3">
                        {article.title}
                      </h3>

                      <p className="text-slate-700 mb-4 leading-relaxed">
                        {article.summary}
                      </p>

                      {/* Article Meta */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600 mb-4">
                        <div className="flex items-center gap-2">
                          <FiCalendar className="w-4 h-4" />
                          <span>{new Date(article.publishedAt).toLocaleDateString(i18n.language, {
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
                            className="bg-sky-50 text-sky-700 px-3 py-1 rounded-full text-xs border border-sky-200"
                          >
                            {kw}
                          </span>
                        ))}
                      </div>

                      {/* Source & Link */}
                      <div className="flex items-center justify-between pt-4 border-t border-sky-200">
                        <span className="text-sm font-semibold text-slate-600">
                          {t('detail.source')}: {article.source}
                        </span>
                        <a
                          href={article.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 text-sky-600 hover:text-sky-700 font-medium transition-colors"
                        >
                          {t('detail.read_full')}
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
        <div className="mt-12 bg-sky-50 rounded-lg p-6 border-2 border-sky-100">
          <h3 className="text-xl font-bold text-slate-800 mb-4">
            {t('detail.explore_related')}
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
                  className="bg-white text-slate-700 px-4 py-2 rounded-lg border-2 border-sky-200
                           hover:bg-gradient-to-r hover:from-sky-500 hover:to-blue-600 hover:text-white hover:border-sky-500 transition-all duration-200 font-medium shadow-sm"
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
