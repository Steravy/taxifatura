# TaxiFatura

Professional invoicing system for taxi drivers in Cape Verde. Create professional invoices and receipts easily through manual entry or QR code system where passengers fill in their own details.

## 🚕 The Story Behind TaxiFatura

This project was born from a real-world problem I witnessed at work. My teammates frequently needed to get reimbursed for taxi rides taken during company business. The process was a nightmare - paper receipts everywhere, easily lost, difficult to track, and a constant source of frustration for both employees and the accounting department.

Watching stacks of crumpled paper receipts pile up on desks, seeing colleagues frantically searching for that one receipt they needed for expense reports, and hearing about lost reimbursements due to missing paperwork - I knew there had to be a better way.

TaxiFatura is the solution: a digital invoicing system specifically designed for Cape Verde's taxi drivers that creates professional, trackable, and easily shareable digital receipts. No more lost papers, no more reimbursement headaches.

## 🌟 Key Features

- **Digital Invoice Creation**: Simple interface for generating professional invoices
- **QR Code System**: Passengers can fill in their own details by scanning a code
- **Mobile-First Design**: Optimized for use on smartphones directly from the vehicle
- **Receipt Management**: Digital history and easy download of issued invoices
- **Company Integration**: Designed with business expense tracking in mind

## 🛠 Tech Stack

- **Next.js 15** - React framework with App Router
- **React 19** - Component library
- **PostgreSQL** - Relational database
- **Prisma ORM** - Object-relational mapping
- **Better Auth** - Authentication system
- **Tailwind CSS 4** - CSS framework
- **shadcn/ui** - UI components

## 📋 Prerequisites

- Node.js 18 or higher
- PostgreSQL installed and configured
- npm or yarn

## 🚀 Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/taxifatura.git
cd taxifatura
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

4. Configure your database in `.env`:
```
DATABASE_URL="postgresql://user:password@localhost:5432/taxifatura"
```

5. Run Prisma migrations:
```bash
npx prisma migrate dev
```

6. Start the development server:
```bash
npm run dev
```

The application will be available at [http://localhost:3000](http://localhost:3000).

## 📦 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run postinstall` - Generate Prisma client (runs automatically)

## 🏗 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (main)/            # Main route group
│   ├── api/               # API routes
│   ├── dashboard/         # Dashboard pages
│   └── demo/              # Demo pages
├── components/
│   ├── home/              # Landing page components
│   ├── sidebar/           # Navigation components
│   └── ui/                # shadcn/ui components
├── lib/
│   ├── validators/        # Zod validation schemas
│   ├── auth.ts           # Better Auth configuration
│   ├── auth-client.ts    # Client-side auth utilities
│   ├── db.ts             # Database connection
│   └── utils.ts          # Utility functions
└── hooks/                 # Custom React hooks
```

## 🗄 Database Schema

The application uses PostgreSQL with the following main models:

- **User**: User management and authentication
- **Session**: User sessions with Better Auth
- **Account**: OAuth provider accounts
- **WaitingList**: Beta access waiting list

## 🎨 Design System

- Tailwind CSS with CSS variables
- Brand colors: blue-to-cyan gradient (`from-blue-600 to-cyan-600`)
- Mobile-first responsive design
- Consistent components via shadcn/ui

## 🔐 Authentication

The system uses Better Auth with:
- Prisma adapter for persistence
- Next.js cookies integration
- Database session management
- OAuth provider support

## 🎯 Problem It Solves

### For Taxi Drivers:
- Professional digital receipts that enhance their service
- Easy invoice generation without paperwork
- Better record keeping for their business

### For Passengers:
- Never lose a receipt again
- Easy expense tracking for company reimbursements
- Quick self-service through QR codes
- Digital records for accounting

### For Companies:
- Streamlined expense management
- Reduced administrative burden
- Clear digital trail for all taxi expenses
- No more lost receipt complaints

## 🚧 Project Status

This project is actively under development. Planned features include:

- [ ] Complete invoice generation system
- [ ] QR Code integration
- [ ] Revenue analytics dashboard
- [ ] Report exports
- [ ] Native mobile app
- [ ] Company portal for bulk receipt management
- [ ] Integration with expense management systems

## 🤝 Contributing

Contributions are welcome! Please open an issue first to discuss proposed changes.

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

Built with ❤️ to solve real problems for Cape Verde's taxi drivers and their passengers