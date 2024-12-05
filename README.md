# Threads - Donate Warmth, Share Comfort

A charity initiative that lets supporters donate hoodies to the less privileged.

## Features

- Modern, responsive UI built with React and Tailwind CSS
- Secure payment processing with Stripe and PayPal
- Real-time donation tracking
- Impact visualization
- Mobile-first design

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file based on `.env.example`
4. Start the development server:
   ```bash
   npm run dev
   ```

## Environment Variables

Copy `.env.example` to `.env` and fill in your credentials:

```
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_stripe_key
VITE_PAYPAL_CLIENT_ID=your_paypal_client_id
STRIPE_SECRET_KEY=sk_test_your_stripe_secret_key
PORT=3000
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run server` - Start backend server
- `npm run lint` - Run ESLint

## Tech Stack

- React
- TypeScript
- Tailwind CSS
- Vite
- Stripe
- PayPal
- Express

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## License

MIT