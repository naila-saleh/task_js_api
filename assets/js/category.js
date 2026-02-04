//https://dummyjson.com/products/category/${category}
const getProducts = async (page) => {
    const limit = 9;
    const skip = (page - 1) * limit;
    const category = new URLSearchParams(window.location.search).get('category');
    document.querySelector('.category').innerHTML = category;
    const response = await axios.get(`https://dummyjson.com/products/category/${category}?limit=${limit}&skip=${skip}`);
    return response.data;
}
const displayProducts = async (page=1) => {
    try {
        const data = await getProducts(page);
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