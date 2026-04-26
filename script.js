const CartIcon = document.querySelector("#nav-Cart")
const Cart = document.querySelector(".cart")
const CartClose = document.querySelector("#cart-close")

CartIcon.addEventListener("click", () => Cart.classList.add("active"));
CartClose.addEventListener("click", () => Cart.classList.remove("active"));

const addCartButtons = document.querySelectorAll(".add-cart");
addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".new-product-box");
        console.log("Product Box:", productBox);

        addToCart(productBox);

        Cart.classList.add("active");
    });
});

const cartContent = document.querySelector(".cart-content");
const addToCart = productBox => {
    const productImgsrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".new-product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;

    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItems) {
        if (item.textContent === productTitle) {
            alert("This items is already in the cart.");
            return;
        }
    }

    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
    <img src="${productImgsrc}" class="cart-img">
                <div class="cart-details">
                    <h2 class="cart-product-title">${productTitle}</h2>
                    <span class="cart-price">${productPrice}</span>
                    <div class="cart-quantity">
                        <button id="decrement">-</button>
                        <span class="number">1</span>
                        <button id="increment">+</button>
                    </div>
                </div>
                <i class="fa-solid fa-trash cart-remove"></i>
    `;
    cartContent.appendChild(cartBox);

    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();

        updateCartCount(-1);

        updateTotalPrice();
    });

    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = numberElement.textContent;

        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
            if (quantity === 1) {
                decrementButton.style.color = "#999";
            }
        } else if (event.target.id === "increment") {
            quantity++;
            decrementButton.style.color = "#ecd394";
        }

        numberElement.textContent = quantity;

        updateTotalPrice();
    });

    updateCartCount(1);

    updateTotalPrice();

};

const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-Price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;
    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        const price = priceElement.textContent.replace("P", "")
        const quantity = quantityElement.textContent;
        total += price * quantity;
    })
    totalPriceElement.textContent = `$${total}`;
};

let cartItemsCount = 0;
const updateCartCount = change => {
    const cartItemsCountBadge = document.querySelector(".cart-items-count")
    cartItemsCount += change;
    if (cartItemsCount > 0) {
        cartItemsCountBadge.style.visibility = "visible";
        cartItemsCountBadge.textContent = cartItemsCount;
    } else {
        cartItemsCountBadge.style.visibility = "hidden";
        cartItemsCountBadge.textContent = "";
    }
};

const buynowbutton = document.querySelector(".btn-buy");
buynowbutton.addEventListener("click", () => {
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    if (cartBoxes.length === 0) {
        alert("Your Cart is empty. Please add items to your cart before buying.");
        return;
    }

    cartBoxes.forEach(cartBox => cartBox.remove());

    cartItemsCount = 0;
    updateCartCount(0);

    updateTotalPrice();

    alert("Thank you for your purchase");
});