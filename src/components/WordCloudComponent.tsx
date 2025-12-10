import { useNavigate } from 'react-router-dom';
import { TagCloud } from 'react-tagcloud';
import type { Keyword } from '../types';

interface WordCloudComponentProps {
  keywords: Keyword[];
}

export default function WordCloudComponent({ keywords }: WordCloudComponentProps) {
  const navigate = useNavigate();

  // Color palette inspired by the reference image
  const colorPalette = [
    '#de0000', // Politico red
    '#ff6b6b', // Light red
    '#ee5a24', // Orange-red
    '#ff9f43', // Orange
    '#333333', // Dark gray
    '#666666', // Medium gray
    '#4a4a4a', // Darker gray
    '#c23616', // Dark red
    '#e84118', // Bright red
  ];

  const data = keywords.map((keyword, index) => ({
    value: keyword.text,
    count: keyword.value,
    color: colorPalette[index % colorPalette.length],
  }));

  const customRenderer = (tag: any, size: number) => {
    const color = data.find(d => d.value === tag.value)?.color || '#333333';

    return (
      <span
        key={tag.value}
        style={{
          fontSize: `${size}px`,
          margin: '12px 10px',
          padding: '2px 6px',
          display: 'inline-block',
          color: color,
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          fontWeight: size > 30 ? '700' : size > 20 ? '600' : '500',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
        }}
        className="hover:opacity-70 word-cloud-item"
        onClick={() => navigate(`/keyword/${encodeURIComponent(tag.value)}`)}
      >
        {tag.value}
      </span>
    );
  };

  return (
    <div className="w-full flex items-center justify-center py-12 px-4">
      <TagCloud
        minSize={16}
        maxSize={56}
        tags={data}
        renderer={customRenderer}
        shuffle={true}
      />
    </div>
  );
}
