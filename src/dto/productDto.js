const santizeProduct = (product) => {
  return {
    id: product?._id,
    name: product?.name,
    description: product?.description,
    materials: product?.materials,
    price: product?.price,
    variants: product?.variants,
    discount: product?.discount,
    featured: product?.featured,
    averageRating: product?.averageRating,
    createdAt: product?.createdAt,
  };
};

const santizeProducts = (products = []) => {
  return products.map((product) => santizeProduct(product));
};

module.exports = { santizeProduct, santizeProducts };
