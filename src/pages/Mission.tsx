import PageHeader from '../components/ui/PageHeader';
import { motion } from 'motion/react';
import { Target, Heart, Lightbulb, Users } from 'lucide-react';

export default function Mission() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader 
        title="Our Mission" 
        subtitle="The purpose that drives our daily commitment to our students and community."
      />

      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Target size={64} className="text-secondary mx-auto mb-8" />
            <h2 className="text-3xl md:text-5xl font-bold text-primary mb-8 leading-tight">
              To provide qualitative education that nurtures the intellect, character, and skills of our students, preparing them to be responsible leaders and innovators.
            </h2>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-main mb-4">How We Achieve This</h2>
            <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Lightbulb size={32} />, 
                title: 'Educational Philosophy', 
                desc: 'A student-centered approach that encourages critical thinking, creativity, and a lifelong love for learning over rote memorization.' 
              },
              { 
                icon: <Heart size={32} />, 
                title: 'Character Building', 
                desc: 'Integrating moral education into our daily curriculum to instill values of empathy, discipline, and integrity.' 
              },
              { 
                icon: <Users size={32} />, 
                title: 'Leadership Development', 
                desc: 'Providing platforms and opportunities for students to take initiative, solve problems, and lead among their peers.' 
              }
            ].map((item, idx) => (
              <motion.div 
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="w-16 h-16 bg-bg-light text-primary rounded-full flex items-center justify-center mx-auto mb-6">
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
