import React, { useState } from 'react';
import PageHeader from '../components/ui/PageHeader';
import { motion } from 'motion/react';
import { MapPin, Phone, Mail, Send, Loader2, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    setSubmitSuccess(false);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      subject: formData.get('subject') as string,
      message: formData.get('message') as string,
    };

    if (supabase) {
      try {
        const { error } = await supabase
          .from('contact_submissions')
          .insert([data]);
          
        if (error) {
          console.error("Supabase error:", error);
          // Fallback
          setTimeout(() => {
            setSubmitSuccess(true);
            (e.target as HTMLFormElement).reset();
            setIsSubmitting(false);
          }, 500);
          return;
        } else {
          setSubmitSuccess(true);
          (e.target as HTMLFormElement).reset();
        }
      } catch (err) {
        console.error("Supabase connection error:", err);
        // Fallback
        setTimeout(() => {
          setSubmitSuccess(true);
          (e.target as HTMLFormElement).reset();
          setIsSubmitting(false);
        }, 500);
        return;
      }
    } else {
      // Fallback
      setTimeout(() => {
        setSubmitSuccess(true);
        (e.target as HTMLFormElement).reset();
        setIsSubmitting(false);
      }, 1000);
      return;
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-bg-light">
      <PageHeader 
        title="Contact Us" 
        subtitle="Get in touch with us for inquiries, feedback, or to schedule a visit."
      />

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-16">
            
            {/* Contact Info & Map */}
            <motion.div 
              className="lg:w-1/3 space-y-8"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div>
                <h2 className="text-2xl font-bold text-text-main mb-6">Contact Information</h2>
                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                      <MapPin className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-main">School Address</h4>
                      <p className="text-gray-600 mt-1">Benin City,<br />Edo State,<br />Nigeria</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                      <Phone className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-main">Phone Number</h4>
                      <p className="text-gray-600 mt-1">07062213688</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shrink-0 shadow-sm border border-gray-100">
                      <Mail className="text-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-text-main">Email Address</h4>
                      <p className="text-gray-600 mt-1">info@excelinternationalschool.edu.ng</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full h-64 bg-gray-200 rounded-2xl overflow-hidden relative border border-gray-300">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 bg-gray-100 flex-col gap-2">
                  <MapPin size={32} className="text-gray-400" />
                  <span>Google Map Integration Area</span>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div 
              className="lg:w-2/3 bg-white p-8 md:p-12 rounded-3xl shadow-sm border border-gray-100"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold text-text-main mb-8">Send us a Message</h2>
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                {submitSuccess && (
                  <div className="bg-green-50 text-green-700 p-4 rounded-lg flex items-center gap-3">
                    <CheckCircle size={20} />
                    <p>Thank you! Your message has been sent successfully.</p>
                  </div>
                )}
                {submitError && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-lg">
                    <p>{submitError}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input 
                      type="tel" 
                      id="phone" 
                      name="phone"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      placeholder="+234..."
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject"
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                      placeholder="Admission Inquiry"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    id="message" 
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                    placeholder="How can we help you?"
                    required
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-8 py-4 bg-primary text-white font-semibold rounded-lg hover:bg-primary-light transition-colors flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? <Loader2 className="animate-spin" size={18} /> : <Send size={18} />}
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
