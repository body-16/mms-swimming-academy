# API Reference - MMS Swimming Academy

## Base Information

- **Base URL**: `http://localhost:5000/api` (development) or `https://yourdomain.com/api` (production)
- **Content Type**: `application/json`
- **Authentication**: JWT Bearer Token (for protected routes)

## Authentication

### Headers for Protected Routes

```javascript
{
  "Authorization": "Bearer <jwt_token>",
  "Content-Type": "application/json"
}
```

## Authentication Endpoints

### Register User
**POST** `/api/register`

Register a new user in the system.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123",
  "role": "member"
}
```

**Response (201 Created):**
```json
{
  "message": "User registered successfully",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "member",
    "createdAt": "2024-01-15T10:30:00Z"
  }
}
```

**Validation Rules:**
- Email must be valid format
- Password minimum 6 characters
- Role must be: "member", "coach", or "admin"

### Login User
**POST** `/api/login`

Authenticate user and receive JWT token.

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "securepassword123"
}
```

**Response (200 OK):**
```json
{
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "role": "member"
  }
}
```

### Logout User
**POST** `/api/logout`

Logout current user (requires authentication).

**Response (200 OK):**
```json
{
  "message": "Logout successful"
}
```

## Member Management

### Get All Members
**GET** `/api/members`

Get list of all members (admin only).

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "userId": 2,
    "fullName": "John Doe",
    "phone": "+1234567890",
    "age": 25,
    "swimmingLevel": "Intermediate",
    "program": "Adult Program",
    "status": "active",
    "medicalInfo": null,
    "emergencyContact": "+1234567891",
    "registrationDate": "2024-01-15T10:30:00Z"
  }
]
```

### Get Member Profile
**GET** `/api/members/profile`

Get current authenticated member's profile.

**Response (200 OK):**
```json
{
  "id": 1,
  "userId": 2,
  "fullName": "John Doe",
  "phone": "+1234567890",
  "age": 25,
  "swimmingLevel": "Intermediate",
  "program": "Adult Program",
  "status": "active",
  "medicalInfo": null,
  "emergencyContact": "+1234567891",
  "registrationDate": "2024-01-15T10:30:00Z"
}
```

### Update Member Profile
**PUT** `/api/members/profile`

Update current member's profile information.

**Request Body:**
```json
{
  "fullName": "John Smith",
  "phone": "+1234567890",
  "age": 26,
  "swimmingLevel": "Advanced",
  "emergencyContact": "+1234567891",
  "medicalInfo": "No medical conditions"
}
```

**Response (200 OK):**
```json
{
  "message": "Profile updated successfully",
  "member": {
    "id": 1,
    "userId": 2,
    "fullName": "John Smith",
    "phone": "+1234567890",
    "age": 26,
    "swimmingLevel": "Advanced",
    "program": "Adult Program",
    "status": "active",
    "medicalInfo": "No medical conditions",
    "emergencyContact": "+1234567891",
    "registrationDate": "2024-01-15T10:30:00Z"
  }
}
```

### Create Member Profile
**POST** `/api/members/profile`

Create profile for authenticated user.

**Request Body:**
```json
{
  "fullName": "John Doe",
  "phone": "+1234567890",
  "age": 25,
  "swimmingLevel": "Beginner",
  "program": "Adult Program",
  "emergencyContact": "+1234567891",
  "medicalInfo": null
}
```

## Swimming Programs

### Get All Programs
**GET** `/api/programs`

Get list of all swimming programs.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Kids Program",
    "description": "Fun swimming lessons for children aged 5-12",
    "ageGroup": "5-12 years",
    "level": "Beginner",
    "price": "₪200",
    "duration": 45,
    "capacity": 8,
    "status": "active"
  },
  {
    "id": 2,
    "name": "Adult Program",
    "description": "Comprehensive swimming program for adults",
    "ageGroup": "18+ years",
    "level": "All levels",
    "price": "₪300",
    "duration": 60,
    "capacity": 6,
    "status": "active"
  }
]
```

### Create Program
**POST** `/api/programs`

Create a new swimming program (admin only).

**Request Body:**
```json
{
  "name": "Senior Program",
  "description": "Swimming program for seniors",
  "ageGroup": "60+ years",
  "level": "Beginner",
  "price": "₪250",
  "duration": 45,
  "capacity": 6
}
```

## Classes

### Get All Classes
**GET** `/api/classes`

