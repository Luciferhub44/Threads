interface ToastOptions {
  duration?: number;
  position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';
}

class Toast {
  private createToast(message: string, type: 'success' | 'error' | 'info', options: ToastOptions = {}) {
    const { duration = 3000, position = 'top-right' } = options;
    
    // Remove any existing toasts
    const existingToasts = document.querySelectorAll('.toast-notification');
    existingToasts.forEach(toast => document.body.removeChild(toast));
    
    const toast = document.createElement('div');
    toast.className = `fixed ${position} m-4 p-4 rounded-lg shadow-lg text-white transform transition-all duration-300 translate-y-2 opacity-0 toast-notification z-50`;
    
    switch (type) {
      case 'success':
        toast.classList.add('bg-green-500');
        break;
      case 'error':
        toast.classList.add('bg-red-500');
        break;
      case 'info':
        toast.classList.add('bg-blue-500');
        break;
    }
    
    toast.textContent = message;
    document.body.appendChild(toast);
    
    // Animate in
    requestAnimationFrame(() => {
      toast.classList.remove('translate-y-2', 'opacity-0');
    });
    
    // Remove after duration
    setTimeout(() => {
      toast.classList.add('translate-y-2', 'opacity-0');
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, duration);
  }

  success(message: string, options?: ToastOptions) {
    this.createToast(message, 'success', options);
  }

  error(message: string, options?: ToastOptions) {
    this.createToast(message, 'error', options);
  }

  info(message: string, options?: ToastOptions) {
    this.createToast(message, 'info', options);
  }
}

export const toast = new Toast();