const productList = document.getElementById('product-list');
const loadingIndicator = document.getElementById('loading');
const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/';
const authKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzE4NTA3ZGI3MzAwMTU0MDYzYjMiLCJpYXQiOjE3MzM4NDk0NzcsImV4cCI6MTczNTA1OTA3N30.-mEg_5Da11GxER-uFBkWoNX3o8PNqsjqum8CKiNa9i4'; // Replace with your actual token

const fetchProducts = async () => {
    loadingIndicator.classList.remove('d-none');
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${authKey}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error('Failed to fetch products');
        displayProducts(data);
    } catch (error) {
        alert(error.message);
    } finally {
        loadingIndicator.classList.add('d-none');
    }
};
const displayProducts = (products) => {
    productList.innerHTML = '';
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('col-md-4');
        productDiv.innerHTML = `
            <div class="card mb-4">
                <img src="${product.imageUrl}" class="w-50 d-block mx-auto card-img-top" alt="${product.name}">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text"><strong>$${product.price}</strong></p>
                    <a href="details.html?id=${product._id}" class="btn btn-primary">informazioni</a>
                    <button class="btn btn-warning edit-btn" data-id="${product._id}">modifiche</button>
                </div>
            </div>
        `;
        productList.appendChild(productDiv);
    });
    const editButtons = document.querySelectorAll('.edit-btn');
    editButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const productId = e.target.getAttribute('data-id');
            window.location.href = `back-office.html?id=${productId}`;
        });
    });
};


fetchProducts();
