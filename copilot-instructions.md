# Next.js Professional Project - Copilot Instructions

## Project Overview
This is a professional Next.js 14+ project using the App Router, TypeScript, React Server Components, and Tailwind CSS. Follow these comprehensive guidelines when generating code.

---

## 📁 Project Structure Philosophy

### App Directory Organization
```
app/
├── (public)/          # Route Group: Public-facing pages with marketing layout
├── (auth)/            # Route Group: Authentication pages with auth layout
├── (user)/            # Route Group: User dashboard with user layout
├── (admin)/           # Route Group: Admin dashboard with admin layout
├── api/               # API Route Handlers
├── layout.tsx         # Root layout (Providers, HTML structure)
└── globals.css        # Global styles
```

**Route Groups**: Use parentheses `(groupName)` to organize routes without affecting URL structure. Each group has its own `layout.tsx` for group-specific layouts.

### Components Directory Structure
```
components/
├── ui/                # Reusable UI primitives (Button, Input, Modal, Card)
├── layout/            # Global layouts (Navbar, Footer, Sidebar, Header)
├── common/            # Global utilities (Spinner, ErrorBoundary, ThemeToggle)
├── forms/             # Reusable form components
├── public/            # Components specific to (public) route group
├── user/              # Components specific to (user) dashboard
├── admin/             # Components specific to (admin) dashboard
└── widgets/           # Small stateful components used globally
```

**Component Organization Principle**: Components are centralized in `/components` and organized by scope (global vs route-group-specific).

### Lib Directory (Server-Side Logic)
```
lib/
├── actions/           # Server Actions (e.g., user.actions.ts)
├── repositories/      # Data Access Layer (Prisma/DB queries)
├── services/          # Business Logic Layer
├── validation/        # Zod schemas
├── prisma/            # Prisma client
├── auth/              # Auth configuration
└── utils.ts           # Server-side utilities
```

**Backend Architecture**: Follow Repository → Service → Action pattern for clean separation of concerns.

---

## 🎯 Code Style & Best Practices

### General TypeScript Guidelines
- Use TypeScript for ALL files with strict type safety
- Prefer `interface` over `type` for object shapes
- Use `type` for unions, intersections, and utility types
- Always define explicit return types for functions
- Use `const` for all variables unless reassignment is needed
- Prefer `unknown` over `any` and narrow types properly

### React & Next.js Patterns

#### Server vs Client Components
```typescript
// ✅ Server Component (default)
export default async function Page() {
  const data = await fetchData();
  return <ServerComponent data={data} />;
}

// ✅ Client Component (when needed)
'use client';

import { useState } from 'react';

export default function ClientComponent() {
  const [state, setState] = useState();
  return <div onClick={() => setState(value)}>...</div>;
}
```

**Use "use client" ONLY when:**
- Using React hooks (useState, useEffect, useContext)
- Using browser APIs (window, document, localStorage)
- Event handlers (onClick, onChange, etc.)
- Using client-side libraries

#### Component Definition Pattern
```typescript
'use client'; // Only if client component

import React from 'react';
import { cn } from '@/lib/utils';

interface ComponentProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

/**
 * Component description and purpose
 * 
 * @example
 * ```tsx
 * <Component variant="primary" size="md">
 *   Content here
 * </Component>
 * ```
 */
export const Component = React.forwardRef<HTMLDivElement, ComponentProps>(
  ({ variant = 'default', size = 'md', className, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('base-classes', variantClasses[variant], className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Component.displayName = 'Component';
```

---

## 🗂️ File Organization Rules

### When to Create Files in Each Directory

#### `/components/ui/`
Create primitive, highly reusable components:
- Button, Input, Textarea, Select, Checkbox, Radio
- Modal, Dialog, Dropdown, Tooltip, Popover
- Card, Badge, Avatar, Separator
- Alert, Toast, Progress
- NO business logic, pure presentational

