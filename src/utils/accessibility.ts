export const handleKeyboardNavigation = (e: KeyboardEvent): void => {
  if (e.key === 'Tab') {
    document.body.classList.add('user-is-tabbing');
  }
};

export const setupAccessibility = (): void => {
  window.addEventListener('keydown', handleKeyboardNavigation);
  
  // Add ARIA labels to interactive elements
  document.querySelectorAll('button:not([aria-label])').forEach(button => {
    if (!button.textContent) {
      button.setAttribute('aria-label', 'Interactive button');
    }
  });
};

export const cleanupAccessibility = (): void => {
  window.removeEventListener('keydown', handleKeyboardNavigation);
};