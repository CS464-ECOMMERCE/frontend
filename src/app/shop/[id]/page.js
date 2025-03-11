import BackButton from "@/components/BackButton";
import ProductImages from "@/components/product/gallery/ProductImages";
import ProductDetails from "@/components/product/ProductDetails";

const imgPlaceholder = [
  {
    url: "https://plus.unsplash.com/premium_photo-1704546974012-78acde0d4905?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
    alt: "image",
  },
  {
    url: "https://images.unsplash.com/photo-1735342623457-b683e0ba1c2b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHw4fHx8ZW58MHx8fHx8",
    alt: "image",
  },
  {
    url: "https://images.unsplash.com/photo-1736134869386-78142c34260f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxOXx8fGVufDB8fHx8fA%3D%3D",
    alt: "image",
  },
];

const productDetails = {
  title: "Product Title",
  price: 100,
  description: "Product Description",
  sold: 5493,
  maxQuantity: 10,
};

export default function Page({ params }) {
  const { id } = params;
  console.log(id);

  return (
    <div className="flex flex-col gap-5">
      <div>
        <BackButton />
      </div>
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="flex-1">
          <ProductImages images={imgPlaceholder} />
        </div>
        <div className="flex-1">
          <ProductDetails item={productDetails} />
        </div>
      </div>
    </div>
  );
}
