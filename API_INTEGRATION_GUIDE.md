# 🚀 Complete API Integration Guide

This guide explains how to integrate backend APIs into the Jooblie frontend application.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Setup Steps](#setup-steps)
4. [Integration Examples](#integration-examples)
5. [Testing](#testing)
6. [Deployment](#deployment)

---

## 🎯 Overview

The API architecture is **already set up** in the `api-architecture` branch. When the backend developer provides APIs, you only need to:

1. Update the base URL
2. Verify endpoint paths
3. Test the integration

**No need to write API logic from scratch!**

---

## 🏗️ Architecture

### Folder Structure

```
src/api/
├── config/
│   ├── axios.ts          # HTTP client with interceptors
│   └── queryClient.ts    # TanStack Query configuration
├── services/             # API service functions
│   ├── authService.ts
│   ├── jobService.ts
│   ├── userService.ts
│   ├── recruiterService.ts
│   └── companyService.ts
├── hooks/                # React Query hooks
│   ├── useAuth.ts
│   ├── useJobs.ts
│   ├── useUser.ts
│   ├── useRecruiter.ts
│   └── useCompany.ts
└── types/                # TypeScript types
    ├── auth.types.ts
    ├── job.types.ts
    ├── user.types.ts
    └── company.types.ts
```

### Data Flow

```
Component → Hook → Service → Axios → Backend API
                ↓
            TanStack Query (Caching, Loading, Error)
```

---

## 🔧 Setup Steps

### Step 1: Merge API Architecture Branch

```bash
# Switch to main branch
git checkout main

# Merge api-architecture branch
git merge api-architecture

# Resolve any conflicts if needed
```

### Step 2: Configure Environment Variables

Create `.env` file in root:

```env
VITE_API_BASE_URL=https://your-backend-api.com/api
```

**Example URLs:**
- Development: `http://localhost:3000/api`
- Staging: `https://staging-api.jooblie.com/api`
- Production: `https://api.jooblie.com/api`

### Step 3: Update main.tsx

Wrap your app with QueryClientProvider:

```typescript
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/config/queryClient';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </React.StrictMode>
);
```

### Step 4: Verify API Endpoints

Check if backend endpoints match the service files:

**Example: authService.ts**
```typescript
// If backend uses /api/v1/auth/login instead of /api/auth/login
// Update the endpoint:
login: async (data) => {
  const response = await apiClient.post('/v1/auth/login', data);
  return response.data;
}
```

---

## 💡 Integration Examples

### Example 1: Login Page

**Before (Current UI):**
```typescript
const handleLogin = (e) => {
  e.preventDefault();
  // TODO: Implement login logic
  navigate('/dashboard');
};
```

**After (With API):**
```typescript
import { useLogin } from '@/api/hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const loginMutation = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <form onSubmit={handleLogin}>
      <input 
        type="email" 
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input 
        type="password" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button disabled={loginMutation.isPending}>
        {loginMutation.isPending ? 'Logging in...' : 'Login'}
      </button>
      {loginMutation.isError && (
        <p className="text-red-500">Login failed. Please try again.</p>
      )}
    </form>
  );
};
```

### Example 2: Jobs Page

**Before (Current UI with mock data):**
```typescript
const Jobs = () => {
  const [jobs] = useState(mockJobs);
  
  return (
    <div>
      {jobs.map(job => <JobCard key={job.id} job={job} />)}
    </div>
  );
};
```

**After (With API):**
```typescript
import { useJobs } from '@/api/hooks/useJobs';

const Jobs = () => {
  const [filters, setFilters] = useState({});
  const { data, isLoading, error } = useJobs(filters);

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage />;

  return (
    <div>
      {data?.jobs.map(job => <JobCard key={job.id} job={job} />)}
    </div>
  );
};
```

### Example 3: Apply for Job

**Before:**
```typescript
const handleApply = () => {
  alert('Application submitted!');
};
```

**After:**
```typescript
import { useApplyJob } from '@/api/hooks/useJobs';

const JobDetail = () => {
  const applyMutation = useApplyJob();

  const handleApply = () => {
    applyMutation.mutate({
      jobId: job.id,
      data: { coverLetter: 'I am interested...' }
    });
  };

  return (
    <button 
      onClick={handleApply}
      disabled={applyMutation.isPending}
    >
      {applyMutation.isPending ? 'Applying...' : 'Apply Now'}
    </button>
  );
};
```

### Example 4: User Profile

**Before:**
```typescript
const Profile = () => {
  const [profile, setProfile] = useState({});
  
  return <div>{profile.name}</div>;
};
```

**After:**
```typescript
import { useProfile, useUpdateProfile } from '@/api/hooks/useUser';

const Profile = () => {
  const { data: profile, isLoading } = useProfile();
  const updateMutation = useUpdateProfile();

  const handleUpdate = (data) => {
    updateMutation.mutate(data);
  };

  if (isLoading) return <LoadingSkeleton />;

  return (
    <div>
      <h1>{profile.fullName}</h1>
      <button onClick={() => handleUpdate({ fullName: 'New Name' })}>
        Update Profile
      </button>
    </div>
  );
};
```

### Example 5: Recruiter Dashboard

**Before:**
```typescript
const RecruiterDashboard = () => {
  const [stats] = useState({ totalJobs: 0, applications: 0 });
  
  return <div>Total Jobs: {stats.totalJobs}</div>;
};
```

**After:**
```typescript
import { useDashboardStats, useMyJobs } from '@/api/hooks/useRecruiter';

const RecruiterDashboard = () => {
  const { data: stats } = useDashboardStats();
  const { data: jobs } = useMyJobs();

  return (
    <div>
      <h2>Total Jobs: {stats?.totalJobs}</h2>
      <h2>Applications: {stats?.totalApplications}</h2>
      {jobs?.map(job => <JobCard key={job.id} job={job} />)}
    </div>
  );
};
```

---

## 🧪 Testing

### Test with Postman/Thunder Client

1. Get API endpoints from backend developer
2. Test each endpoint manually
3. Verify response structure matches types

### Test in Frontend

```typescript
// Add console.log to see API responses
const { data, isLoading, error } = useJobs();

console.log('Jobs data:', data);
console.log('Loading:', isLoading);
console.log('Error:', error);
```

### Common Issues & Solutions

**Issue 1: CORS Error**
```
Solution: Backend needs to enable CORS for your frontend URL
```

**Issue 2: 401 Unauthorized**
```
Solution: Check if token is being sent in headers
console.log(localStorage.getItem('token'));
```

**Issue 3: Network Error**
```
Solution: Verify VITE_API_BASE_URL in .env file
```

**Issue 4: Type Mismatch**
```
Solution: Update types in src/api/types/ to match backend response
```

---

## 🚀 Deployment

### Vercel Deployment

1. Add environment variable in Vercel dashboard:
   ```
   VITE_API_BASE_URL = https://api.jooblie.com/api
   ```

2. Redeploy the application

3. Test all features in production

### Environment-Specific URLs

```env
# .env.development
VITE_API_BASE_URL=http://localhost:3000/api

# .env.staging
VITE_API_BASE_URL=https://staging-api.jooblie.com/api

# .env.production
VITE_API_BASE_URL=https://api.jooblie.com/api
```

---

## 📝 Checklist for Backend Developer

When backend developer provides APIs, verify:

- [ ] Base URL
- [ ] Authentication endpoints (/auth/login, /auth/register)
- [ ] Job endpoints (/jobs, /jobs/:id, /jobs/:id/apply)
- [ ] User endpoints (/users/profile, /users/resume)
- [ ] Recruiter endpoints (/recruiter/jobs, /recruiter/stats)
- [ ] Company endpoints (/companies, /companies/:id)
- [ ] JWT token format
- [ ] Error response format
- [ ] File upload endpoints
- [ ] CORS configuration

---

## 🎯 Benefits of This Architecture

1. ✅ **Clean Separation** - Services, hooks, and components are separate
2. ✅ **Type Safety** - Full TypeScript support
3. ✅ **Automatic Caching** - TanStack Query handles caching
4. ✅ **Loading States** - Built-in loading and error states
5. ✅ **Easy Testing** - Mock services for testing
6. ✅ **Scalable** - Easy to add new endpoints
7. ✅ **Maintainable** - Clear structure and documentation

---

## 📞 Need Help?

If you encounter any issues during integration:

1. Check the API README: `src/api/README.md`
2. Verify environment variables
3. Check browser console for errors
4. Test API endpoints with Postman
5. Contact backend developer for API documentation

---

**Happy Coding! 🚀**
