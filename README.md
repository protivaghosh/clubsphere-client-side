# ClubSphere – Membership & Event Management for Local Clubs

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Project Overview
**ClubSphere** is a full-stack MERN web application designed to help people discover, join, and manage local clubs. Club managers can create and manage clubs and events, members can join clubs and register for events, and an admin oversees the entire platform. The platform includes authentication, role-based dashboards, secure payments using Stripe, and modern frontend tools like React Hook Form and TanStack Query.

### Live Demo
[Live Site Link](YOUR_DEPLOYED_CLIENT_URL_HERE)

---

## Features

### Public Features
- Browse clubs and events
- Club and event search/filter
- Club and event details
- Responsive UI (mobile, tablet, desktop)
- Authentication with Firebase (Email/Password + Google)
- Animations using Framer Motion
- Sorting and filtering options

### Member Features
- Join clubs (free or paid)
- View active memberships
- Register for events
- View upcoming events from their clubs
- Payment history
- Bookmark clubs/events (optional)

### Club Manager Features
- Create/update clubs
- Set membership fees (free or paid)
- Manage club members
- Create/update/delete events
- View event registrations and payments

### Admin Features
- Manage users (role promotion/demotion)
- Approve/reject clubs
- Monitor all memberships, events, and payments
- Dashboard with summary statistics and charts

---

## Technology Stack

### Frontend
- React.js
- React Router
- TanStack Query
- React Hook Form
- Framer Motion
- Tailwind CSS / DaisyUI

### Backend
- Node.js
- Express.js
- MongoDB (via Mongoose)
- Firebase Authentication
- Stripe (for payments)
- JWT (for secure API access)

---

## Database Design (Collections)

### Users
- `name`, `email`, `photoURL`, `role` (admin / clubManager / member), `createdAt`
  
### Clubs
- `clubName`, `description`, `category`, `location`, `bannerImage`, `membershipFee`, `status`, `managerEmail`, `createdAt`, `updatedAt`

### Memberships
- `userEmail`, `clubId`, `status`, `paymentId`, `joinedAt`, `expiresAt`

### Events
- `clubId`, `title`, `description`, `eventDate`, `location`, `isPaid`, `eventFee`, `maxAttendees`, `createdAt`

### EventRegistrations
- `eventId`, `userEmail`, `clubId`, `status`, `paymentId`, `registeredAt`

### Payments
- `userEmail`, `amount`, `type` (membership/event), `clubId`, `eventId`, `stripePaymentIntentId`, `status`, `createdAt`




