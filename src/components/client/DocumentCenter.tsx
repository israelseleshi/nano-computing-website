import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  FileText, 
  Download, 
  Search, 
  Filter, 
  Calendar, 
  Eye, 
  Share2, 
  Star, 
  StarOff,
  Folder,
  File,
  Image,
  Video,
  Archive,
  Shield,
  Award,
  BookOpen,
  Settings,
  Printer,
  Monitor,
  Smartphone,
  HardDrive,
  Network,
  Wifi
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'warranty' | 'manual' | 'invoice' | 'contract' | 'certificate' | 'guide' | 'specification';
  category: 'hardware' | 'software' | 'network' | 'security' | 'general';
  fileType: 'pdf' | 'doc' | 'docx' | 'jpg' | 'png' | 'mp4' | 'zip';
  size: number; // in bytes
  uploadDate: Date;
  expiryDate?: Date;
  description: string;
  tags: string[];
  isFavorite: boolean;
  isShared: boolean;
  relatedProduct?: string;
  downloadCount: number;
}

const documentTypes = [
  { id: 'warranty', name: 'Warranties', icon: Shield, color: 'text-green-600' },
  { id: 'manual', name: 'User Manuals', icon: BookOpen, color: 'text-blue-600' },
  { id: 'invoice', name: 'Invoices', icon: FileText, color: 'text-purple-600' },
  { id: 'contract', name: 'Contracts', icon: File, color: 'text-orange-600' },
  { id: 'certificate', name: 'Certificates', icon: Award, color: 'text-yellow-600' },
  { id: 'guide', name: 'Setup Guides', icon: Settings, color: 'text-indigo-600' },
  { id: 'specification', name: 'Specifications', icon: Monitor, color: 'text-red-600' }
];

const categories = [
  { id: 'hardware', name: 'Hardware', icon: HardDrive },
  { id: 'software', name: 'Software', icon: Monitor },
  { id: 'network', name: 'Network', icon: Network },
  { id: 'security', name: 'Security', icon: Shield },
  { id: 'general', name: 'General', icon: Folder }
];

