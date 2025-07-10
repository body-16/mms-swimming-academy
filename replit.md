# MMS Swimming Academy - Full Stack Web Application

## Overview

MMS Swimming Academy is a comprehensive web application designed to manage a swimming academy's operations. The system provides functionality for member registration, class scheduling, payment processing, progress tracking, and administrative management. The application serves multiple user roles including members, coaches, and administrators.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite for fast development and optimized builds
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state management
- **Styling**: Tailwind CSS with custom design system
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Authentication**: JWT-based authentication with bcrypt password hashing
- **Session Management**: Express sessions with PostgreSQL store

### Key Design Decisions

1. **Monorepo Structure**: The application uses a monorepo structure with shared schema and types between client and server
2. **Type Safety**: Full TypeScript implementation across the stack with shared types
3. **Component-Based UI**: Modular React components with consistent design patterns
4. **Schema-First Development**: Database schema defines the data structure with automatic type generation

## Key Components

### Database Schema (shared/schema.ts)
- **Users**: Authentication and role management (member, coach, admin)
- **Members**: Member profiles with swimming levels and medical information
- **Coaches**: Coach profiles with certifications and specialties
- **Programs**: Swimming program definitions with pricing and capacity
- **Classes**: Scheduled classes with coach assignments
- **Bookings**: Member class reservations
- **Payments**: Payment tracking and history
- **Member Progress**: Skill development tracking
- **Blog Posts**: Content management for swimming tips and news
- **Contacts**: Customer inquiry management

### Frontend Components
- **Authentication**: Login, registration, and protected routes
- **Dashboard**: Role-based dashboards for members and administrators
- **Public Pages**: Homepage, about, services, coaches, schedule, blog, contact
- **Shared Components**: Reusable UI components for consistent design

### Backend Services
- **Authentication API**: User registration, login, JWT token management
- **Member Management**: CRUD operations for member profiles
- **Class Management**: Schedule management and booking system
- **Payment Processing**: Payment tracking and reporting
- **Content Management**: Blog post and contact form handling

## Data Flow

1. **Authentication Flow**: Users authenticate via JWT tokens stored in localStorage
2. **API Communication**: Frontend communicates with backend via REST API endpoints
3. **State Management**: React Query manages server state with automatic caching and synchronization
4. **Database Operations**: Drizzle ORM handles database queries with type safety
5. **Real-time Updates**: Manual refresh pattern with optimistic updates

## External Dependencies

### Frontend Dependencies
- **UI Framework**: React, Wouter, TanStack Query
- **Styling**: Tailwind CSS, Radix UI, shadcn/ui components
- **Form Management**: React Hook Form, Zod validation
- **Utilities**: date-fns, clsx, class-variance-authority

### Backend Dependencies
- **Database**: Drizzle ORM, @neondatabase/serverless
- **Authentication**: bcrypt, jsonwebtoken
- **Session Management**: connect-pg-simple
- **Development**: tsx, esbuild

### Development Tools
- **Build**: Vite, esbuild
- **Database**: Drizzle Kit for migrations
- **Development**: Replit-specific plugins for development environment

## Deployment Strategy

### Build Process
1. **Frontend Build**: Vite builds the React application to `dist/public`
2. **Backend Build**: esbuild bundles the Express server to `dist/index.js`
3. **Database Migration**: Drizzle Kit manages database schema changes

### Environment Configuration
- **Development**: Uses tsx for TypeScript execution and Vite dev server
- **Production**: Serves built static files from Express server
- **Database**: Requires `DATABASE_URL` environment variable for PostgreSQL connection

### Key Features
- **Role-based Access Control**: Different interfaces for members, coaches, and administrators
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Form Validation**: Client and server-side validation with Zod schemas
- **Progress Tracking**: Member skill development monitoring
- **Payment Management**: Financial tracking and reporting
- **Content Management**: Blog system for swimming tips and academy news

The application follows modern web development practices with a focus on type safety, user experience, and maintainable code architecture.