// Sample products data (stored in localStorage)
let products = JSON.parse(localStorage.getItem('sncProducts')) || [];

// Load products on page load
document.addEventListener('DOMContentLoaded', function() {
    loadProducts();
    
    // Sell form submit
    document.getElementById('sellForm').addEventListener('submit', addProduct);
    
    // Modal functionality
    const modal = document.getElementById('buyModal');
    const closeBtn = document.querySelector('.close');
    
    closeBtn.onclick = () => modal.style.display = 'none';
    window.onclick = (e) => {
        if (e.target == modal) modal.style.display = 'none';
    }
});

// Add product
function addProduct(e) {
    e.preventDefault();
    
    const product = {
        id: Date.now(),
        name: document.getElementById('productName').value,
        price: document.getElementById('price').value,
        description: document.getElementById('description').value,
        telegram: document.getElementById('telegram').value,
        wallet: document.getElementById('wallet').value,
        date: new Date().toLocaleDateString()
    };
    
    products.unshift(product);
    localStorage.setItem('sncProducts', JSON.stringify(products));
    
    // Reset form
    document.getElementById('sellForm').reset();
    
    // Show success
    alert('✅ Product listed successfully!');
    loadProducts();
}

// Load and display products
function loadProducts() {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = '';
    
    products.forEach(product => {
        const card = `
            <div class="product-card">
                <div class="product-title">${product.name}</div>
                <div class="product-price">${product.price} USDT</div>
                <div class="product-details">${product.description}</div>
                <div class="seller-info">
                    <i class="fab fa-telegram"></i>
                    <span>Telegram: ${product.telegram}</span>
                </div>
                <div style="font-size: 0.9rem; color: #666; margin-bottom: 1rem;">
                    Listed: ${product.date}
                </div>
                <button class="buy-btn" onclick="openBuyModal(${product.id})">
                    <i class="fas fa-shopping-cart"></i> Buy Now
                </button>
            </div>
        `;
        grid.innerHTML += card;
    });
}

// Open buy modal
function openBuyModal(id) {
    const product = products.find(p => p.id === id);
    const modal = document.getElementById('buyModal');
    const modalBody = document.getElementById('modalBody');
    
    modalBody.innerHTML = `
        <h2>${product.name}</h2>
        <div style="font-size: 2rem; color: #ff6b6b; font-weight: 900; margin: 1rem 0;">
            ${product.price} USDT
        </div>
        <div class="product-details">${product.description}</div>
        
        <div class="seller-info" style="justify-content: space-between;">
            <span><i class="fab fa-telegram"></i> ${product.telegram}</span>
            <a href="https://t.me/${product.telegram.replace('@', '')}" target="_blank
