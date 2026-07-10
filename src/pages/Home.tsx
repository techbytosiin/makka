import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { BookOpen, Users, Award, Shield, ArrowRight, Monitor, Heart, Star, ChevronRight } from 'lucide-react';

const stats = [
  { value: '500+', label: 'Students' },
  { value: '50+', label: 'Teachers' },
  { value: '20+', label: 'Years of Excellence' },
  { value: '100%', label: 'Examination Success' },
];

const features = [
  { icon: <Users size={32} />, title: 'Experienced Teachers', description: 'Our faculty consists of highly qualified professionals dedicated to student success.' },
  { icon: <Monitor size={32} />, title: 'Modern Classrooms', description: 'Equipped with the latest technology to facilitate interactive and engaging learning.' },
  { icon: <Heart size={32} />, title: 'Moral Excellence', description: 'We focus on character building and instilling strong moral values in our students.' },
  { icon: <BookOpen size={32} />, title: 'ICT Education', description: 'Comprehensive digital literacy programs to prepare students for the future.' },
  { icon: <Shield size={32} />, title: 'Safe Environment', description: 'A secure and nurturing campus where every child feels safe to explore and grow.' },
  { icon: <Award size={32} />, title: 'Academic Excellence', description: 'Consistently outstanding results in national and international examinations.' },
];

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section 
        className="relative h-screen flex items-center justify-center overflow-hidden bg-primary"
        style={{ 
          backgroundImage: 'linear-gradient(rgba(13, 71, 161, 0.85), rgba(13, 71, 161, 0.95)), url("https://i.ibb.co/W4K6Fnd0/d32b124d6110e159fd388871de0bfe06.jpg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed'
        }}
      >
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 z-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary rounded-full mix-blend-screen filter blur-3xl animate-blob"></div>
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-accent rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-96 h-96 bg-white rounded-full mix-blend-screen filter blur-3xl animate-blob animation-delay-4000"></div>
        </div>
        
        <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
          <motion.span 
            className="inline-block py-1 px-3 rounded-full bg-white/10 text-white backdrop-blur-sm border border-white/20 text-sm font-medium mb-6 uppercase tracking-wider"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Welcome to Excel
          </motion.span>
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Raising Future Leaders Through <span className="text-secondary">Excellence</span>
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl text-blue-100 mb-10 max-w-3xl mx-auto font-light"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            A premium educational institution in Benin City, dedicated to nurturing academic brilliance and strong moral character.
          </motion.p>
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link 
              to="/admissions" 
              className="w-full sm:w-auto px-8 py-4 bg-secondary text-text-main font-semibold rounded-full hover:bg-secondary/90 hover:scale-105 hover:shadow-lg hover:shadow-secondary/20 transition-all duration-300 flex items-center justify-center gap-2"
            >
              Apply Now <ArrowRight size={20} />
            </Link>
            <Link 
              to="/contact" 
              className="w-full sm:w-auto px-8 py-4 bg-white/10 text-white font-semibold rounded-full hover:bg-white/20 backdrop-blur-sm border border-white/20 transition-all duration-300"
            >
              Contact Us
            </Link>
          </motion.div>
        </div>
        
        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
            <div className="w-1.5 h-1.5 bg-white rounded-full"></div>
          </div>
        </motion.div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                className="text-center p-6 rounded-2xl bg-bg-light hover:shadow-md transition-shadow"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <h3 className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</h3>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-24 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">Why Choose <span className="text-primary">Excel</span></h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We provide a holistic educational experience that prepares students for global challenges.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div 
                key={index}
                className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 border border-gray-50 group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="w-16 h-16 bg-primary/5 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-text-main mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Principal's Welcome */}
      <section className="py-24 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <motion.div 
              className="lg:w-1/2 relative"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-2xl aspect-[4/5] bg-gray-100">
                {/* Image Placeholder */}
                <div className="absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-200">
                  <span className="font-medium text-lg">Principal's Portrait</span>
                </div>
              </div>
              {/* Decorative elements */}
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-secondary/20 rounded-full blur-2xl z-0"></div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-primary/20 rounded-full blur-3xl z-0"></div>
            </motion.div>
            
            <motion.div 
              className="lg:w-1/2"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-text-main mb-4">Welcome to Excel</h2>
              <h3 className="text-xl text-primary font-medium mb-6">From the Principal's Desk</h3>
              <div className="space-y-4 text-gray-600 text-lg leading-relaxed mb-8">
                <p>
                  Welcome to Excel International School, a place where potential is recognized, nurtured, and celebrated. For over two decades, we have been at the forefront of providing quality education in Benin City.
                </p>
                <p>
                  Our commitment is not just to academic excellence, but to the holistic development of every child that walks through our gates. We believe that true education builds character, instills leadership qualities, and prepares students to be responsible global citizens.
                </p>
              </div>
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 text-primary font-semibold hover:text-secondary transition-colors"
              >
                Read Full Message <ChevronRight size={20} />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-primary text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Community Says</h2>
            <div className="w-24 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { role: 'Parent', quote: 'The transformation in my child since joining Excel has been remarkable. The teachers genuinely care about their academic and moral development.', author: 'Mrs. Osaigbovo' },
              { role: 'Alumni', quote: 'Excel provided me with the foundation I needed to succeed in the university. The ICT training was particularly ahead of its time.', author: 'Dr. Ehis' },
              { role: 'Student', quote: 'I love my school because the learning environment is fun, and the teachers make complex subjects easy to understand.', author: 'Osamudiamen' }
            ].map((testimonial, index) => (
              <motion.div 
                key={index}
                className="bg-white/10 p-8 rounded-2xl backdrop-blur-sm border border-white/10 relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Star className="text-secondary mb-6" size={32} />
                <p className="text-lg leading-relaxed mb-6 font-light italic">"{testimonial.quote}"</p>
                <div>
                  <h4 className="font-bold text-lg">{testimonial.author}</h4>
                  <p className="text-blue-200 text-sm">{testimonial.role}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
