# BloodLink - Blood Donation Management System

A professional, full-stack blood donation management platform that connects donors with hospitals and blood banks for life-saving blood transfusions.

## 🩸 Features

### Core Functionality
- **Multi-Role Authentication**: Donors, Hospitals, and Blood Banks
- **Real-time Blood Requests**: Emergency and normal blood requests
- **Location-based Matching**: GPS-enabled donor-recipient matching
- **Blood Compatibility System**: Smart matching based on blood types
- **Emergency Response**: 24/7 emergency blood request system
- **Donation Tracking**: Complete donation history and eligibility tracking

### User Experience
- **Modern UI/UX**: Healthcare-grade professional design
- **Responsive Design**: Mobile, tablet, and desktop optimized
- **Real-time Notifications**: Toast messages and live updates
- **Emergency Ticker**: Live scrolling emergency requests
- **Interactive Dashboard**: Role-based dashboards for all users

## 🛠️ Tech Stack

### Frontend
- **React 18** with Vite
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router DOM** for navigation
- **Axios** for API calls
- **React Hot Toast** for notifications
- **React Icons** for iconography

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT Authentication** with bcrypt
- **Role-based Access Control**
- **RESTful API Architecture**
- **Input Validation** with express-validator

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BloodLink
   ```

2. **Setup Backend**
   ```bash
   cd server
   npm install
   
   # Create .env file and configure:
   # PORT=5000
   # MONGODB_URI=mongodb://localhost:27017/bloodlink
   # JWT_SECRET=your_jwt_secret_key_here
   
   npm run dev
   ```

3. **Setup Frontend**
   ```bash
   cd ../client
   npm install
   npm run dev
   ```

4. **Access the Application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📁 Project Structure

```
BloodLink/
├── server/                 # Backend API
│   ├── src/
│   │   ├── config/        # Database & app configuration
│   │   ├── models/        # MongoDB schemas
│   │   ├── controllers/   # Route handlers
│   │   ├── routes/        # API routes
│   │   ├── middleware/    # Auth & validation middleware
│   │   └── server.js      # Express app entry point
│   └── package.json
│
├── client/                # Frontend React app
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context (Auth)
│   │   ├── services/      # API service functions
│   │   ├── assets/        # Images, videos, etc.
│   │   └── styles/        # CSS files
│   └── package.json
│
└── README.md
```

## 🔐 Authentication & Roles

### User Roles
1. **Donor**: Register, donate blood, respond to requests
2. **Hospital**: Create blood requests, manage patient needs
3. **Blood Bank**: Manage blood inventory, fulfill requests

### Demo Accounts
- **Donor**: donor@demo.com / password123
- **Hospital**: hospital@demo.com / password123

## 🩸 Blood Compatibility System

The platform implements a comprehensive blood compatibility system:

- **Universal Donors**: O- (all types), O+ (plasma)
- **Universal Recipients**: AB+ (all types), AB- (plasma)
- **Compatibility Matching**: Automatic donor-recipient matching
- **Safety Protocols**: Medical verification and eligibility checks

## 🚨 Emergency Response Features

- **Live Emergency Ticker**: Real-time scrolling emergency requests
- **Priority System**: Emergency > Urgent > Normal requests
- **Instant Notifications**: Push notifications for emergency cases
- **Location-based Alerts**: Notify nearby donors immediately
- **24/7 Availability**: Round-the-clock emergency response

## 📱 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/auth/me` - Get current user

### Blood Requests
- `GET /api/blood-requests` - Get all requests (with filters)
- `POST /api/blood-requests` - Create new request (hospitals/blood banks)
- `GET /api/blood-requests/emergency` - Get emergency requests
- `POST /api/blood-requests/:id/respond` - Respond to request (donors)

## 🎨 Design System

### Color Palette
- **Primary Red**: Medical emergency and blood theme
- **Secondary Blue**: Trust and medical professionalism
- **Success Green**: Positive actions and availability
- **Warning Yellow**: Caution and attention
- **Neutral Gray**: Text and backgrounds

### Typography
- **Font Family**: Inter (Google Fonts)
- **Weights**: 300, 400, 500, 600, 700, 800
- **Responsive**: Mobile-first approach

## 🔒 Security Features

- **JWT Authentication**: Secure token-based auth
- **Password Hashing**: bcrypt with salt rounds
- **Role-based Access**: Middleware protection
- **Input Validation**: Server-side validation
- **CORS Protection**: Cross-origin request security

## 🚀 Deployment

### Backend Deployment (Heroku/Railway)
1. Set environment variables
2. Configure MongoDB Atlas
3. Deploy with build scripts

### Frontend Deployment (Vercel/Netlify)
1. Build production bundle
2. Configure API endpoints
3. Deploy static files

## 🤝 Contributing

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support, email support@bloodlink.com or join our Slack channel.

## 🙏 Acknowledgments

- Medical professionals for guidance on blood donation protocols
- Open source community for amazing tools and libraries
- Blood donation organizations for inspiration and best practices

---

**BloodLink** - *Connecting donors, saving lives, one drop at a time.* 🩸❤️