export default function Page({ params }) {
  const { id } = params;
  console.log(id);

  return <div>Product page for ID: {id}</div>;
}