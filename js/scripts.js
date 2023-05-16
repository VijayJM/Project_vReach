/*!
* Start Bootstrap - Agency v7.0.11 (https://startbootstrap.com/theme/agency)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE)
*/
//
// Scripts
// 

//**********************************************************************************************************************/
//    Vijay M : JavaScript Code - Begins
//**********************************************************************************************************************/

    // Data structure containing all product data displayed on the webpage
    const PRODUCTS = {
        product_1: {
            id: "product_1",
            name: "Sweets and Savories",
            description: "Mix of Traditional sweets made from pure Ghee",
            price: 50,
            stars: 1,
            image: "assets/img/portfolio/1a.png"
        }, product_2: {
            id: "product_2",
            name: "Womens Silk Saree",
            description: "Sandal color Silk saree with Red border with golden thread lining. Comes with a matching blouse",
            price: 120,
            stars: 5,
            image: "assets/img/portfolio/2.png"
        }, product_3: {
            id: "product_3",
            name: "Mens Ethnic Wear",
            description: "Half white Sharwani set for Men. kurtha and necklace are sold separately",
            price: 90,
            stars: 4,
            image: "assets/img/portfolio/3.png"
        }, product_4: {
            id: "product_4",
            name: "Tamil Calendar",
            description: "Tamil Calendar with zodiacs, signs, stars and other astrological information.",
            price: 30,
            stars: 2,
            image: "assets/img/portfolio/4.png"
        }, product_5: {
            id: "product_5",
            name: "Handcrafted Sandalwood Elephant",
            description: "Authentic hand carved products made from high class sandalwood. Fill your house with Sandalwood aroma",
            price: 550,
            stars: 3,
            image: "assets/img/portfolio/5a.png"
        }, product_6: {
            id: "product_6",
            name: "Spoken Tamil Book",
            description: "Learn Tamil alphabets, words and sentences from English easily. Gift it to someone interested to learn Tamil",
            price: 40,
            stars: 3,
            image: "assets/img/portfolio/6a.png"
        }
    };

    /* An array representing products added to the cart. Each item in this array is a number representing the
   product's id in the PRODUCTS object */
    const CART = [];

    /**
       Generates the HTML for displaying one product given its id in the
       PRODUCTS object. This function follows a clone-find-update approach:
       1. CLONE an HTML element to use as a template
       2. FIND the elements using selectors
       3. UPDATE the elements to customize their content
    
       @param    {number} productId An identifier in the PRODUCTS object to display
    
       @returns  {string} A string with the HTML of the product.
    */
    function getProductHTML(productId) {
        console.log("3. inside getProductHTML fn.")
        // Obtain product data from the PRODUCTS object
        const product = PRODUCTS[productId];
    
        // CLONE an HTML element to use as a template
        const productHTML = $("#product-template").clone();
    
        // Delete id to avoid duplicates
        productHTML.prop('id', '');
    
        // FIND and UPDATE the product's name
        productHTML.find(".product-name").text(product.name);
        productHTML.find(".product-price").text(product.price.toFixed(2));
    
        // FIND and UPDATE the product's image properties
        productHTML.find("img").
            prop("src", product.image).
            prop("alt", product.name);
    
        // Customize the product's reviews    
        const starHTML = productHTML.find(".product-reviews").find("div");
        for (let starsCounter = 2; starsCounter <= product.stars; starsCounter++) {
            const newStartHTML = starHTML.clone();
            productHTML.find(".product-reviews").append(newStartHTML);
        }
    
        // Customize the product's "Add to cart" button
        productHTML
            .find(".product-action")
            .text("Add to cart");

        // Remove .d-none to make the product visible
        productHTML.removeClass("d-none");
    
        return productHTML;
    }
    
    /**
        Show all products in the application's homepage
    
        @returns  No value.
    */
    function showProducts(products) {
        console.log("2. Inside Show Products")
        // Traverse the products object
        for (let product of products) {
            //const product = PRODUCTS[productId];
    
            // Generate each product's HTML
            const productHTML = getProductHTML(product.id);
            productHTML
                .find(".product-action")
                .text("Add to cart")
                .on("click", addProduct).
                // Add this data property to identify the product when it is added to the cart
                data("product-id", product.id);

            /* Finally, append the cutomized HTML for each product to the products
               container on the webpage */
            $('#products').append(productHTML);
        }
        console.log("4. after appending productHTML into Products")
    }
    
    function addProduct() {
        // Use data property added in the showProducts function to identify the product
        const productId = $(this).data("product-id");

        CART.push(productId);

        updateCartTotal();
    }

    /**
        Removes a product from the shopping cart
    
        @returns  No value.
    */
    function removeProduct() {
        // Use data property added in the showCart function to identify the product
        const productCartIndex = $(this).data("product-cart-index");

        CART.splice(productCartIndex, 1);

        updateCartTotal();

        // Use data property added in the showCart function to identify and remove the product
        $("#product-cart-index-" + productCartIndex).fadeOut(
            "fast",
            // After the product fades out, display the entire cart again. 
            showCart);
    }

    /**
        Displays the shopping cart
    
        @returns  No value.
    */
    function showCart() {
        // Empty the cart every time it is displayed  
        $("#products-cart").empty();

        // Traverse the CART array to access all products in the cart
        for (let i = 0; i < CART.length; i++) {

            // Generate each product's HTML
            const productHTML = getProductHTML(CART[i]);

            /* Add an id to the product's root HTML element to facilitate its removal
             when the users removes this product from the cart */
            productHTML.prop('id', "product-cart-index-" + i);

            // Customize the product's "Remove" button
            productHTML
                .find(".product-action")
                .text("Remove")
                .on("click", removeProduct).
                // Add this data property to identify the product when it is removed from the cart
                data("product-cart-index", i);

            // Display product images in the cart smaller (50% of their original size)
            productHTML
                .find(".card-img-top")
                .addClass("w-50");

            /* Finally, append the cutomized HTML for each product to the cart
               container on the webpage */
            $("#products-cart").append(productHTML);
        }

        // Display empty cart message depending on number of items in the cart
        if (CART.length == 0) {
            $("#empty-cart").fadeIn();
        } else {
            $("#empty-cart").fadeOut();
        }
    }

    /**
        Update the number of items in the cart shown at the top of the webpage
    
        @returns  No value.
    */
    function updateCartTotal() {
        // Update number of items
        $("#cart-total").text(CART.length);

        /* Switch the cart icon at the top of the webpage to reflect the cart status:
           empty or not empty. */
        if (CART.length == 0) {
            $("#show-cart").find("i").removeClass("bi-cart-fill").addClass("bi-cart2");
        } else {
            $("#show-cart").find("i").removeClass("bi-cart2").addClass("bi-cart-fill");
        }
    }

    function search() {
        // 1. Create a new search result object (will be empty in the beginning)
            const results = [];
    
        // 2. Capture User's query
            const query = $('#searchQuery').val().toLowerCase().trim();
            console.log (query);
        
        // 3. Search over the PRODUCTS object for a given user's query
              // Match user's query against product's name and description
              // Update results object with matching products.
    
            for (const productId in PRODUCTS) {
                const product = PRODUCTS[productId];
    
                if (product.name.toLowerCase().includes(query)) {
                    results.push(product);
                }
            }
        
    
        // 4. Show products matching the user's query.
            console.log(results);
            $('#products').empty();
            showProducts(results);
    
    }
    
    // 5. Register the search function so it is executed when the user keys in a query. (from the Javascript itself instead of from HTML)
