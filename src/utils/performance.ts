export const measureCLS = (): void => {
  if ('web-vital' in window) {
    new PerformanceObserver((entryList) => {
      for (const entry of entryList.getEntries()) {
        if (entry.hadRecentInput) continue;
        trackEvent({
          category: 'Web Vitals',
          action: 'CLS',
          value: entry.value * 1000,
          label: entry.entryType
        });
      }
    }).observe({ entryTypes: ['layout-shift'] });
  }
};

export const preloadImage = (src: string): void => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  document.head.appendChild(link);
};

export const preloadCriticalImages = (): void => {
  const criticalImages = [
    '/threads-logo.png',
    // Add other critical images here
  ];

  criticalImages.forEach(preloadImage);
};