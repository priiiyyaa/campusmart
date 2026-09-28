const products = [
    {
        name: "Scientific Calculator",
        price: "₹450",
        condition: "Good condition",
        category: "Electronics",
        images: [
            "images/calculator.jpg",
            "images/calculator.jpg",
            "images/calculator.jpg"
        ]
    },
    {
        name: "Engineering Mathematics Book",
        price: "₹250",
        condition: "Good condition",
        category: "Books",
        images: [
            "images/math-book.jpg",
            "images/math-book.jpg",
            "images/math-book.jpg"
        ]
    },
    {
        name: "Study Table",
        price: "₹1,200",
        condition: "Used",
        category: "Furniture",
        image: "images/study-table.jpg"
    },
    {
        name: "Wireless Headphones",
        price: "₹800",
        condition: "Like new",
        category: "Electronics",
        image: "images/headphones.jpg"
    }
];


/* =====================================
   DISCOVER PAGE
===================================== */

let currentProduct = 0;

const productName =
    document.getElementById("productName");

const productPrice =
    document.getElementById("productPrice");

const productCondition =
    document.getElementById("productCondition");

const productCategory =
    document.getElementById("productCategory");

const productImage =
    document.getElementById("productImage");

const swipeCard =
    document.getElementById("swipeCard");

const likeButton =
    document.querySelector(".like-btn");

const dislikeButton =
    document.querySelector(".dislike-btn");

const leftArrow =
    document.getElementById("leftArrow");

const rightArrow =
    document.getElementById("rightArrow");


function showProduct() {

    if (!productName) {
        return;
    }

    const product =
        products[currentProduct];


    productName.textContent =
        product.name;

    productPrice.textContent =
        product.price;

    productCondition.textContent =
        product.condition;

    productCategory.textContent =
        product.category;


    /*
        Supports both:
        images: [...]
        and
        image: "..."
    */

    const productImages =
        product.images || [product.image];


    if (productImage) {

        productImage.src =
            productImages[0];

        productImage.alt =
            product.name;
    }
}


function nextProduct() {

    currentProduct++;

    if (currentProduct >= products.length) {
        currentProduct = 0;
    }

    showProduct();
}


showProduct();


function swipeProduct(direction) {

    if (!swipeCard) {
        return;
    }

    const distance =
        direction === "right" ? 500 : -500;

    const rotation =
        direction === "right" ? 15 : -15;


    swipeCard.style.transform =
        `translateX(${distance}px) rotate(${rotation}deg)`;

    swipeCard.style.opacity = "0";


    setTimeout(function () {

        swipeCard.style.transform = "";
        swipeCard.style.opacity = "1";

        nextProduct();

    }, 300);
}


if (likeButton) {

    likeButton.addEventListener(
        "click",
        function () {

            swipeProduct("right");

        }
    );
}


if (dislikeButton) {

    dislikeButton.addEventListener(
        "click",
        function () {

            swipeProduct("left");

        }
    );
}


if (leftArrow) {

    leftArrow.addEventListener(
        "click",
        function () {

            swipeProduct("left");

        }
    );
}


if (rightArrow) {

    rightArrow.addEventListener(
        "click",
        function () {

            swipeProduct("right");

        }
    );
}


/* =====================================
   SWIPE BY DRAGGING
===================================== */

let startX = 0;
let currentX = 0;
let isDragging = false;


if (swipeCard) {

    swipeCard.addEventListener(
        "pointerdown",
        function (event) {

            isDragging = true;

            startX = event.clientX;

            currentX = 0;

            swipeCard.style.transition = "none";

            swipeCard.setPointerCapture(
                event.pointerId
            );
        }
    );


    swipeCard.addEventListener(
        "pointermove",
        function (event) {

            if (!isDragging) {
                return;
            }

            currentX =
                event.clientX - startX;


            swipeCard.style.transform =
                `translateX(${currentX}px) rotate(${currentX / 15}deg)`;
        }
    );


    swipeCard.addEventListener(
        "pointerup",
        function (event) {

            if (!isDragging) {
                return;
            }

            isDragging = false;


            swipeCard.releasePointerCapture(
                event.pointerId
            );


            swipeCard.style.transition =
                "transform 0.3s ease, opacity 0.3s ease";


            if (currentX > 100) {

                swipeProduct("right");

            } else if (currentX < -100) {

                swipeProduct("left");

            } else {

                swipeCard.style.transform = "";
            }


            currentX = 0;
        }
    );


    swipeCard.addEventListener(
        "pointercancel",
        function () {

            isDragging = false;

            currentX = 0;

            swipeCard.style.transition =
                "transform 0.3s ease, opacity 0.3s ease";

            swipeCard.style.transform = "";
        }
    );
}


