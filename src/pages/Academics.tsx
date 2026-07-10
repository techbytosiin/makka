import PageHeader from '../components/ui/PageHeader';
import { motion } from 'motion/react';
import { BookOpen, Monitor, Beaker, Trophy, ChevronRight } from 'lucide-react';

export default function Academics() {
  const levels = [
    {
      title: 'Nursery School',
      description: 'A nurturing environment where early learning happens through play, exploration, and structured foundational activities. We focus on cognitive, social, and emotional development.',
      color: 'bg-accent/10',
      textColor: 'text-accent'
    },
    {
      title: 'Primary School',
      description: 'Building a strong academic foundation in core subjects while encouraging curiosity. Our primary curriculum integrates modern teaching methods with strong moral instruction.',
      color: 'bg-primary/10',
      textColor: 'text-primary'
    },
    {
      title: 'Secondary School',
      description: 'Preparing students for advanced studies and global examinations. A rigorous curriculum combined with leadership opportunities, career guidance, and specialized subjects.',
      color: 'bg-secondary/10',
      textColor: 'text-yellow-600'
    }
  ];

  const facilities = [
    { icon: <Monitor size={32} />, title: 'ICT Center', desc: 'State-of-the-art computer labs with high-speed internet and modern software for digital literacy and coding.' },
    { icon: <Beaker size={32} />, title: 'Science Laboratories', desc: 'Fully equipped Physics, Chemistry, and Biology labs to facilitate practical scientific learning and experiments.' },
    { icon: <BookOpen size={32} />, title: 'Library', desc: 'A vast collection of physical and digital resources to encourage reading and independent research.' },
    { icon: <Trophy size={32} />, title: 'Sports Facilities', desc: 'Expansive grounds for football, basketball, and athletics to promote physical health and teamwork.' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader 
        title="Academics" 
        subtitle="Comprehensive educational programs designed to foster intellectual growth and practical skills."
      />

      {/* Educational Levels */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {levels.map((level, idx) => (
              <motion.div 
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className={`w-16 h-16 ${level.color} ${level.textColor} rounded-2xl flex items-center justify-center mb-6`}>
                  <BookOpen size={28} />
                </div>
                <h3 className="text-2xl font-bold text-text-main mb-4">{level.title}</h3>
                <p className="text-gray-600 leading-relaxed mb-6">{level.description}</p>
                <button className={`flex items-center font-medium ${level.textColor} hover:opacity-80 transition-opacity`}>
                  Learn more <ChevronRight size={16} className="ml-1" />
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Curriculum & Facilities */}
      <section className="py-24 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-main mb-4">Our Facilities</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We provide an enriching environment equipped with the tools necessary for modern education.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {facilities.map((facility, idx) => (
              <motion.div 
                key={idx}
                className="bg-white p-6 rounded-2xl flex gap-6 items-start shadow-sm hover:shadow-md transition-shadow"
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <div className="w-14 h-14 bg-primary/5 text-primary rounded-xl flex items-center justify-center shrink-0">
                  {facility.icon}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-text-main mb-2">{facility.title}</h4>
                  <p className="text-gray-600">{facility.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Extracurricular */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Extracurricular Activities</h2>
            <p className="text-blue-100 text-lg max-w-3xl mx-auto leading-relaxed mb-10">
              Education at Excel goes beyond academics. We offer a vibrant array of clubs, sports, and creative arts programs designed to discover hidden talents, build confidence, and encourage teamwork among our students.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {['Debate Club', 'JETS Club', 'Drama & Arts', 'Music Club', 'Chess Club', 'Coding Club'].map((club, idx) => (
                <span key={idx} className="px-6 py-3 bg-white/10 rounded-full border border-white/20 backdrop-blur-sm">
                  {club}
                </span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
