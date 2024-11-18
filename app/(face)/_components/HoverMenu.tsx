'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';


export const HoverMenu = ({ children, isVisible }: { children: React.ReactNode; isVisible: boolean }) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="min-w-40 p-1 absolute border rounded-md bg-background end-0 top-[110%] shadow-lg"
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};