#### `/components/layout/`
Create layout components used across multiple route groups:
- Navbar, Footer, Sidebar, Header
- Container, Section, Grid, Stack
- PageHeader, PageFooter
- Breadcrumbs, Navigation

#### `/components/common/`
Create utility components used globally:
- LoadingSpinner, ErrorDisplay, ErrorBoundary
- ThemeToggle, LanguageSwitch
- BackButton, ScrollToTop
- EmptyState, NotFound

#### `/components/forms/`
Create reusable form components:
- LoginForm, RegisterForm, ContactForm
- FormInput, FormSelect, FormTextarea (with validation)
- FormSection, FormActions
- FileUpload, ImageUpload

#### `/components/public/`, `/components/user/`, `/components/admin/`
Create components specific to each route group:
- **public/**: Hero, Features, Testimonials, Pricing, CTA
- **user/**: UserSidebar, UserHeader, Dashboard widgets, StatsCard
- **admin/**: AdminSidebar, AdminHeader, UserTable, Analytics

#### `/lib/actions/`
Create Server Actions for form submissions and mutations:
```typescript
'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

export async function updateUserProfile(formData: FormData) {
  // Validate
  // Update DB
  // Revalidate
  revalidatePath('/dashboard/profile');
  redirect('/dashboard/profile');
}
```

#### `/lib/repositories/`
Create data access functions (DB queries only):
```typescript
import { prisma } from '@/lib/prisma/client';

export async function getUserById(id: string) {
  return prisma.user.findUnique({ where: { id } });
}
```

#### `/lib/services/`
Create business logic that uses repositories:
```typescript
import * as userRepo from '@/lib/repositories/user.repository';

export async function updateUserProfile(userId: string, data: UpdateData) {
  const user = await userRepo.getUserById(userId);
  // Business logic here
  return userRepo.updateUser(userId, data);
}
```

#### `/hooks/`
Create custom React hooks (client-side only):
```typescript
'use client';

import { useState, useEffect } from 'react';

export function useAuth() {
  // Hook logic
  return { user, loading };
}
```

#### `/types/`
Create TypeScript type definitions:
```typescript
export interface User {
  id: string;
  email: string;
  name: string;
}

export type UserRole = 'user' | 'admin' | 'guest';
```

#### `/utils/`
Create client-side utility functions:
```typescript
export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('en-US').format(date);
}
```

---

## 🎨 Styling Guidelines

### Tailwind CSS Best Practices
- Use Tailwind utility classes for all styling
- Follow mobile-first responsive design: `sm:` `md:` `lg:` `xl:` `2xl:`
- Use semantic color names from your design system
- Group utility classes logically: layout → spacing → colors → typography → effects

### Class Name Ordering Convention
```typescript
className="
  // Layout
  flex items-center justify-between
  // Sizing
  w-full h-12
  // Spacing
  px-4 py-2 gap-2
  // Colors & Backgrounds
  bg-white text-gray-900 border border-gray-200
  // Typography
  text-sm font-medium
  // Effects & Transitions
  rounded-lg shadow-sm hover:shadow-md transition-shadow
  // States
  disabled:opacity-50 focus:ring-2
"
```

### Dynamic Styles with `cn()` Utility
```typescript
import { cn } from '@/lib/utils';

className={cn(
  'base-classes',
  {
    'conditional-class': condition,
    'another-class': anotherCondition,
  },
  variantStyles[variant],
  sizeStyles[size],
  className // User-provided classes last
)}
```

---

## 🏗️ Architecture Patterns

### Data Fetching Patterns

#### Server Components (Preferred)
```typescript
// app/(user)/dashboard/page.tsx
export default async function DashboardPage() {
  const user = await getCurrentUser(); // Direct DB call
  const stats = await getStats(user.id);
  
  return <DashboardView user={user} stats={stats} />;
}
```

#### Client Components with Server Actions
```typescript
'use client';

import { updateProfile } from '@/lib/actions/user.actions';

export function ProfileForm({ user }: Props) {
  async function handleSubmit(formData: FormData) {
    await updateProfile(formData);
  }
  
  return <form action={handleSubmit}>...</form>;
}
```

#### API Route Handlers (Only for external APIs or webhooks)
```typescript
// app/api/webhook/route.ts
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  // Process webhook
  return NextResponse.json({ success: true });
}
```

### Form Handling Pattern
```typescript
'use client';

import { useFormState } from 'react-dom';
import { createUser } from '@/lib/actions/user.actions';

export function UserForm() {
  const [state, formAction] = useFormState(createUser, null);
  
  return (
    <form action={formAction}>
      <input name="email" required />
      {state?.errors?.email && <p>{state.errors.email}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Error Handling Pattern
```typescript
// app/(user)/dashboard/error.tsx
'use client';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={reset}>Try again</button>
    </div>
  );
}
```

### Loading States Pattern
```typescript
// app/(user)/dashboard/loading.tsx
export default function Loading() {
  return <DashboardSkeleton />;
}
```

---

## 🔐 Authentication & Authorization

### Middleware Pattern
```typescript
// middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');
  
  // Protect /dashboard routes
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/admin/:path*'],
};
```

### Protected Layout Pattern
```typescript
// app/(user)/dashboard/layout.tsx
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/lib/auth/session';

export default async function DashboardLayout({ children }: Props) {
  const user = await getCurrentUser();
  
  if (!user) {
    redirect('/login');
  }
  
  return (
    <div>
      <UserSidebar user={user} />
      <main>{children}</main>
    </div>
  );
}
```

---

## 📝 Validation with Zod

### Schema Definition
```typescript
// lib/validation/user.schema.ts
import { z } from 'zod';

export const updateProfileSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  bio: z.string().max(500).optional(),
});

export type UpdateProfileInput = z.infer<typeof updateProfileSchema>;
```

### Usage in Server Actions
```typescript
'use server';

import { updateProfileSchema } from '@/lib/validation/user.schema';

export async function updateProfile(formData: FormData) {
  const result = updateProfileSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    bio: formData.get('bio'),
  });
  
  if (!result.success) {
    return { errors: result.error.flatten().fieldErrors };
  }
  
  // Process valid data
  await updateUserInDB(result.data);
}
```

---

## 🎭 Layout Patterns

### Root Layout (Providers Setup)
```typescript
// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'App Name',
  description: 'App description',
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>
            {children}
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
```

### Route Group Layouts
```typescript
// app/(public)/layout.tsx
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export default function PublicLayout({ children }: Props) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer />
    </>
  );
}
```

---

## 🧪 Testing Guidelines

### Component Tests
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Server Action Tests
```typescript
import { updateProfile } from '@/lib/actions/user.actions';

describe('updateProfile', () => {
  it('updates user profile successfully', async () => {
    const formData = new FormData();
    formData.set('name', 'John Doe');
    
    const result = await updateProfile(formData);
    expect(result.success).toBe(true);
  });
});
```

---

## 📦 Dependencies Recommendations

### Core Dependencies
- **UI**: `tailwindcss`, `clsx`, `tailwind-merge`
- **Forms**: `react-hook-form`, `zod`
- **Database**: `@prisma/client`, `prisma`
- **Auth**: `next-auth` or `@clerk/nextjs`
- **Icons**: `lucide-react` or `@radix-ui/react-icons`
- **Animations**: `framer-motion`
- **Date**: `date-fns`

---

## 🚀 Performance Optimization

### Image Optimization
```typescript
import Image from 'next/image';

<Image
  src="/hero.jpg"
  alt="Description"
  width={1200}
  height={600}
  priority // For above-the-fold images
  placeholder="blur"
/>
```

### Dynamic Imports
```typescript
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <Spinner />,
  ssr: false, // Disable SSR if not needed
});
```

### Metadata for SEO
```typescript
// app/(public)/about/page.tsx
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn more about our company',
  openGraph: {
    title: 'About Us',
    description: 'Learn more about our company',
    images: ['/og-image.jpg'],
  },
};
```

---

## 📋 Naming Conventions

### Files & Folders
- **Components**: PascalCase (e.g., `Button.tsx`, `UserCard.tsx`)
- **Server Actions**: kebab-case with `.actions.ts` (e.g., `user.actions.ts`)
- **Repositories**: kebab-case with `.repository.ts` (e.g., `user.repository.ts`)
- **Services**: kebab-case with `.service.ts` (e.g., `email.service.ts`)
- **Utilities**: kebab-case (e.g., `format-date.ts`)
- **Types**: kebab-case (e.g., `user.types.ts`)
- **Hooks**: camelCase with `use` prefix (e.g., `useAuth.ts`)

### Variables & Functions
- **Variables**: camelCase (e.g., `userName`, `isLoading`)
- **Functions**: camelCase (e.g., `fetchUserData`, `handleSubmit`)
- **Components**: PascalCase (e.g., `UserProfile`, `DashboardHeader`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `API_URL`, `MAX_FILE_SIZE`)

---

## 🎯 Common Patterns to Follow

### Compound Components
```typescript
const Card = ({ children }: Props) => <div>{children}</div>;
Card.Header = ({ children }: Props) => <div>{children}</div>;
Card.Body = ({ children }: Props) => <div>{children}</div>;
Card.Footer = ({ children }: Props) => <div>{children}</div>;

export { Card };

// Usage
<Card>
  <Card.Header>Title</Card.Header>
  <Card.Body>Content</Card.Body>
  <Card.Footer>Actions</Card.Footer>
</Card>
```

### Render Props
```typescript
interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

export function List<T>({ items, renderItem }: ListProps<T>) {
  return <ul>{items.map(renderItem)}</ul>;
}
```

### Custom Hooks
```typescript
'use client';

import { useState, useEffect } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);
  
  useEffect(() => {
    const stored = localStorage.getItem(key);
    if (stored) setValue(JSON.parse(stored));
  }, [key]);
  
  const updateValue = (newValue: T) => {
    setValue(newValue);
    localStorage.setItem(key, JSON.stringify(newValue));
  };
  
  return [value, updateValue] as const;
}
```

---

## ✅ Code Quality Checklist

Before committing code, ensure:
- [ ] All TypeScript errors are resolved
- [ ] No `any` types (use `unknown` and type narrowing)
- [ ] Server Components by default, "use client" only when needed
- [ ] Proper error handling with try-catch and error boundaries
- [ ] Loading states for async operations
- [ ] Proper validation with Zod schemas
- [ ] Accessibility: ARIA labels, keyboard navigation, semantic HTML
- [ ] Responsive design tested on mobile, tablet, desktop
- [ ] SEO metadata added where appropriate
- [ ] Images optimized with Next.js Image component
- [ ] No console.log statements in production code
- [ ] Components properly documented with JSDoc comments

---

## 🚨 Common Mistakes to Avoid

1. ❌ Don't use "use client" on Server Components unnecessarily
2. ❌ Don't fetch data in Client Components (use Server Components or Server Actions)
3. ❌ Don't put business logic in components (use services/repositories)
4. ❌ Don't hardcode URLs (use environment variables)
5. ❌ Don't forget to validate user input (use Zod)
6. ❌ Don't expose sensitive data to client (keep in Server Components/Actions)
7. ❌ Don't forget error boundaries and loading states
8. ❌ Don't use vanilla `<img>` tags (use Next.js `<Image>`)
9. ❌ Don't use `<a>` for internal navigation (use Next.js `<Link>`)
10. ❌ Don't forget to revalidate cache after mutations

---

## 📚 Additional Resources

- Next.js Documentation: https://nextjs.org/docs
- React Server Components: https://react.dev/reference/react/use-server
- Tailwind CSS: https://tailwindcss.com/docs
- TypeScript: https://www.typescriptlang.org/docs
- Zod Validation: https://zod.dev

---

**Remember**: Write code that is readable, maintainable, type-safe, and follows the established patterns in this project. Consistency is key to a professional codebase.
