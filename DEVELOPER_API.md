# Developer API Reference

## Auth Context API

### Import
```javascript
import { useAuth } from '../context/AuthContext';
```

### Hook Usage
```javascript
const { user, isAuthenticated, loading, login, logout, updateUser } = useAuth();
```

### Methods

#### login(userData)
Login a user and persist to localStorage
```javascript
const { login } = useAuth();
login({
  email: 'user@example.com',
  name: 'User Name',
  role: 'user' // or 'reviewer'
});
```

#### logout()
Clear user session
```javascript
const { logout } = useAuth();
logout();
```

#### updateUser(updates)
Update user information
```javascript
const { updateUser } = useAuth();
updateUser({ name: 'New Name' });
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| user | Object | Current user object (null if not logged in) |
| isAuthenticated | Boolean | Is user logged in |
| loading | Boolean | Auth state is loading |

### User Object Structure
```javascript
{
  id: '1234567890',
  email: 'user@example.com',
  name: 'User Name',
  role: 'user' | 'reviewer',
  createdAt: '2024-01-01T00:00:00Z'
}
```

---

## Claims Context API

### Import
```javascript
import { useClaimsContext } from '../context/ClaimsContext';
```

### Hook Usage
```javascript
const {
  claims,
  loading,
  addClaim,
  updateClaim,
  deleteClaim,
  getClaimById,
  getClaimsByStatus,
  getClaimsByCategory,
  getClaimsByUser,
  addReview
} = useClaimsContext();
```

### Methods

#### addClaim(claimData)
Submit a new knowledge claim
```javascript
const newClaim = addClaim({
  title: 'Claim Title',
  category: 'Field Observation',
  description: 'Detailed description...',
  whyUseful: 'Why useful...',
  evidenceLink: 'https://...',
  contributorName: 'John Doe',
  consent: true
});
```

#### updateClaim(id, updates)
Update existing claim
```javascript
updateClaim(claimId, {
  status: 'verified',
  reviewScore: 85
});
```

#### deleteClaim(id)
Delete a claim
```javascript
deleteClaim(claimId);
```

#### getClaimById(id)
Get specific claim details
```javascript
const claim = getClaimById('123456');
```

#### getClaimsByStatus(status)
Get all claims with specific status
```javascript
const verified = getClaimsByStatus('verified');
const pending = getClaimsByStatus('submitted');
const needsEvidence = getClaimsByStatus('needs-more-evidence');
```

#### getClaimsByCategory(category)
Get claims by category
```javascript
const fieldObs = getClaimsByCategory('Field Observation');
```

#### getClaimsByUser(userName)
Get claims by contributor
```javascript
const userClaims = getClaimsByUser('John Doe');
```

#### addReview(claimId, review)
Add review to a claim
```javascript
addReview(claimId, {
  approved: true,
  score: 85,
  comment: 'Great claim!',
  aiUsefulness: 'Useful for model training',
  reviewerName: 'Reviewer Name',
  decision: 'approve' // or 'reject' or 'needs-evidence'
});
```

### Properties

| Property | Type | Description |
|----------|------|-------------|
| claims | Array | All claims |
| loading | Boolean | Data is loading |

### Claim Object Structure
```javascript
{
  id: '1234567890',
  title: 'Claim Title',
  category: 'Field Observation',
  description: 'Description...',
  whyUseful: 'Why useful...',
  evidenceLink: 'https://...',
  file: 'filename.pdf',
  location: 'Bangalore',
  observationDate: '2024-01-01',
  contributorName: 'John Doe',
  consent: true,
  score: 85,
  status: 'submitted' | 'needs-review' | 'needs-more-evidence' | 'verified' | 'rejected',
  aiUsage: ['Useful for model training'],
  reviewerComment: 'Comment...',
  reviewerScore: 85,
  createdAt: '2024-01-01T00:00:00Z',
  reviews: []
}
```

---

## Storage Service API

### Import
```javascript
import { storageService } from '../utils/storageService';
```

### Methods

#### getClaims()
```javascript
const claims = storageService.getClaims();
```

#### setClaims(claims)
```javascript
storageService.setClaims(claimsArray);
```

#### addClaim(claim)
```javascript
const newClaim = storageService.addClaim(claimData);
```

#### updateClaim(id, updates)
```javascript
const updated = storageService.updateClaim(claimId, { status: 'verified' });
```

#### deleteClaim(id)
```javascript
storageService.deleteClaim(claimId);
```

#### getUser()
```javascript
const user = storageService.getUser();
```

#### setUser(user)
```javascript
storageService.setUser(userData);
```

#### getReviews()
```javascript
const reviews = storageService.getReviews();
```

#### addReview(review)
```javascript
const newReview = storageService.addReview(reviewData);
```

#### clear()
```javascript
storageService.clear(); // Clears all data
```

---

## Helper Functions

### Import
```javascript
import {
  calculateKnowledgeScore,
  generateAISuggestions,
  formatDate,
  formatRelativeTime,
  getStatusColor,
  getCategoryColor
} from '../utils/helpers';
```

### Functions

#### calculateKnowledgeScore(claim)
Calculate knowledge value score (0-100)
```javascript
const score = calculateKnowledgeScore({
  title: 'Title',
  description: 'Description',
  evidenceLink: 'https://...',
  file: 'filename.pdf',
  consent: true,
  category: 'Field Observation'
});
// Returns: 85
```

#### generateAISuggestions(category, score)
Get suggested AI usefulness types
```javascript
const suggestions = generateAISuggestions('Field Observation', 85);
// Returns: ['Useful for model training', 'Useful for AI evaluation']
```

#### formatDate(dateString)
Format ISO date to readable format
```javascript
const formatted = formatDate('2024-01-15T10:30:00Z');
// Returns: "Jan 15, 2024"
```

#### formatRelativeTime(dateString)
Get relative time (e.g., "2 hours ago")
```javascript
const relative = formatRelativeTime('2024-01-15T10:30:00Z');
// Returns: "2h ago"
```

#### getStatusColor(status)
Get Tailwind color classes for status
```javascript
const colors = getStatusColor('verified');
// Returns: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
```

#### getCategoryColor(category)
Get Tailwind color classes for category
```javascript
const colors = getCategoryColor('Field Observation');
// Returns: 'bg-cyan-500/20 text-cyan-300'
```

---

## Component Props Reference

### ProtectedRoute
```javascript
<ProtectedRoute requiredRole="reviewer">
  <Component />
