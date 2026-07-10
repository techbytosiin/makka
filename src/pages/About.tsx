import PageHeader from '../components/ui/PageHeader';
import { motion } from 'motion/react';
import { Target, Flag, Shield, BookOpen, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader 
        title="About Us" 
        subtitle="Discover our history, philosophy, and the core values that drive our commitment to excellence."
      />

      {/* History Section */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <motion.div 
              className="lg:w-1/2 space-y-6"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-main">Our History</h2>
              <div className="w-20 h-1 bg-secondary rounded-full"></div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Founded with a vision to redefine educational standards in Benin City, Excel International School has grown from a modest beginning into a premier institution of learning.
              </p>
              <p className="text-gray-600 text-lg leading-relaxed">
                Over the past two decades, we have consistently maintained a tradition of academic excellence, moral integrity, and holistic student development, earning the trust of parents and the respect of the educational community.
              </p>
            </motion.div>
            <motion.div 
              className="lg:w-1/2 w-full h-[400px] bg-bg-light rounded-2xl flex items-center justify-center border border-gray-100 shadow-inner relative overflow-hidden"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="absolute inset-0 bg-primary/5"></div>
              <BookOpen size={64} className="text-primary/20" />
              <span className="absolute bottom-4 right-4 text-sm font-medium text-gray-400">School Campus Placeholder</span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Philosophy & Environment */}
      <section className="py-24 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <motion.div 
              className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="w-14 h-14 bg-accent/10 text-accent rounded-xl flex items-center justify-center mb-6">
                <Target size={28} />
              </div>
              <h3 className="text-2xl font-bold text-text-main mb-4">Our Philosophy</h3>
              <p className="text-gray-600 leading-relaxed">
                We believe that every child is unique and possesses infinite potential. Our role as educators is to provide the right environment, tools, and guidance to help them discover and maximize this potential. Education here goes beyond the classroom; it encompasses character, leadership, and social responsibility.
              </p>
            </motion.div>

            <motion.div 
              className="bg-white p-10 rounded-2xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <div className="w-14 h-14 bg-success/10 text-success rounded-xl flex items-center justify-center mb-6">
                <Flag size={28} />
              </div>
              <h3 className="text-2xl font-bold text-text-main mb-4">Learning Environment</h3>
              <p className="text-gray-600 leading-relaxed">
                Our campus is designed to be a safe, stimulating, and inclusive space. We maintain modern facilities, well-equipped laboratories, a rich library, and expansive sports grounds to ensure our students have access to everything they need for a well-rounded educational experience.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">Our Core Values</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              The principles that guide our interactions, decisions, and educational approach.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: <Shield />, title: 'Integrity', desc: 'Doing the right thing, even when no one is watching.' },
              { icon: <Target />, title: 'Excellence', desc: 'Striving for the highest quality in all our endeavors.' },
              { icon: <Users />, title: 'Respect', desc: 'Valuing diversity and treating everyone with dignity.' },
            ].map((value, idx) => (
              <motion.div 
                key={idx}
                className="text-center p-8 rounded-2xl hover:bg-bg-light transition-colors duration-300"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <div className="w-20 h-20 mx-auto bg-primary text-white rounded-full flex items-center justify-center mb-6 shadow-lg shadow-primary/20">
                  {value.icon}
                </div>
                <h4 className="text-xl font-bold text-text-main mb-3">{value.title}</h4>
                <p className="text-gray-600">{value.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
