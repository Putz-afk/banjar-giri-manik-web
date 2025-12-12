# Engineering Standards - Banjar Giri Manik Web

## 1. Commenting Style (JSDoc)
All components and complex functions MUST use JSDoc.
- **Components:** Explain what it displays and where it is used.
- **Props:** Explain what data is required.
- **Logic:** Comment on "Why" we did this, not just "What".

## 2. Type Safety
- No `any` types allowed. Define interfaces in `@/types`.

## 3. Directory Structure
- `components/ui`: Dumb components (Buttons, Inputs) - DO NOT EDIT logic here.
- `components/features`: Smart components (EventCard, MemberTable) - Business logic goes here.
- `lib`: Helper functions (Date formatters, calculations).