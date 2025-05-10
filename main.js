/**
 * Global Trend Product Page JavaScript
 * 
 * This file contains all the interactive functionality for the product page including:
 * - Product image gallery with thumbnail navigation
 * - Image zoom functionality
 * - Product variants (color and size selection)
 * - Size chart modal
 * - Compare colors modal
 * - Product information tabs
 * - Quantity selector
 * - Complementary products carousel
 * - Add to cart functionality
 * - LocalStorage for persisting user preferences
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initProductGallery();
    initImageZoom();
    initColorVariants();
    initSizeVariants();
    initModals();
    initProductTabs();
    initQuantitySelector();
    initComplementaryProductsCarousel();
    initAddToCart();
    
    // Load user preferences from localStorage if available
    loadUserPreferences();
});

/**
 * Product Gallery Functionality
 * Handles the main product image and thumbnails interaction
 */
function initProductGallery() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    const thumbnailsContainer = document.querySelector('.thumbnails-scroll');
    
    // Handle thumbnail click
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', function() {
            // Update active class
            thumbnails.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Update main image
            mainImage.src = this.src;
            mainImage.alt = this.alt;
        });
    });
    
    // Handle scroll buttons for thumbnails
    if (prevBtn && nextBtn && thumbnailsContainer) {
        // Check if we're in mobile view (horizontal thumbnails) or desktop (vertical thumbnails)
        const isMobileView = window.innerWidth <= 767;
        
        prevBtn.addEventListener('click', function() {
            if (isMobileView) {
                thumbnailsContainer.scrollLeft -= 100;
            } else {
                thumbnailsContainer.scrollTop -= 100;
            }
        });
        
        nextBtn.addEventListener('click', function() {
            if (isMobileView) {
                thumbnailsContainer.scrollLeft += 100;
            } else {
                thumbnailsContainer.scrollTop += 100;
            }
        });
        
        // Update scroll direction on window resize
        window.addEventListener('resize', function() {
            const isMobileView = window.innerWidth <= 767;
            // Update button icons if needed
        });
    }
}

/**
 * Image Zoom Functionality
 * Creates a magnified view of the main product image on hover/touch
 */
function initImageZoom() {
    const mainImage = document.getElementById('main-product-image');
    const lens = document.getElementById('image-zoom-lens');
    const zoomedImage = document.getElementById('zoomed-image');
    
    if (!mainImage || !lens || !zoomedImage) return;
    
    let zoomActive = false;
    
    // Initialize zoom functionality only on desktop
    if (window.innerWidth >= 992) {
        mainImage.addEventListener('mouseenter', function() {
            zoomActive = true;
            setZoomedImageBackground();
        });
        
        mainImage.addEventListener('mouseleave', function() {
            zoomActive = false;
            lens.style.display = 'none';
            zoomedImage.style.display = 'none';
        });
        
        mainImage.addEventListener('mousemove', function(e) {
            if (!zoomActive) return;
            
            e.preventDefault();
            
            // Calculate position
            const imageRect = mainImage.getBoundingClientRect();
            let x = e.clientX - imageRect.left;
            let y = e.clientY - imageRect.top;
            
            // Prevent lens from going out of image bounds
            if (x > imageRect.width - (lens.offsetWidth / 2)) {
                x = imageRect.width - (lens.offsetWidth / 2);
            }
            if (x < (lens.offsetWidth / 2)) {
                x = lens.offsetWidth / 2;
            }
            if (y > imageRect.height - (lens.offsetHeight / 2)) {
                y = imageRect.height - (lens.offsetHeight / 2);
            }
            if (y < (lens.offsetHeight / 2)) {
                y = lens.offsetHeight / 2;
            }
            
            // Position lens
            lens.style.left = `${x - (lens.offsetWidth / 2)}px`;
            lens.style.top = `${y - (lens.offsetHeight / 2)}px`;
            
            // Update zoomed image
            const cx = zoomedImage.offsetWidth / lens.offsetWidth;
            const cy = zoomedImage.offsetHeight / lens.offsetHeight;
            zoomedImage.style.backgroundPosition = `-${(x * cx) - (zoomedImage.offsetWidth / 2)}px -${(y * cy) - (zoomedImage.offsetHeight / 2)}px`;
            
            // Show lens and zoomed image
            lens.style.display = 'block';
            zoomedImage.style.display = 'block';
        });
        
        // Set the zoomed image background
        function setZoomedImageBackground() {
            zoomedImage.style.backgroundImage = `url('${mainImage.src}')`;
            zoomedImage.style.backgroundSize = `${mainImage.width * 2}px ${mainImage.height * 2}px`;
        }
        
        // Update zoom when main image changes
        const observer = new MutationObserver(function(mutations) {
            mutations.forEach(function(mutation) {
                if (mutation.attributeName === 'src') {
                    setZoomedImageBackground();
                }
            });
        });
        
        observer.observe(mainImage, { attributes: true });
    }
}

/**
 * Color Variant Functionality
 * Handles color selection and updates the displayed product images
 */
