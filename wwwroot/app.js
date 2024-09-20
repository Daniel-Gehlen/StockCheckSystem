const apiUrl = 'https://localhost:5001/api/product'; // Verifique se a URL está correta

document.getElementById('product-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const quantity = document.getElementById('quantity').value;

    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: name,
            quantity: parseInt(quantity),
            isAvailable: quantity > 0
        })
    });

    if (response.ok) {
        document.getElementById('name').value = '';
        document.getElementById('quantity').value = '';
        loadProducts(); // Recarrega os produtos
    } else {
        console.error('Erro ao adicionar produto');
    }
});

async function loadProducts() {
    const response = await fetch(apiUrl);
    const products = await response.json();

    const tableBody = document.querySelector('#product-table tbody');
    tableBody.innerHTML = '';

    products.forEach(product => {
        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${product.id}</td>
            <td><input type="text" value="${product.name}" data-id="${product.id}" class="edit-name"></td>
            <td><input type="number" value="${product.quantity}" data-id="${product.id}" class="edit-quantity"></td>
            <td>${product.isAvailable ? 'In Stock' : 'Out of Stock'}</td>
            <td>
                <button onclick="deleteProduct(${product.id})">Delete</button>
                <button onclick="updateProduct(${product.id})">Update</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

async function deleteProduct(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });

    if (response.ok) {
        loadProducts(); // Recarrega os produtos
    } else {
        console.error('Erro ao deletar produto');
    }
}

async function updateProduct(id) {
    const nameField = document.querySelector(`input.edit-name[data-id="${id}"]`);
    const quantityField = document.querySelector(`input.edit-quantity[data-id="${id}"]`);

    const name = nameField.value;
    const quantity = parseInt(quantityField.value);

    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            id: id,
            name: name,
            quantity: quantity,
            isAvailable: quantity > 0
        })
    });

    if (response.ok) {
        loadProducts(); // Recarrega os produtos
    } else {
        console.error('Erro ao atualizar produto');
    }
}

// Carregar os produtos quando a página for carregada
loadProducts();
