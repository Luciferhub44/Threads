import { config } from '../config/payment';

interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export const trackEvent = ({ category, action, label, value }: AnalyticsEvent): void => {
  if (config.environment === 'production' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};