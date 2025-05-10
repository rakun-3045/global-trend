# Global Trend - Product Page

A fully responsive, interactive product page for an e-commerce storefront that mimics Shopify themes. Built with vanilla HTML, CSS, and JavaScript.

## Overview

This project is a single-page implementation of a complete e-commerce product page with all the essential features commonly found in modern online stores. The page is fully responsive and works across mobile, tablet, and desktop devices.

## Features Implemented

### 1. Scrollable Product Images Gallery
- Vertical thumbnails on desktop, horizontal on mobile
- Main image updates when clicking thumbnails
- Navigation buttons for scrolling through thumbnails

### 2. Size Chart Modal
- Opens a responsive size chart with detailed measurements
- Accessible modal with close button, ESC key close, and overlay click
- Organized tabular data with measurement guide

### 3. Product Variants
- Color variations displayed as interactive swatches
- Size variations as selectable buttons
- Selecting a color updates product images and text
- Selecting a size updates the selected size text

### 4. Compare Colors Button
- Opens a modal displaying all available color options
- Users can select multiple colors to compare side by side
- Visual comparison with product images

### 5. Pair Well With (Complementary Products)
- Horizontal scrollable carousel of complementary products
- Quick-add buttons for each product
- Smooth scrolling navigation

### 6. Product Bundle Suggestion
- Complete-the-look bundle with multiple products
- Individual and bundle pricing with savings calculation
- Single-click "Add Bundle to Cart" button

### 7. Tabs for Product Info
- Three interactive tabs: Description, Product Information, Shipping Details
- Clean content organization with smooth transitions
- Fully responsive on all devices

### 8. Related Products Section
- Grid of related product recommendations
- Product badges (New, Sale, Popular)
- Individual add-to-cart buttons

### Bonus Features
- Image zoom on hover for desktop users
- User preferences (color and size) saved in localStorage
- Micro-interactions and animations throughout
- Accessibility features like keyboard navigation
- Responsive design with mobile-first approach

## How to Run Locally

1. Clone or download this repository to your local machine
2. Open the `index.html` file in any modern web browser
3. No server or build process required - everything works client-side

## Project Structure

```
Global Trend/
│
├── index.html                 # Main HTML file
│
├── css/
│   ├── styles.css             # Main stylesheet
│   └── responsive.css         # Responsive styles
│
├── js/
│   └── main.js                # JavaScript functionality
│
└── assets/                    # Images and icons (using placeholders currently)
    ├── images/
    └── icons/
```

## Technical Implementation

- **HTML5**: Semantic markup with accessibility considerations
- **CSS3**: Modern layout techniques including Grid and Flexbox
- **JavaScript**: Vanilla JS with no external dependencies
- **Responsive Design**: Mobile-first approach with media queries
- **LocalStorage API**: For persisting user preferences
- **Images**: High-quality product images from Unsplash

## Browser Compatibility

Tested and working on the latest versions of:
- Chrome
- Firefox
- Safari
- Edge

## Future Enhancements

- Implement a mini cart dropdown
- Add product reviews & ratings section
- Implement product filtering and sorting
- Enhance the image zoom capability with lens zoom
- Add more product variations and details

---

This project was developed as a coding assessment.
