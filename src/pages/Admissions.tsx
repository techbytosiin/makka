import PageHeader from '../components/ui/PageHeader';
import { motion } from 'motion/react';
import { CheckCircle, FileText, Calendar, CreditCard, ChevronDown, ChevronUp } from 'lucide-react';
import { useState } from 'react';

const faqs = [
  {
    q: 'When do admissions open?',
    a: 'Admissions are open year-round, but formal entrance examinations are typically held between March and July for the academic year starting in September.'
  },
  {
    q: 'What is the age requirement for Nursery?',
    a: 'Children should be at least 3 years old by September of the admission year to be enrolled in our Nursery 1 class.'
  },
  {
    q: 'Are there boarding facilities available?',
    a: 'Currently, Excel International School operates exclusively as a day school to ensure parents remain actively involved in their child\'s daily development.'
  },
  {
    q: 'How can I pay school fees?',
    a: 'School fees can be paid via bank transfer to the school\'s designated accounts, or via bank draft. We do not accept cash payments for security reasons.'
  }
];

export default function Admissions() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const steps = [
    { icon: <FileText size={24} />, title: 'Obtain Form', desc: 'Purchase the admission form from the school administrative office or download it online.' },
    { icon: <Calendar size={24} />, title: 'Entrance Exam', desc: 'Candidates will sit for a standard entrance examination covering Mathematics, English, and General Knowledge.' },
    { icon: <CheckCircle size={24} />, title: 'Interview', desc: 'Successful candidates and their parents will be invited for a brief interview with the Principal.' },
    { icon: <CreditCard size={24} />, title: 'Registration', desc: 'Upon receiving an admission letter, proceed to pay the acceptance fee and complete registration.' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-white">
      <PageHeader 
        title="Admissions" 
        subtitle="Join the Excel family. Find out about our requirements and application process."
      />

      {/* Admission Process */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-text-main mb-4">Application Procedure</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, idx) => (
              <motion.div 
                key={idx}
                className="relative bg-bg-light p-8 rounded-2xl text-center group hover:bg-primary hover:text-white transition-colors duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                {/* Connecting Line */}
                {idx < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-300 z-0"></div>
                )}
                
                <div className="w-16 h-16 bg-white text-primary rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm group-hover:text-primary z-10 relative">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3 group-hover:text-white text-text-main transition-colors">{step.title}</h3>
                <p className="text-gray-600 group-hover:text-blue-100 text-sm leading-relaxed transition-colors">{step.desc}</p>
                
                <div className="absolute top-4 right-4 text-6xl font-bold text-gray-200 opacity-30 group-hover:text-white/10 transition-colors pointer-events-none">
                  {idx + 1}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <button className="px-8 py-4 bg-primary text-white font-semibold rounded-full hover:bg-primary/90 hover:scale-105 transition-all shadow-lg shadow-primary/20">
              Download Application Form
            </button>
          </div>
        </div>
      </section>

      {/* Requirements & Fees */}
      <section className="py-24 bg-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
                <FileText className="text-primary" /> Basic Requirements
              </h3>
              <ul className="space-y-4">
                {[
                  'Completed Application Form',
                  'Two recent passport photographs',
                  'Photocopy of Birth Certificate',
                  'Last academic report from previous school (if applicable)',
                  'Medical report/Immunization records'
                ].map((req, idx) => (
                  <li key={idx} className="flex items-start gap-3 bg-white p-4 rounded-lg shadow-sm border border-gray-50">
                    <CheckCircle className="text-success shrink-0 mt-0.5" size={20} />
                    <span className="text-gray-700">{req}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="text-2xl font-bold text-text-main mb-6 flex items-center gap-3">
                <CreditCard className="text-primary" /> School Fees
              </h3>
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center flex flex-col justify-center h-[calc(100%-3rem)]">
                <p className="text-gray-600 mb-6 text-lg">
                  For detailed information regarding our current fee structure, payment plans, and scholarship opportunities, please contact the administrative office.
                </p>
                <div className="space-y-4">
                  <a href="tel:07062213688" className="inline-block px-6 py-3 bg-bg-light text-text-main font-medium rounded-lg hover:bg-gray-200 transition-colors w-full sm:w-auto">
                    Call: 07062213688
                  </a>
                  <p className="text-sm text-gray-500">or email info@excelinternationalschool.edu.ng</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-text-main mb-4">Frequently Asked Questions</h2>
            <div className="w-20 h-1 bg-secondary mx-auto rounded-full"></div>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div 
                key={idx}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
              >
                <button 
                  className="w-full flex justify-between items-center p-6 text-left focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                >
                  <span className="font-semibold text-text-main pr-8">{faq.q}</span>
                  {openFaq === idx ? (
                    <ChevronUp className="text-primary shrink-0" />
                  ) : (
                    <ChevronDown className="text-gray-400 shrink-0" />
                  )}
                </button>
                
                {/* Simple animation using CSS max-height or Framer Motion */}
                <motion.div 
                  initial={false}
                  animate={{ 
                    height: openFaq === idx ? 'auto' : 0,
                    opacity: openFaq === idx ? 1 : 0
                  }}
                  className="overflow-hidden bg-bg-light"
                >
                  <div className="p-6 pt-0 text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
