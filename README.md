# Sharon & Perry's Wedding Website 💒

A beautiful, mobile-responsive Scottish-themed wedding invitation website.

## Features ✨

- **Scottish Tartan Theme** - Elegant design inspired by traditional Scottish patterns
- **Mobile Responsive** - Perfect viewing on all devices, especially mobile
- **Live Countdown Timer** - Shows days, hours, minutes, and seconds until the wedding
- **Multiple Sections:**
  - Hero section with names and date
  - Countdown timer
  - Prenup video embed (YouTube)
  - Photo gallery (6+ images)
  - Venue information with Google Maps
  - Wedding entourage
  - Dress code guidelines
  - FAQ section with accordion
  - RSVP form
- **Smooth Animations** - Minimal, elegant transitions
- **Interactive Elements** - FAQ accordion, form validation, image lightbox

## How to Customize 🛠️

### 1. Update YouTube Video

In `index.html`, find line with YouTube embed and replace `VIDEO_ID`:

```html
<iframe src="https://www.youtube.com/embed/VIDEO_ID"
```

Replace `VIDEO_ID` with your actual YouTube video ID (found in the video URL after `v=`).

### 2. Replace Photos

Replace the image files in the `imgs` folder with your actual couple photos. Keep the same filenames or update them in `index.html`:

```html
<img src="imgs/your-photo.jpg" alt="Sharon and Perry">
```

### 3. Update Venue Information

In `index.html`, update the church and reception details:

- Church name and address
- Reception venue name and address
- Times for each event

### 4. Update Google Maps

Get the embed code from Google Maps:
1. Go to [Google Maps](https://maps.google.com)
2. Search for your venue
3. Click "Share" → "Embed a map"
4. Copy the iframe code
5. Replace the existing iframe in `index.html`

### 5. Update Wedding Entourage

In `index.html`, update the names of:
- Principal Sponsors
- Maid of Honor & Best Man
- Bridesmaids & Groomsmen
- Flower Girl & Ring Bearer

### 6. Customize FAQs

Edit or add FAQ items in `index.html` under the FAQ section.

### 7. Wedding Date & Time

The wedding date is set to **May 18, 2026 at 4:00 PM**. To change it:

In `script.js`, update line 7:
```javascript
const weddingDate = new Date('May 18, 2026 16:00:00').getTime();
```

### 8. RSVP Form Backend (Optional)

Currently, the RSVP form shows a success message but doesn't save data. To actually collect RSVPs, you can:

- Use **Google Forms** embed
- Use **Formspree.io** (free form backend)
- Connect to your own backend server
- Use **Netlify Forms** if hosting on Netlify

### 9. Color Customization

To change the Scottish tartan colors, edit `styles.css` at the top:

```css
:root {
    --primary-red: #8B0000;
    --primary-green: #2C5F2D;
    --primary-blue: #1a3a52;
    --accent-gold: #DAA520;
}
```

## File Structure 📁

```
Wedding Invitation/
├── index.html          # Main HTML structure
├── styles.css          # All styling and responsive design
├── script.js           # JavaScript for interactivity
├── README.md           # This file
└── imgs/               # Image folder
    ├── pic1.jpg
    ├── sample1.png
    ├── sample2.png
    └── sample3.png
```

## Sections Overview 📋

1. **Hero Section** - Names, date, and RSVP button
2. **Countdown** - Live countdown to wedding day
3. **Prenup Video** - Embedded YouTube video
4. **Gallery** - Photo grid with lightbox effect
5. **Venue** - Church and reception info with maps
6. **Entourage** - Complete wedding party list
7. **Dress Code** - Formal Scottish attire guidelines
8. **FAQ** - Common questions with accordion
9. **RSVP** - Interactive form for guest responses
10. **Footer** - Closing message

## Browser Compatibility 🌐

- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Fonts Used 🔤

- **Great Vibes** - Script font for names
- **Cormorant Garamond** - Elegant serif for headings
- **Montserrat** - Clean sans-serif for body text

All fonts are loaded from Google Fonts (no installation needed).

## Tips for Mobile 📱

The website is optimized for mobile viewing:
- Touch-friendly buttons and forms
- Responsive images
- Easy-to-read text sizes
- Simplified navigation on small screens

## Need Help? 💬

- Check that all files are in the same folder
- Make sure image paths in HTML match your actual image filenames
- Test on multiple devices before sharing
- Use browser developer tools (F12) to check for errors

## Sharing Your Website 🌍

### Option 1: Free Hosting
- **Netlify** - Drag and drop your folder
- **GitHub Pages** - Host directly from GitHub
- **Vercel** - Simple deployment

### Option 2: Paid Hosting
- Any web hosting service (GoDaddy, Bluehost, etc.)
- Upload via FTP

---

**Made with ❤️ for Sharon & Perry**

*Wedding Date: May 18, 2026*