/* =====================================
   HOME PAGE
===================================== */

const searchInput =
    document.querySelector(".search-box input");

const productCards =
    document.querySelectorAll(".product-card");


if (searchInput) {

    searchInput.addEventListener(
        "input",
        function () {

            const searchText =
                searchInput.value
                    .toLowerCase()
                    .trim();


            productCards.forEach(
                function (card) {

                    const nameElement =
                        card.querySelector("h3");


                    if (!nameElement) {
                        return;
                    }


                    const productName =
                        nameElement.textContent
                            .toLowerCase();


                    if (
                        productName.includes(
                            searchText
                        )
                    ) {

                        card.style.display =
                            "block";

                    } else {

                        card.style.display =
                            "none";
                    }
                }
            );
        }
    );
}


/* =====================================
   CATEGORY FILTER
===================================== */

const categoryButtons =
    document.querySelectorAll(
        ".category-list button"
    );


categoryButtons.forEach(
    function (button) {

        button.addEventListener(
            "click",
            function () {

                const selectedCategory =
                    button.dataset.category;


                categoryButtons.forEach(
                    function (btn) {

                        btn.classList.remove(
                            "active-category"
                        );
                    }
                );


                button.classList.add(
                    "active-category"
                );


                productCards.forEach(
                    function (card) {

                        const categoryElement =
                            card.querySelector(
                                ".product-category"
                            );


                        if (!categoryElement) {
                            return;
                        }


                        const category =
                            categoryElement
                                .textContent
                                .trim();


                        if (
                            selectedCategory === "All" ||
                            category === selectedCategory
                        ) {

                            card.style.display =
                                "block";

                        } else {

                            card.style.display =
                                "none";
                        }
                    }
                );
            }
        );
    }
);


/* =====================================
   WISHLIST
===================================== */

function getWishlist() {

    return JSON.parse(
        localStorage.getItem(
            "campusmartWishlist"
        )
    ) || [];
}


function saveWishlist(wishlist) {

    localStorage.setItem(
        "campusmartWishlist",
        JSON.stringify(wishlist)
    );
}


/* =====================================
   HOME PRODUCT HEARTS
===================================== */

const wishlistButtons =
    document.querySelectorAll(
        ".product-heart"
    );


wishlistButtons.forEach(
    function (button) {

        const card =
            button.closest(".product-card");


        if (!card) {
            return;
        }


        const nameElement =
            card.querySelector("h3");


        if (!nameElement) {
            return;
        }


        const productName =
            nameElement.textContent.trim();


        const wishlist =
            getWishlist();


        /* Show saved state */

        if (
            wishlist.includes(productName)
        ) {

            button.innerHTML =
                '<i class="ri-heart-fill"></i>';

            button.classList.add("saved");
        }


        /* Heart click */

        button.addEventListener(
            "click",
            function (event) {

                event.preventDefault();

                event.stopPropagation();


                let currentWishlist =
                    getWishlist();


                if (
                    currentWishlist.includes(
                        productName
                    )
                ) {

                    currentWishlist =
                        currentWishlist.filter(
                            function (item) {

                                return item !==
                                    productName;
                            }
                        );


                    button.innerHTML =
                        '<i class="ri-heart-line"></i>';

                    button.classList.remove(
                        "saved"
                    );


                } else {

                    currentWishlist.push(
                        productName
                    );


                    button.innerHTML =
                        '<i class="ri-heart-fill"></i>';

                    button.classList.add(
                        "saved"
                    );
                }


                saveWishlist(
                    currentWishlist
                );
            }
        );
    }
);


