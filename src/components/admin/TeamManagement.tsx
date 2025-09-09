import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Users, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  Star,
  Mail,
  Phone,
  Calendar,
  Award,
  TrendingUp,
  Clock,
  ArrowUp,
  ArrowDown,
  Linkedin,
  Twitter,
  Github,
  Globe
} from 'lucide-react';
import { EnhancedTeamMember, TeamMemberForm, TeamMemberSkill } from '../../types/admin';

interface TeamManagementProps {
  onBack: () => void;
}

export function TeamManagement({ onBack }: TeamManagementProps) {
  const [activeTab, setActiveTab] = useState('members');
  const [selectedMember, setSelectedMember] = useState<EnhancedTeamMember | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Mock data
  const [teamMembers, setTeamMembers] = useState<EnhancedTeamMember[]>([
    {
      id: 'member-1' as any,
      name: 'Abebe Tadesse',
      position: 'Chief Technology Officer',
      department: 'Technology',
      bio: 'Enterprise Architecture & Cloud Solutions expert with 15+ years of experience',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face',
      email: 'abebe@nanocomputing.et' as any,
      phone: '+251911123456',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/abebe-tadesse',
        twitter: 'https://twitter.com/abebe_tech',
        github: 'https://github.com/abebe-dev'
      },
      skills: [
        { id: 'skill-1', name: 'Cloud Architecture', level: 5, category: 'Technical', verified: true },
        { id: 'skill-2', name: 'Enterprise Security', level: 5, category: 'Security', verified: true },
        { id: 'skill-3', name: 'Team Leadership', level: 4, category: 'Management', verified: true }
      ],
      experience: 15,
      joinedAt: new Date('2020-01-15'),
      isVisible: true,
      order: 1,
      performance: {
        memberId: 'member-1' as any,
        projectsCompleted: 45,
        clientSatisfaction: 4.9 as any,
        responseTime: 2.5,
        expertise: [
          { id: 'exp-1', name: 'AWS Solutions Architect', level: 5, category: 'Certification', verified: true },
          { id: 'exp-2', name: 'CISSP', level: 5, category: 'Security', verified: true }
        ],
        certifications: ['AWS Solutions Architect', 'CISSP', 'PMP'],
        lastReview: new Date('2024-12-01'),
        nextReview: new Date('2025-06-01')
      },
      createdAt: new Date('2020-01-15'),
      updatedAt: new Date()
    },
    {
      id: 'member-2' as any,
      name: 'Meron Haile',
      position: 'Lead Security Architect',
      department: 'Security',
      bio: 'Cybersecurity & Risk Management specialist with 12+ years of experience',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400&h=400&fit=crop&crop=face',
      email: 'meron@nanocomputing.et' as any,
      phone: '+251911123457',
      socialLinks: {
        linkedin: 'https://linkedin.com/in/meron-haile'
      },
      skills: [
        { id: 'skill-4', name: 'Penetration Testing', level: 5, category: 'Security', verified: true },
        { id: 'skill-5', name: 'Risk Assessment', level: 5, category: 'Security', verified: true },
        { id: 'skill-6', name: 'Compliance Management', level: 4, category: 'Governance', verified: true }
      ],
      experience: 12,
      joinedAt: new Date('2020-03-01'),
      isVisible: true,
      order: 2,
      performance: {
        memberId: 'member-2' as any,
        projectsCompleted: 38,
        clientSatisfaction: 4.8 as any,
        responseTime: 1.8,
        expertise: [
          { id: 'exp-3', name: 'CISSP', level: 5, category: 'Security', verified: true },
          { id: 'exp-4', name: 'CISM', level: 5, category: 'Security', verified: true }
        ],
        certifications: ['CISSP', 'CISM', 'CEH'],
        lastReview: new Date('2024-11-15'),
        nextReview: new Date('2025-05-15')
      },
      createdAt: new Date('2020-03-01'),
      updatedAt: new Date()
    }
  ]);

  const [memberForm, setMemberForm] = useState<TeamMemberForm>({
    name: '',
    position: '',
    department: '',
    bio: '',
    avatar: '',
    email: '',
    phone: '',
    socialLinks: {},
    skills: [],
    experience: 0,
    isVisible: true
  });

  const handleEditMember = (member: EnhancedTeamMember) => {
    setSelectedMember(member);
    setMemberForm({
      name: member.name,
      position: member.position,
      department: member.department,
      bio: member.bio,
      avatar: member.avatar,
      email: member.email,
      phone: member.phone || '',
      socialLinks: member.socialLinks,
      skills: member.skills.map(skill => ({
        name: skill.name,
        level: skill.level,
        category: skill.category
      })),
      experience: member.experience,
      isVisible: member.isVisible
    });
    setIsEditing(true);
  };

  const handleSaveMember = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (selectedMember) {
      setTeamMembers(prev => prev.map(member => 
        member.id === selectedMember.id 
          ? { ...member, ...memberForm, updatedAt: new Date() } as EnhancedTeamMember
          : member
      ));
    } else {
      // Create new member
      const newMember: EnhancedTeamMember = {
        id: `member-${Date.now()}` as any,
        ...memberForm,
        email: memberForm.email as any,
        skills: memberForm.skills.map((skill: any) => ({
          id: `skill-${Date.now()}-${skill.name}`,
          ...skill,
          verified: false
        })) as TeamMemberSkill[],
        joinedAt: new Date(),
        order: teamMembers.length + 1,
        performance: {
          memberId: `member-${Date.now()}` as any,
          projectsCompleted: 0,
          clientSatisfaction: 0 as any,
          responseTime: 0,
          expertise: [],
          certifications: [],
          lastReview: new Date(),
          nextReview: new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000) // 6 months
        },
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setTeamMembers(prev => [...prev, newMember]);
    }
    
    setIsEditing(false);
    setSelectedMember(null);
  };

  const moveMemberUp = (id: string) => {
    setTeamMembers(prev => {
      const index = prev.findIndex(m => m.id === id);
      if (index > 0) {
        const newMembers = [...prev];
        [newMembers[index], newMembers[index - 1]] = [newMembers[index - 1], newMembers[index]];
        return newMembers.map((member, i) => ({ ...member, order: i + 1 }));
      }
      return prev;
    });
  };

  const moveMemberDown = (id: string) => {
    setTeamMembers(prev => {
      const index = prev.findIndex(m => m.id === id);
      if (index < prev.length - 1) {
        const newMembers = [...prev];
        [newMembers[index], newMembers[index + 1]] = [newMembers[index + 1], newMembers[index]];
        return newMembers.map((member, i) => ({ ...member, order: i + 1 }));
      }
      return prev;
    });
  };

  const getSkillLevelColor = (level: number) => {
    switch (level) {
      case 5: return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 4: return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 3: return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 2: return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 1: return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  if (isEditing) {
    return (
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">
              {selectedMember ? 'Edit Team Member' : 'Add New Team Member'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {selectedMember ? 'Update team member information' : 'Add a new team member to your organization'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSaveMember} className="bg-gradient-to-r from-primary to-blue-600">
              <Save className="w-4 h-4 mr-2" />
              Save Member
            </Button>
          </div>
        </div>

        {/* Member Form */}
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Basic Information</h3>
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Full Name</label>
                    <Input
                      value={memberForm.name}
                      onChange={(e) => setMemberForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Enter full name..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Position</label>
                    <Input
                      value={memberForm.position}
                      onChange={(e) => setMemberForm(prev => ({ ...prev, position: e.target.value }))}
                      placeholder="Job title..."
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Department</label>
                    <Input
                      value={memberForm.department}
                      onChange={(e) => setMemberForm(prev => ({ ...prev, department: e.target.value }))}
                      placeholder="Department..."
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Experience (years)</label>
                    <Input
                      type="number"
                      value={memberForm.experience}
                      onChange={(e) => setMemberForm(prev => ({ ...prev, experience: Number(e.target.value) }))}
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Bio</label>
                  <Textarea
                    value={memberForm.bio}
                    onChange={(e) => setMemberForm(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Professional biography..."
                    rows={4}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium mb-2 block">Email</label>
                    <Input
                      type="email"
                      value={memberForm.email}
                      onChange={(e) => setMemberForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="email@company.com"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-2 block">Phone</label>
                    <Input
                      value={memberForm.phone || ''}
                      onChange={(e) => setMemberForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+251911123456"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Avatar URL</label>
                  <Input
                    value={memberForm.avatar}
                    onChange={(e) => setMemberForm(prev => ({ ...prev, avatar: e.target.value }))}
                    placeholder="https://example.com/avatar.jpg"
                  />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Social Links</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">LinkedIn</label>
                  <Input
                    value={memberForm.socialLinks.linkedin || ''}
                    onChange={(e) => setMemberForm(prev => ({ 
                      ...prev, 
                      socialLinks: { ...prev.socialLinks, linkedin: e.target.value }
                    }))}
                    placeholder="https://linkedin.com/in/username"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Twitter</label>
                  <Input
                    value={memberForm.socialLinks.twitter || ''}
                    onChange={(e) => setMemberForm(prev => ({ 
                      ...prev, 
                      socialLinks: { ...prev.socialLinks, twitter: e.target.value }
                    }))}
                    placeholder="https://twitter.com/username"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">GitHub</label>
                  <Input
                    value={memberForm.socialLinks.github || ''}
                    onChange={(e) => setMemberForm(prev => ({ 
                      ...prev, 
                      socialLinks: { ...prev.socialLinks, github: e.target.value }
                    }))}
                    placeholder="https://github.com/username"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Website</label>
                  <Input
                    value={memberForm.socialLinks.website || ''}
                    onChange={(e) => setMemberForm(prev => ({ 
                      ...prev, 
                      socialLinks: { ...prev.socialLinks, website: e.target.value }
                    }))}
                    placeholder="https://website.com"
                  />
                </div>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Skills & Expertise</h3>
              <div className="space-y-4">
                {memberForm.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 border rounded-lg">
                    <div className="flex-1">
                      <Input
                        value={skill.name}
                        onChange={(e) => {
                          const newSkills = [...memberForm.skills];
                          newSkills[index] = { ...skill, name: e.target.value };
                          setMemberForm(prev => ({ ...prev, skills: newSkills }));
                        }}
                        placeholder="Skill name"
                        className="mb-2"
                      />
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-muted-foreground">Level:</span>
                        <select
                          value={skill.level}
                          onChange={(e) => {
                            const newSkills = [...memberForm.skills];
                            newSkills[index] = { ...skill, level: Number(e.target.value) as any };
                            setMemberForm(prev => ({ ...prev, skills: newSkills }));
                          }}
                          className="text-xs border rounded px-2 py-1"
                        >
                          <option value={1}>Beginner</option>
                          <option value={2}>Novice</option>
                          <option value={3}>Intermediate</option>
                          <option value={4}>Advanced</option>
                          <option value={5}>Expert</option>
                        </select>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newSkills = memberForm.skills.filter((_, i) => i !== index);
                        setMemberForm(prev => ({ ...prev, skills: newSkills }));
                      }}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setMemberForm(prev => ({
                      ...prev,
                      skills: [...prev.skills, { name: '', level: 1, category: 'Technical' }]
                    }));
                  }}
                  className="w-full"
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Skill
                </Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-4">Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Visible on Website</span>
                  <Button
                    variant={memberForm.isVisible ? "default" : "outline"}
                    size="sm"
                    onClick={() => setMemberForm(prev => ({ ...prev, isVisible: !prev.isVisible }))}
                  >
                    {memberForm.isVisible ? 'Visible' : 'Hidden'}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
            Team Management
          </h1>
          <p className="text-muted-foreground mt-2">Manage team members, skills, and performance</p>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="outline" onClick={onBack}>
            Back to Dashboard
          </Button>
          <Button onClick={() => setIsEditing(true)} className="bg-gradient-to-r from-primary to-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Member
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="members" className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            Team Members
          </TabsTrigger>
          <TabsTrigger value="performance" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Performance
          </TabsTrigger>
          <TabsTrigger value="skills" className="flex items-center gap-2">
            <Award className="w-4 h-4" />
            Skills Matrix
          </TabsTrigger>
        </TabsList>

        <TabsContent value="members" className="space-y-6">
          <div className="grid gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="w-20 h-20 rounded-full overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={member.avatar}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-4">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-3">
                            <h3 className="text-xl font-semibold">{member.name}</h3>
                            <Badge variant={member.isVisible ? "default" : "secondary"}>
                              {member.isVisible ? 'Visible' : 'Hidden'}
                            </Badge>
                          </div>
                          <p className="text-primary font-medium">{member.position}</p>
                          <p className="text-sm text-muted-foreground">{member.department} • {member.experience} years experience</p>
                          <p className="text-sm text-muted-foreground line-clamp-2">{member.bio}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm" onClick={() => moveMemberUp(member.id)}>
                            <ArrowUp className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => moveMemberDown(member.id)}>
                            <ArrowDown className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditMember(member)}>
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-6 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          {member.email}
                        </div>
                        {member.phone && (
                          <div className="flex items-center gap-1">
                            <Phone className="w-4 h-4" />
                            {member.phone}
                          </div>
                        )}
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          Joined {member.joinedAt.toLocaleDateString()}
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-500" />
                          <span className="text-sm">{member.performance.projectsCompleted} projects</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Star className="w-4 h-4 text-yellow-500" />
                          <span className="text-sm">{member.performance.clientSatisfaction} satisfaction</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-blue-500" />
                          <span className="text-sm">{member.performance.responseTime}h avg response</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-2">
                        {member.skills.slice(0, 4).map(skill => (
                          <Badge key={skill.id} className={getSkillLevelColor(skill.level)}>
                            {skill.name} (L{skill.level})
                          </Badge>
                        ))}
                        {member.skills.length > 4 && (
                          <Badge variant="outline">
                            +{member.skills.length - 4} more
                          </Badge>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        {member.socialLinks.linkedin && (
                          <Button variant="outline" size="sm">
                            <Linkedin className="w-4 h-4" />
                          </Button>
                        )}
                        {member.socialLinks.twitter && (
                          <Button variant="outline" size="sm">
                            <Twitter className="w-4 h-4" />
                          </Button>
                        )}
                        {member.socialLinks.github && (
                          <Button variant="outline" size="sm">
                            <Github className="w-4 h-4" />
                          </Button>
                        )}
                        {member.socialLinks.website && (
                          <Button variant="outline" size="sm">
                            <Globe className="w-4 h-4" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Team Members</p>
                  <p className="text-2xl font-bold">{teamMembers.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Projects</p>
                  <p className="text-2xl font-bold">
                    {Math.round(teamMembers.reduce((sum, member) => sum + member.performance.projectsCompleted, 0) / teamMembers.length)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-lg">
                  <Star className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Satisfaction</p>
                  <p className="text-2xl font-bold">
                    {(teamMembers.reduce((sum, member) => sum + member.performance.clientSatisfaction, 0) / teamMembers.length).toFixed(1)}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <Clock className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Response</p>
                  <p className="text-2xl font-bold">
                    {(teamMembers.reduce((sum, member) => sum + member.performance.responseTime, 0) / teamMembers.length).toFixed(1)}h
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Individual Performance Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h4 className="font-semibold">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.position}</p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <p className="text-2xl font-bold text-primary">{member.performance.projectsCompleted}</p>
                      <p className="text-xs text-muted-foreground">Projects</p>
                    </div>
                    <div className="text-center p-3 bg-muted/30 rounded-lg">
                      <p className="text-2xl font-bold text-primary">{member.performance.clientSatisfaction}</p>
                      <p className="text-xs text-muted-foreground">Satisfaction</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Response Time</span>
                      <span>{member.performance.responseTime}h</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Next Review</span>
                      <span>{member.performance.nextReview.toLocaleDateString()}</span>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="skills" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Skills Matrix</h3>
            
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left p-4">Team Member</th>
                    <th className="text-left p-4">Department</th>
                    <th className="text-left p-4">Top Skills</th>
                    <th className="text-left p-4">Certifications</th>
                    <th className="text-left p-4">Experience</th>
                  </tr>
                </thead>
                <tbody>
                  {teamMembers.map((member, index) => (
                    <motion.tr
                      key={member.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={member.avatar}
                            alt={member.name}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <div>
                            <p className="font-medium">{member.name}</p>
                            <p className="text-sm text-muted-foreground">{member.position}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant="outline">{member.department}</Badge>
                      </td>
                      <td className="p-4">
                        <div className="flex flex-wrap gap-1">
                          {member.skills.slice(0, 3).map(skill => (
                            <Badge key={skill.id} className={getSkillLevelColor(skill.level)}>
                              {skill.name}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">{member.performance.certifications.length} certs</p>
                      </td>
                      <td className="p-4">
                        <p className="text-sm">{member.experience} years</p>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}