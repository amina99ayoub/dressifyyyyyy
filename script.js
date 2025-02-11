// Wishlist and Cart Data
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let cartCount = cart.length;  // Variable to track cart count
let prices = JSON.parse(localStorage.getItem('prices')) || {};    // Object to store prices for items in the cart
let totalPrice = cart.reduce((total, itemId) => total + prices[itemId], 0); // Variable to track total price

// Add to Cart
function addToCart(itemId, price) {
    if (cart.indexOf(itemId) === -1) {
        cart.push(itemId); // Add item to cart array
        prices[itemId] = price; // Store the price of the item
        totalPrice += price; // Update the total price
        cartCount = cart.length; // Update cart count
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('prices', JSON.stringify(prices));
        localStorage.setItem('totalPrice', totalPrice);
        localStorage.setItem('cartCount', cartCount); // Store updated cart count in localStorage
        updateCartDisplay(); // Update the cart display
        updateCartPopup();  // Update the cart popup immediately
        alert(itemId + " has been added to the cart!");
        playSound(); // Play sound for cart addition
    } else {
        alert(itemId + " is already in the cart!");
    }
}

// Add to Wishlist
function addToWishlist(itemId) {
    if (wishlist.indexOf(itemId) === -1) {
        wishlist.push(itemId); // Add item to wishlist array
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
        updateWishlistPopup();  // Update the wishlist popup immediately
        alert(itemId + " has been added to the wishlist!");
        playSound(); // Play sound for wishlist addition
    } else {
        alert(itemId + " is already in the wishlist!");
    }
}

// Remove from Cart
function removeFromCart(itemId) {
    const itemIndex = cart.indexOf(itemId);
    if (itemIndex !== -1) {
        // Remove item from the cart and prices
        cart.splice(itemIndex, 1);
        delete prices[itemId]; // Remove the price of the item

        // Recalculate total price
        totalPrice = cart.reduce((total, item) => total + prices[item], 0);

        // Update cart count
        cartCount = cart.length;

        // Update localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        localStorage.setItem('prices', JSON.stringify(prices));
        localStorage.setItem('totalPrice', totalPrice);
        localStorage.setItem('cartCount', cartCount);

        // Update cart and popup display
        updateCartDisplay();
        updateCartPopup();

        alert(itemId + " has been removed from the cart!");
        playSound(); // Play sound for cart removal
    }
}

// Remove from Wishlist
function removeFromWishlist(itemId) {
    const itemIndex = wishlist.indexOf(itemId);
    if (itemIndex !== -1) {
        // Remove item from wishlist
        wishlist.splice(itemIndex, 1);

        // Update localStorage
        localStorage.setItem('wishlist', JSON.stringify(wishlist));

        // Update wishlist popup
        updateWishlistPopup();

        alert(itemId + " has been removed from the wishlist!");
        playSound(); // Play sound for wishlist removal
    }
}

// Play Sound Function
function playSound() {
    var sound = new Audio('pop-94319.mp3');
    sound.play();
}

// Update Cart Display (for cart icon)
function updateCartDisplay() {
    document.getElementById('cartCount').innerText = cartCount; // Update the cart count
}

// Update Cart Popup Content with Remove Button
function updateCartPopup() {
    var cartPopup = document.getElementById("cartPopup");
    var content = cart.length > 0
        ? cart.map(function(item) { 
            return "<p>Item: " + item + " - $" + prices[item] + 
                " <button onclick='removeFromCart(\"" + item + "\")'>Remove</button></p>"; 
          }).join("") // Display items and their prices in the cart
        : "<p>Your cart is empty.</p>"; // If cart is empty, show this message
    
    // Add total price to the cart popup
    if (cart.length > 0) {
        content += "<p><strong>Total: $" + totalPrice.toFixed(2) + "</strong></p>";
    }

    cartPopup.innerHTML = 
        '<button class="close-btn" onclick="toggleCart()">×</button>' +
        '<h3>Your Cart</h3>' +
        content; // Cart items with Remove buttons
}

