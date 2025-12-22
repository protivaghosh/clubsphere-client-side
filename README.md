# ClubSphere – Membership & Event Management for Local Clubs

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## Project Overview
**ClubSphere** is a full-stack MERN application for discovering, joining, and managing local clubs. Club managers can manage clubs and events, members can join clubs and register for events, and an admin oversees the platform. Features include authentication, role-based dashboards, secure Stripe payments, and modern frontend tools like React Hook Form and TanStack Query.

### Live Demo
[Live Site](https://clubsphere-project.netlify.app)

## Features

### Public
- Browse clubs and events
- Search and filter clubs/events
- Responsive design (mobile, tablet, desktop)
- Authentication (Firebase Email/Password + Google)
- Animations (Framer Motion)

### Member
- Join clubs (free/paid)
- View memberships and event registrations
- Payment history
- Upcoming events

### Club Manager
- Create/update clubs
- Set membership fees
- Manage club members
- Create/update/delete events
- View event registrations/payments

### Admin
- Manage users (role changes)
- Approve/reject clubs
- Monitor all memberships, events, and payments
- Dashboard with statistics and charts

## Technology Stack

**Frontend:** React.js, React Router, TanStack Query, React Hook Form, Framer Motion, Tailwind CSS/DaisyUI  
**Backend:** Node.js, Express.js, MongoDB (Mongoose), Firebase Authentication, Stripe, JWT

## Database Collections

- **Users:** `name`, `email`, `photoURL`, `role` (admin/manager/member), `createdAt`  
- **Clubs:** `clubName`, `description`, `category`, `location`, `bannerImage`, `membershipFee`, `status`, `managerEmail`, `createdAt`, `updatedAt`  
- **Memberships:** `userEmail`, `clubId`, `status`, `paymentId`, `joinedAt`, `expiresAt`  
- **Events:** `clubId`, `title`, `description`, `eventDate`, `location`, `isPaid`, `eventFee`, `maxAttendees`, `createdAt`  
- **EventRegistrations:** `eventId`, `userEmail`, `clubId`, `status`, `paymentId`, `registeredAt`  
- **Payments:** `userEmail`, `amount`, `type` (membership/event), `clubId`, `eventId`, `stripePaymentIntentId`, `status`, `createdAt`

## License
MIT
