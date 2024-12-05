import { HomepageSection } from '../types';
import { defaultHomepageSections } from '../data/homepage';

export const STORAGE_KEY = 'homepage_content';
const MAX_SECTIONS = 10;
const MIN_SECTIONS = 1;
const CONTENT_VERSION = '1.1';

export { MAX_SECTIONS, MIN_SECTIONS };

export const saveContent = (sections: HomepageSection[]): void => {
  try {
    if (!validateContent(sections)) {
      throw new Error('Invalid content structure');
    }

    const orderedSections = reorderSections(sections);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      version: CONTENT_VERSION,
      sections: orderedSections,
      lastUpdated: new Date().toISOString()
    }));
  } catch (error) {
    console.error('Failed to save content:', error);
  }
};

export const loadContent = (): HomepageSection[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return defaultHomepageSections;
    
    const parsed = JSON.parse(saved) || {};
    if (parsed.version !== CONTENT_VERSION) {
      saveContent(defaultHomepageSections);
      return defaultHomepageSections;
    }
    
    return Array.isArray(parsed.sections) ? parsed.sections : defaultHomepageSections;
  } catch (error) {
    console.error('Failed to load content:', error);
    return defaultHomepageSections;
  }
};

export const validateContent = (sections: HomepageSection[]): boolean => {
  return sections.every(section => {
    // Basic structure validation
    if (!section.id?.trim() || !section.type || !section.title?.trim()) return false;
    if (typeof section.isVisible !== 'boolean') return false;
    if (typeof section.order !== 'number') return false;
    
    // Content validation based on type
    switch (section.type) {
      case 'hero':
        return validateHeroContent(section.content);
      case 'impact':
        return validateImpactContent(section.content);
      case 'mission':
        return validateMissionContent(section.content);
      case 'testimonial':
        return validateTestimonialContent(section.content);
      case 'sponsor':
        return validateSponsorContent(section.content);
      default:
        return false;
    }
  });
};

const validateHeroContent = (content: any): boolean => {
  return !!(
    content?.heading?.trim() &&
    content?.subheading?.trim() &&
    content?.ctaText?.trim()
  );
};

const validateImpactContent = (content: any): boolean => {
  return !!(
    Array.isArray(content?.stats) &&
    content.stats.every((stat: any) =>
      stat?.number?.toString().trim() &&
      stat?.label?.trim()
    )
  );
};

const validateMissionContent = (content: any): boolean => {
  return !!(
    Array.isArray(content?.cards) &&
    content.cards.every((card: any) =>
      card?.title?.trim() &&
      card?.description?.trim()
    )
  );
};

const validateTestimonialContent = (content: any): boolean => {
  return !!(
    Array.isArray(content?.testimonials) &&
    content.testimonials.every((testimonial: any) =>
      testimonial?.quote?.trim() &&
      testimonial?.author?.trim() &&
      testimonial?.role?.trim()
    )
  );
};

const validateSponsorContent = (content: any): boolean => {
  return !!(
    Array.isArray(content?.sponsors) &&
    content.sponsors.every((sponsor: any) => sponsor?.name?.trim())
  );
};

export const reorderSections = (sections: HomepageSection[]): HomepageSection[] => {
  return sections
    .sort((a, b) => a.order - b.order)
    .map((section, index) => ({
      ...section,
      order: index
    }));
};