import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { 
  User, 
  Users, 
  Shield, 
  Copy, 
  CheckCircle,
  Clock,
  FileText,
  BarChart3,
  Settings
} from 'lucide-react';
import { DEMO_CREDENTIALS } from '../../types/employee';

interface DemoCredentialsProps {
  onLogin: (email: string, password: string) => void;
}

export function DemoCredentials({ onLogin }: DemoCredentialsProps) {
  const [copiedField, setCopiedField] = React.useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'employee': return User;
      case 'manager': return Users;
      case 'admin': return Shield;
      default: return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'employee': return 'from-blue-500 to-blue-600';
      case 'manager': return 'from-purple-500 to-purple-600';
      case 'admin': return 'from-red-500 to-red-600';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  const getRoleFeatures = (role: string) => {
    switch (role) {
      case 'employee':
        return [
          { icon: Clock, label: 'Track work hours' },
          { icon: FileText, label: 'Create work tickets' },
          { icon: BarChart3, label: 'View personal reports' },
          { icon: User, label: 'Manage profile' }
        ];
      case 'manager':
        return [
          { icon: Users, label: 'Manage team members' },
          { icon: CheckCircle, label: 'Approve/reject tickets' },
          { icon: BarChart3, label: 'Team analytics' },
          { icon: Settings, label: 'Department budget' }
        ];
      case 'admin':
        return [
          { icon: Shield, label: 'System administration' },
          { icon: Users, label: 'All employee management' },
          { icon: BarChart3, label: 'Company-wide reports' },
          { icon: Settings, label: 'System configuration' }
        ];
      default:
        return [];
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 dark:from-gray-900 dark:to-gray-800 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Employee Management System
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Premium Work & Payment Tracking Platform
          </p>
          <p className="text-muted-foreground">
            Choose a demo account to explore the comprehensive employee dashboard system
          </p>
        </motion.div>

        {/* Demo Credentials Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {DEMO_CREDENTIALS.map((credential, index) => {
            const RoleIcon = getRoleIcon(credential.role);
            const roleColor = getRoleColor(credential.role);
            const features = getRoleFeatures(credential.role);

            return (
              <motion.div
                key={credential.email}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-xl transition-all duration-300 border-2 hover:border-primary/20">
                  {/* Role Header */}
                  <div className={`w-full h-24 bg-gradient-to-r ${roleColor} rounded-lg mb-6 flex items-center justify-center`}>
                    <RoleIcon className="w-12 h-12 text-white" />
                  </div>

                  {/* Role Info */}
                  <div className="text-center mb-6">
                    <Badge className={`bg-gradient-to-r ${roleColor} text-white mb-2 capitalize`}>
                      {credential.role}
                    </Badge>
                    <p className="text-sm text-muted-foreground">
                      {credential.description}
                    </p>
                  </div>

                  {/* Credentials */}
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Email
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="flex-1 text-sm bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded font-mono">
                          {credential.email}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(credential.email, `email-${index}`)}
                        >
                          {copiedField === `email-${index}` ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>

                    <div>
                      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                        Password
                      </label>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="flex-1 text-sm bg-gray-100 dark:bg-gray-800 px-3 py-2 rounded font-mono">
                          {credential.password}
                        </code>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => copyToClipboard(credential.password, `password-${index}`)}
                        >
                          {copiedField === `password-${index}` ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold mb-3">Key Features:</h4>
                    <div className="space-y-2">
                      {features.map((feature, featureIndex) => {
                        const FeatureIcon = feature.icon;
                        return (
                          <div key={featureIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                            <FeatureIcon className="w-4 h-4" />
                            <span>{feature.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Login Button */}
                  <Button
                    className={`w-full bg-gradient-to-r ${roleColor} hover:opacity-90 text-white`}
                    onClick={() => onLogin(credential.email, credential.password)}
                  >
                    Login as {credential.role}
                  </Button>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* System Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-center mb-8">
              Comprehensive Employee Management Features
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                {
                  icon: FileText,
                  title: 'Work Ticket System',
                  description: 'Create, track, and manage work tickets with detailed time tracking'
                },
                {
                  icon: CheckCircle,
                  title: 'Approval Workflow',
                  description: 'Manager approval system with rejection reasons and audit trails'
                },
                {
                  icon: BarChart3,
                  title: 'Advanced Reporting',
                  description: 'Comprehensive reports with data export for payroll integration'
                },
                {
                  icon: Users,
                  title: 'Team Management',
                  description: 'Role-based access control with employee, manager, and admin roles'
                }
              ].map((feature, index) => {
                const FeatureIcon = feature.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FeatureIcon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-center mt-8"
        >
          <p className="text-sm text-muted-foreground">
            💡 This is a demo system with mock data. In production, this would connect to a real database and authentication system.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
