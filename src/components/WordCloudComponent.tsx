import { useNavigate } from 'react-router-dom';
import { TagCloud } from 'react-tagcloud';
import type { Keyword } from '../types';

interface WordCloudComponentProps {
  keywords: Keyword[];
}

export default function WordCloudComponent({ keywords }: WordCloudComponentProps) {
  const navigate = useNavigate();

  const data = keywords.map(keyword => ({
    value: keyword.text,
    count: keyword.value,
  }));

  const customRenderer = (tag: any, size: number, color: string) => (
    <span
      key={tag.value}
      style={{
        fontSize: `${size}px`,
        margin: '8px',
        padding: '4px 8px',
        display: 'inline-block',
        color: color,
        cursor: 'pointer',
        transition: 'all 0.3s ease',
        borderRadius: '6px',
      }}
      className="hover:bg-primary-100 dark:hover:bg-primary-900/30 word-cloud-item"
      onClick={() => navigate(`/keyword/${encodeURIComponent(tag.value)}`)}
    >
      {tag.value}
    </span>
  );

  return (
    <div className="w-full flex items-center justify-center py-8 px-4">
      <TagCloud
        minSize={14}
        maxSize={48}
        tags={data}
        colorOptions={{
          luminosity: 'dark',
          hue: 'blue',
        }}
        renderer={customRenderer}
        shuffle={false}
      />
    </div>
  );
}
