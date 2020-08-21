class Products {
  constructor(id, title, image, categoryId, subcategoryId, price, offer, review) {
    this.id = id;
    this.title = title;
    this.image = image;
    this.categoryId = categoryId;
    this.subCategoryId = subcategoryId;
    this.price = price;
    this.offer = offer;
    this.review = review;
  }
}

export default Products;