export function DocumentCenter() {
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('date');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);

  // Mock documents data
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'Dell OptiPlex 7090 Warranty Certificate',
      type: 'warranty',
      category: 'hardware',
      fileType: 'pdf',
      size: 245760, // 240 KB
      uploadDate: new Date('2024-01-15'),
      expiryDate: new Date('2027-01-15'),
      description: 'Three-year comprehensive warranty coverage for Dell OptiPlex 7090 desktop computer',
      tags: ['dell', 'optiplex', 'desktop', 'warranty', '3-year'],
      isFavorite: true,
      isShared: false,
      relatedProduct: 'Dell OptiPlex 7090',
      downloadCount: 12
    },
    {
      id: '2',
      name: 'HP LaserJet Pro M404n User Manual',
      type: 'manual',
      category: 'hardware',
      fileType: 'pdf',
      size: 1048576, // 1 MB
      uploadDate: new Date('2024-02-01'),
      description: 'Complete user manual and setup guide for HP LaserJet Pro M404n printer',
      tags: ['hp', 'laserjet', 'printer', 'manual', 'setup'],
      isFavorite: false,
      isShared: true,
      relatedProduct: 'HP LaserJet Pro M404n',
      downloadCount: 8
    },
    {
      id: '3',
      name: 'Network Security Assessment Report',
      type: 'certificate',
      category: 'security',
      fileType: 'pdf',
      size: 512000, // 500 KB
      uploadDate: new Date('2024-02-14'),
      description: 'Comprehensive security audit and compliance certificate for network infrastructure',
      tags: ['security', 'audit', 'compliance', 'network', 'certificate'],
      isFavorite: true,
      isShared: false,
      downloadCount: 5
    },
    {
      id: '4',
      name: 'Cisco Router RV340W Setup Guide',
      type: 'guide',
      category: 'network',
      fileType: 'pdf',
      size: 768000, // 750 KB
      uploadDate: new Date('2024-02-10'),
      description: 'Step-by-step configuration guide for Cisco RV340W wireless router',
      tags: ['cisco', 'router', 'wireless', 'setup', 'configuration'],
      isFavorite: false,
      isShared: true,
      relatedProduct: 'Cisco Router RV340W',
      downloadCount: 15
    },
    {
      id: '5',
      name: 'Adobe Creative Suite License Agreement',
      type: 'contract',
      category: 'software',
      fileType: 'pdf',
      size: 204800, // 200 KB
      uploadDate: new Date('2024-01-20'),
      expiryDate: new Date('2025-01-20'),
      description: 'Software license agreement and terms of use for Adobe Creative Suite',
      tags: ['adobe', 'creative-suite', 'license', 'software', 'agreement'],
      isFavorite: false,
      isShared: false,
      downloadCount: 3
    },
    {
      id: '6',
      name: 'Lenovo ThinkPad E15 Technical Specifications',
      type: 'specification',
      category: 'hardware',
      fileType: 'pdf',
      size: 358400, // 350 KB
      uploadDate: new Date('2024-01-25'),
      description: 'Detailed technical specifications and hardware configuration details',
      tags: ['lenovo', 'thinkpad', 'laptop', 'specifications', 'hardware'],
      isFavorite: true,
      isShared: true,
      relatedProduct: 'Lenovo ThinkPad E15',
      downloadCount: 20
    },
    {
      id: '7',
      name: 'IT Equipment Purchase Invoice - February 2024',
      type: 'invoice',
      category: 'general',
      fileType: 'pdf',
      size: 153600, // 150 KB
      uploadDate: new Date('2024-02-15'),
      description: 'Invoice for IT equipment purchased in February 2024',
      tags: ['invoice', 'purchase', 'february', '2024', 'equipment'],
      isFavorite: false,
      isShared: false,
      downloadCount: 7
    },
    {
      id: '8',
      name: 'Network Topology Diagram',
      type: 'guide',
      category: 'network',
      fileType: 'jpg',
      size: 2097152, // 2 MB
      uploadDate: new Date('2024-02-05'),
      description: 'Visual diagram of current network infrastructure and connections',
      tags: ['network', 'topology', 'diagram', 'infrastructure', 'visual'],
      isFavorite: true,
      isShared: true,
      downloadCount: 25
    }
  ]);

  const getFileIcon = (fileType: string) => {
    switch (fileType) {
      case 'pdf': return <FileText className="w-8 h-8 text-red-500" />;
      case 'doc':
      case 'docx': return <FileText className="w-8 h-8 text-blue-500" />;
      case 'jpg':
      case 'png': return <Image className="w-8 h-8 text-green-500" />;
      case 'mp4': return <Video className="w-8 h-8 text-purple-500" />;
      case 'zip': return <Archive className="w-8 h-8 text-orange-500" />;
      default: return <File className="w-8 h-8 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    const typeData = documentTypes.find(t => t.id === type);
    if (!typeData) return <FileText className="w-4 h-4" />;
    const IconComponent = typeData.icon;
    return <IconComponent className={`w-4 h-4 ${typeData.color}`} />;
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const toggleFavorite = (documentId: string) => {
    setDocuments(prev => prev.map(doc => 
      doc.id === documentId ? { ...doc, isFavorite: !doc.isFavorite } : doc
    ));
  };

  const filteredDocuments = documents.filter(doc => {
    const matchesSearch = doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || doc.type === typeFilter;
    const matchesCategory = categoryFilter === 'all' || doc.category === categoryFilter;
    return matchesSearch && matchesType && matchesCategory;
  });

  const sortedDocuments = [...filteredDocuments].sort((a, b) => {
    switch (sortBy) {
      case 'name': return a.name.localeCompare(b.name);
      case 'date': return b.uploadDate.getTime() - a.uploadDate.getTime();
      case 'size': return b.size - a.size;
      case 'downloads': return b.downloadCount - a.downloadCount;
      default: return 0;
    }
  });

  const favoriteDocuments = documents.filter(doc => doc.isFavorite);
  const recentDocuments = documents
    .sort((a, b) => b.uploadDate.getTime() - a.uploadDate.getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Document Center</h1>
          <p className="text-muted-foreground">Access warranties, manuals, and important documents</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
          <Button className="bg-gradient-to-r from-primary to-primary/80">
            <Download className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <FileText className="w-8 h-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{documents.length}</p>
              <p className="text-sm text-muted-foreground">Total Documents</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Star className="w-8 h-8 text-yellow-500" />
            <div>
              <p className="text-2xl font-bold">{favoriteDocuments.length}</p>
              <p className="text-sm text-muted-foreground">Favorites</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold">
                {documents.filter(d => d.type === 'warranty').length}
              </p>
              <p className="text-sm text-muted-foreground">Warranties</p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Share2 className="w-8 h-8 text-purple-500" />
            <div>
              <p className="text-2xl font-bold">
                {documents.filter(d => d.isShared).length}
              </p>
              <p className="text-sm text-muted-foreground">Shared</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Access Sections */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Favorites */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500" />
            Favorite Documents
          </h3>
          <div className="space-y-3">
            {favoriteDocuments.slice(0, 3).map(doc => (
              <div key={doc.id} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded">
                {getFileIcon(doc.fileType)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">{formatFileSize(doc.size)}</p>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>

        {/* Recent Documents */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-blue-500" />
            Recent Documents
          </h3>
          <div className="space-y-3">
            {recentDocuments.slice(0, 3).map(doc => (
              <div key={doc.id} className="flex items-center gap-3 p-2 hover:bg-muted/50 rounded">
                {getFileIcon(doc.fileType)}
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{doc.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {doc.uploadDate.toLocaleDateString()}
                  </p>
                </div>
                <Button size="sm" variant="ghost">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Document Categories */}
      <div className="grid md:grid-cols-7 gap-4">
        {documentTypes.map(type => {
          const count = documents.filter(d => d.type === type.id).length;
          const IconComponent = type.icon;
          return (
            <Card 
              key={type.id} 
              className="p-4 cursor-pointer hover:shadow-md transition-all"
              onClick={() => setTypeFilter(type.id)}
            >
              <div className="text-center">
                <IconComponent className={`w-8 h-8 mx-auto mb-2 ${type.color}`} />
                <p className="font-medium text-sm">{type.name}</p>
                <p className="text-xs text-muted-foreground">{count} docs</p>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Search and Filter */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Types</option>
            {documentTypes.map(type => (
              <option key={type.id} value={type.id}>{type.name}</option>
            ))}
          </select>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{category.name}</option>
            ))}
          </select>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="px-3 py-2 border rounded-md bg-background"
          >
            <option value="date">Sort by Date</option>
            <option value="name">Sort by Name</option>
            <option value="size">Sort by Size</option>
            <option value="downloads">Sort by Downloads</option>
          </select>
        </div>
      </Card>

      {/* Documents Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedDocuments.map((document, index) => (
          <motion.div
            key={document.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-md transition-all cursor-pointer">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  {getFileIcon(document.fileType)}
                  <div className="flex items-center gap-1">
                    {getTypeIcon(document.type)}
                    <Badge variant="secondary" className="text-xs">
                      {document.type}
                    </Badge>
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite(document.id);
                  }}
                >
                  {document.isFavorite ? (
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  ) : (
                    <StarOff className="w-4 h-4" />
                  )}
                </Button>
              </div>

              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold line-clamp-2">{document.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {document.description}
                  </p>
                </div>

                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{formatFileSize(document.size)}</span>
                  <span>{document.uploadDate.toLocaleDateString()}</span>
                </div>

                {document.expiryDate && (
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="w-4 h-4 text-orange-500" />
                    <span className="text-orange-600">
                      Expires: {document.expiryDate.toLocaleDateString()}
                    </span>
                  </div>
                )}

                <div className="flex flex-wrap gap-1">
                  {document.tags.slice(0, 3).map(tag => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                  {document.tags.length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{document.tags.length - 3}
                    </Badge>
                  )}
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Download className="w-4 h-4" />
                    <span>{document.downloadCount} downloads</span>
                  </div>
                  <div className="flex gap-1">
                    <Button size="sm" variant="outline">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {document.isShared && (
                  <div className="flex items-center gap-2 text-sm text-blue-600 bg-blue-50 dark:bg-blue-900/20 p-2 rounded">
                    <Share2 className="w-4 h-4" />
                    <span>Shared document</span>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card className="p-12 text-center">
          <FileText className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No documents found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your search criteria or upload new documents.
          </p>
          <Button>
            <Download className="w-4 h-4 mr-2" />
            Upload Document
          </Button>
        </Card>
      )}
    </div>
  );
}
