# API Integration Guide

This folder contains the complete API architecture for the Jooblie application using TanStack Query (React Query) and Axios.

## 📁 Folder Structure

```
src/api/
├── config/
│   └── axios.ts              # Axios instance with interceptors
├── services/
│   ├── authService.ts        # Authentication APIs
│   ├── jobService.ts         # Job listing & application APIs
│   ├── userService.ts        # User profile & resume APIs
│   ├── recruiterService.ts   # Recruiter job posting APIs
│   └── companyService.ts     # Company profile APIs
├── hooks/
│   ├── useAuth.ts            # Auth related hooks
│   ├── useJobs.ts            # Job related hooks
│   ├── useUser.ts            # User profile hooks
│   ├── useRecruiter.ts       # Recruiter hooks
│   └── useCompany.ts         # Company hooks
├── types/
│   ├── auth.types.ts         # Auth types
│   ├── job.types.ts          # Job types
│   ├── user.types.ts         # User types
│   └── company.types.ts      # Company types
└── README.md                 # This file
```

## 🚀 Setup Instructions

### 1. Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

Replace with your backend API URL when available.

### 2. Install Dependencies

TanStack Query is already installed in `package.json`:
```bash
npm install
```

### 3. Configure QueryClient

The QueryClient is already configured in `src/main.tsx` with TanStack Query provider.

## 📖 Usage Examples

### Authentication

```typescript
import { useLogin, useRegister, useCurrentUser } from '@/api/hooks/useAuth';

// In Login component
const Login = () => {
  const loginMutation = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    loginMutation.mutate({
      email: 'user@example.com',
      password: 'password123',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* form fields */}
      <button disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </button>
      {loginMutation.isError && <p>Error: {loginMutation.error.message}</p>}
    </form>
  );
};

// Get current user
const { data: user, isLoading } = useCurrentUser();
```

### Jobs

```typescript
import { useJobs, useJob, useApplyJob } from '@/api/hooks/useJobs';

// Get all jobs with filters
const { data, isLoading, error } = useJobs({
  search: 'developer',
  location: 'Remote',
  type: 'Full-time',
});

// Get single job
const { data: job } = useJob('job-id-123');

// Apply for job
const applyMutation = useApplyJob();
applyMutation.mutate({
  jobId: 'job-id-123',
  data: { coverLetter: 'I am interested...' },
});
```

### User Profile

```typescript
import { useProfile, useUpdateProfile, useUploadResume } from '@/api/hooks/useUser';

// Get profile
const { data: profile } = useProfile();

// Update profile
const updateMutation = useUpdateProfile();
updateMutation.mutate({
  fullName: 'John Doe',
  location: 'New York',
  skills: ['React', 'TypeScript'],
});

// Upload resume
const uploadMutation = useUploadResume();
uploadMutation.mutate(file);
```

### Recruiter

```typescript
import { useMyJobs, useCreateJob, useJobApplicants } from '@/api/hooks/useRecruiter';

// Get recruiter's jobs
const { data: jobs } = useMyJobs();

// Create new job
const createMutation = useCreateJob();
createMutation.mutate({
  title: 'Senior Developer',
  location: 'Remote',
  type: 'Full-time',
  // ... other fields
});

// Get applicants for a job
const { data: applicants } = useJobApplicants('job-id-123');
```

### Companies

```typescript
import { useCompanies, useCompany, useMyCompany } from '@/api/hooks/useCompany';

// Get all companies
const { data: companies } = useCompanies({ search: 'tech' });

// Get single company
const { data: company } = useCompany('company-id-123');

// Get recruiter's company
const { data: myCompany } = useMyCompany();
```

## 🔧 API Services

### Available Services

1. **authService** - Login, Register, Logout, Get Current User
2. **jobService** - Get Jobs, Apply, Get Applications, Search
3. **userService** - Profile, Resume, Experience, Education
4. **recruiterService** - Post Jobs, Manage Applicants, Stats
5. **companyService** - Company Profile, Logo, Jobs

### Service Methods

Each service has methods that return promises. They are wrapped in TanStack Query hooks for better state management.

## 🎯 Features

### Automatic Features

- ✅ **Caching** - Automatic data caching
- ✅ **Loading States** - `isLoading`, `isPending` states
- ✅ **Error Handling** - Centralized error handling
- ✅ **Refetching** - Automatic refetch on window focus
- ✅ **Optimistic Updates** - Instant UI updates
- ✅ **Token Management** - Automatic token in headers
- ✅ **401 Handling** - Auto redirect to login on unauthorized

### Request Interceptor

Automatically adds JWT token to all requests:
```typescript
Authorization: Bearer <token>
```

### Response Interceptor

Handles 401 errors by:
1. Clearing token from localStorage
2. Redirecting to login page

## 🔐 Authentication Flow

1. User logs in → Token saved to localStorage
2. All API requests include token in headers
3. If token expires (401) → Auto redirect to login
4. User logs out → Token removed, queries cleared

## 📝 Type Safety

All API calls are fully typed with TypeScript:
- Request types
- Response types
- Error types

## 🚨 Error Handling

Errors are handled at multiple levels:
1. **Service Level** - Axios interceptors
2. **Hook Level** - onError callbacks
3. **Component Level** - error states

## 🔄 When Backend API is Ready

1. Update `.env` file with actual API URL
2. Update endpoint paths in service files if needed
3. Update types if API response structure differs
4. Test each endpoint
5. Done! Everything else is already set up

## 📚 TanStack Query Benefits

- Automatic background refetching
- Caching and deduplication
- Pagination support
- Infinite scroll support
- Optimistic updates
- Request cancellation
- Retry logic
- Stale-while-revalidate

## 🎨 Best Practices

1. Use hooks in components, not services directly
2. Handle loading and error states in UI
3. Use query keys consistently
4. Invalidate queries after mutations
5. Set appropriate staleTime for different data types

## 📞 Support

For any issues or questions about API integration, contact the backend developer or refer to the API documentation.

---

**Ready for Backend Integration!** 🚀
