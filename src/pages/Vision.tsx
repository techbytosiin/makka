import PageHeader from '../components/ui/PageHeader';
import { motion } from 'motion/react';
import { Eye, Globe, Rocket, Monitor } from 'lucide-react';

export default function Vision() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader 
        title="Our Vision" 
        subtitle="Where we see our institution and our students in the future."
      />

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Eye size={64} className="text-secondary mx-auto mb-8" />
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8 leading-tight">
              To be a world-class educational institution universally recognized for excellence in academics, character development, and innovation.
            </h2>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-main mb-4">Our Future Goals</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Globe size={32} />, 
                title: 'Global Competitiveness', 
                desc: 'Equipping our students with the skills, knowledge, and perspectives required to excel anywhere in the world.' 
              },
              { 
                icon: <Monitor size={32} />, 
                title: 'Technological Innovation', 
                desc: 'Remaining at the cutting edge of educational technology to enhance learning outcomes and prepare students for the digital age.' 
              },
              { 
                icon: <Rocket size={32} />, 
                title: 'Community Impact', 
                desc: 'Building a generation of socially responsible individuals who actively contribute to the development of their local and global communities.' 
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="w-16 h-16 bg-bg-light text-primary rounded-xl flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold text-text-main mb-4">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
