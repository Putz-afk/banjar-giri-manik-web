# Ceremony Form Structure Guide

## Visual Hierarchy

```
┌─────────────────────────────────────────────────────────────┐
│ CeremonyForm                                                 │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Header Actions [Back] [Draft/Published] [Save]          │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                               │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ Card: Informasi Dasar                                    │ │
│ │  • Judul Upacara                                         │ │
│ │  • Slug (URL)                                            │ │
│ │  • Jadwal/Waktu                                          │ │
│ │  • Sarana Banten                                         │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                               │
│ [+ Tambah Section]                                            │
│                                                               │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🟠 Section 1                                [🗑️]         │ │
│ │ ┌───────────────────────────────────────────────────┐   │ │
│ │ │ Title: "Pembukaan" (optional)                      │   │ │
│ │ └───────────────────────────────────────────────────┘   │ │
│ │                                                           │ │
│ │ ┌───────────────────────────────────────────────────┐   │ │
│ │ │ Langkah 1                                   [🗑️]  │   │ │
│ │ │ • Instruksi: "Ngaturang canang sari..."           │   │ │
│ │ │ • Mantram: "Om Swastyastu..."                     │   │ │
│ │ │                                                    │   │ │
│ │ │   ┌──────────────────────────────────────────┐    │   │ │
│ │ │   │ Sub-langkah a                      [🗑️] │    │   │ │
│ │ │   │ • Instruksi: "Ring Padmasana"          │    │   │ │
│ │ │   │ • Mantram: "..."                       │    │   │ │
│ │ │   └──────────────────────────────────────────┘    │   │ │
│ │ │   ┌──────────────────────────────────────────┐    │   │ │
│ │ │   │ Sub-langkah b                      [🗑️] │    │   │ │
│ │ │   │ • Instruksi: "Ring Taksu"              │    │   │ │
│ │ │   │ • Mantram: "..."                       │    │   │ │
│ │ │   └──────────────────────────────────────────┘    │   │ │
│ │ │   [+ Tambah Sub-langkah]                          │   │ │
│ │ └───────────────────────────────────────────────────┘   │ │
│ │                                                           │ │
│ │ ┌───────────────────────────────────────────────────┐   │ │
│ │ │ Langkah 2                                   [🗑️]  │   │ │
│ │ │ • Instruksi: "..."                                │   │ │
│ │ │ • Mantram: "..."                                  │   │ │
│ │ └───────────────────────────────────────────────────┘   │ │
│ │                                                           │ │
│ │ [+ Tambah Langkah]                                        │ │
│ └─────────────────────────────────────────────────────────┘ │
│                                                               │
│ ┌─────────────────────────────────────────────────────────┐ │
│ │ 🟠 Section 2                                [🗑️]         │ │
│ │ ...                                                       │ │
│ └─────────────────────────────────────────────────────────┘ │
└─────────────────────────────────────────────────────────────┘
```

## Component Tree

```
CeremonyForm
  ├── Form Header
  │   ├── Back Button
  │   └── Action Bar
  │       ├── Switch (Draft/Published)
  │       └── Save Button
  │
  ├── Basic Info Card
  │   ├── Title Input → Auto-generates Slug
  │   ├── Slug Input
  │   ├── Schedule Input
  │   └── Banten Textarea
  │
  └── Sections List
      └── Section Card (repeatable)
          ├── Section Header
          │   ├── Badge (Section N)
          │   ├── Title Input
          │   └── Delete Button
          │
          └── Items List
              └── Item Container (repeatable)
                  ├── Badge (Langkah N)
                  ├── Instruction Input
                  ├── Mantra Textarea
                  ├── Delete Button
                  │
                  ├── Sub-Items List
                  │   └── Sub-Item Container (repeatable)
                  │       ├── Badge (Sub-langkah a, b, c...)
                  │       ├── Instruction Input
                  │       ├── Mantra Textarea
                  │       └── Delete Button
                  │
                  └── Add Sub-Item Button
```

## State Management

### Top-Level State
```typescript
// Basic Fields
- title: string
- slug: string
- schedule: string
- banten: string
- isPublished: boolean

// Nested Structure
- sections: FormSection[]
  └── tempId: string (client-side tracking)
      id?: string (database ID if editing)
      title: string
      position: number
      items: FormItem[]
        └── tempId: string
            id?: string
            instruction: string
            mantra: string
            position: number
            subItems: FormSubItem[]
              └── tempId: string
                  id?: string
                  instruction: string
                  mantra: string
                  position: number
```

## CRUD Operations

### Create Flow
1. User fills form
2. Click "Simpan"
3. Insert ceremony → get ID
4. For each section:
   - Insert section → get ID
   - For each item:
     - Insert item → get ID
     - Bulk insert sub-items
5. Redirect to admin list

### Update Flow
1. Fetch ceremony with nested relations
2. Load into form state
3. User modifies
4. Click "Simpan"
5. Update ceremony
6. Delete all old sections (cascade deletes items & sub-items)
7. Re-insert all sections with new data
8. Redirect to admin list

### Delete Flow (from list)
1. Click delete button
2. Confirm dialog appears
3. User confirms
4. Delete ceremony (cascades automatically due to FK constraints)
5. Page refreshes

## Data Flow Diagram

```
┌──────────────┐
│   Database   │ Supabase
│              │
│ ceremonies   │────┐
│   ├─sections │    │
│   ├─items    │    │ Fetch
│   └─sub-items│    │
└──────────────┘    │
                    ▼
              ┌──────────┐
              │  Server  │ Next.js Server Component
              │          │
              │ Fetches  │
              │ & passes │
              └──────────┘
                    │
                    ▼
              ┌──────────┐
              │  Client  │ CeremonyForm Component
              │          │
              │ useState │ Manages nested state
              │          │
              │ Updates  │ Add/Remove/Edit operations
              └──────────┘
                    │
                    ▼ Submit
              ┌──────────┐
              │  Server  │ Form submission
              │  Action  │
              │          │
              │  Saves   │ INSERT/UPDATE queries
              └──────────┘
                    │
                    ▼
              ┌──────────┐
              │ Database │ Data persisted
              └──────────┘
```

## Key Features

### Auto-Slug Generation
- Triggered on title change (create mode only)
- Converts to lowercase, replaces spaces with hyphens
- Example: "Purnama Kadasa" → "purnama-kadasa"

### Position Tracking
- Automatically assigned based on array index
- Ensures proper ordering in display

### Temporary IDs
- Uses `crypto.randomUUID()` for client-side tracking
- Prevents React key conflicts
- Allows add/remove without database round-trips

### Validation
- Title: Required
- Slug: Required
- Item instruction: Required
- Everything else: Optional

### Visual Indicators
- Orange left border for sections
- Numbered badges for steps
- Letter badges (a, b, c...) for sub-steps
- Color-coded action buttons (red for delete)

## Best Practices Applied

1. Single Responsibility: Each component/function has one job
2. Type Safety: Full TypeScript coverage
3. User Feedback: Loading states, error messages
4. Accessibility: Semantic HTML, proper labels
5. Performance: Minimal re-renders, efficient state updates
6. Security: Server-side validation (via Supabase RLS)
7. UX: Clear visual hierarchy, intuitive controls