Get list of all scheduled classes.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "programId": 1,
    "coachId": 1,
    "dayOfWeek": "Monday",
    "startTime": "09:00",
    "endTime": "09:45",
    "capacity": 8,
    "currentEnrollment": 5,
    "status": "active"
  }
]
```

### Create Class
**POST** `/api/classes`

Create a new class (admin only).

**Request Body:**
```json
{
  "programId": 1,
  "coachId": 1,
  "dayOfWeek": "Wednesday",
  "startTime": "10:00",
  "endTime": "10:45",
  "capacity": 8
}
```

## Coaches

### Get All Coaches
**GET** `/api/coaches`

Get list of all coaches.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "userId": 2,
    "fullName": "Ahmed Hassan",
    "phone": "+1234567890",
    "experience": 8,
    "status": "active",
    "certifications": ["WSI", "Lifeguard"],
    "specialties": ["Freestyle", "Butterfly"],
    "bio": "Experienced swimming coach with 8 years of teaching experience",
    "imageUrl": "https://example.com/coach1.jpg"
  }
]
```

### Create Coach
**POST** `/api/coaches`

Create a new coach profile (admin only).

**Request Body:**
```json
{
  "userId": 3,
  "fullName": "Sarah Mohamed",
  "phone": "+1234567891",
  "experience": 5,
  "certifications": ["WSI", "CPR"],
  "specialties": ["Backstroke", "Breaststroke"],
  "bio": "Passionate swimming instructor",
  "imageUrl": "https://example.com/coach2.jpg"
}
```

## Bookings

### Get Member Bookings
**GET** `/api/bookings/me`

Get current member's bookings.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "memberId": 1,
    "classId": 1,
    "status": "confirmed",
    "notes": null,
    "bookingDate": "2024-01-15T10:30:00Z"
  }
]
```

### Create Booking
**POST** `/api/bookings`

Create a new class booking.

**Request Body:**
```json
{
  "classId": 1,
  "notes": "First time booking"
}
```

### Update Booking
**PUT** `/api/bookings/:id`

Update booking status or notes.

**Request Body:**
```json
{
  "status": "cancelled",
  "notes": "Unable to attend"
}
```

## Payments

### Get Member Payments
**GET** `/api/payments/me`

Get current member's payment history.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "memberId": 1,
    "amount": "300.00",
    "paymentMethod": "credit_card",
    "paymentStatus": "completed",
    "description": "Monthly membership fee",
    "paymentDate": "2024-01-15T10:30:00Z",
    "invoiceNumber": "INV-2024-001"
  }
]
```

### Get All Payments
**GET** `/api/payments`

Get all payments (admin only).

### Create Payment
**POST** `/api/payments`

Record a new payment.

**Request Body:**
```json
{
  "memberId": 1,
  "amount": "300.00",
  "paymentMethod": "credit_card",
  "description": "Monthly membership fee",
  "invoiceNumber": "INV-2024-002"
}
```

## Member Progress

### Get Member Progress
**GET** `/api/progress/me`

Get current member's progress records.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "memberId": 1,
    "coachId": 1,
    "stroke": "Freestyle",
    "progress": 85,
    "notes": "Excellent improvement in technique",
    "evaluationDate": "2024-01-15T10:30:00Z"
  }
]
```

### Create Progress Record
**POST** `/api/progress`

Create a new progress record (coach/admin only).

**Request Body:**
```json
{
  "memberId": 1,
  "stroke": "Backstroke",
  "progress": 70,
  "notes": "Good progress, needs work on body position"
}
```

## Blog Posts

### Get All Blog Posts
**GET** `/api/blog`

Get all published blog posts.

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Mastering the Freestyle Stroke",
    "content": "Full blog post content here...",
    "excerpt": "Learn the fundamentals of freestyle swimming...",
    "author": "Ahmed Hassan",
    "category": "Technique",
    "status": "published",
    "imageUrl": "https://example.com/blog1.jpg",
    "publishedDate": "2024-01-15T10:30:00Z"
  }
]
```

### Get Blog Post by ID
**GET** `/api/blog/:id`

Get specific blog post by ID.

### Create Blog Post
**POST** `/api/blog`

Create a new blog post (admin only).

**Request Body:**
```json
{
  "title": "Water Safety Tips",
  "content": "Comprehensive guide to water safety...",
  "excerpt": "Essential safety tips for swimmers",
  "author": "Sarah Mohamed",
  "category": "Safety",
  "imageUrl": "https://example.com/safety.jpg"
}
```

## Contact Messages

### Get All Contacts
**GET** `/api/contacts`

Get all contact messages (admin only).

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "subject": "Class inquiry",
    "message": "I'm interested in adult swimming classes",
    "status": "new",
    "createdAt": "2024-01-15T10:30:00Z"
  }
]
```

### Create Contact Message
**POST** `/api/contacts`

Submit a new contact form message.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "subject": "Class inquiry",
  "message": "I'm interested in adult swimming classes"
}
```

