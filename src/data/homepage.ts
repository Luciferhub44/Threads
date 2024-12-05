import { HomepageSection } from '../types';

export const defaultHomepageSections: HomepageSection[] = [
  {
    id: 'hero',
    type: 'hero',
    title: 'Hero Section',
    content: {
      heading: 'Donate Warmth, Share Comfort',
      subheading: 'Join our mission to provide warmth and comfort to those in need. Every hoodie purchased is donated to someone less privileged.',
      ctaText: 'Donate Now'
    },
    isVisible: true,
    order: 0
  },
  {
    id: 'impact',
    type: 'impact',
    title: 'Impact Section',
    content: {
      stats: [
        { number: '10,000+', label: 'People Helped' },
        { number: '15,000+', label: 'Hoodies Donated' },
        { number: '50+', label: 'Cities Reached' }
      ]
    },
    isVisible: true,
    order: 1
  },
  {
    id: 'mission',
    type: 'mission',
    title: 'Mission Section',
    content: {
      cards: [
        {
          title: 'Direct Impact',
          description: 'Every hoodie purchased goes directly to someone in need, ensuring immediate impact in local communities.'
        },
        {
          title: 'Quality Assurance',
          description: 'We ensure all donated hoodies meet high-quality standards for comfort and durability.'
        },
        {
          title: 'Community Focus',
          description: 'Working with local organizations to identify and reach those most in need of warmth and comfort.'
        }
      ]
    },
    isVisible: true,
    order: 2
  },
  {
    id: 'testimonials',
    type: 'testimonial',
    title: 'Testimonials Section',
    content: {
      testimonials: [
        {
          quote: 'The quality of hoodies provided by Threads has made a real difference in our shelter. Our residents feel valued and cared for.',
          author: 'Sarah Johnson',
          role: 'Shelter Director'
        },
        {
          quote: 'Being able to give warm, high-quality hoodies to those in need has been incredible. The smiles we see are priceless.',
          author: 'Michael Chen',
          role: 'Community Organizer'
        },
        {
          quote: 'Threads has been an amazing partner in our mission to support homeless youth. Their dedication to quality and service is unmatched.',
          author: 'Lisa Rodriguez',
          role: 'Outreach Coordinator'
        }
      ]
    },
    isVisible: true,
    order: 3
  },
  {
    id: 'sponsors',
    type: 'sponsor',
    title: 'Sponsors Section',
    content: {
      sponsors: [
        { name: 'Acme Corp' },
        { name: 'Globex' },
        { name: 'Soylent' },
        { name: 'Initech' },
        { name: 'Umbrella' },
        { name: 'Hooli' }
      ]
    },
    isVisible: true,
    order: 4
  }
];