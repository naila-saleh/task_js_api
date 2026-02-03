const getCategories = async () => {
    const response = await axios.get(`https://dummyjson.com/products/category-list`);
    return response.data;
}
const displayCategories = async () => {
    try {
        const data = await getCategories();
        const categories = data.map((category) => {
            return `
                <div class="category col-lg-3 col-md-4 col-6">
                    <div class="card bg-body-secondary">
                      <div class="card-body">
                        ${category}
                      </div>
                    </div>
                </div>`
        }).join('');
        document.querySelector('.categories .category-list .row').innerHTML = categories;
    }catch(error) {
        console.log(error.message);
    }
}
displayCategories();

const getProducts = async (page) => {
    const limit = 10;
    const skip = (page - 1) * limit;
    const response = await axios.get(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
    return response.data;
}
const displayProducts = async (page=1) => {
    try {
        const data = await getProducts(page);
        console.log(data.products);
        const products = data.products.map((product) => {
            return `
                <div class="product col-lg-4 col-md-6 col-12">
                    <div class="card text-center">
                      <img src="${product.thumbnail}" class="card-img-top" alt="...">
                      <div class="card-body">
                        <h5 class="card-title">${product.title}</h5>
                        <p class="card-text mb-0">Price: ${product.price}$</p>
                        <p class="card-text">Rating: ${product.rating}</p>
                        <a href="#" class="btn btn-outline-dark">Details</a>
                      </div>
                    </div>
                </div>
            `
        }).join('');
        document.querySelector('.products .product-list .row').innerHTML = products;
    }catch(error) {
        console.log(error.message);
    }
}
displayProducts();