/* =====================================
   WISHLIST PAGE
===================================== */

const wishlistList =
    document.getElementById(
        "wishlistList"
    );


if (wishlistList) {

    const wishlist =
        getWishlist();


    const wishlistProducts =
        products.filter(
            function (product) {

                return wishlist.includes(
                    product.name
                );
            }
        );


    if (wishlistProducts.length === 0) {

        wishlistList.innerHTML = `
            <div class="empty-wishlist">

                <i class="ri-heart-3-line"></i>

                <h3>Your wishlist is empty</h3>

                <p>
                    Save items you like and they
                    will appear here.
                </p>

                <a href="index.html">
                    Explore Products
                </a>

            </div>
        `;


    } else {

        wishlistProducts.forEach(
            function (product) {

                const card =
                    document.createElement(
                        "div"
                    );


                card.className =
                    "product-card";


                /*
                    Supports both image formats
                */

                const productImages =
                    product.images ||
                    [product.image];


                card.innerHTML = `
                    <div class="product-image">

                        <img
                            src="${productImages[0]}"
                            alt="${product.name}"
                        >

                        <span class="product-category">
                            ${product.category}
                        </span>

                        <button
                            class="product-heart wishlist-remove"
                            aria-label="Remove from wishlist"
                        >
                            <i class="ri-heart-fill"></i>
                        </button>

                    </div>


                    <div class="product-info">

                        <h3>${product.name}</h3>

                        <div class="product-bottom">

                            <p class="product-price">
                                ${product.price}
                            </p>

                            <p class="product-condition">
                                ${product.condition}
                            </p>

                        </div>

                    </div>
                `;


                wishlistList.appendChild(
                    card
                );


                const removeButton =
                    card.querySelector(
                        ".wishlist-remove"
                    );


                removeButton.addEventListener(
                    "click",
                    function () {

                        let currentWishlist =
                            getWishlist();


                        currentWishlist =
                            currentWishlist.filter(
                                function (item) {

                                    return item !==
                                        product.name;
                                }
                            );


                        saveWishlist(
                            currentWishlist
                        );


                        card.remove();


                        if (
                            wishlistList.children
                                .length === 0
                        ) {

                            wishlistList.innerHTML = `
                                <div class="empty-wishlist">

                                    <i class="ri-heart-3-line"></i>

                                    <h3>Your wishlist is empty</h3>

                                    <p>
                                        Save items you like
                                        and they will appear here.
                                    </p>

                                    <a href="index.html">
                                        Explore Products
                                    </a>

                                </div>
                            `;
                        }
                    }
                );
            }
        );
    }
}


/* =====================================
   PRODUCT DETAILS PAGE
===================================== */

const detailImage =
    document.getElementById(
        "detailImage"
    );

const detailName =
    document.getElementById(
        "detailName"
    );

const detailPrice =
    document.getElementById(
        "detailPrice"
    );

const detailCategory =
    document.getElementById(
        "detailCategory"
    );

const detailCondition =
    document.getElementById(
        "detailCondition"
    );

const thumbnailsContainer =
    document.querySelector(
        ".product-thumbnails"
    );


if (detailName) {

    const urlParams =
        new URLSearchParams(
            window.location.search
        );


    const productId =
        urlParams.get("id");


    const productIds = {

        "math-book":
            "Engineering Mathematics Book",

        "headphones":
            "Wireless Headphones",

        "study-table":
            "Study Table"

    };


    const selectedProductName =
        productIds[productId];


    const selectedProduct =
        products.find(
            function (product) {

                return product.name ===
                    selectedProductName;

            }
        );


    if (selectedProduct) {

        /* Product information */

        detailName.textContent =
            selectedProduct.name;

        detailPrice.textContent =
            selectedProduct.price;

        detailCategory.textContent =
            selectedProduct.category;

        detailCondition.textContent =
            selectedProduct.condition;


        /* Product images */

        const productImages =
            selectedProduct.images ||
            [selectedProduct.image];


        if (detailImage) {

            detailImage.src =
                productImages[0];

            detailImage.alt =
                selectedProduct.name;
        }


        /* Create thumbnails */

        if (thumbnailsContainer) {

            thumbnailsContainer.innerHTML =
                "";


            productImages.forEach(
                function (image, index) {

                    const thumbnail =
                        document.createElement(
                            "button"
                        );


                    thumbnail.className =
                        "thumbnail";


                    if (index === 0) {

                        thumbnail.classList.add(
                            "active"
                        );
                    }


                    thumbnail.innerHTML = `
                        <img
                            src="${image}"
                            alt="${selectedProduct.name} photo ${index + 1}"
                        >
                    `;


                    thumbnail.addEventListener(
                        "click",
                        function () {

                            detailImage.src =
                                image;


                            const allThumbnails =
                                thumbnailsContainer
                                    .querySelectorAll(
                                        ".thumbnail"
                                    );


                            allThumbnails.forEach(
                                function (item) {

                                    item.classList.remove(
                                        "active"
                                    );
                                }
                            );


                            thumbnail.classList.add(
                                "active"
                            );
                        }
                    );


                    thumbnailsContainer.appendChild(
                        thumbnail
                    );

                }
            );
        }
    }
}


