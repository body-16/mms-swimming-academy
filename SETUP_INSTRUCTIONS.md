# MMS Swimming Academy - Setup Instructions

## Quick Start Guide

Follow these steps to set up and run the MMS Swimming Academy Management System locally.

### Prerequisites

- **Node.js** (v18 or higher) - [Download here](https://nodejs.org/)
- **npm** or **yarn** package manager
- **Git** (for version control)
- **PostgreSQL** (optional - uses in-memory storage by default)

### Installation Steps

1. **Extract the project files**
   ```bash
   cd mms-swimming-academy-final
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup (optional)**
   Create a `.env` file in the root directory:
   ```env
   # Database (optional - uses in-memory storage if not provided)
   DATABASE_URL=postgresql://username:password@localhost:5432/mms_swimming_academy
   
   # JWT Secret (optional - uses default if not provided)
   JWT_SECRET=your-super-secret-jwt-key-here
   
   # Application settings
   NODE_ENV=development
   PORT=5000
   ```

4. **Start the application**
   ```bash
   npm run dev
   ```

5. **Access the application**
   Open your browser and navigate to: `http://localhost:5000`

### Default Login Credentials

#### Administrator Account
- **Email**: `admin@mmsswimmingacademy.com`
- **Password**: `admin123`

#### Test Coach Account
- **Email**: `coach1@mmsswimmingacademy.com`
- **Password**: `coach123`

### Project Structure

```
mms-swimming-academy-final/
├── client/                 # React frontend
├── server/                 # Node.js backend
├── shared/                 # Shared types and schemas
├── README.md              # Main documentation
├── README_AR.md           # Arabic documentation
├── API_REFERENCE.md       # API documentation
├── DEPLOYMENT_GUIDE.md    # Deployment instructions
└── package.json           # Project dependencies
```

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run check` - Type checking
- `npm run db:push` - Push database schema (if using PostgreSQL)

### Features Overview

✅ **User Management**
- Registration and login system
- Role-based access (member, coach, admin)
- Profile management

✅ **Swimming Programs**
- Kids, Adult, and Competitive programs
- Program management and enrollment

✅ **Class Scheduling**
- Weekly class schedules
- Booking system
- Coach assignments

✅ **Payment Tracking**
- Payment history
- Invoice generation
- Financial reporting

✅ **Progress Monitoring**
- Member skill tracking
- Coach evaluations
- Progress reports

✅ **Blog System**
- Swimming tips and techniques
- Academy news and updates
- Content management

✅ **Contact Management**
- Contact form submissions
- Inquiry tracking
- Communication tools

### Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, shadcn/ui
- **Backend**: Node.js, Express, TypeScript
- **Database**: PostgreSQL (with in-memory fallback)
- **Authentication**: JWT tokens
- **Build Tools**: Vite, esbuild

### Troubleshooting

#### Port Already in Use
If you get a "port already in use" error:
```bash
# Kill process using port 5000
lsof -ti:5000 | xargs kill -9
```

#### Module Not Found Errors
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

#### Database Connection Issues
If using PostgreSQL and getting connection errors:
1. Check that PostgreSQL is running
2. Verify DATABASE_URL is correct
3. Ensure database exists
4. For testing, remove DATABASE_URL to use in-memory storage

### Next Steps

1. **Explore the Application**
   - Login with admin credentials
   - Navigate through different sections
   - Test the booking system

2. **Customize Settings**
   - Update academy information
   - Configure payment methods
   - Set up email notifications

3. **Deploy to Production**
   - Follow the DEPLOYMENT_GUIDE.md
   - Set up proper database
   - Configure environment variables

### Support

For questions or issues:
- Check the API_REFERENCE.md for API details
- Review DEPLOYMENT_GUIDE.md for production setup
- Consult the main README.md for comprehensive documentation

### License

This project is proprietary software developed for MMS Swimming Academy. All rights reserved.

---

Happy swimming! 🏊‍♂️ The MMS Swimming Academy Management System is ready to help manage your swimming academy efficiently.