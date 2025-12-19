# 📚 Social Shelf

> A modern, full-featured library management platform built with Next.js 15, enabling seamless book rentals, donations, events, and community engagement.

## ✨ Features

### 🎯 Core Functionality
- **Book Management** - Browse, search, and manage an extensive book catalog
- **Book Rentals** - Rent books with automated tracking and return management
- **Donations** - Accept book donations from the community
- **Event Management** - Create, manage, and register for library events
- **User Authentication** - Secure authentication with NextAuth.js
- **Admin Dashboard** - Comprehensive admin panel for managing users, books, events, and rentals
- **Contact & Feedback** - User feedback and contact form system
- **Gallery** - Showcase library events and activities
- **Volunteer Program** - Register and manage volunteer opportunities

### 🎨 User Experience
- **Dark/Light Mode** - Theme toggle with next-themes
- **Responsive Design** - Mobile-first, fully responsive UI
- **Animated Components** - Smooth animations with Framer Motion
- **Image Optimization** - ImageKit integration for fast image delivery
- **Modern UI** - Built with Radix UI components and Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** Radix UI, shadcn/ui
- **Animations:** Framer Motion
- **Icons:** Lucide React, Tabler Icons, React Icons

### Backend
- **API:** Next.js API Routes
- **Authentication:** NextAuth.js
- **Database:** MongoDB with Mongoose
- **Image Storage:** ImageKit
- **Email:** Nodemailer
- **Password Hashing:** bcryptjs
- **Tokens:** JWT (jsonwebtoken)

### Development
- **Package Manager:** npm/yarn/pnpm/bun
- **Linting:** ESLint
- **CSS Processing:** PostCSS

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- Node.js 18.x or higher
- MongoDB instance (local or cloud)
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd social-shelf
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory with the following variables:
   
   ```env
   # Database
   MONGODB_URI=your_mongodb_connection_string
   
   # NextAuth
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your_nextauth_secret
   
   # ImageKit
   IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
   IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
   IMAGEKIT_URL_ENDPOINT=your_imagekit_url_endpoint
   
   # Email (Nodemailer)
   EMAIL_USER=your_email@example.com
   EMAIL_PASSWORD=your_email_password
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   
   # JWT
   JWT_SECRET=your_jwt_secret
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
social-shelf/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── api/               # API routes
│   │   ├── admin/             # Admin dashboard
│   │   ├── student/           # Student portal
│   │   ├── events/            # Events pages
│   │   ├── donation/          # Donation pages
│   │   └── ...
│   ├── components/            # React components
│   │   ├── Admin/            # Admin components
│   │   ├── Home/             # Homepage components
│   │   ├── layouts/          # Layout components
│   │   ├── ui/               # UI components (shadcn)
│   │   └── ...
│   ├── context/              # React context providers
│   ├── dbConfig/             # Database configuration
│   ├── models/               # Mongoose models
│   ├── utils/                # Utility functions
│   └── types/                # TypeScript type definitions
├── public/                   # Static assets
└── ...
```

## 🎯 Key Features Explained

### Admin Dashboard
Comprehensive admin panel with:
- User management and permissions
- Book catalog management
- Rental tracking and management
- Event creation and management
- Donation tracking
- Feedback monitoring
- Event registration oversight

### User Roles
- **Admin** - Full system access and management
- **Student** - Browse books, rent books, register for events
- **Volunteer** - Assist with library operations

### Authentication Flow
- Secure user registration and login
- Password reset functionality with OTP verification
- Session management with NextAuth.js
- Protected routes and API endpoints

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start development server with Turbopack

# Production
npm run build        # Build for production
npm run start        # Start production server

# Code Quality
npm run lint         # Run ESLint
```

## 🎨 Customization

### Theme
The application supports dark and light themes. Theme preference is persisted across sessions using `next-themes`.

### Styling
- Modify `src/app/globals.css` for global styles
- Update `tailwind.config.js` for theme customization
- Component styles use Tailwind CSS utility classes

### Components
UI components are built with Radix UI and styled with Tailwind CSS. Customize components in `src/components/ui/`.

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | ✅ |
| `NEXTAUTH_URL` | Application URL | ✅ |
| `NEXTAUTH_SECRET` | NextAuth secret key | ✅ |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key | ✅ |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key | ✅ |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint | ✅ |
| `EMAIL_USER` | Email service username | ✅ |
| `EMAIL_PASSWORD` | Email service password | ✅ |
| `JWT_SECRET` | JWT secret for tokens | ✅ |

## 🚢 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Import your repository on [Vercel](https://vercel.com)
3. Configure environment variables
4. Deploy

### Other Platforms
The application can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean
- AWS
- Docker

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for detailed instructions.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Radix UI](https://www.radix-ui.com/) - Unstyled, accessible components
- [shadcn/ui](https://ui.shadcn.com/) - Re-usable components
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [MongoDB](https://www.mongodb.com/) - Database
- [NextAuth.js](https://next-auth.js.org/) - Authentication
- [ImageKit](https://imagekit.io/) - Image CDN

## 📞 Support

For support, email your-email@example.com or open an issue in the repository.

---

Built with ❤️ using Next.js and TypeScript