/* =====================================
   PRODUCT DETAILS WISHLIST
===================================== */

const detailWishlistButton =
    document.querySelector(
        ".detail-wishlist"
    );


if (
    detailWishlistButton &&
    detailName
) {

    function updateDetailWishlist() {

        const currentProductName =
            detailName.textContent.trim();


        const wishlist =
            getWishlist();


        if (
            wishlist.includes(
                currentProductName
            )
        ) {

            detailWishlistButton.innerHTML =
                '<i class="ri-heart-fill"></i> Saved';

            detailWishlistButton.classList.add(
                "saved"
            );


        } else {

            detailWishlistButton.innerHTML =
                '<i class="ri-heart-line"></i> Wishlist';

            detailWishlistButton.classList.remove(
                "saved"
            );
        }
    }


    updateDetailWishlist();


    detailWishlistButton.addEventListener(
        "click",
        function () {

            const currentProductName =
                detailName.textContent.trim();


            let wishlist =
                getWishlist();


            if (
                wishlist.includes(
                    currentProductName
                )
            ) {

                wishlist =
                    wishlist.filter(
                        function (item) {

                            return item !==
                                currentProductName;
                        }
                    );


            } else {

                wishlist.push(
                    currentProductName
                );
            }


            saveWishlist(
                wishlist
            );


            updateDetailWishlist();
        }
    );
}

// SELL PAGE IMAGE PREVIEW

const imageInput = document.getElementById("images");
const imagePreview = document.getElementById("imagePreview");

if (imageInput && imagePreview) {

    imageInput.addEventListener("change", function () {

        imagePreview.innerHTML = "";

        const files = Array.from(this.files);

        if (files.length > 5) {
            alert("You can upload a maximum of 5 photos.");
            this.value = "";
            return;
        }

        files.forEach(function (file) {

            const reader = new FileReader();

            reader.onload = function (event) {

                const previewItem = document.createElement("div");
                previewItem.className = "image-preview-item";

                const image = document.createElement("img");
                image.src = event.target.result;
                image.alt = "Selected item photo";

                previewItem.appendChild(image);
                imagePreview.appendChild(previewItem);
            };

            reader.readAsDataURL(file);
        });

    });

}

// SELL FORM VALIDATION

const sellForm = document.getElementById("sellForm");

if (sellForm) {

    sellForm.addEventListener("submit", function (event) {

        event.preventDefault();

        const title = document.getElementById("title").value.trim();
        const description = document.getElementById("description").value.trim();
        const price = document.getElementById("price").value.trim();
        const category = document.getElementById("category").value;
        const condition = document.getElementById("condition").value;
        const location = document.getElementById("location").value.trim();
        const images = document.getElementById("images").files;

        if (!title || !description || !price || !category || !condition || !location) {
            alert("Please fill in all the required details.");
            return;
        }

        if (images.length === 0) {
            alert("Please add at least one photo of your item.");
            return;
        }

        alert("Your item has been listed successfully!");

        sellForm.reset();

        const imagePreview = document.getElementById("imagePreview");

        if (imagePreview) {
            imagePreview.innerHTML = "";
        }

    });

}