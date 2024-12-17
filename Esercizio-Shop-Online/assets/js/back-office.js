const productForm = document.getElementById('productForm');
const resetFormBtn = document.getElementById('resetFormBtn');
const addItemBtn = document.getElementById('addItemBtn');
const editProductBtn = document.getElementById('editProductBtn');
const deleteProductBtn = document.getElementById('deleteProductBtn');

const apiUrl = 'https://striveschool-api.herokuapp.com/api/product/';
const authKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzU4NzE4NTA3ZGI3MzAwMTU0MDYzYjMiLCJpYXQiOjE3MzM4NDk0NzcsImV4cCI6MTczNTA1OTA3N30.-mEg_5Da11GxER-uFBkWoNX3o8PNqsjqum8CKiNa9i4';

let currentProductId = null;

// Gestisce l'aggiunta o modifica del prodotto
productForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newProduct = {
    name: document.getElementById('productName').value,
    brand: document.getElementById('productBrand').value,
    imageUrl: document.getElementById('productImg').value,
    price: parseFloat(document.getElementById('productPrice').value),
    description: document.getElementById('productDescription').value,
  };
  if (currentProductId) {
    updateProduct(currentProductId, newProduct);
  } else {
    addProduct(newProduct);
  }
});


// Aggiunge un nuovo prodotto
const addProduct = async (product) => {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${authKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    if (!response.ok) throw new Error('Impossibile aggiungere il prodotto!');

    alert('Prodotto aggiunto con successo!');
    productForm.reset();
  } catch (error) {
    alert(error.message);
  }
};

// Modifica un prodotto esistente
const updateProduct = async (id, product) => {
  try {
    const response = await fetch(`${apiUrl}${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${authKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    if (!response.ok) throw new Error('Il caricamento del prodotto non è andato a buon fine');
    alert('il prodotto è stato caricato con successo');
  } catch (error) {
    alert(error.message);
  }
};

// Cancella un prodotto
deleteProductBtn.addEventListener('click', async () => {
  if (confirm('Sei sicurə di voler cancellare questo prodotto?')) {
    try {
      const response = await fetch(`${apiUrl}${currentProductId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${authKey}`,
        },
      });

      if (!response.ok) throw new Error('il prodotto non è stato eliminato');

      alert('Il prodotto è stato cancellato con successo!');
      window.location.href = 'shoponline.html';
    } catch (error) {
      alert(error.message);
    }
  }
});

// Controlla se si sta modificando un prodotto esistente
const params = new URLSearchParams(window.location.search);
if (params.has('id')) {
  currentProductId = params.get('id');
  fetchProductById(currentProductId);
  editProductBtn.classList.remove('d-none');
  deleteProductBtn.classList.remove('d-none');
}

// Recupera i dettagli del prodotto per la modifica, non funziona da rivedere!
const fetchProductById = async (id) => {
  try {
    const response = await fetch(striveURL+id, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${authKey}`,
'Content-Type':'application/json',
},
});
if (!response.ok) {
throw new Error('Errore nella risposta: ' + response.status);
}
let data = await response.json();
product = data;
console.log('Prodotto recuperato:', product);
addInInput(product);
} catch (error) {
console.log(error);
}
};
if (productID) {
getProduct(productID);
}
function addInInput(product) {
productName.value = product.name;
productBrand.value = product.brand;
productImg.value = product.imageUrl;
productPrice.value = parseInt(product.price);
productDescription.value = product.description;
}