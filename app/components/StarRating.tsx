import React from 'react';

interface StarRatingProps {
  rating: number;
  ratingCount: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, ratingCount }) => {
  const MAX_STARS = 5;
  const filledStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = MAX_STARS - filledStars - (hasHalfStar ? 1 : 0);
  
  return (
    <div className="flex items-center">
      {/* Filled Stars */}
      {Array(filledStars)
        .fill(0)
        .map((_, i) => (
          <svg
            key={`filled-${i}`}
            className="w-4 h-4 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927C9.27 2.362 9.73 2 10.302 2c.572 0 1.032.362 1.253.927l1.908 4.79 5.193.8c.598.092 1.109.51 1.257 1.092.149.583-.062 1.194-.547 1.56l-3.825 3.07 1.084 5.14c.112.53-.105 1.079-.574 1.403-.47.324-1.1.356-1.609.086L10 17.347l-4.442 2.435c-.51.27-1.139.238-1.609-.086-.469-.324-.686-.873-.574-1.403l1.084-5.14-3.825-3.07c-.484-.366-.696-.977-.547-1.56.148-.582.659-1 .257-1.092l5.193-.8 1.908-4.79z"></path>
          </svg>
        ))}

      {/* Half Star */}
      {hasHalfStar && (
        <div className="relative">
          <svg
            className="w-4 h-4 text-yellow-500 absolute"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <linearGradient id="half-gradient">
                <stop offset="50%" stopColor="currentColor" />
                <stop offset="50%" stopColor="transparent" />
              </linearGradient>
            </defs>
            <path
              fill="url(#half-gradient)"
              d="M9.049 2.927C9.27 2.362 9.73 2 10.302 2c.572 0 1.032.362 1.253.927l1.908 4.79 5.193.8c.598.092 1.109.51 1.257 1.092.149.583-.062 1.194-.547 1.56l-3.825 3.07 1.084 5.14c.112.53-.105 1.079-.574 1.403-.47.324-1.1.356-1.609.086L10 17.347l-4.442 2.435c-.51.27-1.139.238-1.609-.086-.469-.324-.686-.873-.574-1.403l1.084-5.14-3.825-3.07c-.484-.366-.696-.977-.547-1.56.148-.582.659-1 .257-1.092l5.193-.8 1.908-4.79z"
            ></path>
          </svg>
          <svg
            className="w-4 h-4 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927C9.27 2.362 9.73 2 10.302 2c.572 0 1.032.362 1.253.927l1.908 4.79 5.193.8c.598.092 1.109.51 1.257 1.092.149.583-.062 1.194-.547 1.56l-3.825 3.07 1.084 5.14c.112.53-.105 1.079-.574 1.403-.47.324-1.1.356-1.609.086L10 17.347l-4.442 2.435c-.51.27-1.139.238-1.609-.086-.469-.324-.686-.873-.574-1.403l1.084-5.14-3.825-3.07c-.484-.366-.696-.977-.547-1.56.148-.582.659-1 .257-1.092l5.193-.8 1.908-4.79z"></path>
          </svg>
        </div>
      )}

      {/* Empty Stars */}
      {Array(emptyStars)
        .fill(0)
        .map((_, i) => (
          <svg
            key={`empty-${i}`}
            className="w-4 h-4 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9.049 2.927C9.27 2.362 9.73 2 10.302 2c.572 0 1.032.362 1.253.927l1.908 4.79 5.193.8c.598.092 1.109.51 1.257 1.092.149.583-.062 1.194-.547 1.56l-3.825 3.07 1.084 5.14c.112.53-.105 1.079-.574 1.403-.47.324-1.1.356-1.609.086L10 17.347l-4.442 2.435c-.51.27-1.139.238-1.609-.086-.469-.324-.686-.873-.574-1.403l1.084-5.14-3.825-3.07c-.484-.366-.696-.977-.547-1.56.148-.582.659-1 .257-1.092l5.193-.8 1.908-4.79z"></path>
          </svg>
        ))}

      {/* Rating Count */}
      <p className="prose prose-sm text-gray-500 mx-2">{rating} <span className="mx-1">({ratingCount})</span></p>
    </div>
  );
};

export default StarRating;
