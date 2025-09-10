import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { 
  CreditCard, 
  Download, 
  Search, 
  Calendar, 
  DollarSign, 
  FileText, 
  CheckCircle, 
  Clock, 
  AlertCircle,
  Plus,
  Eye,
  Filter
} from 'lucide-react';

interface Invoice {
  id: string;
  invoiceNumber: string;
  date: Date;
  dueDate: Date;
  amount: number;
  status: 'paid' | 'pending' | 'overdue' | 'draft';
  description: string;
  items: {
    description: string;
    quantity: number;
    unitPrice: number;
    total: number;
  }[];
  paymentMethod?: string;
  paidDate?: Date;
}

interface PaymentMethod {
  id: string;
  type: 'credit_card' | 'bank_account';
  last4: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
  isDefault: boolean;
}

export function BillingPayments() {
  const [activeTab, setActiveTab] = useState<'invoices' | 'payments' | 'methods'>('invoices');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  // Mock invoice data
  const [invoices] = useState<Invoice[]>([
    {
      id: '1',
      invoiceNumber: 'INV-2024-001',
      date: new Date('2024-02-01'),
      dueDate: new Date('2024-02-15'),
      amount: 2499.99,
      status: 'paid',
      description: 'IT Equipment Purchase',
      items: [
        { description: 'Dell OptiPlex 7090 Desktop', quantity: 1, unitPrice: 1299.99, total: 1299.99 },
        { description: 'HP 24" Monitor', quantity: 2, unitPrice: 599.99, total: 1199.99 }
      ],
      paymentMethod: 'Credit Card (**** 4532)',
      paidDate: new Date('2024-02-10')
    },
    {
      id: '2',
      invoiceNumber: 'INV-2024-002',
      date: new Date('2024-02-15'),
      dueDate: new Date('2024-03-01'),
      amount: 899.99,
      status: 'pending',
      description: 'Network Equipment',
      items: [
        { description: 'Cisco Router RV340W', quantity: 1, unitPrice: 899.99, total: 899.99 }
      ]
    },
    {
      id: '3',
      invoiceNumber: 'INV-2024-003',
      date: new Date('2024-01-15'),
      dueDate: new Date('2024-01-30'),
      amount: 1599.99,
      status: 'overdue',
      description: 'Software & Hardware Bundle',
      items: [
        { description: 'HP LaserJet Pro M404n', quantity: 1, unitPrice: 299.99, total: 299.99 },
        { description: 'Lenovo ThinkPad E15', quantity: 1, unitPrice: 1299.99, total: 1299.99 }
      ]
    }
  ]);

  // Mock payment methods
  const [paymentMethods] = useState<PaymentMethod[]>([
    {
      id: '1',
      type: 'credit_card',
      last4: '4532',
      brand: 'Visa',
      expiryMonth: 12,
      expiryYear: 2025,
      isDefault: true
    },
    {
      id: '2',
      type: 'credit_card',
      last4: '8765',
      brand: 'Mastercard',
      expiryMonth: 8,
      expiryYear: 2026,
      isDefault: false
    },
    {
      id: '3',
      type: 'bank_account',
      last4: '1234',
      isDefault: false
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending': return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'overdue': return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'draft': return <FileText className="w-4 h-4 text-gray-500" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400';
      case 'overdue': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      case 'draft': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const filteredInvoices = invoices.filter(invoice => {
    const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         invoice.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalOutstanding = invoices
    .filter(inv => inv.status === 'pending' || inv.status === 'overdue')
    .reduce((sum, inv) => sum + inv.amount, 0);

  const totalPaid = invoices
    .filter(inv => inv.status === 'paid')
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-primary">Billing & Payments</h1>
          <p className="text-muted-foreground">Manage your invoices and payment methods</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-primary/80">
          <Plus className="w-4 h-4 mr-2" />
          Add Payment Method
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-lg">
              <AlertCircle className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Outstanding Balance</p>
              <p className="text-2xl font-bold text-red-600">ETB {totalOutstanding.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <CheckCircle className="w-6 h-6 text-green-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Paid</p>
              <p className="text-2xl font-bold text-green-600">ETB {totalPaid.toLocaleString()}</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Invoices</p>
              <p className="text-2xl font-bold">{invoices.length}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Tab Navigation */}
      <div className="flex space-x-1 bg-muted p-1 rounded-lg w-fit">
        <Button
          variant={activeTab === 'invoices' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('invoices')}
        >
          <FileText className="w-4 h-4 mr-2" />
          Invoices
        </Button>
        <Button
          variant={activeTab === 'payments' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('payments')}
        >
          <DollarSign className="w-4 h-4 mr-2" />
          Payment History
        </Button>
        <Button
          variant={activeTab === 'methods' ? 'default' : 'ghost'}
          onClick={() => setActiveTab('methods')}
        >
          <CreditCard className="w-4 h-4 mr-2" />
          Payment Methods
        </Button>
      </div>

      {/* Invoices Tab */}
      {activeTab === 'invoices' && (
        <div className="space-y-6">
          {/* Search and Filter */}
          <Card className="p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  placeholder="Search invoices..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="px-3 py-2 border rounded-md bg-background"
              >
                <option value="all">All Status</option>
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
                <option value="draft">Draft</option>
              </select>
            </div>
          </Card>

          {/* Invoices List */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Invoice List */}
            <div className="space-y-4">
              {filteredInvoices.map((invoice, index) => (
                <motion.div
                  key={invoice.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className={`p-4 cursor-pointer transition-all hover:shadow-md ${
                      selectedInvoice?.id === invoice.id ? 'ring-2 ring-primary' : ''
                    }`}
                    onClick={() => setSelectedInvoice(invoice)}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-semibold">{invoice.invoiceNumber}</h3>
                        <p className="text-sm text-muted-foreground">{invoice.description}</p>
                      </div>
                      <Badge className={getStatusColor(invoice.status)}>
                        {getStatusIcon(invoice.status)}
                        <span className="ml-1 capitalize">{invoice.status}</span>
                      </Badge>
                    </div>

                    <div className="grid grid-cols-2 gap-4 mb-3">
                      <div>
                        <p className="text-xs text-muted-foreground">Amount</p>
                        <p className="font-semibold">ETB {invoice.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Due Date</p>
                        <p className="text-sm">{invoice.dueDate.toLocaleDateString()}</p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                      <Button size="sm" variant="outline">
                        <Download className="w-4 h-4" />
                      </Button>
                      {invoice.status === 'pending' && (
                        <Button size="sm" className="flex-1">
                          <CreditCard className="w-4 h-4 mr-2" />
                          Pay Now
                        </Button>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Invoice Details */}
            {selectedInvoice && (
              <Card className="p-6 h-fit sticky top-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold">{selectedInvoice.invoiceNumber}</h3>
                    <p className="text-sm text-muted-foreground">{selectedInvoice.description}</p>
                  </div>
                  <Badge className={getStatusColor(selectedInvoice.status)}>
                    {selectedInvoice.status}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Invoice Date</p>
                    <p>{selectedInvoice.date.toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Due Date</p>
                    <p>{selectedInvoice.dueDate.toLocaleDateString()}</p>
                  </div>
                  {selectedInvoice.paidDate && (
                    <>
                      <div>
                        <p className="text-muted-foreground">Paid Date</p>
                        <p>{selectedInvoice.paidDate.toLocaleDateString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Payment Method</p>
                        <p>{selectedInvoice.paymentMethod}</p>
                      </div>
                    </>
                  )}
                </div>

                {/* Invoice Items */}
                <div className="space-y-2 mb-4">
                  <h4 className="font-medium">Items:</h4>
                  {selectedInvoice.items.map((item, index) => (
                    <div key={index} className="flex justify-between items-center p-2 bg-muted/50 rounded text-sm">
                      <div>
                        <p className="font-medium">{item.description}</p>
                        <p className="text-muted-foreground">
                          {item.quantity} × ETB {item.unitPrice.toLocaleString()}
                        </p>
                      </div>
                      <p className="font-medium">ETB {item.total.toLocaleString()}</p>
                    </div>
                  ))}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span>Total Amount</span>
                    <span>ETB {selectedInvoice.amount.toLocaleString()}</span>
                  </div>
                </div>

                {selectedInvoice.status === 'pending' && (
                  <div className="flex gap-2 mt-4">
                    <Button className="flex-1">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay Now
                    </Button>
                    <Button variant="outline">
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </Card>
            )}
          </div>
        </div>
      )}

      {/* Payment Methods Tab */}
      {activeTab === 'methods' && (
        <div className="max-w-2xl space-y-6">
          <div className="grid gap-4">
            {paymentMethods.map((method, index) => (
              <motion.div
                key={method.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <CreditCard className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold">
                            {method.type === 'credit_card' 
                              ? `${method.brand} •••• ${method.last4}`
                              : `Bank Account •••• ${method.last4}`
                            }
                          </h3>
                          {method.isDefault && (
                            <Badge>Default</Badge>
                          )}
                        </div>
                        {method.type === 'credit_card' && (
                          <p className="text-sm text-muted-foreground">
                            Expires {method.expiryMonth}/{method.expiryYear}
                          </p>
                        )}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                      <Button variant="outline" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <Card className="p-6 border-dashed border-2">
            <div className="text-center">
              <CreditCard className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">Add New Payment Method</h3>
              <p className="text-muted-foreground mb-4">
                Add a credit card or bank account for easy payments
              </p>
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Payment Method
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Payment History Tab */}
      {activeTab === 'payments' && (
        <div className="space-y-4">
          {invoices
            .filter(inv => inv.status === 'paid')
            .map((invoice, index) => (
              <motion.div
                key={invoice.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-green-100 dark:bg-green-900/20 rounded-lg">
                        <CheckCircle className="w-6 h-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold">{invoice.invoiceNumber}</h3>
                        <p className="text-sm text-muted-foreground">
                          Paid on {invoice.paidDate?.toLocaleDateString()} • {invoice.paymentMethod}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">ETB {invoice.amount.toLocaleString()}</p>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Receipt
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
}
