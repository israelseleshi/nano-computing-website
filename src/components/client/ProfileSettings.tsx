import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { useToast } from '../ui/toast';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Building, 
  Lock, 
  Bell, 
  Eye, 
  EyeOff,
  Save,
  Camera,
  Shield,
  Globe,
  RefreshCw
} from 'lucide-react';

interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  position: string;
  address: string;
  city: string;
  country: string;
  bio: string;
  avatar?: string;
}

interface NotificationSettings {
  emailNotifications: boolean;
  smsNotifications: boolean;
  orderUpdates: boolean;
  promotionalEmails: boolean;
  securityAlerts: boolean;
  maintenanceNotices: boolean;
}

interface SecuritySettings {
  twoFactorAuth: boolean;
  loginAlerts: boolean;
  sessionTimeout: number;
}

export function ProfileSettings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications'>('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [savingProfile, setSavingProfile] = useState(false);
  const [changingPassword, setChangingPassword] = useState(false);
  const [savingNotifications, setSavingNotifications] = useState(false);
  const { addToast } = useToast();

  // Profile data
  const [profile, setProfile] = useState<UserProfile>({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@company.com',
    phone: '+251-911-123-456',
    company: 'Tech Solutions Ltd.',
    position: 'IT Manager',
    address: '123 Business Street',
    city: 'Addis Ababa',
    country: 'Ethiopia',
    bio: 'Experienced IT professional with focus on enterprise solutions and digital transformation.'
  });

  // Password change form
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Notification settings
  const [notifications, setNotifications] = useState<NotificationSettings>({
    emailNotifications: true,
    smsNotifications: false,
    orderUpdates: true,
    promotionalEmails: false,
    securityAlerts: true,
    maintenanceNotices: true
  });

  // Security settings
  const [security, setSecurity] = useState<SecuritySettings>({
    twoFactorAuth: false,
    loginAlerts: true,
    sessionTimeout: 30
  });

  const handleProfileSave = async () => {
    setSavingProfile(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      console.log('Saving profile:', profile);
      addToast({
        type: 'success',
        title: 'Profile Updated',
        description: 'Your profile has been successfully updated'
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Update Failed',
        description: 'Failed to update profile. Please try again.'
      });
    } finally {
      setSavingProfile(false);
    }
  };

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      addToast({
        type: 'error',
        title: 'Password Mismatch',
        description: 'New passwords do not match'
      });
      return;
    }
    
    setChangingPassword(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('Changing password');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      addToast({
        type: 'success',
        title: 'Password Changed',
        description: 'Your password has been successfully updated'
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Password Change Failed',
        description: 'Failed to change password. Please try again.'
      });
    } finally {
      setChangingPassword(false);
    }
  };

  const handleNotificationSave = async () => {
    setSavingNotifications(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Saving notifications:', notifications);
      addToast({
        type: 'success',
        title: 'Settings Saved',
        description: 'Your notification preferences have been updated'
      });
    } catch (error) {
      addToast({
        type: 'error',
        title: 'Save Failed',
        description: 'Failed to save notification settings. Please try again.'
      });
    } finally {
      setSavingNotifications(false);
    }
  };

  const handleSecuritySave = () => {
    // Simulate API call
    console.log('Saving security settings:', security);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-primary">Profile & Settings</h1>
        <p className="text-muted-foreground">Manage your account information and preferences</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'profile' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('profile')}
        >
          <User className="w-4 h-4 mr-2" />
          Profile
        </Button>
        <Button
          variant={activeTab === 'security' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('security')}
        >
          <Shield className="w-4 h-4 mr-2" />
          Security
        </Button>
        <Button
          variant={activeTab === 'notifications' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('notifications')}
        >
          <Bell className="w-4 h-4 mr-2" />
          Notifications
        </Button>
      </div>

      {/* Profile Tab */}
      {activeTab === 'profile' && (
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Profile Picture */}
          <Card className="p-6 h-fit">
            <div className="text-center">
              <div className="w-32 h-32 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <User className="w-16 h-16 text-primary" />
              </div>
              <h3 className="font-semibold mb-1">{profile.firstName} {profile.lastName}</h3>
              <p className="text-sm text-muted-foreground mb-4">{profile.position}</p>
              <Button variant="outline" className="w-full">
                <Camera className="w-4 h-4 mr-2" />
                Change Photo
              </Button>
            </div>
          </Card>

          {/* Profile Form */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Personal Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">First Name</label>
                  <Input
                    value={profile.firstName}
                    onChange={(e) => setProfile(prev => ({ ...prev, firstName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Last Name</label>
                  <Input
                    value={profile.lastName}
                    onChange={(e) => setProfile(prev => ({ ...prev, lastName: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Phone</label>
                  <Input
                    value={profile.phone}
                    onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Professional Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Company</label>
                  <Input
                    value={profile.company}
                    onChange={(e) => setProfile(prev => ({ ...prev, company: e.target.value }))}
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Position</label>
                  <Input
                    value={profile.position}
                    onChange={(e) => setProfile(prev => ({ ...prev, position: e.target.value }))}
                  />
                </div>
              </div>
              <div className="mt-4">
                <label className="text-sm font-medium mb-2 block">Bio</label>
                <Textarea
                  value={profile.bio}
                  onChange={(e) => setProfile(prev => ({ ...prev, bio: e.target.value }))}
                  rows={3}
                  placeholder="Tell us about yourself..."
                />
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Address Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Address</label>
                  <Input
                    value={profile.address}
                    onChange={(e) => setProfile(prev => ({ ...prev, address: e.target.value }))}
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">City</label>
                    <Input
                      value={profile.city}
                      onChange={(e) => setProfile(prev => ({ ...prev, city: e.target.value }))}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Country</label>
                    <Input
                      value={profile.country}
                      onChange={(e) => setProfile(prev => ({ ...prev, country: e.target.value }))}
                    />
                  </div>
                </div>
              </div>
            </Card>

            <div className="flex justify-end">
              <Button 
                onClick={handleProfileSave} 
                disabled={savingProfile}
                className="bg-gradient-to-r from-primary to-primary/80"
              >
                {savingProfile ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {savingProfile ? 'Saving...' : 'Save Changes'}
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === 'security' && (
        <div className="max-w-2xl space-y-6">
          {/* Change Password */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Change Password</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Current Password</label>
                <div className="relative">
                  <Input
                    type={showCurrentPassword ? 'text' : 'password'}
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, currentPassword: e.target.value }))}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">New Password</label>
                <div className="relative">
                  <Input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, newPassword: e.target.value }))}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Confirm New Password</label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm(prev => ({ ...prev, confirmPassword: e.target.value }))}
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 h-auto p-1"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
              <Button 
                onClick={handlePasswordChange}
                disabled={changingPassword}
              >
                {changingPassword ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Lock className="w-4 h-4 mr-2" />
                )}
                {changingPassword ? 'Updating...' : 'Update Password'}
              </Button>
            </div>
          </Card>

          {/* Security Settings */}
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Security Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Two-Factor Authentication</h4>
                  <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                </div>
                <Button
                  variant={security.twoFactorAuth ? 'default' : 'outline'}
                  onClick={() => setSecurity(prev => ({ ...prev, twoFactorAuth: !prev.twoFactorAuth }))}
                >
                  {security.twoFactorAuth ? 'Enabled' : 'Enable'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Login Alerts</h4>
                  <p className="text-sm text-muted-foreground">Get notified of new login attempts</p>
                </div>
                <Button
                  variant={security.loginAlerts ? 'default' : 'outline'}
                  onClick={() => setSecurity(prev => ({ ...prev, loginAlerts: !prev.loginAlerts }))}
                >
                  {security.loginAlerts ? 'Enabled' : 'Enable'}
                </Button>
              </div>

              <div className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="font-medium">Session Timeout</h4>
                    <p className="text-sm text-muted-foreground">Automatically log out after inactivity</p>
                  </div>
                </div>
                <select
                  value={security.sessionTimeout}
                  onChange={(e) => setSecurity(prev => ({ ...prev, sessionTimeout: Number(e.target.value) }))}
                  className="w-full px-3 py-2 border rounded-md bg-background"
                >
                  <option value={15}>15 minutes</option>
                  <option value={30}>30 minutes</option>
                  <option value={60}>1 hour</option>
                  <option value={120}>2 hours</option>
                  <option value={0}>Never</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button onClick={handleSecuritySave}>
                <Save className="w-4 h-4 mr-2" />
                Save Security Settings
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Notifications Tab */}
      {activeTab === 'notifications' && (
        <div className="max-w-2xl space-y-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">Notification Preferences</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Email Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive notifications via email</p>
                </div>
                <Button
                  variant={notifications.emailNotifications ? 'default' : 'outline'}
                  onClick={() => setNotifications(prev => ({ ...prev, emailNotifications: !prev.emailNotifications }))}
                >
                  {notifications.emailNotifications ? 'On' : 'Off'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">SMS Notifications</h4>
                  <p className="text-sm text-muted-foreground">Receive notifications via SMS</p>
                </div>
                <Button
                  variant={notifications.smsNotifications ? 'default' : 'outline'}
                  onClick={() => setNotifications(prev => ({ ...prev, smsNotifications: !prev.smsNotifications }))}
                >
                  {notifications.smsNotifications ? 'On' : 'Off'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Order Updates</h4>
                  <p className="text-sm text-muted-foreground">Get notified about order status changes</p>
                </div>
                <Button
                  variant={notifications.orderUpdates ? 'default' : 'outline'}
                  onClick={() => setNotifications(prev => ({ ...prev, orderUpdates: !prev.orderUpdates }))}
                >
                  {notifications.orderUpdates ? 'On' : 'Off'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Promotional Emails</h4>
                  <p className="text-sm text-muted-foreground">Receive marketing and promotional content</p>
                </div>
                <Button
                  variant={notifications.promotionalEmails ? 'default' : 'outline'}
                  onClick={() => setNotifications(prev => ({ ...prev, promotionalEmails: !prev.promotionalEmails }))}
                >
                  {notifications.promotionalEmails ? 'On' : 'Off'}
                </Button>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Security Alerts</h4>
                  <p className="text-sm text-muted-foreground">Important security notifications</p>
                </div>
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                  Always On
                </Badge>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <h4 className="font-medium">Maintenance Notices</h4>
                  <p className="text-sm text-muted-foreground">System maintenance and downtime alerts</p>
                </div>
                <Button
                  variant={notifications.maintenanceNotices ? 'default' : 'outline'}
                  onClick={() => setNotifications(prev => ({ ...prev, maintenanceNotices: !prev.maintenanceNotices }))}
                >
                  {notifications.maintenanceNotices ? 'On' : 'Off'}
                </Button>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <Button 
                onClick={handleNotificationSave}
                disabled={savingNotifications}
              >
                {savingNotifications ? (
                  <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                ) : (
                  <Save className="w-4 h-4 mr-2" />
                )}
                {savingNotifications ? 'Saving...' : 'Save Notification Settings'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