function initColorVariants() {
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const selectedColorText = document.getElementById('selected-color');
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.getElementById('main-product-image');
    
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            // Update active swatch
            colorSwatches.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            
            // Get selected color
            const selectedColor = this.getAttribute('data-color');
            
            // Update selected color text
            if (selectedColorText) {
                selectedColorText.textContent = selectedColor.charAt(0).toUpperCase() + selectedColor.slice(1);
            }
            
            // Find thumbnails with selected color and update visibility
            const matchingThumbnails = document.querySelectorAll(`.thumbnail[data-color="${selectedColor}"]`);
            
            if (matchingThumbnails.length > 0) {
                // Show the first matching thumbnail as the main image
                mainImage.src = matchingThumbnails[0].src;
                mainImage.alt = matchingThumbnails[0].alt;
                
                // Update active thumbnail
                thumbnails.forEach(t => t.classList.remove('active'));
                matchingThumbnails[0].classList.add('active');
            }
            
            // Save selection to localStorage
            saveUserPreference('selectedColor', selectedColor);
        });
    });
}

/**
 * Size Variant Functionality
 * Handles size selection for the product
 */
function initSizeVariants() {
    const sizeBtns = document.querySelectorAll('.size-btn');
    const selectedSizeText = document.getElementById('selected-size');
    
    sizeBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active size
            sizeBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Get selected size
            const selectedSize = this.getAttribute('data-size');
            
            // Update selected size text
            if (selectedSizeText) {
                selectedSizeText.textContent = selectedSize;
            }
            
            // Save selection to localStorage
            saveUserPreference('selectedSize', selectedSize);
        });
    });
}

/**
 * Modal Functionality
 * Handles the size chart and compare colors modals
 */
function initModals() {
    const sizeChartBtn = document.getElementById('size-chart-btn');
    const compareColorsBtn = document.getElementById('compare-colors-btn');
    const sizeChartModal = document.getElementById('size-chart-modal');
    const compareColorsModal = document.getElementById('compare-colors-modal');
    const overlay = document.querySelector('.modal-overlay');
    const closeButtons = document.querySelectorAll('.close-modal');
    const compareCheckboxes = document.querySelectorAll('.compare-checkbox');
    const selectedColorsDisplay = document.getElementById('selected-colors-display');
    
    // Open size chart modal
    if (sizeChartBtn && sizeChartModal) {
        sizeChartBtn.addEventListener('click', function() {
            openModal(sizeChartModal);
        });
    }
    
    // Open compare colors modal
    if (compareColorsBtn && compareColorsModal) {
        compareColorsBtn.addEventListener('click', function() {
            openModal(compareColorsModal);
        });
    }
    
    // Close modal buttons
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            closeAllModals();
        });
    });
    
    // Close on overlay click
    if (overlay) {
        overlay.addEventListener('click', function() {
            closeAllModals();
        });
    }
    
    // Close on ESC key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            closeAllModals();
        }
    });
    
    // Compare color checkboxes
    if (compareCheckboxes && selectedColorsDisplay) {
        compareCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', updateColorComparison);
        });
        
        function updateColorComparison() {
            let selectedColorsHTML = '';
              compareCheckboxes.forEach(checkbox => {
                if (checkbox.checked) {
                    const colorName = checkbox.id.replace('compare-', '');
                    const colorDisplayName = colorName.charAt(0).toUpperCase() + colorName.slice(1);
                    let colorImageUrl;
                    
                    // Map color names to actual Unsplash image URLs
                    switch(colorName) {
                        case 'gray':
                            colorImageUrl = 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=300&q=80';
                            break;
                        case 'blue':
                            colorImageUrl = 'https://images.unsplash.com/photo-1577660002965-8c07a5cd057e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=300&q=80';
                            break;
                        case 'black':
                            colorImageUrl = 'https://images.unsplash.com/photo-1605908502724-9093a79a1b39?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=300&q=80';
                            break;
                        case 'brown':
                            colorImageUrl = 'https://images.unsplash.com/photo-1580657018950-c7f7d6a6d990?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=300&q=80';
                            break;
                        default:
                            colorImageUrl = `https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=300&q=80`;
                    }
                    
                    selectedColorsHTML += `
                        <div class="selected-color-item">
                            <img src="${colorImageUrl}" alt="${colorDisplayName} Luxury Winter Jacket">
                            <div class="selected-color-name">${colorDisplayName}</div>
                        </div>
                    `;
                }
            });
            
            selectedColorsDisplay.innerHTML = selectedColorsHTML || `
                <p>No colors selected for comparison</p>
            `;
        }
    }
    
    // Helper functions for modals
    function openModal(modal) {
        if (!modal) return;
        
        closeAllModals(); // Close any open modal first
        modal.style.display = 'block';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
    
    function closeAllModals() {
        const modals = document.querySelectorAll('.modal');
        modals.forEach(modal => {
            modal.style.display = 'none';
        });
        
        if (overlay) {
            overlay.style.display = 'none';
        }
        
        document.body.style.overflow = ''; // Restore scrolling
    }
}

