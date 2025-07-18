# Anima Project

Welcome! This project has been automatically generated by [Anima](https://animaapp.com/).

## Getting started

> **Prerequisites:**
> The following steps require [NodeJS](https://nodejs.org/en/) to be installed on your system, so please
> install it beforehand if you haven't already.

To get started with your project, you'll first need to install the dependencies with:

```
npm install
```

Then, you'll be able to run a development version of the project with:

```
npm run dev
```

After a few seconds, your project should be accessible at the address
[http://localhost:5173/](http://localhost:5173/)

If you are satisfied with the result, you can finally build the project for release with:

```
npm run build
```

## Icon Management

### Figma Icon Export Instructions

To properly import icons from your Figma export:

1. **Export from Figma:**
   - Select all icons in your Figma design
   - Export as SVG format
   - Use consistent naming convention (kebab-case recommended)

2. **Place icons in the project:**
   - Put all exported SVG icons in the `public/icons/` folder
   - Ensure filenames match the references in the code

3. **Expected icon files:**
   ```
   public/icons/
   ├── location-icon.svg
   ├── match-score-icon.svg
   ├── engagement-icon.svg
   ├── followers-icon.svg
   ├── eye-icon.svg
   ├── platform-icon.svg
   ├── view-all-icon.svg
   ├── dropdown-icon.svg
   ├── filter-icon.svg
   ├── search-star-icon.svg
   ├── matchmaking-icon.svg
   ├── modify-recommendations-icon.svg
   ├── list-icon.svg
   ├── dashboard-icon.svg
   ├── list-view-icon.svg
   ├── checkbox-checked.svg
   ├── select-box.svg
   ├── instagram-logo.svg
   ├── tiktok-logo.svg
   ├── group-icon.svg
   ├── engage-icon.svg
   ├── form-icon.svg
   ├── people-icon.svg
   ├── positive-change.svg
   ├── negative-change.svg
   └── divider.svg
   ```

4. **Thumbnail images:**
   - Place thumbnail images in `public/images/` folder
   - Supported formats: JPG, PNG, WebP

### Icon Component Usage

The project now uses a centralized `Icon` component for better maintainability:

```tsx
import { Icon } from "./components/ui/icon";

// Basic usage
<Icon name="location-icon.svg" className="w-4 h-4" alt="Location" />

// With predefined sizes
<IconButton name="search-icon.svg" size="md" />
```

This approach provides:
- Consistent icon loading
- Better error handling
- Centralized icon management
- Type safety for icon names