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
        console.log(categories);
        document.querySelector('.categories .category-list .row').innerHTML = categories;
    }catch(error) {
        console.log(error.message);
    }
}
displayCategories();