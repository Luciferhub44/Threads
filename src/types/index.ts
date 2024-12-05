export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
  sizes: string[];
}

export interface CartItem extends Product {
  quantity: number;
  selectedSize: string;
}

export interface PaymentError {
  message: string;
  code?: string;
}

export interface PaymentResult {
  success: boolean;
  error?: PaymentError;
  transactionId?: string;
}

export interface DonorInfo {
  firstName: string;
  lastName: string;
  email: string;
  message?: string;
}