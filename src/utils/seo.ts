interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

export const updateSEO = ({
  title = 'Threads - Donate Warmth, Share Comfort',
  description = 'Join our mission to provide warmth and comfort to those in need. Every hoodie purchased is donated to someone less privileged.',
  image = '/threads-logo.png',
  url = window.location.href
}: SEOProps = {}): void => {
  document.title = title;
  
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute('content', description);
  }

  // Update Open Graph tags
  const ogTags = {
    'og:title': title,
    'og:description': description,
    'og:image': image,
    'og:url': url,
    'og:type': 'website'
  };

  Object.entries(ogTags).forEach(([property, content]) => {
    let meta = document.querySelector(`meta[property="${property}"]`);
    if (!meta) {
      meta = document.createElement('meta');
      meta.setAttribute('property', property);
      document.head.appendChild(meta);
    }
    meta.setAttribute('content', content);
  });
};