import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { FloatingLabelInput } from '../ui/floating-label-input';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Send,
  CheckCircle,
  Globe,
  MessageCircle,
  Calendar,
  User,
  ChevronDown,
  Plane
} from 'lucide-react';

interface ContactPageProps {
  onPageChange: (page: string) => void;
}

export function ContactPage({ onPageChange }: ContactPageProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    message: '',
    serviceInterest: ''
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateField = (name: string, value: string) => {
    let error = '';
    switch (name) {
      case 'name':
        if (!value.trim()) error = 'Full name is required';
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      case 'subject':
        if (!value.trim()) error = 'Subject is required';
        break;
      case 'message':
        if (!value.trim()) error = 'Message is required';
        else if (value.trim().length < 10) error = 'Message must be at least 10 characters';
        break;
    }
    return error;
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
    setFocusedField(null);
  };

  const handleFocus = (fieldName: string) => {
    setFocusedField(fieldName);
    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors(prev => ({ ...prev, [fieldName]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate all fields
    const newErrors: {[key: string]: string} = {};
    Object.entries(formData).forEach(([key, value]) => {
      if (['name', 'email', 'subject', 'message'].includes(key)) {
        const error = validateField(key, value);
        if (error) newErrors[key] = error;
      }
    });
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    setIsSubmitted(true);
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: '',
        email: '',
        company: '',
        phone: '',
        subject: '',
        message: '',
        serviceInterest: ''
      });
    }, 4000);
  };

  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+251 923 78 78 78'],
      action: 'Call us directly'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@nanocomputingict.com'],
      action: 'Send us an email'
    },
    {
      icon: MapPin,
      title: 'Address',
      details: [
        'Rayuma Building 2nd Floor (214)',
        'Beside Getu Commercial',
        'Addis Ababa',
        'Ethiopia'
      ],
      action: 'Visit our office'
    }
  ];

  const services = [
    'CCTV Security Systems',
    'Computer Repair Services',
    'Network Design & Installation',
    'Door Access Control',
    'Time & Attendance Systems',
    'Hardware Solutions',
    'General Consultation'
  ];

  const offices = [
    {
      city: 'San Francisco',
      address: '1234 Tech Boulevard, Silicon Valley, CA 94025',
      phone: '+1 (555) 123-4567',
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    {
      city: 'New York',
      address: '567 Innovation Avenue, New York, NY 10001',
      phone: '+1 (555) 987-6543',
      coordinates: { lat: 40.7128, lng: -74.0060 }
    },
    {
      city: 'Austin',
      address: '890 Digital Drive, Austin, TX 78701',
      phone: '+1 (555) 456-7890',
      coordinates: { lat: 30.2672, lng: -97.7431 }
    }
  ];

  return (
    <div className="min-h-screen pt-20">

      {/* Main Contact Section */}
      <section className="pt-8 pb-24 relative overflow-hidden">
        {/* Animated Background */}
        <motion.div 
          className="absolute inset-0 opacity-5"
          animate={{
            background: [
              "radial-gradient(600px circle at 20% 80%, var(--color-primary), transparent)",
              "radial-gradient(600px circle at 80% 20%, var(--color-accent), transparent)",
              "radial-gradient(600px circle at 40% 40%, var(--color-primary), transparent)",
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 relative z-10">

          {/* Contact Grid - Form and Map */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6 lg:gap-8 mb-12 sm:mb-16">
            {/* Contact Form */}
            <motion.div 
              className="lg:col-span-1"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="p-4 sm:p-6 relative overflow-hidden">
                {/* Gradient Overlay */}
                <motion.div
                  className="absolute inset-0 bg-primary/3 opacity-50"
                  animate={{
                    background: [
                      "linear-gradient(135deg, var(--color-primary)/3, transparent, var(--color-accent)/3)",
                      "linear-gradient(225deg, var(--color-accent)/3, transparent, var(--color-primary)/3)",
                      "linear-gradient(135deg, var(--color-primary)/3, transparent, var(--color-accent)/3)",
                    ],
                  }}
                  transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />

                <div className="relative z-10">
                  <div className="text-center space-y-3 mb-4 sm:mb-6">
                    <motion.div 
                      className="w-10 h-10 sm:w-12 sm:h-12 bg-primary flex items-center justify-center mx-auto"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Send className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                    </motion.div>
                    <h3 className="text-xl sm:text-2xl lg:text-h3 font-bold tracking-tight">Contact Us</h3>
                    
                  </div>

                  <AnimatePresence mode="wait">
                    {isSubmitted ? (
                      <motion.div 
                        className="text-center space-y-8 py-12"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.5 }}
                      >
                        <motion.div
                          className="w-24 h-24 bg-green-500 flex items-center justify-center mx-auto"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                        >
                          <CheckCircle className="w-12 h-12 text-white" />
                        </motion.div>
                        <div className="space-y-3">
                          <h4 className="text-h4 font-bold text-green-600">Message Sent Successfully!</h4>
                          <p className="text-body text-muted-foreground max-w-md mx-auto">
                            Thank you for reaching out. One of our solution architects will contact you within 2 hours during business hours.
                          </p>
                        </div>
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Button 
                            onClick={() => setIsSubmitted(false)}
                            size="lg"
                            className="px-8"
                          >
                            Send Another Message
                          </Button>
                        </motion.div>
                      </motion.div>
                    ) : (
                      <motion.form 
                        onSubmit={handleSubmit} 
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 lg:gap-4">
                          <div className="space-y-1">
                            <div className="relative">
                              <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleInputChange}
                                onFocus={() => setFocusedField('name')}
                                onBlur={() => {
                                  setFocusedField(null);
                                  validateField('name', formData.name);
                                }}
                                className={`w-full px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm transition-all duration-300 outline-none border-2 ${
                                  focusedField === 'name'
                                    ? 'border-blue-500 shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/20'
                                    : errors.name
                                    ? 'border-red-500 shadow-lg shadow-red-500/25 ring-2 ring-red-500/20'
                                    : 'border-border/50 hover:border-border/80 dark:border-border/40 dark:hover:border-border/70'
                                }`}
                                placeholder="Enter your full name"
                                required
                              />
                            </div>
                            {errors.name && (
                              <motion.p 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs text-red-500 mt-1"
                              >
                                {errors.name}
                              </motion.p>
                            )}
                          </div>
                          
                          <div className="space-y-1">
                            <div className="relative">
                              <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                onFocus={() => setFocusedField('email')}
                                onBlur={() => {
                                  setFocusedField(null);
                                  validateField('email', formData.email);
                                }}
                                className={`w-full px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm transition-all duration-300 outline-none border-2 ${
                                  focusedField === 'email'
                                    ? 'border-blue-500 shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/20'
                                    : errors.email
                                    ? 'border-red-500 shadow-lg shadow-red-500/25 ring-2 ring-red-500/20'
                                    : 'border-border/50 hover:border-border/80 dark:border-border/40 dark:hover:border-border/70'
                                }`}
                                placeholder="Enter your email address"
                                required
                              />
                            </div>
                            {errors.email && (
                              <motion.p 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-xs text-red-500 mt-1"
                              >
                                {errors.email}
                              </motion.p>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('company')}
                            onBlur={() => setFocusedField(null)}
                            className={`w-full px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm transition-all duration-300 outline-none border-2 ${
                              focusedField === 'company'
                                ? 'border-blue-500 shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/20'
                                : 'border-border/50 hover:border-border/80 dark:border-border/40 dark:hover:border-border/70'
                            }`}
                            placeholder="Enter your company name"
                          />
                          
                          <input
                            type="tel"
                            name="phone"
                            value={formData.phone}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('phone')}
                            onBlur={() => {
                              setFocusedField(null);
                              validateField('phone', formData.phone);
                            }}
                            className={`w-full px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm transition-all duration-300 outline-none border-2 ${
                              focusedField === 'phone'
                                ? 'border-blue-500 shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/20'
                                : errors.phone
                                ? 'border-red-500 shadow-lg shadow-red-500/25 ring-2 ring-red-500/20'
                                : 'border-border/50 hover:border-border/80 dark:border-border/40 dark:hover:border-border/70'
                            }`}
                            placeholder="Enter your phone number"
                          />
                        </div>

                        <div className="space-y-1">
                          <div className="relative">
                            <select
                              name="serviceInterest"
                              value={formData.serviceInterest}
                              onChange={handleInputChange}
                              onFocus={() => setFocusedField('serviceInterest')}
                              onBlur={() => setFocusedField(null)}
                              className={`w-full px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm transition-all duration-300 outline-none appearance-none cursor-pointer border-2 ${
                                focusedField === 'serviceInterest'
                                  ? 'border-blue-500 shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/20'
                                  : 'border-border/50 hover:border-border/80 dark:border-border/40 dark:hover:border-border/70'
                              }`}
                            >
                              <option value="">Select Service (Optional)</option>
                              {services.map((service) => (
                                <option key={service} value={service}>{service}</option>
                              ))}
                            </select>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <input
                            type="text"
                            name="subject"
                            value={formData.subject}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('subject')}
                            onBlur={() => {
                              setFocusedField(null);
                              validateField('subject', formData.subject);
                            }}
                            className={`w-full px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm transition-all duration-300 outline-none border-2 ${
                              focusedField === 'subject'
                                ? 'border-blue-500 shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/20'
                                : errors.subject
                                ? 'border-red-500 shadow-lg shadow-red-500/25 ring-2 ring-red-500/20'
                                : 'border-border/50 hover:border-border/80 dark:border-border/40 dark:hover:border-border/70'
                            }`}
                            placeholder="Enter your subject"
                            required
                          />
                          {errors.subject && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-xs text-red-500 mt-1"
                            >
                              {errors.subject}
                            </motion.p>
                          )}
                        </div>

                        <div className="space-y-1">
                          <textarea
                            name="message"
                            value={formData.message}
                            onChange={handleInputChange}
                            onFocus={() => setFocusedField('message')}
                            onBlur={() => {
                              setFocusedField(null);
                              validateField('message', formData.message);
                            }}
                            rows={5}
                            className={`w-full px-4 py-3 rounded-lg bg-background/50 backdrop-blur-sm transition-all duration-300 outline-none resize-none border-2 ${
                              focusedField === 'message'
                                ? 'border-blue-500 shadow-lg shadow-blue-500/25 ring-2 ring-blue-500/20'
                                : errors.message
                                ? 'border-red-500 shadow-lg shadow-red-500/25 ring-2 ring-red-500/20'
                                : 'border-border/50 hover:border-border/80 dark:border-border/40 dark:hover:border-border/70'
                            }`}
                            placeholder="Share your vision, challenges, and goals..."
                            required
                          />
                          {errors.message && (
                            <motion.p 
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="text-xs text-red-500 mt-1"
                            >
                              {errors.message}
                            </motion.p>
                          )}
                        </div>

                        <motion.button
                          type="submit"
                          disabled={isSubmitting}
                          className="w-full py-4 px-6 bg-blue-700 hover:bg-blue-800 dark:bg-blue-800 dark:hover:bg-blue-900 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 group"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {isSubmitting ? (
                            <>
                              <motion.div
                                className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                              />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <motion.div
                                className="group-hover:translate-x-1 transition-transform duration-300"
                                whileHover={{ x: 2 }}
                              >
                                <Send className="w-5 h-5" />
                              </motion.div>
                              Submit
                            </>
                          )}
                        </motion.button>

                        <motion.p 
                          className="text-caption text-center text-muted-foreground"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.5 }}
                        >
                          By submitting this form, you agree to our privacy policy and terms of service. 
                          <br />We respect your privacy and will never share your information.
                        </motion.p>
                      </motion.form>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </motion.div>

            {/* Interactive Google Map and Connect Section */}
            <motion.div 
              className="lg:col-span-1 flex flex-col"
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="space-y-4 sm:space-y-6 h-full">
                {/* Google Map */}
                <motion.div 
                  className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-2xl h-64 sm:h-80 lg:h-96 order-2 lg:order-1"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3643.0386506095624!2d38.7678803!3d9.005326899999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85b0052a4f3d%3A0x10401dbee19b1be2!2snano%20computing%20ICT%20solution%20CCTV%20Security%20camera%20installation%20In%20Ethiopia%20%2F%20Addis%20Ababa!5e1!3m2!1sen!2set!4v1757050179483!5m2!1sen!2set"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="absolute inset-0"
                  />
                  <div className="absolute inset-0 bg-black/20 pointer-events-none" />
                </motion.div>

                {/* Connect With Us Section - Below Map */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <div className="text-center mb-4 sm:mb-6">
                    <h3 className="text-lg sm:text-xl lg:text-h4 font-bold mb-2">Connect With Us</h3>
                    <p className="text-muted-foreground text-xs sm:text-caption leading-tight">
                      Ready to transform your business? Let's discuss your project.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <motion.a 
                      href="tel:+251911123456"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-all duration-300 group cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300"
                        whileHover={{ rotate: 10 }}
                      >
                        <Phone className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                      </motion.div>
                      <div>
                        <p className="text-body-sm font-medium group-hover:text-primary transition-colors duration-300">Call Us</p>
                        <p className="text-caption text-muted-foreground leading-tight">+251 911 123 456</p>
                      </div>
                    </motion.a>
                    
                    <motion.a 
                      href="mailto:info@nanocomputing.et"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-muted/30 transition-all duration-300 group cursor-pointer"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all duration-300"
                        whileHover={{ rotate: -10 }}
                      >
                        <Mail className="w-5 h-5 text-primary group-hover:text-white transition-colors duration-300" />
                      </motion.div>
                      <div>
                        <p className="text-body-sm font-medium group-hover:text-primary transition-colors duration-300">Email Us</p>
                        <p className="text-caption text-muted-foreground leading-tight">info@nanocomputing.et</p>
                      </div>
                    </motion.a>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}