import React from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { ContactForm } from '@/components/forms/ContactForm';

export const ContactFormSection = () => {
  return (
    <motion.div
      className="lg:col-span-1"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
    >
      <div className="p-4 sm:p-6 relative overflow-hidden bg-card rounded-2xl border border-border/50">
        <div className="relative z-10">
          <div className="text-center space-y-3 mb-8">
            <motion.div
              className="w-12 h-12 bg-primary flex items-center justify-center mx-auto rounded-lg"
              whileHover={{ rotate: 360, scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Send className="w-6 h-6 text-white" />
            </motion.div>
            <h3 className="text-2xl sm:text-3xl font-bold tracking-tight">Contact Us</h3>
            <p className="text-muted-foreground">
              Fill out the form below and we'll get back to you shortly.
            </p>
          </div>

          <ContactForm />
        </div>
      </div>
    </motion.div>
  );
};