### Update Contact Status
**PUT** `/api/contacts/:id`

Update contact message status (admin only).

**Request Body:**
```json
{
  "status": "responded"
}
```

## Admin Statistics

### Get Admin Statistics
**GET** `/api/admin/stats`

Get comprehensive academy statistics (admin only).

**Response (200 OK):**
```json
{
  "totalMembers": 45,
  "activeMembers": 38,
  "totalRevenue": 15000,
  "monthlyRevenue": 3500,
  "activeClasses": 12,
  "poolUtilization": 75
}
```

## Error Responses

### Standard Error Format

```json
{
  "error": "Error message",
  "details": "Additional error details (optional)",
  "code": "ERROR_CODE"
}
```

### Common HTTP Status Codes

- **200 OK**: Request successful
- **201 Created**: Resource created successfully
- **400 Bad Request**: Invalid request data
- **401 Unauthorized**: Authentication required
- **403 Forbidden**: Insufficient permissions
- **404 Not Found**: Resource not found
- **422 Unprocessable Entity**: Validation errors
- **500 Internal Server Error**: Server error

### Example Error Responses

**400 Bad Request:**
```json
{
  "error": "Validation failed",
  "details": {
    "email": ["Email is required"],
    "password": ["Password must be at least 6 characters"]
  }
}
```

**401 Unauthorized:**
```json
{
  "error": "Authentication required",
  "code": "UNAUTHORIZED"
}
```

**403 Forbidden:**
```json
{
  "error": "Insufficient permissions",
  "code": "FORBIDDEN"
}
```

## Rate Limiting

- **Rate Limit**: 100 requests per 15 minutes per IP
- **Headers**: 
  - `X-RateLimit-Limit`: Request limit
  - `X-RateLimit-Remaining`: Remaining requests
  - `X-RateLimit-Reset`: Reset time (Unix timestamp)

## Pagination

For endpoints that return large datasets, pagination is implemented:

**Query Parameters:**
- `page`: Page number (default: 1)
- `limit`: Items per page (default: 20, max: 100)

**Response Format:**
```json
{
  "data": [...],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 150,
    "pages": 8,
    "hasNext": true,
    "hasPrev": false
  }
}
```

## Filtering and Sorting

**Query Parameters:**
- `filter[field]`: Filter by field value
- `sort`: Sort field (prefix with `-` for descending)
- `search`: Search across multiple fields

**Examples:**
```
GET /api/members?filter[status]=active&sort=-registrationDate
GET /api/blog?search=swimming&sort=publishedDate
```

## Webhooks (Future Feature)

Webhook endpoints for external integrations:

- **Payment Webhooks**: `/api/webhooks/payments`
- **Member Updates**: `/api/webhooks/members`
- **Class Updates**: `/api/webhooks/classes`

## SDK Examples

### JavaScript/Node.js

```javascript
const API_BASE = 'http://localhost:5000/api';

class MMSApi {
  constructor(token) {
    this.token = token;
  }

  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...(this.token && { Authorization: `Bearer ${this.token}` }),
      },
      ...options,
    };

    const response = await fetch(url, config);
    return response.json();
  }

  async login(email, password) {
    const response = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    this.token = response.token;
    return response;
  }

  async getMembers() {
    return this.request('/members');
  }

  async getPrograms() {
    return this.request('/programs');
  }
}

// Usage
const api = new MMSApi();
await api.login('admin@mmsswimmingacademy.com', 'admin123');
const members = await api.getMembers();
```

### Python

```python
import requests
import json

class MMSApi:
    def __init__(self, base_url="http://localhost:5000/api"):
        self.base_url = base_url
        self.token = None
    
    def request(self, endpoint, method="GET", data=None):
        url = f"{self.base_url}{endpoint}"
        headers = {"Content-Type": "application/json"}
        
        if self.token:
            headers["Authorization"] = f"Bearer {self.token}"
        
        response = requests.request(
            method=method,
            url=url,
            headers=headers,
            json=data
        )
        
        return response.json()
    
    def login(self, email, password):
        response = self.request("/login", "POST", {
            "email": email,
            "password": password
        })
        self.token = response.get("token")
        return response
    
    def get_members(self):
        return self.request("/members")
    
    def get_programs(self):
        return self.request("/programs")

# Usage
api = MMSApi()
api.login("admin@mmsswimmingacademy.com", "admin123")
members = api.get_members()
```

This API reference provides comprehensive documentation for integrating with the MMS Swimming Academy Management System.