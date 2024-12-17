const productDetails = document.getElementById('product-details');
const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/';
const authKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzE4NTA3ZGI3MzAwMTU0MDYzYjMiLCJpYXQiOjE3MzM4NDk0NzcsImV4cCI6MTczNTA1OTA3N30.-mEg_5Da11GxER-uFBkWoNX3o8PNqsjqum8CKiNa9i4';
const fetchProductDetails = async () => {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get('id');
    try {
        const response = await fetch(`${apiUrl}${productId}`, {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${authKey}` },
        });
        const data = await response.json();
        if (!response.ok) throw new Error('Failed to fetch product details');
        displayProductDetails(data);
    } catch (error) {
        alert(error.message);
    }
};
const displayProductDetails = (product) => {
    productDetails.innerHTML = `
        <div class="card  ">
            <img src="${product.imageUrl}" class="immagine d-block mx-auto card-img-top" alt="${product.name}">
            <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text"><strong>$${product.price}</strong></p>
            </div>
        </div>
    `;
};
window.onload = fetchProductDetails;
