import ProductForm from "@/components/ProductForm";
import Layout from "@/components/Layout";
import HomeHeader from "@/components/HomeHeader";

export default function NewProduct() {
  return (
    <Layout>
      <HomeHeader />
      <h1 className="mt-5">New Product</h1>
      <ProductForm buttonName='Create Button' />
    </Layout>
  );
}