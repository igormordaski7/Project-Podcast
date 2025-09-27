import React from 'react';

interface NewsItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
}

interface NewsCardProps {
  item: NewsItem;
}

const NewsCard: React.FC<NewsCardProps> = ({ item }) => {
  return (
    <div className="card news-card">
      <img src={item.imageUrl} alt={item.title} />
      <h3>{item.title}</h3>
      <h4>{item.subtitle}</h4>
      <p>{item.description}</p>
    </div>
  );
};

export default NewsCard;
