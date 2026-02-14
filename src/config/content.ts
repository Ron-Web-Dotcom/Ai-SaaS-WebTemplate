// Content Configuration
// Customize all text, links, and content here for easy branding

export const brand = {
  name: 'Nexus AI',
  tagline: 'AI-Powered Collaboration Platform',
  description: 'Transform your workflow with intelligent automation',
  email: 'ront.devops@gmail.com',
  phone: '+1 (555) 123-4567',
  address: '123 Innovation Drive, San Francisco, CA 94105',
};

export const social = {
  twitter: 'https://twitter.com/yourcompany',
  github: 'https://github.com/yourcompany',
  linkedin: 'https://linkedin.com/company/yourcompany',
  youtube: 'https://youtube.com/@yourcompany',
};

export const cta = {
  primary: 'Start Building Free',
  secondary: 'Watch Demo',
  trial: 'Start Free Trial',
  getStarted: 'Get Started',
  learnMore: 'Learn More',
  contactSales: 'Contact Sales',
};

export const navigation = {
  links: [
    { label: 'Features', href: '#features' },
    { label: 'Use Cases', href: '#use-cases' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Testimonials', href: '#testimonials' },
  ],
};

export const announcement = {
  text: '🎉 New Release: Advanced Analytics Dashboard - ',
  linkText: 'Explore',
  linkHref: '#product',
};

export const hero = {
  badge: 'Built for Modern Teams',
  headline: 'Build Faster with AI',
  subheadline: 'The intelligent platform that accelerates your development workflow and scales with your team',
  trustBadges: [
    'SOC 2 Certified',
    '99.9% Uptime',
    'GDPR Compliant',
    'Enterprise Ready',
  ],
};

export const socialProof = {
  title: 'Trusted by innovative teams worldwide',
  companies: [
    'Acme Corp',
    'TechFlow',
    'DataSync',
    'CloudBase',
    'InnovateLab',
    'FutureStack',
  ],
};

export const features = {
  badge: 'Features',
  title: 'Everything you need to succeed',
  subtitle: 'Powerful features designed to accelerate your workflow and help your team collaborate more effectively',
  items: [
    {
      icon: 'Zap',
      title: 'Lightning Fast',
      description: 'Experience blazing-fast performance with our optimized infrastructure and edge network',
    },
    {
      icon: 'Shield',
      title: 'Enterprise Security',
      description: 'Bank-level encryption, SOC 2 compliance, and advanced access controls keep your data safe',
    },
    {
      icon: 'Users',
      title: 'Team Collaboration',
      description: 'Built-in real-time collaboration tools with comments, mentions, and activity tracking',
    },
    {
      icon: 'BarChart',
      title: 'Advanced Analytics',
      description: 'Comprehensive insights and reporting to track performance and make data-driven decisions',
    },
    {
      icon: 'Sparkles',
      title: 'AI-Powered',
      description: 'Intelligent automation and suggestions powered by cutting-edge machine learning models',
    },
    {
      icon: 'Globe',
      title: 'Global Scale',
      description: 'Deploy worldwide with our distributed infrastructure and CDN for optimal performance',
    },
  ],
};

export const benefits = {
  items: [
    {
      badge: 'Automation',
      title: 'Automate repetitive tasks',
      description: 'Let AI handle the boring stuff while you focus on what matters. Intelligent automation learns from your patterns and suggests optimizations.',
      stats: { value: '10x', label: 'Faster workflows' },
    },
    {
      badge: 'Integration',
      title: 'Connect your entire stack',
      description: 'Seamlessly integrate with 200+ tools you already use. Our flexible API and pre-built connectors make setup a breeze.',
      stats: { value: '200+', label: 'Integrations' },
    },
    {
      badge: 'Insights',
      title: 'Make data-driven decisions',
      description: 'Powerful analytics and reporting give you deep insights into your operations. Track metrics that matter and identify optimization opportunities.',
      stats: { value: '24/7', label: 'Real-time data' },
    },
  ],
};

export const useCases = {
  badge: 'Use Cases',
  title: 'Built for every team',
  subtitle: 'Whether you are a startup or enterprise, Nexus AI adapts to your workflow',
  items: [
    {
      icon: 'Code',
      title: 'Developers',
      description: 'Accelerate development with AI-powered code suggestions, automated testing, and deployment pipelines',
      features: ['Auto-completion', 'Code review', 'CI/CD integration'],
    },
    {
      icon: 'Briefcase',
      title: 'Product Teams',
      description: 'Streamline product development with roadmap planning, feature tracking, and user feedback analysis',
      features: ['Roadmap planning', 'Feature prioritization', 'User analytics'],
    },
    {
      icon: 'MessageSquare',
      title: 'Customer Success',
      description: 'Deliver exceptional support with AI-powered ticket routing, knowledge base search, and response suggestions',
      features: ['Smart routing', 'Knowledge base', 'Response templates'],
    },
  ],
};

export const integrations = {
  badge: 'Integrations',
  title: 'Works with your favorite tools',
  subtitle: 'Connect seamlessly with the tools your team already uses',
  items: [
    { name: 'GitHub', category: 'Development' },
    { name: 'Slack', category: 'Communication' },
    { name: 'Figma', category: 'Design' },
    { name: 'Linear', category: 'Project Management' },
    { name: 'Stripe', category: 'Payments' },
    { name: 'Notion', category: 'Documentation' },
    { name: 'Vercel', category: 'Deployment' },
    { name: 'Jira', category: 'Project Management' },
  ],
  viewAllText: 'View all integrations',
  viewAllHref: '#integrations',
};

export const testimonials = {
  badge: 'Testimonials',
  title: 'Loved by teams everywhere',
  subtitle: 'See what our customers have to say about their experience',
  items: [
    {
      name: 'Sarah Johnson',
      role: 'CTO at TechCorp',
      content: 'Nexus AI has transformed how our team builds software. The AI-powered suggestions save us hours every day, and the collaboration features keep everyone in sync.',
      rating: 5,
    },
    {
      name: 'Michael Chen',
      role: 'Product Manager at StartupXYZ',
      content: 'The analytics dashboard gives us insights we never had before. We can make data-driven decisions faster and our product velocity has increased significantly.',
      rating: 5,
    },
    {
      name: 'Emily Rodriguez',
      role: 'Engineering Lead at DataFlow',
      content: 'Best investment we have made this year. The ROI was clear within the first month. Our deployment frequency doubled and bugs decreased by 40%.',
      rating: 5,
    },
  ],
};

export const pricing = {
  badge: 'Pricing',
  title: 'Simple, transparent pricing',
  subtitle: 'Choose the plan that fits your needs. All plans include a 14-day free trial',
  plans: [
    {
      name: 'Starter',
      description: 'Perfect for individuals and small teams getting started',
      price: 29,
      period: 'per user/month',
      features: [
        'Up to 5 team members',
        '10GB storage',
        'Basic integrations',
        'Email support',
        'Basic analytics',
      ],
      cta: cta.trial,
      popular: false,
    },
    {
      name: 'Professional',
      description: 'For growing teams that need more power and flexibility',
      price: 99,
      period: 'per user/month',
      features: [
        'Unlimited team members',
        '100GB storage',
        'All integrations',
        'Priority support',
        'Advanced analytics',
        'Custom workflows',
        'API access',
      ],
      cta: cta.trial,
      popular: true,
    },
    {
      name: 'Enterprise',
      description: 'For large organizations with advanced security and compliance needs',
      price: null,
      period: 'Contact us',
      features: [
        'Everything in Professional',
        'Unlimited storage',
        'Dedicated support',
        'SLA guarantee',
        'Advanced security',
        'Custom contracts',
        'Training & onboarding',
      ],
      cta: cta.contactSales,
      popular: false,
    },
  ],
};

export const faq = {
  badge: 'FAQ',
  title: 'Frequently asked questions',
  subtitle: 'Everything you need to know about Nexus AI',
  contactText: 'Still have questions?',
  contactLinkText: 'Contact our team',
  contactHref: 'mailto:' + brand.email,
  items: [
    {
      question: 'How does the free trial work?',
      answer: 'Our 14-day free trial gives you full access to all features with no credit card required. You can upgrade, downgrade, or cancel at any time during or after the trial period.',
    },
    {
      question: 'Can I change plans later?',
      answer: 'Absolutely! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we will prorate any charges or credits.',
    },
    {
      question: 'What payment methods do you accept?',
      answer: 'We accept all major credit cards (Visa, Mastercard, American Express), PayPal, and ACH transfers for annual plans. Enterprise customers can request invoicing.',
    },
    {
      question: 'Is my data secure?',
      answer: 'Yes! We use bank-level encryption, are SOC 2 Type II certified, and are fully GDPR compliant. Your data is encrypted at rest and in transit, and we perform regular security audits.',
    },
    {
      question: 'Do you offer discounts for nonprofits or education?',
      answer: 'Yes! We offer special pricing for qualified nonprofit organizations and educational institutions. Contact our sales team for more information.',
    },
  ],
};

export const finalCta = {
  badge: 'Get Started Today',
  title: 'Ready to transform your workflow?',
  subtitle: 'Join thousands of teams already building faster with Nexus AI. Start your free trial today - no credit card required',
  primaryCta: cta.primary,
  secondaryCta: cta.contactSales,
};

export const footer = {
  tagline: 'The intelligent platform for modern teams',
  sections: [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '#features' },
        { label: 'Use Cases', href: '#use-cases' },
        { label: 'Pricing', href: '#pricing' },
        { label: 'Integrations', href: '#integrations' },
        { label: 'Changelog', href: '#product' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#hero' },
        { label: 'Blog', href: '#testimonials' },
        { label: 'Careers', href: '#hero' },
        { label: 'Contact', href: 'mailto:' + brand.email },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Documentation', href: '#features' },
        { label: 'API Reference', href: '#integrations' },
        { label: 'Guides', href: '#product' },
        { label: 'Support', href: 'mailto:' + brand.email },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy', href: '#hero' },
        { label: 'Terms', href: '#hero' },
        { label: 'Security', href: '#features' },
        { label: 'DPA', href: '#hero' },
      ],
    },
  ],
  copyright: `© ${new Date().getFullYear()} ${brand.name}. All rights reserved.`,
};