/**
 * Product Tabs Functionality
 * Handles the tabbed content for product description, information and shipping
 */
function initProductTabs() {
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabPanels = document.querySelectorAll('.tab-panel');
    
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Update active tab button
            tabBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Update active tab panel
            tabPanels.forEach(panel => {
                panel.classList.remove('active');
                if (panel.id === targetTab) {
                    panel.classList.add('active');
                }
            });
        });
    });
}

/**
 * Quantity Selector Functionality
 * Handles incrementing and decrementing the product quantity
 */
function initQuantitySelector() {
    const minusBtn = document.querySelector('.minus-btn');
    const plusBtn = document.querySelector('.plus-btn');
    const quantityInput = document.getElementById('quantity');
    
    if (minusBtn && plusBtn && quantityInput) {
        minusBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue > 1) {
                quantityInput.value = currentValue - 1;
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let currentValue = parseInt(quantityInput.value);
            if (currentValue < 10) {
                quantityInput.value = currentValue + 1;
            }
        });
        
        // Ensure valid quantity on manual input
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
                this.value = 1;
            } else if (value > 10) {
                this.value = 10;
            }
        });
    }
}

/**
 * Complementary Products Carousel
 * Handles the horizontal scrolling for the "Pair Well With" section
 */
function initComplementaryProductsCarousel() {
    const prevBtn = document.querySelector('.prev-comp');
    const nextBtn = document.querySelector('.next-comp');
    const container = document.querySelector('.complementary-products-container');
    
    if (prevBtn && nextBtn && container) {
        prevBtn.addEventListener('click', function() {
            container.scrollBy({
                left: -300,
                behavior: 'smooth'
            });
        });
        
        nextBtn.addEventListener('click', function() {
            container.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
    }
}

/**
 * Add to Cart Functionality
 * Handles adding products to cart and updating the cart count
 */
function initAddToCart() {
    const addToCartBtn = document.querySelector('.add-to-cart-btn');
    const addBundleBtn = document.querySelector('.add-bundle-btn');
    const quickAddBtns = document.querySelectorAll('.quick-add-btn');
    const relatedAddBtns = document.querySelectorAll('.add-to-cart-small');
    const cartCountElement = document.querySelector('.cart-count');
    
    let cartCount = 0;
    
    // Main add to cart button
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', function() {
            addToCart(1);
            showAddToCartAnimation(this);
        });
    }
    
    // Add bundle button
    if (addBundleBtn) {
        addBundleBtn.addEventListener('click', function() {
            addToCart(3); // Bundle has 3 items
            showAddToCartAnimation(this);
        });
    }
    
    // Quick add buttons on complementary products
    quickAddBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent triggering parent click events
            addToCart(1);
            showAddToCartAnimation(this);
        });
    });
    
    // Add to cart buttons on related products
    relatedAddBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            addToCart(1);
            showAddToCartAnimation(this);
        });
    });
    
    function addToCart(count) {
        cartCount += count;
        
        // Update cart count display
        if (cartCountElement) {
            cartCountElement.textContent = cartCount;
            
            // Add a brief highlight effect
            cartCountElement.classList.add('highlight');
            setTimeout(() => {
                cartCountElement.classList.remove('highlight');
            }, 300);
        }
    }
    
    function showAddToCartAnimation(button) {
        // Add a success class to the button
        button.classList.add('adding');
        button.textContent = 'Added!';
        
        // Reset after animation
        setTimeout(() => {
            button.classList.remove('adding');
            
            // Restore original text based on button type
            if (button.classList.contains('add-to-cart-btn')) {
                button.textContent = 'Add to Cart';
            } else if (button.classList.contains('add-bundle-btn')) {
                button.textContent = 'Add Bundle to Cart';
            } else if (button.classList.contains('quick-add-btn')) {
                button.textContent = '+ Quick Add';
            } else {
                button.textContent = 'Add to Cart';
            }
        }, 1500);
    }
}

/**
 * User Preferences
 * Save and load user preferences using localStorage
 */
function saveUserPreference(key, value) {
    try {
        localStorage.setItem(`globalTrend_${key}`, value);
    } catch (e) {
        console.warn('Could not save to localStorage:', e);
    }
}

function loadUserPreferences() {
    try {
        // Load color preference
        const savedColor = localStorage.getItem('globalTrend_selectedColor');
        if (savedColor) {
            const colorSwatch = document.querySelector(`.color-swatch[data-color="${savedColor}"]`);
            if (colorSwatch) {
                colorSwatch.click(); // Simulate click to apply the saved color
            }
        }
        
        // Load size preference
        const savedSize = localStorage.getItem('globalTrend_selectedSize');
        if (savedSize) {
            const sizeBtn = document.querySelector(`.size-btn[data-size="${savedSize}"]`);
            if (sizeBtn) {
                sizeBtn.click(); // Simulate click to apply the saved size
            }
        }
    } catch (e) {
        console.warn('Could not load from localStorage:', e);
    }
}
