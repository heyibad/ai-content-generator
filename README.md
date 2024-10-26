# 🤖 AI Content Generator

A cutting-edge AI-powered content generation platform built with Next.js and Google's Generative AI. Create diverse content across 18 services with an intuitive interface and powerful user management. ✨

## 🛠️ Tech Stack

### 🎨 Frontend
- **Framework**: Next.js 14 ⚡
- **Language**: TypeScript 📝
- **Styling**: 
  - 🎯 Tailwind CSS 
  - 🔄 Tailwind Merge
  - ⚙️ Class Variance Authority
  - ✨ Tailwind Animate
- **State Management**: React 18 (Context API) 🔄
- **UI Components**:
  - 🎮 Shadcn UI/Radix UI 
  - 🎪 Acceternity
  - 📝 Toast UI Editor
- **Icons**: 
  - 🎯 Lucide React
- **Animation**: Framer Motion 🎭

### 🏗️ Backend & Infrastructure
- **Database**: 
  - 🗄️ Neon Database (Serverless Postgres)
  - 💧 Drizzle ORM
- **Authentication**: NextAuth.js 4 🔐
- **File Storage**: Cloudinary ☁️
- **Email Service**: Resend 📧
- **Payment Processing**: LemonSqueezy 💳
- **AI Integration**: Google Generative AI SDK 🤖

## ⭐ Key Features

### 🔒 Authentication & Security
- Multi-provider authentication (Google, Email, Github)
- Email verification system
- Secure password hashing with bcrypt
- Protected API routes
- Session management

### 🎯 Content Generation
- 18 AI-powered generation services
- Rich text editor integration
- Content history tracking
- Custom generation preferences
- Real-time content preview

### 👥 User Management
- Custom user profiles
- Image upload functionality
- Usage tracking and limits
- Settings management
- Password change/reset

### 💰 Billing & Subscriptions
- Three Plans (Basic, Gold, Platinum)

### 📨 Email System
- Verification emails

### 🎨 UI/UX Features
- Responsive design
- Dark/Light mode 🌓
- Toast notifications
- Loading states
- Error handling
- Dynamic dashboard

## 🚀 Getting Started

### Prerequisites
- Bun or Nodejs v18+ 

### 📥 Installation

1. Clone the repository:
```bash
git clone https://github.com/heyibad/ai-content-generator.git
cd ai-content-generator
```

2. Install dependencies:
```bash
bun install  # or npm install
```

3. Set up environment variables:
```env
# Create .env file with the following variables
# Login Secrets
GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET
GITHUB_CLIENT_ID
GITHUB_CLIENT_SECRET
JWT_SECRET

NEXT_PUBLIC_DOMAIN=http://localhost:3000

# Email Secrets
NEXT_PUBLIC_EMAIL_KEY

# LemonSqueezy Secrets
LEMON_API_KEY
LEMON_WEBHOOK_SECRET
LEMON_STORE_ID
GOLD_CHECKOUT_URL
PLATINUM_CHECKOUT_URL

# Cloudinary Secrets
CLOUDINARY_CLOUD_NAME
CLOUDINARY_API_KEY
CLOUDINARY_API_SECRET

# Google AI Secrets
NEXT_PUBLIC_GOOGLE_API_KEY

# Neon Database Secrets
NEXT_PUBLIC_NEON_DB_URL
```

4. Initialize the database:
```bash
bun run db:push
```

5. Start the development server:
```bash
bun run dev
```

## ⚙️ Environment Setup

### Development
```bash
# Install dependencies
bun i 

# Run development server
bun run dev
```

### Production
```bash
# Build application
bun build

# Start production server
bun start
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting solutions
- Shadcn for UI components
- Google AI team for the Generative AI SDK

## Built with ❤️ by [Ibad](https://linkedin.com/in/heyibad)