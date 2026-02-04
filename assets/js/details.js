//https://dummyjson.com/products/1
const getProduct = async () => {
    const id = new URLSearchParams(window.location.search).get('id');
    const response = await axios.get(`https://dummyjson.com/products/${id}`);
    return response.data;
}
const displayProductDetails = async () => {
    try {
        const data = await getProduct();
        console.log(data);
        const images = data.images.map((image) => {
            return `<img src="${image}" alt="" class="w-25 border border-1 borderd-secondary rounded-2">`;
        }).join('');
        console.log(images);
        const reviews = data.reviews.map((review) => {
            return `
                <div class="review col-lg-4 col-md-6 col-12">
                    <div class="card text-center">
                      <div class="card-body">
                        <h5 class="card-title">${review.reviewerName}</h5>
                        <p class="card-text mb-0">Rating: ${review.rating}</p>
                        <p class="card-text">Comment: ${review.comment}</p>
                      </div>
                    </div>
                </div>
            `;
        }).join('');
        console.log(reviews);
        const details = `
            <p class="mb-4"><span class="fs-5 fw-bold">Name:</span> ${data.title}</p>
            <p><span class="fs-5 fw-bold">Description:</span> ${data.description}</p>
            <div class="product-imgs pt-3 pb-5 row gap-3"><span class="fs-5 fw-bold">Images:</span>${images}</div>
            <div class="row mb-5"><span class="fs-5 fw-bold mb-3">Reviews:</span>${reviews}</div>
            <p><span class="fs-5 fw-bold">Stock:</span> ${data.stock}</p>
        `;
        document.querySelector('.product-details .details').innerHTML = details;
    }catch (error) {
        console.log(error.message);
    }
}
displayProductDetails();