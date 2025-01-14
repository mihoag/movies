'use client';

import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

interface StarRatingProps {
  onRate?: (rating: number) => void;
  initialRating?: number | null;
}

export function StarRating({ onRate, initialRating = null }: StarRatingProps) {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);
  const [rating, setRating] = useState<number | null>(initialRating);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (!isHovering) {
      setHoveredStar(null);
    }
  }, [isHovering]);

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    if (!isHovering) return;

    const container = event.currentTarget;
    const { left, width } = container.getBoundingClientRect();
    const percent = (event.clientX - left) / width;
    const star = Math.ceil(percent * 10) / 2; // Round to nearest 0.5
    setHoveredStar(Math.max(0.5, Math.min(5, star)));
  };

  const handleClick = () => {
    if (hoveredStar !== null) {
      setRating(hoveredStar);
      onRate?.(hoveredStar * 2);
    }
  };

  return (
    <div
      className="flex gap-1 p-2"
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onMouseMove={handleMouseMove}
      onClick={handleClick}
    >
      {[1, 2, 3, 4, 5].map((star) => (
        <motion.div
          key={star}
          className="relative w-6 h-6"
          whileHover={{ scale: 1.1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 10 }}
        >
          <Star className="w-6 h-6 text-gray-400" />
          <div
            className="absolute top-0 left-0 overflow-hidden pointer-events-none"
            style={{
              width: `${Math.max(0, Math.min(100, ((isHovering ? hoveredStar : rating) || 0) - (star - 1)) * 100)}%`,
            }}
          >
            <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
