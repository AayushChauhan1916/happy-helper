

# Stay Creation Feature - Implementation Plan

## Current Situation
Your GitHub repo (`happy-helper`) has the property/room/bed code, but this Lovable project is a separate blank starter -- the code hasn't synced over. To build the stay feature, I need to first bring over the essential foundation (types, mock data, layout, property/room pages) and then build the stay flow on top.

## What I'll Build

### Step 1: Foundation (from your GitHub repo patterns)
Recreate the essential pieces matching your existing code style:
- **`src/types/property.types.ts`** -- Your existing Property, Room, Bed, RoomType, FoodPlan types
- **`src/data/mock-properties.ts`** -- Your mock properties, rooms, beds data
- **`src/components/dashboard/DashboardShell.tsx`** + **`DashboardSidebar.tsx`** + **`TopNavbar.tsx`** -- Your sidebar layout
- **`src/pages/owner/properties/PropertiesList.tsx`**, **`PropertyDetail.tsx`**, **`RoomDetail.tsx`** -- Simplified versions of your existing pages
- **`src/components/property/BedCard.tsx`** -- Your existing bed card component

### Step 2: Stay Types & Mock Data
- Add `Stay` interface to types (userId, bedId, roomId, propertyId, startDate, endDate, status, notes, createdBy, createdAt)
- Add `User` interface (id, fullName, email, phone, gender)
- Add mock stays and mock users to data file

### Step 3: Stay Creation Wizard (Reusable Component)
**`src/components/stay/CreateStayWizard.tsx`** -- 4-step wizard:

| Step | What | Details |
|------|------|---------|
| 1 | Find User | Email input + Continue. Mock search. Found = prefill step 2. Not found = blank form. |
| 2 | User Details | Full name, email (readonly), phone, gender. Prefilled if existing. |
| 3 | Select Location | Property > Room > Bed cascading selects. **Skipped** when context provided. |
| 4 | Stay Details | Start date, end date (optional), notes. Confirm & create. |

**`src/components/stay/CreateStayDialog.tsx`** -- Dialog wrapper that accepts optional pre-selected propertyId/roomId/bedId.

### Step 4: Bed/Room Status & Stay Visibility
- Update **BedCard** to show status: Vacant (green), Occupied (red), Vacating Soon (amber if endDate exists)
- **Click occupied bed** -> opens `StayDetailsSheet` showing stay info
- **Click vacant bed** -> opens CreateStayDialog with location pre-filled
- **Single rooms**: "Create Stay" button directly on room, or show current stay

### Step 5: Sidebar "Create Stay" Entry Point
- Add "Create Stay" button in sidebar
- Opens CreateStayDialog with all 4 steps (including location picker)

### Step 6: Wire Routes
Update `App.tsx` with routes: `/` (properties list), `/properties/:propertyId` (rooms), `/properties/:propertyId/rooms/:roomId` (beds/single view)

## Design Approach
- Matches your existing patterns: motion animations, rounded-xl buttons, shadcn Badge for status, clean card layouts
- Status dots: green/red/amber with clear labels
- "Vacating on [date]" badge for beds with endDate
- Sheet slide-over for viewing stay details (non-intrusive)
- Dialog for create stay wizard (clean multi-step form)

## Files Created/Modified (~15 files)
- `src/types/property.types.ts` (extended with Stay, User)
- `src/data/mock-properties.ts` (extended with stays, users)
- `src/components/dashboard/DashboardShell.tsx`, `DashboardSidebar.tsx`, `TopNavbar.tsx`
- `src/components/property/BedCard.tsx`
- `src/components/stay/CreateStayWizard.tsx`
- `src/components/stay/CreateStayDialog.tsx`
- `src/components/stay/StayDetailsSheet.tsx`
- `src/pages/Index.tsx` (becomes properties list)
- `src/pages/PropertyDetail.tsx`
- `src/pages/RoomDetail.tsx`
- `src/App.tsx` (routes)

