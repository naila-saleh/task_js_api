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
        const limit = 9;
        const noOfPages = Math.ceil(data.total / limit);
        const productList = data.products.map((product) => {
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
        document.querySelector('.products .product-list .row').innerHTML = productList;
        let paginationLink = ``;
        if(page > 1) {
            paginationLink += `<li class="page-item"><button class="page-link" onclick="displayProducts(${page-1})">Previous</button></li>`;
        }else {
            paginationLink += `<li class="page-item disabled"><button class="page-link">Previous</button></li>`;
        }
        for(let i = 1; i <= noOfPages; i++) {
            paginationLink += `
                <li class="page-item ${i === page ? 'active' : ''}">
                    <button class="page-link" onclick="displayProducts(${i})">${i}</button>
                </li>`;
        }
        if(page < noOfPages) {
            paginationLink += `<li class="page-item"><button class="page-link" onclick="displayProducts(${page+1})">Next</button></li>`;
        }else {
            paginationLink += `<li class="page-item disabled"><button class="page-link">Next</button></li>`;
        }
        document.querySelector('.product-list .pagination').innerHTML = paginationLink;
    }catch(error) {
        console.log(error.message);
    }
}
displayProducts();