</ProtectedRoute>
```
Props:
- `children`: React element to render if authenticated
- `requiredRole`: Optional role requirement (user/reviewer)

### LoadingSpinner
```javascript
<LoadingSpinner size="md" text="Loading..." />
```
Props:
- `size`: 'sm' | 'md' | 'lg'
- `text`: Optional loading text

### StatusTimeline
```javascript
<StatusTimeline claim={claim} />
```
Props:
- `claim`: Claim object

---

## Constants

### Import
```javascript
import {
  CATEGORIES,
  STATUSES,
  AI_USEFULNESS_OPTIONS,
  MOCK_STATS
} from '../utils/constants';
```

### CATEGORIES
```javascript
[
  'Field Observation',
  'Local Knowledge',
  'AI Correction',
  'Expert Knowledge',
  'Creative Idea',
  'Infrastructure Issue',
  'Environment Observation',
  'Other'
]
```

### STATUSES
```javascript
[
  { value: 'submitted', label: 'Submitted', color: 'blue' },
  { value: 'needs-review', label: 'Needs Review', color: 'yellow' },
  { value: 'needs-more-evidence', label: 'Needs More Evidence', color: 'orange' },
  { value: 'verified', label: 'Verified', color: 'emerald' },
  { value: 'rejected', label: 'Rejected', color: 'red' }
]
```

### AI_USEFULNESS_OPTIONS
```javascript
[
  'Useful for model training',
  'Useful for AI evaluation',
  'Useful for knowledge base',
  'Useful as correction feedback',
  'Not useful'
]
```

---

## CSS Classes

### Animations
```javascript
animate-fadeIn      // Fade in effect
animate-slideUp     // Slide up from bottom
animate-slideDown   // Slide down from top
animate-slideInLeft // Slide in from left
animate-pulseRing   // Pulse ring effect
```

### Utilities
```javascript
glass              // Glass morphism style
glass-light        // Light glass variant
gradient-text      // Gradient text effect
gradient-accent    // Gradient background
card-hover         // Card hover effect
pulse-subtle       // Subtle pulse animation
animate-glow       // Glow animation
```

---

## Common Patterns

### Using Auth in a Component
```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div>
      Welcome, {user.name}!
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Using Claims in a Component
```javascript
import { useClaimsContext } from '../context/ClaimsContext';

function ClaimsList() {
  const { claims } = useClaimsContext();
  
  return (
    <div>
      {claims.map(claim => (
        <div key={claim.id}>{claim.title}</div>
      ))}
    </div>
  );
}
```

### Form with Score Preview
```javascript
import { calculateKnowledgeScore } from '../utils/helpers';

function MyForm() {
  const [form, setForm] = useState({...});
  const score = calculateKnowledgeScore(form);
  
  return (
    <div>
      <input onChange={...} />
      <p>Score: {score}/100</p>
    </div>
  );
}
```

---

## Error Handling

### Try-catch with localStorage
```javascript
try {
  const claims = storageService.getClaims();
} catch (error) {
  console.error('Failed to load claims:', error);
}
```

### Handling auth errors
```javascript
try {
  login(userData);
} catch (error) {
  console.error('Login failed:', error);
}
```

---

## Performance Tips

1. **Memoize context consumers**: Use React.memo for optimization
2. **Split context**: Separate auth and claims contexts (already done)
3. **Use selectors**: Create custom hooks for specific data
4. **Lazy load**: Use React.lazy for route-based code splitting
5. **Optimize re-renders**: Proper dependency arrays in useEffect

---

## Testing Examples

### Testing localStorage
```javascript
// In browser console:
localStorage.getItem('aiman_user')
localStorage.getItem('aiman_claims')
localStorage.setItem('test', 'value')
localStorage.clear()
```

### Testing auth state
```javascript
// In component:
const { user, isAuthenticated } = useAuth();
console.log('User:', user);
console.log('Authenticated:', isAuthenticated);
```

### Testing claim submission
```javascript
// In component:
const { addClaim } = useClaimsContext();
const claim = addClaim({
  title: 'Test',
  category: 'Field Observation',
  description: 'Test claim',
  contributorName: 'Test User',
  consent: true
});
console.log('Claim added:', claim);
```

---

## Version Info

- React: 19.2.6
- React Router: 7.16.0
- Tailwind CSS: 3.4.4
- Lucide React: 1.17.0
- Vite: 8.0.12

---

For more details, refer to:
- IMPLEMENTATION_GUIDE.md - Full feature documentation
- QUICK_START.md - Getting started guide
- Component source code - Implementation examples
