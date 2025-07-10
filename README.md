# MMS Swimming Academy Management System

A comprehensive full-stack web application for managing swimming academy operations, built with React.js (frontend) and Node.js/Express (backend).

## Features

### 🏊‍♂️ Core Functionality
- **Member Management**: Registration, profiles, and membership tracking
- **Class Scheduling**: Program management and class booking system
- **Coach Management**: Coach profiles, certifications, and assignments
- **Payment Processing**: Payment tracking and financial reporting
- **Progress Tracking**: Member skill development monitoring
- **Blog System**: Swimming tips, news, and academy updates
- **Contact Management**: Inquiry handling and communication

### 🎨 Design Features
- **Professional Swimming Theme**: Blue, water-inspired color scheme
- **Responsive Design**: Mobile-first approach with full device compatibility
- **Modern UI**: Clean, intuitive interface with smooth animations
- **Role-Based Access**: Different dashboards for members, coaches, and administrators

### 🔐 Security & Authentication
- **JWT Authentication**: Secure token-based authentication
- **Role-Based Authorization**: Member, coach, and admin access levels
- **Password Security**: Bcrypt hashing for secure password storage
- **Session Management**: Secure session handling with Express

## Technology Stack

### Frontend
- **React 18**: Modern React with hooks and functional components
- **TypeScript**: Full type safety across the application
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework
- **Radix UI**: Accessible component primitives
- **shadcn/ui**: Beautiful, reusable UI components
- **React Query**: Server state management and caching
- **Wouter**: Lightweight client-side routing
- **React Hook Form**: Form handling with validation
- **Zod**: Schema validation

### Backend
- **Node.js**: JavaScript runtime
- **Express.js**: Web application framework
- **TypeScript**: Type-safe server-side development
- **Drizzle ORM**: Type-safe database queries
- **PostgreSQL**: Relational database (Neon serverless)
- **JWT**: JSON Web Token authentication
- **bcrypt**: Password hashing
- **Express Sessions**: Session management

## Quick Start

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn package manager
- PostgreSQL database (or use the included in-memory storage)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd mms-swimming-academy
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Create a `.env` file in the root directory:
   ```env
   DATABASE_URL=your_postgresql_connection_string
   JWT_SECRET=your_jwt_secret_key
   NODE_ENV=development
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

The application will be available at `http://localhost:5000`

## Project Structure

```
mms-swimming-academy/
├── client/                 # Frontend React application
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── lib/            # Utility functions
│   │   └── contexts/       # React context providers
│   └── index.html          # HTML template
├── server/                 # Backend Express application
│   ├── index.ts           # Main server file
│   ├── routes.ts          # API routes
│   ├── storage.ts         # Data storage layer
│   └── vite.ts            # Vite integration
├── shared/                 # Shared types and schemas
│   └── schema.ts          # Database schema and types
└── package.json           # Project dependencies
```

## API Documentation

### Authentication Endpoints

#### POST `/api/register`
Register a new user
```json
{
  "email": "user@example.com",
  "password": "password123",
  "role": "member"
}
```

#### POST `/api/login`
User login
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

#### POST `/api/logout`
User logout (requires authentication)

### Member Endpoints

#### GET `/api/members`
Get all members (admin only)

#### GET `/api/members/profile`
Get current member's profile (authenticated)

#### PUT `/api/members/profile`
Update member profile (authenticated)

### Program Endpoints

#### GET `/api/programs`
Get all swimming programs

#### POST `/api/programs`
Create new program (admin only)

### Class Endpoints

#### GET `/api/classes`
Get all classes

#### POST `/api/classes`
Create new class (admin only)

### Coach Endpoints

#### GET `/api/coaches`
Get all coaches

#### POST `/api/coaches`
Create new coach (admin only)

### Blog Endpoints

#### GET `/api/blog`
Get all blog posts

#### POST `/api/blog`
Create new blog post (admin only)

### Contact Endpoints

#### GET `/api/contacts`
Get all contact messages (admin only)

#### POST `/api/contacts`
Submit contact form

## Database Schema

### Users Table
- `id`: Primary key
- `email`: User email (unique)
- `password`: Hashed password
- `role`: User role (member, coach, admin)
- `createdAt`: Registration date

### Members Table
- `id`: Primary key
- `userId`: Foreign key to users table
- `fullName`: Member's full name
- `phone`: Contact phone number
- `age`: Member's age
- `swimmingLevel`: Current skill level
- `program`: Enrolled program
- `status`: Membership status
- `medicalInfo`: Medical information
- `emergencyContact`: Emergency contact details
- `registrationDate`: Registration date

### Programs Table
- `id`: Primary key
- `name`: Program name
- `description`: Program description
- `ageGroup`: Target age group
- `level`: Skill level
- `price`: Program price
- `duration`: Session duration
- `capacity`: Maximum capacity
- `status`: Program status

### Classes Table
- `id`: Primary key
- `programId`: Foreign key to programs
- `coachId`: Foreign key to coaches
- `dayOfWeek`: Class day
- `startTime`: Start time
- `endTime`: End time
- `capacity`: Maximum capacity
- `currentEnrollment`: Current enrollment
- `status`: Class status

## Default Login Credentials

### Administrator
- **Email**: `admin@mmsswimmingacademy.com`
- **Password**: `admin123`

### Test Coach
- **Email**: `coach1@mmsswimmingacademy.com`
- **Password**: `coach123`

## Development

### Running in Development Mode
```bash
npm run dev
```

### Building for Production
```bash
npm run build
```

### Running Tests
```bash
npm test
```

## Deployment

### Environment Variables
Set the following environment variables in your production environment:
- `DATABASE_URL`: PostgreSQL connection string
- `JWT_SECRET`: Secret key for JWT token signing
- `NODE_ENV`: Set to "production"

### Build Command
```bash
npm run build
```

### Start Command
```bash
npm start
```

## Features in Detail

### Member Dashboard
- View upcoming classes and booking history
- Track swimming progress across different strokes
- Payment history and financial overview
- Quick actions for booking and communication

### Admin Dashboard
- Comprehensive statistics and analytics
- Member management and registration oversight
- Financial reporting and revenue tracking
- Contact message management
- Class and program administration

### Coach Management
- Coach profiles with certifications and specialties
- Class assignment and scheduling
- Member progress tracking and evaluation
- Communication tools

### Blog System
- Swimming tips and techniques
- Academy news and updates
- Coach insights and advice
- Categorized content management

## Support

For technical support or questions about the MMS Swimming Academy Management System, please contact:

- **Email**: support@mmsswimmingacademy.com
- **Documentation**: This README file
- **Issues**: Create issues in the project repository

## License

This project is proprietary software developed for MMS Swimming Academy. All rights reserved.

---

Built with ❤️ for MMS Swimming Academy