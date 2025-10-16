import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs'
import { LineChart, Line, BarChart, Bar, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'
import { TrendingUp, DollarSign, Users, Package, ArrowUp, ArrowDown } from 'lucide-react'

interface StatisticsPageProps {
  language: string
}

export function StatisticsPage({ language }: StatisticsPageProps) {
  const content = {
    en: {
      title: 'Business Analytics',
      subtitle: 'Track your business growth and performance',
      revenue: 'Revenue',
      customers: 'Customers',
      products: 'Products',
      growth: 'Growth Rate',
      monthly: 'Monthly Overview',
      yearly: 'Yearly Trend',
      categories: 'Product Categories',
      revenueTitle: 'Revenue Growth',
      customerTitle: 'Customer Acquisition',
      productTitle: 'Product Sales',
      categoryTitle: 'Sales by Category',
      thisMonth: 'This Month',
      vsLastMonth: 'vs Last Month'
    },
    hi: {
      title: 'व्यवसाय विश्लेषण',
      subtitle: 'अपने व्यवसाय की वृद्धि और प्रदर्शन को ट्रैक करें',
      revenue: 'राजस्व',
      customers: 'ग्राहक',
      products: 'उत्पाद',
      growth: 'वृद्धि दर',
      monthly: 'मासिक अवलोकन',
      yearly: 'वार्षिक रुझान',
      categories: 'उत्पाद श्रेणियां',
      revenueTitle: 'राजस्व वृद्धि',
      customerTitle: 'ग्राहक अधिग्रहण',
      productTitle: 'उत्पाद बिक्री',
      categoryTitle: 'श्रेणी के अनुसार बिक्री',
      thisMonth: 'इस महीने',
      vsLastMonth: 'पिछले महीने की तुलना'
    },
    mr: {
      title: 'व्यवसाय विश्लेषण',
      subtitle: 'तुमच्या व्यवसायाची वाढ आणि कार्यप्रदर्शन ट्रॅक करा',
      revenue: 'उत्पन्न',
      customers: 'ग्राहक',
      products: 'उत्पादने',
      growth: 'वाढ दर',
      monthly: 'मासिक विहंगावलोकन',
      yearly: 'वार्षिक ट्रेंड',
      categories: 'उत्पादन श्रेणी',
      revenueTitle: 'उत्पन्न वाढ',
      customerTitle: 'ग्राहक संपादन',
      productTitle: 'उत्पादन विक्री',
      categoryTitle: 'श्रेणीनुसार विक्री',
      thisMonth: 'या महिन्यात',
      vsLastMonth: 'मागील महिन्याच्या तुलनेत'
    }
  }

  const currentContent = content[language as keyof typeof content] || content.en

  // Sample data - in real app, this would come from backend
  const monthlyData = [
    { month: 'Jan', revenue: 12000, customers: 45, products: 120 },
    { month: 'Feb', revenue: 15000, customers: 52, products: 145 },
    { month: 'Mar', revenue: 18000, customers: 68, products: 165 },
    { month: 'Apr', revenue: 22000, customers: 75, products: 190 },
    { month: 'May', revenue: 26000, customers: 89, products: 210 },
    { month: 'Jun', revenue: 31000, customers: 102, products: 245 },
    { month: 'Jul', revenue: 35000, customers: 118, products: 270 },
    { month: 'Aug', revenue: 38000, customers: 125, products: 285 },
    { month: 'Sep', revenue: 42000, customers: 140, products: 310 },
    { month: 'Oct', revenue: 48000, customers: 156, products: 340 }
  ]

  const categoryData = [
    { name: 'Agriculture', value: 35, color: '#22c55e' },
    { name: 'Handicrafts', value: 25, color: '#f97316' },
    { name: 'Dairy', value: 20, color: '#3b82f6' },
    { name: 'Textiles', value: 15, color: '#a855f7' },
    { name: 'Others', value: 5, color: '#64748b' }
  ]

  const stats = [
    {
      title: currentContent.revenue,
      value: '₹48,000',
      change: '+23%',
      positive: true,
      icon: DollarSign,
      color: 'from-green-500 to-emerald-600'
    },
    {
      title: currentContent.customers,
      value: '156',
      change: '+11%',
      positive: true,
      icon: Users,
      color: 'from-blue-500 to-cyan-600'
    },
    {
      title: currentContent.products,
      value: '340',
      change: '+9%',
      positive: true,
      icon: Package,
      color: 'from-orange-500 to-amber-600'
    },
    {
      title: currentContent.growth,
      value: '42%',
      change: '+5%',
      positive: true,
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-600'
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl">{currentContent.title}</h1>
        <p className="text-muted-foreground">{currentContent.subtitle}</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const IconComponent = stat.icon
          return (
            <Card key={index} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.title}</p>
                    <h3 className="text-2xl mb-2">{stat.value}</h3>
                    <div className="flex items-center gap-1">
                      {stat.positive ? (
                        <ArrowUp className="w-4 h-4 text-green-600" />
                      ) : (
                        <ArrowDown className="w-4 h-4 text-red-600" />
                      )}
                      <span className={`text-sm ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                        {stat.change}
                      </span>
                      <span className="text-sm text-muted-foreground">{currentContent.vsLastMonth}</span>
                    </div>
                  </div>
                  <div className={`p-3 bg-gradient-to-br ${stat.color} rounded-lg`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Charts */}
      <Tabs defaultValue="revenue" className="space-y-6">
        <TabsList className="grid grid-cols-3 w-full max-w-md">
          <TabsTrigger value="revenue">{currentContent.revenue}</TabsTrigger>
          <TabsTrigger value="customers">{currentContent.customers}</TabsTrigger>
          <TabsTrigger value="categories">{currentContent.categories}</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{currentContent.revenueTitle}</CardTitle>
              <CardDescription>{currentContent.monthly}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart data={monthlyData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="revenue" stroke="#22c55e" fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>{currentContent.customerTitle}</CardTitle>
              <CardDescription>{currentContent.monthly}</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="customers" stroke="#3b82f6" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="categories" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>{currentContent.categoryTitle}</CardTitle>
                <CardDescription>{currentContent.thisMonth}</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>{currentContent.productTitle}</CardTitle>
                <CardDescription>{currentContent.monthly}</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="products" fill="#f97316" radius={[8, 8, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
