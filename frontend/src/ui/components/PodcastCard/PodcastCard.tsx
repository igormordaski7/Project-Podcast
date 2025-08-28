import React from "react";
import "./PodcastCard.css";

interface PodcastCardProps {
  episode: string;
  title: string;
  description: string;
}

const PodcastCard: React.FC<PodcastCardProps> = ({ episode, title, description }) => {
  return (
    <div className="e-card playing">
      <div className="image"></div>
      <div className="wave"></div>
      <div className="wave"></div>
      <div className="wave"></div>

      <div className="infotop">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          className="icon"
        >
          <path
            fill="currentColor"
            d="M19.4133 4.89862L14.5863 2.17544C12.9911 1.27485 11.0089 1.27485 9.41368 2.17544L4.58674
            4.89862C2.99153 5.7992 2 7.47596 2 9.2763V14.7235C2 16.5238 2.99153 18.2014 4.58674 19.1012L9.41368
            21.8252C10.2079 22.2734 11.105 22.5 12.0046 22.5C12.6952 22.5 13.3874 22.3657 14.0349 22.0954C14.2204
            22.018 14.4059 21.9273 14.5872 21.8252L19.4141 19.1012C19.9765 18.7831 20.4655 18.3728 20.8651
            17.8825C21.597 16.9894 22 15.8671 22 14.7243V9.27713C22 7.47678 21.0085 5.7992 19.4133 4.89862Z"
          />
        </svg>
        <br />
        {episode}
        <br />
        <div className="name">{title}</div>
        <div style={{ fontSize: "12px", marginTop: "6px" }}>{description}</div>
      </div>
    </div>
  );
};

export default PodcastCard;