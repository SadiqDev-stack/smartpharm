# Smart Pharm - Modern React Frontend

A beautiful, responsive, and modern React frontend for the Smart Pharm online pharmacy platform and admin dashboard.

## 🎯 Features

### Public Pages
- **Landing Page**: Showcase products with hero section, features, collections, and CTA
- **Contact Form**: Users can submit inquiries with validation and email integration
- **Admin Login**: Secure login for administrators using React Hook Form

### Admin Dashboard
- **Dashboard Analytics**: Real-time stats including total messages, today's messages, unseen messages, and important flagged messages
- **Message Management**: View, search, filter, and manage all contact messages
- **Advanced Search & Filters**: Filter by flag status (important, follow-up, resolved) and priority level (low, medium, high)
- **Pagination**: Efficient browsing of large message lists
- **Message Details**: View full message details in an intuitive modal
- **AI Assistant**: Get AI-powered suggestions for responses using the backend AI service
- **WhatsApp Integration**: Quick link to reply directly via WhatsApp (wa.me)
- **Read/Unread Status**: Mark messages as read or unread
- **Flag System**: Flag important messages for quick follow-up

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── Navigation.jsx   # Top navigation bar
│   │   ├── FormComponents.jsx # Button, Input, Select, TextArea
│   │   ├── Modal.jsx        # Reusable modal component
│   │   ├── ContactCard.jsx  # Message card component
│   │   └── ProtectedRoute.jsx # Route protection wrapper
│   ├── pages/              # Page components
│   │   ├── Landing.jsx     # Homepage
│   │   ├── Contact.jsx     # Contact form page
│   │   ├── Login.jsx       # Admin login
│   │   ├── Dashboard.jsx   # Admin dashboard
│   │   └── Contacts.jsx    # Messages management
│   ├── context/            # React Context
│   │   └── AuthContext.jsx # Authentication state management
│   ├── hooks/              # Custom React hooks
│   │   └── useAuth.js      # Auth context hook
│   ├── services/           # API services
│   │   └── api.js          # Axios API client
│   ├── utils/              # Utility functions
│   │   └── helpers.js      # Helper functions
│   ├── App.jsx            # Main app component with routing
│   ├── main.jsx           # React entry point
│   ├── index.css          # Global styles
│   └── App.css            # App styles
├── .env                    # Environment variables
├── .env.example           # Example env file
├── package.json
└── vite.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file (copy from `.env.example`):
```bash
cp .env.example .env
```

4. Update the API URL in `.env` if your backend is on a different URL:
```
VITE_API_URL=http://localhost:8080/api
```

### Development

Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

### Build

Build for production:
```bash
npm run build
```

Preview the production build:
```bash
npm run preview
```

## 🎨 Design System

### Colors
- **Primary**: Gray-900 (#111827) - Black accent
- **Secondary**: Gray colors for hierarchy
- **Backgrounds**: White and Gray-50
- **Text**: Gray-900 for primary, Gray-600 for secondary

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- All pages are fully responsive and mobile-optimized

## 🔐 Authentication

- Uses React Context for state management
- Authentication tokens stored in cookies (with `httpOnly` flag)
- Protected routes automatically redirect unauthenticated users to login
- Login form validates email and password with feedback

## 📡 API Integration

The frontend communicates with the backend through the following endpoints:

### User API
- `POST /api/user/login` - Login admin
- `POST /api/user/logout` - Logout
- `GET /api/user/profile` - Get user profile

### Contact API
- `POST /api/contact/support` - Submit contact form
- `GET /api/contact/history` - Get all contacts with pagination and filters
- `GET /api/contact/:id` - Get specific contact details
- `PATCH /api/contact/:id/read` - Mark contact as read
- `PATCH /api/contact/:id/flag` - Update flag status

### Assistant API
- `POST /api/assistant` - Get AI response for a question

## 🛠️ Dependencies

Key dependencies:
- **react** - UI library
- **react-dom** - React DOM rendering
- **react-router-dom** - Client-side routing
- **react-hook-form** - Form handling and validation
- **axios** - HTTP client
- **lucide-react** - Icon library
- **tailwindcss** - Utility-first CSS framework

## 📝 Code Style

- Clean, readable code with proper naming conventions
- Comments for complex logic
- Modular component structure
- Single Responsibility Principle (SRP)
- DRY (Don't Repeat Yourself) principle

## 🐛 Common Issues & Solutions

### "Module not found" error
Make sure all imports use correct paths and the referenced files exist.

### CORS errors
Ensure the backend is running on the correct port and CORS is properly configured.

### API calls returning errors
Check that:
1. Backend server is running
2. API_URL in `.env` is correct
3. User is authenticated for protected endpoints

## 🚀 Deployment

For production deployment:

1. Build the frontend:
```bash
npm run build
```

2. Deploy the `dist/` folder to your hosting service (Vercel, Netlify, AWS, etc.)

3. Update the `VITE_API_URL` environment variable to point to your production API

## 📞 Support Features

### For Users
- Easy contact form submission
- Responsive contact page
- Confirmation message after submission

### For Admins
- Complete message management system
- Real-time analytics
- AI-powered response suggestions
- Direct WhatsApp messaging capability
- Advanced filtering and search
- Message prioritization with flags

## 🎓 Learning Resources

- [React Documentation](https://react.dev)
- [React Router Documentation](https://reactrouter.com)
- [Tailwind CSS Documentation](https://tailwindcss.com)
- [React Hook Form Documentation](https://react-hook-form.com)
- [Axios Documentation](https://axios-http.com)

## 📄 License

This project is part of the Sadiq Caps business website.

---

Built with ❤️ for Sadiq Caps
