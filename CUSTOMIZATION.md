# Customization Guide

This guide will help you customize the Nexus AI landing page template to match your brand.

## Quick Start (5 Minutes)

### 1. Update Brand Information

Edit `src/config/content.ts`:

```typescript
export const brand = {
  name: 'Your Company Name',        // Update your company name
  tagline: 'Your tagline here',     // Update your tagline
  email: 'hello@yourcompany.com',   // Update contact email
  // ... update other fields
};
```

### 2. Update Social Media Links

In the same file:

```typescript
export const social = {
  twitter: 'https://twitter.com/yourcompany',
  github: 'https://github.com/yourcompany',
  linkedin: 'https://linkedin.com/company/yourcompany',
  youtube: 'https://youtube.com/@yourcompany',
};
```

### 3. Update Call-to-Action Buttons

```typescript
export const cta = {
  primary: 'Get Started Free',     // Main CTA text
  secondary: 'Watch Demo',          // Secondary CTA
  // ... update other CTAs
};
```

### 4. Configure Supabase Authentication

1. Copy `.env.example` to `.env`
2. Get your Supabase credentials from https://supabase.com/dashboard
3. Update the `.env` file with your project URL and anon key

```bash
cp .env.example .env
# Then edit .env with your actual credentials
```

## Complete Customization

### Content Updates

All text content is centralized in `src/config/content.ts`. Update these sections:

- **hero**: Main hero section text and badges
- **features**: Feature list items
- **benefits**: Benefit sections with stats
- **useCases**: Use case cards
- **integrations**: Integration list
- **testimonials**: Customer testimonials
- **pricing**: Pricing plans and features
- **faq**: FAQ items
- **footer**: Footer links and sections

### Theme/Design System

Edit `src/config/theme.ts` to customize:

#### Brand Colors

```typescript
colors: {
  primary: {
    main: 'gray-900',      // Primary button background
    hover: 'gray-800',     // Primary button hover
  },
  accent: {
    main: 'blue-600',      // Accent color
    hover: 'blue-700',     // Accent hover
    gradient: 'from-blue-600 to-cyan-600',  // Brand gradient
  },
}
```

**To change the brand gradient** from blue/cyan to another color:
1. Search for `from-blue-600 to-cyan-600` across the codebase
2. Replace with your desired gradient colors
3. Or update `theme.ts` and use the theme variables

#### Typography

```typescript
typography: {
  heading: {
    h1: 'text-5xl sm:text-6xl lg:text-7xl font-bold',
    h2: 'text-4xl sm:text-5xl lg:text-6xl font-bold',
    // Adjust sizes as needed
  }
}
```

#### Spacing

```typescript
spacing: {
  section: {
    mobile: 'py-16',
    desktop: 'py-24',
  }
}
```

### SEO Optimization

Edit `index.html`:

1. **Title**: Update the `<title>` tag
2. **Description**: Update meta description
3. **Keywords**: Add relevant keywords
4. **URL**: Replace `nexusai.example.com` with your actual domain
5. **OG Image**: Add your social media preview image to `/public/og-image.png`

### Navigation Links

Update the navigation in `src/config/content.ts`:

```typescript
export const navigation = {
  links: [
    { label: 'Features', href: '#features' },
    { label: 'Pricing', href: '#pricing' },
    // Add or remove links as needed
  ],
};
```

### Replace Placeholder Images

The template uses placeholder elements for:
- Company logos (in SocialProof.tsx)
- Testimonial avatars (in Testimonials.tsx)
- Integration icons (in Integrations.tsx)

**To add real images:**

1. Add images to `/public/images/`
2. Update the respective components to use `<img>` tags instead of placeholder divs

Example for testimonial avatars:
```tsx
// Replace this:
<div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full" />

// With this:
<img src="/images/avatars/person-name.jpg" alt="Person Name" className="w-12 h-12 rounded-full object-cover" />
```

### Custom Fonts

To use custom fonts:

1. Add font files to `/public/fonts/`
2. Update `src/index.css`:

```css
@font-face {
  font-family: 'YourFont';
  src: url('/fonts/your-font.woff2') format('woff2');
}

body {
  font-family: 'YourFont', sans-serif;
}
```

3. Or use Google Fonts by adding to `index.html`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

### Favicon

Replace `/public/vite.svg` with your own favicon. You can use:
- .ico file (for broad compatibility)
- .svg file (for modern browsers)
- .png file (common choice)

Update `index.html`:
```html
<link rel="icon" type="image/png" href="/favicon.png" />
```

### Analytics Integration

Add your analytics script to `index.html` before the closing `</body>` tag:

#### Google Analytics
```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

#### Plausible Analytics
```html
<script defer data-domain="yourdomain.com" src="https://plausible.io/js/script.js"></script>
```

## Development

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Import project in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Netlify
1. Push code to GitHub
2. Import project in Netlify
3. Add environment variables
4. Set build command: `npm run build`
5. Set publish directory: `dist`
6. Deploy

### Custom Server
```bash
npm run build
# Upload the /dist folder to your server
```

## Common Customizations

### Change Primary Button Color

In `src/config/theme.ts`:
```typescript
colors: {
  primary: {
    main: 'blue-600',    // Change this
    hover: 'blue-700',   // And this
  }
}
```

Then search and replace `bg-gray-900` with `bg-blue-600` in Navigation and Hero components.

### Remove Sections

In `src/App.tsx`, simply comment out or remove sections you don't need:

```typescript
<main>
  <Hero />
  <SocialProof />
  <Features />
  {/* <ProductExplainer /> */}  {/* Removed */}
  <Pricing />
  <FAQ />
</main>
```

### Add New Sections

1. Create a new component in `src/components/`
2. Import and add it to `src/App.tsx`
3. Add content to `src/config/content.ts` if needed

### Mobile Responsiveness

The template uses Tailwind's responsive prefixes:
- `sm:` - 640px and up
- `md:` - 768px and up
- `lg:` - 1024px and up

Adjust breakpoints in `tailwind.config.js` if needed.

## Support

For issues or questions:
1. Check the component comments in the code
2. Review Tailwind CSS documentation: https://tailwindcss.com
3. Review React documentation: https://react.dev
4. Review Supabase documentation: https://supabase.com/docs

## Best Practices

1. **Always test on mobile** after making changes
2. **Run the build** before deploying: `npm run build`
3. **Keep .env file secret** - never commit it to git
4. **Optimize images** before adding them
5. **Test all forms** and interactive elements
6. **Check accessibility** with Lighthouse in Chrome DevTools
7. **Validate links** - make sure no dead links remain

## Checklist Before Launch

- [ ] Updated all content in `src/config/content.ts`
- [ ] Configured Supabase credentials
- [ ] Replaced placeholder images
- [ ] Updated favicon
- [ ] Updated SEO meta tags and OG image
- [ ] Added analytics tracking
- [ ] Updated social media links
- [ ] Tested all forms and authentication
- [ ] Checked mobile responsiveness
- [ ] Ran accessibility audit
- [ ] Tested on multiple browsers
- [ ] Build succeeds without errors
- [ ] Created custom 404 page (if needed)

---

**Need help?** The codebase is well-documented with comments. Check individual component files for specific customization notes.
