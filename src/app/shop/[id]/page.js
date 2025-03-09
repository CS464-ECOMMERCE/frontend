import ProductImages from "@/components/product/gallery/ProductImages";

export default function Page({ params }) {
  const { id } = params;
  console.log(id);

  return (
    <div>
      Product page for ID: {id}
      <ProductImages
        images={[
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
        ]}
      />
    </div>
  );
}
