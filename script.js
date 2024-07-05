document.addEventListener('DOMContentLoaded', () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartElement = document.getElementById('cart');
    const cartItemsElement = document.getElementById('cart-items');
    const cartNavIcon = document.getElementById('carrito_nav');
    const clearCartButton = document.getElementById('clear-cart');
    const productsContainer = document.querySelector('.productos .container');

    // Guardar información en LocalStorage
    function saveCart() {
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    // Creación de los items del carrito
    function renderCart() {
        cartItemsElement.innerHTML = '';
        cart.forEach(item => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = item.img;
            const itemName = document.createElement('span');
            itemName.textContent = `${item.name} - $${item.price}`;
            const removeButton = document.createElement('button');
            removeButton.textContent = 'X';
            removeButton.addEventListener('click', () => {
                removeFromCart(item.id);
            });
            li.appendChild(img);
            li.appendChild(itemName);
            li.appendChild(removeButton);
            cartItemsElement.appendChild(li);
        });
    }

    // Agregar al carrito
    function addToCart(id, name, price, img) {
        cart.push({ id, name, price, img });
        saveCart();
        renderCart();
    }

    // Borrar item del carrito x ID
    function removeFromCart(id) {
        const index = cart.findIndex(item => item.id === id);
        if (index > -1) {
            cart.splice(index, 1);
            saveCart();
            renderCart();
        }
    }

    // Creación de las cards con los productos
    function renderProducts(products) {
        productsContainer.innerHTML = '';
        products.forEach(product => {
            const card = document.createElement('div');
            card.className = 'card';

            const img = document.createElement('img');
            img.src = product.img;
            img.alt = product.name;

            const name = document.createElement('p');
            name.textContent = product.name;

            const info = document.createElement('div');
            info.className = 'info';

            const price = document.createElement('p');
            price.textContent = `$${product.price}`;

            const addToCartButton = document.createElement('img');
            addToCartButton.src = '/assets/icons8-carrito-de-compras-30.png';
            addToCartButton.alt = 'carrito';
            addToCartButton.className = 'add-to-cart';

            addToCartButton.addEventListener('click', () => {
                addToCart(product.id, product.name, product.price, product.img);
            });

            info.appendChild(price);
            info.appendChild(addToCartButton);

            card.appendChild(img);
            card.appendChild(name);
            card.appendChild(info);

            productsContainer.appendChild(card);
        });
    }

    // Fetch de los productos desde el archivo JSON
    fetch('products.json')
        .then(response => response.json())
        .then(products => {
            renderProducts(products);
        })
        .catch(error => {
            console.error('Error fetching products:', error);
        });

    cartNavIcon.addEventListener('click', () => {
        cartElement.classList.toggle('hidden');
    });

    clearCartButton.addEventListener('click', () => {
        cart.length = 0;
        saveCart();
        renderCart();
    });

    renderCart();
});
