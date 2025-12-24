import { motion } from 'framer-motion';
import { Phone, Mail, MapPin } from 'lucide-react';

export const ContactInfoSection = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: 'Phone',
      details: ['+251 923 78 78 78'],
      action: 'Call us directly',
      href: 'tel:+251923787878',
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@nanocomputingict.com'],
      action: 'Send us an email',
      href: 'mailto:info@nanocomputingict.com',
    },
  ];

  return (
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
          className="relative overflow-hidden rounded-xl sm:rounded-2xl shadow-xl h-64 sm:h-80 lg:h-96"
          whileHover={{ scale: 1.01 }}
          transition={{ duration: 0.3 }}
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d399.9767905175798!2d38.767826177829576!3d9.005344642049488!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85b0052a4f3d%3A0x10401dbee19b1be2!2snano%20computing%20ICT%20solution%20CCTV%20Security%20camera%20installation%20In%20Ethiopia%20%2F%20Addis%20Ababa!5e0!3m2!1sen!2set!4v1766561187378!5m2!1sen!2set"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="absolute inset-0"
          />
        </motion.div>

        {/* Connect With Us Details */}
        <motion.div
          className="bg-card p-6 rounded-2xl border border-border/50"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold mb-2">Connect With Us</h3>
            <p className="text-muted-foreground text-sm">
              Ready to transform your business? Let's discuss your project.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {contactInfo.map((info, idx) => (
              <motion.a
                key={idx}
                href={info.href}
                className="flex items-center gap-4 p-4 rounded-xl hover:bg-muted/50 transition-all duration-300 group"
                whileHover={{ x: 5 }}
              >
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary transition-all duration-300">
                  <info.icon className="w-6 h-6 text-primary group-hover:text-white" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{info.title}</p>
                  <p className="text-sm text-muted-foreground">{info.details[0]}</p>
                </div>
              </motion.a>
            ))}

            <div className="flex items-start gap-4 p-4">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="text-sm font-semibold">Address</p>
                <p className="text-sm text-muted-foreground">
                  Rayuma Building 2nd Floor (214)
                  <br />
                  Beside Getu Commercial, Addis Ababa
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
