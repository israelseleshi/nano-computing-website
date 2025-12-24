import React, { useState, useEffect } from 'react';
import { Modal } from './ui/modal';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Calendar, Download, Clock, CheckCircle, Zap, ArrowRight, Gift } from 'lucide-react';

interface ExitIntentModalProps {
  onPageChange: (page: string) => void;
}

export function ExitIntentModal({ onPageChange }: ExitIntentModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [hasShown, setHasShown] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    const handleMouseLeave = (e: MouseEvent) => {
      // Only trigger if mouse is leaving from the top of the viewport
      if (e.clientY <= 0 && !hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden' && !hasShown) {
        // User is switching tabs/minimizing - show modal when they return
        timeoutId = setTimeout(() => {
          if (document.visibilityState === 'visible') {
            setIsOpen(true);
            setHasShown(true);
          }
        }, 1000);
      }
    };

    // Show after 45 seconds if user hasn't triggered it
    const autoShowTimeout = setTimeout(() => {
      if (!hasShown) {
        setIsOpen(true);
        setHasShown(true);
      }
    }, 45000);

    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      clearTimeout(timeoutId);
      clearTimeout(autoShowTimeout);
    };
  }, [hasShown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simulate API call
    setTimeout(() => {
      setIsOpen(false);
    }, 2000);
  };

  const handleBookConsultation = () => {
    setIsOpen(false);
    onPageChange('contact');
  };

  if (isSubmitted) {
    return (
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="md">
        <div className="text-center space-y-6 py-8">
          <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto">
            <CheckCircle className="w-8 h-8 text-primary" />
          </div>
          <div className="space-y-2">
            <h3 className="text-2xl font-bold">Thank You!</h3>
            <p className="text-muted-foreground">
              Your technology assessment guide is being sent to your inbox. Check your email in the
              next few minutes.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button onClick={handleBookConsultation} className="px-6">
              Book Free Consultation
              <Calendar className="ml-2 w-4 h-4" />
            </Button>
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Continue Exploring
            </Button>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} size="lg" className="border-primary/20">
      <div className="relative">
        {/* Special Offer Badge */}
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-4 py-1 text-sm font-semibold">
            <Gift className="w-4 h-4 mr-2" />
            Limited Time Offer
          </Badge>
        </div>

        <div className="pt-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <h2 className="text-3xl font-bold">
              Wait! Don't Miss This <span className="text-gradient">Exclusive Opportunity</span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Get instant access to our premium Technology Assessment Guide valued at $500 -
              absolutely free.
            </p>
          </div>

          {/* Value Props */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Zap className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Instant ROI Calculator</h4>
                  <p className="text-sm text-muted-foreground">
                    Calculate potential savings from infrastructure optimization
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <CheckCircle className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Security Audit Checklist</h4>
                  <p className="text-sm text-muted-foreground">
                    Comprehensive 47-point security assessment framework
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                  <Clock className="w-4 h-4 text-primary" />
                </div>
                <div>
                  <h4 className="font-semibold">Implementation Timeline</h4>
                  <p className="text-sm text-muted-foreground">
                    Step-by-step roadmap for technology transformation
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="glass-effect p-6 rounded-xl border border-primary/20">
                <h4 className="font-semibold mb-3">What You'll Receive:</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>45-page Technology Assessment Guide</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>ROI Calculator Spreadsheet</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Security Audit Template</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Vendor Evaluation Framework</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <CheckCircle className="w-4 h-4 text-primary" />
                    <span>Free 30-minute consultation</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                type="email"
                placeholder="Enter your business email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 h-12 text-lg border-2 border-primary/20 focus:border-primary"
              />
              <Button
                type="submit"
                size="lg"
                className="h-12 px-8 bg-primary hover:bg-primary/90 text-lg font-semibold whitespace-nowrap"
              >
                <Download className="w-5 h-5 mr-2" />
                Get Free Guide
              </Button>
            </div>

            <div className="text-center">
              <p className="text-xs text-muted-foreground">
                No spam, ever. We respect your privacy and will only send valuable insights.
              </p>
            </div>
          </form>

          {/* Alternative CTA */}
          <div className="text-center pt-4 border-t border-border/20">
            <p className="text-sm text-muted-foreground mb-3">
              Prefer to speak with an expert directly?
            </p>
            <Button
              variant="outline"
              onClick={handleBookConsultation}
              className="border-primary text-primary hover:bg-primary hover:text-primary-foreground"
            >
              Book Free Strategy Call
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </div>

          {/* Urgency */}
          <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-center">
            <p className="text-sm font-medium text-destructive">
              ⏰ Only 47 guides remaining this month - Download yours now!
            </p>
          </div>
        </div>

        {/* Exit Intent Modal */}
      </div>
    </Modal>
  );
}
