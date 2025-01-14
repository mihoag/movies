'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface BiographyProps {
  name: string;
  biography: string;
}

export function Biography({ name, biography }: BiographyProps) {
  const [showFullBio, setShowFullBio] = useState(false);

  return (
    <div className="relative">
      <h1 className="text-3xl font-bold text-[#000000]">{name}</h1>
      <h2 className="text-2xl font-semibold mb-2 mt-7">Biography</h2>
      <div className="relative">
        <AnimatePresence initial={false}>
          <motion.div
            key={showFullBio ? 'full' : 'truncated'}
            initial={{ opacity: 0, height: 0 }}
            animate={{
              opacity: 1,
              height: 'auto',
              transition: {
                height: { duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] },
                opacity: { duration: 0.3, delay: 0.1 },
              },
            }}
            exit={{
              opacity: 0,
              height: 0,
              transition: {
                height: { duration: 0.3, ease: [0.04, 0.62, 0.23, 0.98] },
                opacity: { duration: 0.2 },
              },
            }}
          >
            <div className={`relative ${!showFullBio ? 'max-h-[100px] overflow-hidden' : ''}`}>
              <motion.p
                className="text-[#4a4a4a] text-base leading-relaxed text-justify"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {biography}
              </motion.p>
              {!showFullBio && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
          </motion.div>
        </AnimatePresence>
        <motion.button
          className="mt-2 text-[#01B4E4] hover:text-[#0093C4] transition-colors duration-200 text-base flex items-center gap-1"
          onClick={() => setShowFullBio(!showFullBio)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {showFullBio ? 'Show Less' : 'Read More'}
          <motion.span
            initial={{ x: 0 }}
            animate={{ x: showFullBio ? -3 : 3 }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 20,
            }}
          >
            {showFullBio ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </motion.span>
        </motion.button>
      </div>
    </div>
  );
}
