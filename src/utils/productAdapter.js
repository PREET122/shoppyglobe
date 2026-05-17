const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=900&q=80'

export function adaptProduct(product) {
  return {
    ...product,
    id: product._id,
    title: product.name,
    brand: product.brand || 'ShoppyGlobe Select',
    thumbnail: product.imageUrl || FALLBACK_IMAGE,
    images: product.images?.length
      ? product.images
      : [product.imageUrl || FALLBACK_IMAGE],
    stock: product.stockQuantity,
    rating: product.rating ?? 4.4,
    discountPercentage: product.discountPercentage ?? 0,
    sku: product.sku || product._id?.slice(-6)?.toUpperCase() || 'N/A',
    shippingInformation:
      product.shippingInformation || 'Fast delivery available across India.',
    returnPolicy:
      product.returnPolicy || 'Return within 7 days if the product is damaged.',
    minimumOrderQuantity: product.minimumOrderQuantity ?? 1,
  }
}
