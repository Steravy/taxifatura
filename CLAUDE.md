# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TaxiFatura is a Next.js application built for taxi drivers in Cape Verde to create professional invoices and receipts. The app offers two invoice creation methods: manual entry and QR code system where passengers fill in their own details.

## Development Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint linting
- `npm run postinstall` - Generate Prisma client (runs automatically after install)

## Tech Stack & Architecture

### Framework & UI
- **Next.js 15** with App Router (App directory structure)
- **React 19** for components
- **Tailwind CSS 4** for styling
- **shadcn/ui** components with "new-york" style variant
- **Lucide React** for icons

### Database & Auth
- **PostgreSQL** with **Prisma ORM**
- **Better Auth** for authentication with Prisma adapter
- Database schema includes User, Session, Account, Verification, and WaitingList models
- Prisma client generated to `src/generated/prisma`

### Key Libraries
- **Zod** for validation schemas
- **React Hook Form** with @hookform/resolvers
- **date-fns** for date handling
- **Recharts** for charting/analytics

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/            # Main route group
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── waiting-list/  # Waiting list API
│   ├── dashboard/         # Dashboard pages
│   ├── demo/              # Demo pages
│   └── playground/        # Development playground
├── components/
│   ├── home/              # Landing page components
│   ├── sidebar/           # Navigation components
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── validators/        # Zod validation schemas
│   │   └── sections/      # Resume/form section schemas
│   ├── auth.ts           # Better Auth configuration
│   ├── auth-client.ts    # Client-side auth utilities
│   ├── db.ts             # Database connection
│   └── utils.ts          # Utility functions
└── hooks/                 # Custom React hooks
```

## Database Schema

The application uses a PostgreSQL database with the following key models:
- **User**: Authentication and user management
- **Session**: User sessions with Better Auth
- **Account**: OAuth provider accounts
- **WaitingList**: Email collection for beta access

## Component Architecture

The app follows a component-based architecture with:
- **Landing page**: Multi-section marketing site promoting the service to Cape Verde taxi drivers
- **Dashboard**: Main application interface (structure TBD)
- **Sidebar navigation**: Collapsible sidebar with main nav, projects, and user sections
- **shadcn/ui components**: Consistent design system throughout

## Validation System

Extensive Zod schemas for form validation located in `src/lib/validators/`:
- Resume/CV sections (awards, education, experience, etc.)
- Custom field validation
- Structured data validation for professional documents

## Styling Guidelines

- Uses Tailwind CSS with CSS variables enabled
- Blue-to-cyan gradient brand colors (`from-blue-600 to-cyan-600`)
- Responsive design with mobile-first approach
- Portuguese language content for Cape Verde market

## Authentication Flow

- Better Auth with Prisma adapter
- Next.js cookies integration
- Session management with database storage
- Support for OAuth providers via Account model

## Important Notes

- All content is in Portuguese for the Cape Verde market
- Focus on taxi driver workflow and professional invoice generation
- Mobile-responsive design crucial for in-vehicle usage
- QR code functionality for passenger self-service data entry