import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

interface FeaturedPostCardProps {
  title: string;
  imageUrl: string;
}

export const FeaturedPostCard: React.FC<FeaturedPostCardProps> = ({ title, imageUrl }) => {
  return (
    <motion.div
      className="relative rounded-none overflow-hidden group cursor-pointer shadow-lg"
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
    >
      <video
        src={imageUrl}
        className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-110"
        autoPlay
        loop
        muted
        playsInline
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      <div className="absolute bottom-0 left-0 p-4">
        <h3 className="text-white font-bold text-lg leading-tight">{title}</h3>
        <div className="flex items-center text-primary text-sm font-semibold mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Read More <ArrowRight className="w-4 h-4 ml-1" />
        </div>
      </div>
    </motion.div>
  );
};