// Update Wishlist Popup Content with Remove Button
function updateWishlistPopup() {
    var wishlistPopup = document.getElementById("wishlistPopup");
    var content = wishlist.length > 0
        ? wishlist.map(function(item) { 
            return "<p>Item: " + item + 
                " <button onclick='removeFromWishlist(\"" + item + "\")'>Remove</button></p>"; 
          }).join("") // Display items in wishlist with Remove buttons
        : "<p>Your wishlist is empty.</p>"; // If wishlist is empty, show this message
    
    wishlistPopup.innerHTML = 
        '<button class="close-btn" onclick="toggleWishlist()">×</button>' +
        '<h3>Your Wishlist</h3>' +
        content; // Wishlist items with Remove buttons
}

// Toggle the hamburger menu
function toggleMenu() {
    var menu = document.getElementById("hamburgerMenu");
    menu.classList.toggle("show");
}

// Popup toggling for Login, Wishlist, and Cart
function toggleWishlist() {
    var wishlistPopup = document.getElementById("wishlistPopup");
    wishlistPopup.style.display = wishlistPopup.style.display === "block" ? "none" : "block";
    closeOtherPopups("wishlist");
    updateWishlistPopup();
}

function toggleCart() {
    var cartPopup = document.getElementById("cartPopup");
    cartPopup.style.display = cartPopup.style.display === "block" ? "none" : "block";
    closeOtherPopups("cart");
    updateCartPopup();
}

function closeOtherPopups(except) {
    if (except !== "wishlist") {
        var wishlistPopup = document.getElementById("wishlistPopup");
        wishlistPopup.style.display = "none";
    }
    if (except !== "cart") {
        var cartPopup = document.getElementById("cartPopup");
        cartPopup.style.display = "none";
    }
}

// Carousel functionality
var prevBtn = document.querySelector(".left-arrow");
var nextBtn = document.querySelector(".right-arrow");
var carouselTrack = document.querySelector(".carousel-track");
var dots = document.querySelectorAll(".dot");
var currentIndex = 0;

function updateCarousel() {
    var cardWidth = document.querySelector(".review-card").offsetWidth;
    carouselTrack.style.transform = "translateX(-" + (currentIndex * (cardWidth + 20)) + "px)";
  
    // Update active dot
    dots.forEach(function(dot) {
        dot.classList.remove("active");
    });
    dots[currentIndex].classList.add("active");
}

prevBtn.addEventListener("click", function() {
    currentIndex = (currentIndex > 0) ? currentIndex - 1 : dots.length - 1;
    updateCarousel();
});

nextBtn.addEventListener("click", function() {
    currentIndex = (currentIndex < dots.length - 1) ? currentIndex + 1 : 0;
    updateCarousel();
});

// Initialize dots
dots.forEach(function(dot, index) {
    dot.addEventListener("click", function() {
        currentIndex = index;
        updateCarousel();
    });
});

// Initialize first view
updateCarousel();

function scrollToCategory() {
    var categorySection = document.getElementById("shop-category");
    window.scrollTo({
        top: categorySection.offsetTop,
        behavior: "smooth"
    });
}

// Function to show the product details popup with animation
function showSearchPopup(productId) {
    var searchPopup = document.getElementById("searchPopup" + productId);
    searchPopup.classList.add('show'); // Add 'show' class to trigger animation
    document.body.classList.add('body-no-scroll'); // Disable body scroll when popup is open
}

// Close the product details popup with animation
function closeSearchPopup(productId) {
    var searchPopup = document.getElementById("searchPopup" + productId);
    searchPopup.classList.remove('show'); // Remove 'show' class to reverse animation
    document.body.classList.remove('body-no-scroll'); // Re-enable body scroll when popup is closed
}

document.addEventListener("DOMContentLoaded", function() {
    var banner = document.querySelector(".bracelet-banner");
    banner.classList.add("animate");

    // Re-update cart display and wishlist on page load
    updateCartDisplay();
    updateCartPopup();
    updateWishlistPopup();
});