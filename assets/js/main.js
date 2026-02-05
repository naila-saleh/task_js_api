let currentSortBy = '';
let currentOrder = '';
const getCategories = async () => {
    const response = await axios.get(`https://dummyjson.com/products/category-list`);
    return response.data;
}
const displayCategories = async () => {
    try {
        const data = await getCategories();
        const categories = data.map((category) => {
            return `
                <div class="category col-lg-3 col-md-4 col-sm-6 col-12 text-center">
                    <a href="./category.html?category=${category}" class="btn btn-outline-secondary w-100">${category}</a>
                </div>`
        }).join('');
        document.querySelector('.categories .category-list .row').innerHTML = categories;
    }catch(error) {
        console.log(error.message);
    }
}
displayCategories();

const getProducts = async (page =1, sortBy='', order='') => {
    const limit = 10;
    const skip = (page - 1) * limit;
    let url = `https://dummyjson.com/products?limit=${limit}&skip=${skip}`
    if(sortBy && order){
        url += `&sortBy=${sortBy}&order=${order}`;
    }
    const response = await axios.get(url);
    return response.data;
}
const displayProducts = async (page=1, sortBy='', order='') => {
    try {
        const data = await getProducts(page, sortBy, order);
        const limit = 10;
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
                        <a href="./details.html?id=${product.id}" class="btn btn-outline-dark">Details</a>
                      </div>
                    </div>
                </div>
            `
        }).join('');
        document.querySelector('.products .product-list .row').innerHTML = productList;
        let paginationLink = ``;
        if(page > 1) {
            paginationLink += `<li class="page-item"><button class="page-link" onclick="displayProducts(${page-1}, '${currentSortBy}', '${currentOrder}')">Previous</button></li>`;
        }else {
            paginationLink += `<li class="page-item disabled"><button class="page-link">Previous</button></li>`;
        }
        for(let i = 1; i <= noOfPages; i++) {
            paginationLink += `
                <li class="page-item ${i === page ? 'active' : ''}">
                    <button class="page-link" onclick="displayProducts(${i}, '${currentSortBy}', '${currentOrder}')">${i}</button>
                </li>`;
        }
        if(page < noOfPages) {
            paginationLink += `<li class="page-item"><button class="page-link" onclick="displayProducts(${page+1}, '${currentSortBy}', '${currentOrder}')">Next</button></li>`;
        }else {
            paginationLink += `<li class="page-item disabled"><button class="page-link">Next</button></li>`;
        }
        document.querySelector('.product-list .pagination').innerHTML = paginationLink;
    }catch(error) {
        console.log(error.message);
    }finally {
        document.querySelector('.loader').classList.add('d-none');
    }
}
displayProducts();

document.querySelector('.sort-select').addEventListener('change', (e) => {
    if(e.target.value === 'none') {
        currentSortBy = '';
        currentOrder = '';
        displayProducts(1);
        return;
    }
    const [sortBy, order] = e.target.value.split('-');
    currentSortBy = sortBy;
    currentOrder = order;
    displayProducts(1, sortBy, order);
})