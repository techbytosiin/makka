import { motion } from 'motion/react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div className="relative bg-primary pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full mix-blend-overlay filter blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-secondary rounded-full mix-blend-overlay filter blur-3xl"></div>
      </div>
      
      <div className="relative max-w-7xl mx-auto text-center z-10">
        <motion.h1 
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p 
            className="text-lg md:text-xl text-blue-100 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </div>
  );
}
