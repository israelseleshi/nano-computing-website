import { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Textarea } from '../ui/textarea';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Eye, 
  Save, 
  Calendar, 
  Tag, 
  Search,
  MoreVertical,
  FileText,
  Settings,
  TrendingUp,
  Users,
  Clock,
  CheckCircle,
  Zap
} from 'lucide-react';
import { EnhancedBlogPost, BlogCategory, BlogPostForm } from '../../types/admin';

interface BlogManagementProps {}

export function BlogManagement({}: BlogManagementProps) {
  const [activeTab, setActiveTab] = useState('posts');
  const [selectedPost, setSelectedPost] = useState<EnhancedBlogPost | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock data - in real app, this would come from API
  const [blogPosts, setBlogPosts] = useState<EnhancedBlogPost[]>([
    {
      id: 'post-1' as any,
      title: 'The Future of Cybersecurity in a Post-Quantum World',
      slug: 'future-cybersecurity-post-quantum',
      excerpt: 'How quantum computing will reshape enterprise security strategies',
      content: '<p>Comprehensive analysis of quantum computing impact...</p>',
      author: {
        id: 'user-1' as any,
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
        bio: 'Chief Technology Officer'
      },
      category: {
        id: 'cat-1',
        name: 'Cybersecurity',
        slug: 'cybersecurity',
        color: '#ef4444',
        postCount: 12,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      tags: [
        { id: 'tag-1', name: 'Quantum Computing', slug: 'quantum-computing', color: '#3b82f6', postCount: 5, createdAt: new Date() },
        { id: 'tag-2', name: 'Security', slug: 'security', color: '#ef4444', postCount: 15, createdAt: new Date() }
      ],
      featuredImage: 'https://images.unsplash.com/photo-1695462131550-24be3156b25d?w=800&h=600&fit=crop',
      seoMetadata: {
        title: 'The Future of Cybersecurity in a Post-Quantum World | Nano Computing',
        description: 'Explore how quantum computing will reshape enterprise security strategies',
        keywords: [...['quantum computing', 'cybersecurity', 'enterprise security']],
        ogImage: 'https://images.unsplash.com/photo-1695462131550-24be3156b25d?w=1200&h=630&fit=crop'
      },
      status: 'published',
      publishedAt: new Date('2025-01-15'),
      readTime: 8,
      viewCount: 2341,
      shareCount: 156,
      isPublished: true,
      createdAt: new Date('2025-01-10'),
      updatedAt: new Date('2025-01-15')
    }
  ]);

  const [categories] = useState<BlogCategory[]>([
    {
      id: 'cat-1',
      name: 'Cybersecurity',
      slug: 'cybersecurity',
      description: 'Security-related articles and insights',
      color: '#ef4444',
      postCount: 12,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 'cat-2',
      name: 'Cloud Computing',
      slug: 'cloud-computing',
      description: 'Cloud infrastructure and services',
      color: '#3b82f6',
      postCount: 8,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ]);

  const [postForm, setPostForm] = useState<BlogPostForm>({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    categoryId: '',
    tags: [],
    featuredImage: '',
    seoTitle: '',
    seoDescription: '',
    seoKeywords: [],
    status: 'draft'
  });

  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || post.category.id === selectedCategory;
    const matchesStatus = selectedStatus === 'all' || post.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handleCreatePost = () => {
    setSelectedPost(null);
    setPostForm({
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      categoryId: '',
      tags: [],
      featuredImage: '',
      seoTitle: '',
      seoDescription: '',
      seoKeywords: [],
      status: 'draft'
    });
    setIsEditing(true);
  };

  const handleEditPost = (post: EnhancedBlogPost) => {
    setSelectedPost(post);
    setPostForm({
      title: post.title,
      slug: post.slug,
      excerpt: post.excerpt,
      content: post.content,
      categoryId: post.category.id,
      tags: post.tags.map(tag => tag.name),
      featuredImage: post.featuredImage,
      seoTitle: post.seoMetadata.title,
      seoDescription: post.seoMetadata.description,
      seoKeywords: [...post.seoMetadata.keywords],
      status: post.status as 'draft' | 'published' | 'scheduled'
    });
    setIsEditing(true);
  };

  const handleSavePost = async () => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (selectedPost) {
      // Update existing post
      setBlogPosts(prev => prev.map(post => 
        post.id === selectedPost.id 
          ? { ...post, ...postForm, updatedAt: new Date() } as unknown as EnhancedBlogPost
          : post
      ));
    } else {
      // Create new post
      const newPost: EnhancedBlogPost = {
        id: `post-${Date.now()}` as any,
        ...postForm,
        author: {
          id: 'admin-1' as any,
          name: 'Admin User',
          avatar: '/logo.jpg'
        },
        category: categories.find(cat => cat.id === postForm.categoryId)!,
        tags: postForm.tags.map(tagName => ({
          id: `tag-${tagName}`,
          name: tagName,
          slug: tagName.toLowerCase().replace(/\s+/g, '-'),
          color: '#6b7280',
          postCount: 1,
          createdAt: new Date()
        })),
        seoMetadata: {
          title: postForm.seoTitle,
          description: postForm.seoDescription,
          keywords: postForm.seoKeywords
        },
        readTime: Math.ceil(postForm.content.length / 200),
        viewCount: 0,
        shareCount: 0,
        isPublished: postForm.status === 'published',
        createdAt: new Date(),
        updatedAt: new Date()
      };
      setBlogPosts(prev => [newPost, ...prev]);
    }
    
    setIsEditing(false);
    setSelectedPost(null);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'archived': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
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
              {selectedPost ? 'Edit Article' : 'Create New Article'}
            </h1>
            <p className="text-muted-foreground mt-2">
              {selectedPost ? 'Update your blog post' : 'Create engaging content for your audience'}
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
            <Button onClick={handleSavePost} className="bg-gradient-to-r from-primary to-blue-600">
              <Save className="w-4 h-4 mr-2" />
              Save Article
            </Button>
          </div>
        </div>

        {/* Editor Form */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-2 block">Title</label>
                  <Input
                    value={postForm.title}
                    onChange={(e) => {
                      const title = e.target.value;
                      setPostForm(prev => ({
                        ...prev,
                        title,
                        slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
                      }));
                    }}
                    placeholder="Enter article title..."
                    className="text-lg font-semibold"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Slug</label>
                  <Input
                    value={postForm.slug}
                    onChange={(e) => setPostForm(prev => ({ ...prev, slug: e.target.value }))}
                    placeholder="article-url-slug"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Excerpt</label>
                  <Textarea
                    value={postForm.excerpt}
                    onChange={(e) => setPostForm(prev => ({ ...prev, excerpt: e.target.value }))}
                    placeholder="Brief description of the article..."
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Content</label>
                  <Textarea
                    value={postForm.content}
                    onChange={(e) => setPostForm(prev => ({ ...prev, content: e.target.value }))}
                    placeholder="Write your article content here..."
                    rows={20}
                    className="font-mono text-sm"
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Publish Settings */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Publish Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Status</label>
                  <Select value={postForm.status} onValueChange={(value: any) => setPostForm(prev => ({ ...prev, status: value }))}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="scheduled">Scheduled</SelectItem>
                      <SelectItem value="published">Published</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Category</label>
                  <Select value={postForm.categoryId} onValueChange={(value) => setPostForm(prev => ({ ...prev, categoryId: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Featured Image URL</label>
                  <Input
                    value={postForm.featuredImage}
                    onChange={(e) => setPostForm(prev => ({ ...prev, featuredImage: e.target.value }))}
                    placeholder="https://example.com/image.jpg"
                  />
                </div>
              </div>
            </Card>

            {/* SEO Settings */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">SEO Settings</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">SEO Title</label>
                  <Input
                    value={postForm.seoTitle}
                    onChange={(e) => setPostForm(prev => ({ ...prev, seoTitle: e.target.value }))}
                    placeholder="SEO optimized title..."
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">SEO Description</label>
                  <Textarea
                    value={postForm.seoDescription}
                    onChange={(e) => setPostForm(prev => ({ ...prev, seoDescription: e.target.value }))}
                    placeholder="Meta description for search engines..."
                    rows={3}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">Keywords (comma separated)</label>
                  <Input
                    value={postForm.seoKeywords.join(', ')}
                    onChange={(e) => setPostForm(prev => ({ 
                      ...prev, 
                      seoKeywords: e.target.value.split(',').map(k => k.trim()).filter(k => k)
                    }))}
                    placeholder="keyword1, keyword2, keyword3"
                  />
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
            Blog Management
          </h1>
          <p className="text-muted-foreground mt-2">Manage your blog content, categories, and SEO</p>
        </div>
        <div className="flex items-center gap-4">
          <Button onClick={handleCreatePost} className="bg-gradient-to-r from-primary to-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            New Article
          </Button>
        </div>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="posts" className="flex items-center gap-2">
            <FileText className="w-4 h-4" />
            Articles
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <Tag className="w-4 h-4" />
            Categories
          </TabsTrigger>
          <TabsTrigger value="analytics" className="flex items-center gap-2">
            <TrendingUp className="w-4 h-4" />
            Analytics
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center gap-2">
            <Settings className="w-4 h-4" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="posts" className="space-y-6">
          {/* Filters */}
          <Card className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search articles..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="archived">Archived</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Articles List */}
          <div className="grid gap-6">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 hover:shadow-lg transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="w-32 h-24 rounded-lg overflow-hidden bg-muted flex-shrink-0">
                      <img
                        src={post.featuredImage}
                        alt={post.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-1 space-y-3">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold line-clamp-2">{post.title}</h3>
                          <p className="text-muted-foreground line-clamp-2">{post.excerpt}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={getStatusColor(post.status)}>
                            {post.status}
                          </Badge>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Users className="w-4 h-4" />
                          {post.author.name}
                        </div>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {post.publishedAt?.toLocaleDateString()}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {post.readTime} min read
                        </div>
                        <div className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.viewCount.toLocaleString()} views
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" style={{ borderColor: post.category.color, color: post.category.color }}>
                            {post.category.name}
                          </Badge>
                          {post.tags.slice(0, 2).map(tag => (
                            <Badge key={tag.id} variant="secondary" className="text-xs">
                              {tag.name}
                            </Badge>
                          ))}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            Preview
                          </Button>
                          <Button variant="outline" size="sm" onClick={() => handleEditPost(post)}>
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="outline" size="sm">
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold">Categories</h3>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Category
              </Button>
            </div>
            
            <div className="space-y-4">
              {categories.map(category => (
                <div key={category.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <div 
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                    <div>
                      <h4 className="font-medium">{category.name}</h4>
                      <p className="text-sm text-muted-foreground">{category.postCount} posts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="outline" size="sm">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Articles</p>
                  <p className="text-2xl font-bold">{blogPosts.length}</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Total Views</p>
                  <p className="text-2xl font-bold">
                    {blogPosts.reduce((sum, post) => sum + post.viewCount, 0).toLocaleString()}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <TrendingUp className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Avg. Read Time</p>
                  <p className="text-2xl font-bold">
                    {Math.round(blogPosts.reduce((sum, post) => sum + post.readTime, 0) / blogPosts.length)} min
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                  <Tag className="w-6 h-6 text-orange-600" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Categories</p>
                  <p className="text-2xl font-bold">{categories.length}</p>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6">
            <h3 className="text-xl font-semibold mb-6">Blog Settings</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Auto-save Drafts</h4>
                  <p className="text-sm text-muted-foreground">Automatically save drafts every 30 seconds</p>
                </div>
                <Button variant="outline" size="sm">
                  <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                  Enabled
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">SEO Optimization</h4>
                  <p className="text-sm text-muted-foreground">Get suggestions for better SEO</p>
                </div>
                <Button variant="outline" size="sm">
                  <Zap className="w-4 h-4 mr-2 text-yellow-500" />
                  Configure
                </Button>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">Scheduled Publishing</h4>
                  <p className="text-sm text-muted-foreground">Enable scheduled post publishing</p>
                </div>
                <Button variant="outline" size="sm">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  Active
                </Button>
              </div>
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}