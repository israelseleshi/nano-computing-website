import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { useToast } from '../ui/toast';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  User, 
  Search, 
  MessageSquare,
  Calendar,
  Globe,
  AlertCircle,
  CheckCircle
} from 'lucide-react';

interface Contact {
  id: string;
  name: string;
  title: string;
  department: string;
  phone: string;
  email: string;
  extension?: string;
  availability: 'available' | 'busy' | 'away' | 'offline';
  specialties: string[];
  image?: string;
}

interface Office {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: {
    weekdays: string;
    weekends: string;
  };
  services: string[];
  isMain: boolean;
}

export function ContactDirectory() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [activeTab, setActiveTab] = useState<'contacts' | 'offices' | 'emergency'>('contacts');
  const [callingContact, setCallingContact] = useState<string | null>(null);
  const [emailingContact, setEmailingContact] = useState<string | null>(null);
  const [messagingContact, setMessagingContact] = useState<string | null>(null);
  const { addToast } = useToast();

  // Mock contact data
  const [contacts] = useState<Contact[]>([
    {
      id: '1',
      name: 'John Smith',
      title: 'Account Manager',
      department: 'Sales',
      phone: '+251-911-123-456',
      email: 'john.smith@nanocomputing.et',
      extension: '101',
      availability: 'available',
      specialties: ['Enterprise Solutions', 'Hardware Sales', 'Consulting']
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      title: 'Technical Support Lead',
      department: 'Support',
      phone: '+251-911-234-567',
      email: 'sarah.johnson@nanocomputing.et',
      extension: '201',
      availability: 'busy',
      specialties: ['Network Issues', 'Software Installation', 'Remote Support']
    },
    {
      id: '3',
      name: 'Michael Chen',
      title: 'Network Engineer',
      department: 'Technical',
      phone: '+251-911-345-678',
      email: 'michael.chen@nanocomputing.et',
      extension: '301',
      availability: 'available',
      specialties: ['Network Security', 'Infrastructure', 'Cisco Systems']
    },
    {
      id: '4',
      name: 'Emily Davis',
      title: 'Project Manager',
      department: 'Operations',
      phone: '+251-911-456-789',
      email: 'emily.davis@nanocomputing.et',
      extension: '401',
      availability: 'away',
      specialties: ['Project Planning', 'Implementation', 'Client Relations']
    }
  ]);

  // Mock office data
  const [offices] = useState<Office[]>([
    {
      id: '1',
      name: 'Nano Computing - Main Office',
      address: 'Bole Road, Addis Ababa, Ethiopia',
      phone: '+251-11-123-4567',
      email: 'info@nanocomputing.et',
      hours: {
        weekdays: '8:00 AM - 6:00 PM',
        weekends: '9:00 AM - 2:00 PM'
      },
      services: ['Sales', 'Technical Support', 'Consulting', 'Training'],
      isMain: true
    },
    {
      id: '2',
      name: 'Nano Computing - Service Center',
      address: 'Kazanchis, Addis Ababa, Ethiopia',
      phone: '+251-11-234-5678',
      email: 'service@nanocomputing.et',
      hours: {
        weekdays: '8:00 AM - 5:00 PM',
        weekends: 'Closed'
      },
      services: ['Hardware Repair', 'Maintenance', 'Warranty Service'],
      isMain: false
    }
  ]);

  const emergencyContacts = [
    {
      title: '24/7 Emergency Support',
      phone: '+251-911-EMERGENCY',
      description: 'Critical system failures and security incidents'
    },
    {
      title: 'After Hours Technical Support',
      phone: '+251-911-TECH-HELP',
      description: 'Non-critical technical issues outside business hours'
    },
    {
      title: 'Account Manager Emergency',
      phone: '+251-911-ACCOUNT',
      description: 'Urgent business matters and escalations'
    }
  ];

  const getAvailabilityIcon = (availability: string) => {
    switch (availability) {
      case 'available': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'busy': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'away': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'offline': return <AlertCircle className="w-4 h-4 text-gray-500" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'busy': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'away': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'offline': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const departments = ['all', ...Array.from(new Set(contacts.map(c => c.department)))];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesDepartment = selectedDepartment === 'all' || contact.department === selectedDepartment;
    return matchesSearch && matchesDepartment;
  });

  // Contact action handlers
  const handleCallContact = async (contact: Contact) => {
    setCallingContact(contact.id);
    // Simulate call initiation
    setTimeout(() => {
      setCallingContact(null);
      addToast({
        type: 'success',
        title: 'Call Initiated',
        description: `Calling ${contact.name} at ${contact.phone}...`
      });
    }, 1000);
  };

  const handleEmailContact = async (contact: Contact) => {
    setEmailingContact(contact.id);
    // Simulate email composition
    setTimeout(() => {
      setEmailingContact(null);
      addToast({
        type: 'success',
        title: 'Email Opened',
        description: `Opening email to ${contact.name}...`
      });
      // In a real app, this would open the default email client
      window.location.href = `mailto:${contact.email}?subject=Contact from Client Portal`;
    }, 800);
  };

  const handleMessageContact = async (contact: Contact) => {
    setMessagingContact(contact.id);
    // Simulate messaging
    setTimeout(() => {
      setMessagingContact(null);
      addToast({
        type: 'info',
        title: 'Message Feature',
        description: `Internal messaging with ${contact.name} coming soon!`
      });
    }, 600);
  };

  const handleGetDirections = (office: Office) => {
    addToast({
      type: 'success',
      title: 'Opening Maps',
      description: `Getting directions to ${office.name}...`
    });
    // In a real app, this would open maps with the office address
    const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(office.address)}`;
    window.open(mapsUrl, '_blank');
  };

  const handleCallOffice = (office: Office) => {
    addToast({
      type: 'success',
      title: 'Call Initiated',
      description: `Calling ${office.name} at ${office.phone}...`
    });
  };

  const handleScheduleVisit = (office: Office) => {
    addToast({
      type: 'info',
      title: 'Schedule Visit',
      description: `Visit scheduling for ${office.name} coming soon!`
    });
  };

  const handleEmergencyCall = (contact: any) => {
    addToast({
      type: 'warning',
      title: 'Emergency Call',
      description: `Initiating emergency call to ${contact.title}...`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Contact Directory</h1>
        <p className="text-muted-foreground">Get in touch with our team and offices</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'contacts' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('contacts')}
        >
          <User className="w-4 h-4 mr-2" />
          Team Contacts
        </Button>
        <Button
          variant={activeTab === 'offices' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('offices')}
        >
          <MapPin className="w-4 h-4 mr-2" />
          Office Locations
        </Button>
        <Button
          variant={activeTab === 'emergency' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('emergency')}
        >
          <AlertCircle className="w-4 h-4 mr-2" />
          Emergency
        </Button>
      </div>

      {/* Team Contacts */}
      {activeTab === 'contacts' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search by name, title, or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                {departments.map(dept => (
                  <option key={dept} value={dept}>
                    {dept === 'all' ? 'All Departments' : dept}
                  </option>
                ))}
              </select>
            </div>
          </Card>

          {/* Contacts Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContacts.map((contact, index) => (
              <motion.div
                key={contact.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{contact.name}</h3>
                        <p className="text-sm text-muted-foreground">{contact.title}</p>
                      </div>
                    </div>
                    <Badge className={getAvailabilityColor(contact.availability)}>
                      {getAvailabilityIcon(contact.availability)}
                      <span className="ml-1 capitalize">{contact.availability}</span>
                    </Badge>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span>{contact.phone}</span>
                      {contact.extension && (
                        <span className="text-muted-foreground">ext. {contact.extension}</span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="truncate">{contact.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span>{contact.department}</span>
                    </div>
                  </div>

                  {/* Specialties */}
                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Specialties:</p>
                    <div className="flex flex-wrap gap-1">
                      {contact.specialties.map((specialty, i) => (
                        <Badge key={i} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button 
                      size="sm" 
                      className="flex-1" 
                      onClick={() => handleCallContact(contact)}
                      disabled={callingContact === contact.id}
                    >
                      {callingContact === contact.id ? (
                        <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        <Phone className="w-4 h-4 mr-2" />
                      )}
                      {callingContact === contact.id ? 'Calling...' : 'Call'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline" 
                      className="flex-1"
                      onClick={() => handleEmailContact(contact)}
                      disabled={emailingContact === contact.id}
                    >
                      {emailingContact === contact.id ? (
                        <div className="w-4 h-4 mr-2 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        <Mail className="w-4 h-4 mr-2" />
                      )}
                      {emailingContact === contact.id ? 'Opening...' : 'Email'}
                    </Button>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleMessageContact(contact)}
                      disabled={messagingContact === contact.id}
                    >
                      {messagingContact === contact.id ? (
                        <div className="w-4 h-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                      ) : (
                        <MessageSquare className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Office Locations */}
      {activeTab === 'offices' && (
        <div className="space-y-6">
          {offices.map((office, index) => (
            <motion.div
              key={office.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <h3 className="text-xl font-semibold">{office.name}</h3>
                      {office.isMain && (
                        <Badge className="bg-primary">Main Office</Badge>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 mb-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <MapPin className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <span className="text-sm">{office.address}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{office.phone}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm">{office.email}</span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <Clock className="w-4 h-4 text-muted-foreground mt-0.5" />
                          <div className="text-sm">
                            <p><strong>Weekdays:</strong> {office.hours.weekdays}</p>
                            <p><strong>Weekends:</strong> {office.hours.weekends}</p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Services Available:</p>
                      <div className="flex flex-wrap gap-2">
                        {office.services.map((service, i) => (
                          <Badge key={i} variant="outline">
                            {service}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 lg:w-48">
                    <Button className="w-full" onClick={() => handleGetDirections(office)}>
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Directions
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => handleCallOffice(office)}>
                      <Phone className="w-4 h-4 mr-2" />
                      Call Office
                    </Button>
                    <Button variant="outline" className="w-full" onClick={() => handleScheduleVisit(office)}>
                      <Calendar className="w-4 h-4 mr-2" />
                      Schedule Visit
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Emergency Contacts */}
      {activeTab === 'emergency' && (
        <div className="space-y-6">
          <Card className="p-6 border-red-200 bg-red-50 dark:bg-red-900/10 dark:border-red-800">
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-red-500" />
              <h2 className="text-lg font-semibold text-red-800 dark:text-red-400">
                Emergency Information
              </h2>
            </div>
            <p className="text-sm text-red-700 dark:text-red-300 mb-4">
              Use these contacts for urgent situations that require immediate attention. 
              For non-urgent matters, please use regular support channels.
            </p>
          </Card>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {emergencyContacts.map((contact, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 border-orange-200 hover:shadow-lg transition-shadow">
                  <div className="flex items-center gap-2 mb-3">
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                    <h3 className="font-semibold">{contact.title}</h3>
                  </div>
                  
                  <div className="flex items-center gap-2 mb-3">
                    <Phone className="w-4 h-4 text-muted-foreground" />
                    <span className="font-mono text-lg">{contact.phone}</span>
                  </div>
                  
                  <p className="text-sm text-muted-foreground mb-4">
                    {contact.description}
                  </p>
                  
                  <Button 
                    className="w-full bg-red-600 hover:bg-red-700"
                    onClick={() => handleEmergencyCall(contact)}
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Call Now
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="p-6">
            <h3 className="font-semibold mb-3">Before Calling Emergency Support:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Have your account information and contact details ready</li>
              <li>• Describe the issue clearly and its business impact</li>
              <li>• Note any error messages or codes you're seeing</li>
              <li>• Be prepared to follow troubleshooting steps</li>
            </ul>
          </Card>
        </div>
      )}
    </div>
  );
}
