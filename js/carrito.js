// Selección de elementos
const cartItems = document.getElementById("cart-items");
const cartTotal = document.getElementById("cart-total");
const clearCartButton = document.getElementById("clear-cart");
const addToCartButtons = document.querySelectorAll(".add-to-cart");


let cart = [];


function updateCart() {
    cartItems.innerHTML = ""; 
    let total = 0;

    
    cart.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.name} - $${item.price} x ${item.quantity}
            <button class="remove-item" data-index="${index}">Eliminar</button>
        `;
        cartItems.appendChild(li);
        total += item.price * item.quantity;
    });

    
    cartTotal.textContent = `Total: $${total.toLocaleString()}`;
}


function addToCart(event) {
    event.preventDefault();
    const productElement = event.target.closest(".product-item");
    const productName = productElement.querySelector("h3").textContent;
    const productPrice = parseFloat(productElement.querySelector("h4").textContent.replace("$", "").replace(",", ""));

    
    const existingProduct = cart.find(item => item.name === productName);

    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        cart.push({ name: productName, price: productPrice, quantity: 1 });
    }

    updateCart();
}


function removeFromCart(index) {
    cart.splice(index, 1); 
    updateCart();
}


function clearCart() {
    cart = []; 
    updateCart();
}

// Eventos
addToCartButtons.forEach(button => button.addEventListener("click", addToCart));
cartItems.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-item")) {
        const index = event.target.dataset.index;
        removeFromCart(index);
    }
});
clearCartButton.addEventListener("click", clearCart);