//$("#searchQuery").on('keyup',search);
//console.log("1. after adding event to searchQuery")

//$("#show-cart").on("click", showCart);

//showProducts(Object.values(PRODUCTS));
    
const myCarouselElement = document.querySelector('#myCarousel')

const carousel = new bootstrap.Carousel(myCarouselElement, {
  interval: 2000,
  touch: false
})

$(document).ready(function () {
    /*
    Use Object.values() to generate an array of products that
    facilitates the handling the products data
    https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/values
    */
    showProducts(Object.values(PRODUCTS));

    // Register event handler for updating the cart when the user clicks the "Cart" button
    $("#show-cart").on("click", showCart);

    // Register event handler for live search when the user types something on the "search" input
    $("#searchQuery").on("keyup", search);        
});

//**********************************************************************************************************************/
//    Vijay M : JavaScript Code - Ends
//**********************************************************************************************************************/


window.addEventListener('DOMContentLoaded', event => {

    // Navbar shrink function
    var navbarShrink = function () {
        const navbarCollapsible = document.body.querySelector('#mainNav');
        if (!navbarCollapsible) {
            return;
        }
        if (window.scrollY === 0) {
            navbarCollapsible.classList.remove('navbar-shrink')
        } else {
            navbarCollapsible.classList.add('navbar-shrink')
        }

    };

    // Shrink the navbar 
    navbarShrink();

    // Shrink the navbar when page is scrolled
    document.addEventListener('scroll', navbarShrink);

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

//IIFE
