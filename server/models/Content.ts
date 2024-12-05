import { Schema, model } from 'mongoose';

interface IHeroContent {
  heading: string;
  subheading: string;
  ctaText: string;
  backgroundImage?: string;
}

interface IImpactStat {
  number: string;
  label: string;
}

interface IMissionCard {
  title: string;
  description: string;
}

interface ITestimonial {
  quote: string;
  author: string;
  role: string;
}

interface ISponsor {
  name: string;
  logo?: string;
}

interface ISection {
  type: 'hero' | 'impact' | 'mission' | 'testimonial' | 'sponsor';
  title: string;
  content: {
    hero?: IHeroContent;
    impact?: { stats: IImpactStat[] };
    mission?: { cards: IMissionCard[] };
    testimonial?: { testimonials: ITestimonial[] };
    sponsor?: { sponsors: ISponsor[] };
  };
  isVisible: boolean;
  order: number;
}

export interface IContent {
  sections: ISection[];
  version: string;
  lastUpdated: Date;
}

const contentSchema = new Schema<IContent>({
  sections: [{
    type: {
      type: String,
      required: true,
      enum: ['hero', 'impact', 'mission', 'testimonial', 'sponsor']
    },
    title: {
      type: String,
      required: true
    },
    content: {
      type: Schema.Types.Mixed,
      required: true
    },
    isVisible: {
      type: Boolean,
      default: true
    },
    order: {
      type: Number,
      required: true
    }
  }],
  version: {
    type: String,
    required: true,
    default: '1.0'
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for efficient querying
contentSchema.index({ 'sections.type': 1, 'sections.order': 1 });
contentSchema.index({ version: 1, lastUpdated: -1 });
contentSchema.index({ 'sections.isVisible': 1 });
contentSchema.index({ 'sections.type': 1 });
contentSchema.index({ 'sections.order': 1 });
contentSchema.index({ version: 1 });

// Indexes
contentSchema.index({ 'sections.type': 1 });
contentSchema.index({ 'sections.order': 1 });
contentSchema.index({ version: 1 });

export const Content = model<IContent>('Content', contentSchema);