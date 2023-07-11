import Layout from "@/components/Layout";
import Link from "next/link";
import {useEffect, useState} from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import HomeHeader from "@/components/HomeHeader";

export default function Products() {
  const [products,setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    setIsLoading(true);
    axios.get('/api/products').then(response => {
      setProducts(response.data);
      setIsLoading(false);
    });
  }, []);
  return (
    <Layout>
      <HomeHeader/>
      <div className="mt-8 mb-3">
      <Link className="btn-primary " href={'/products/new'}>Add new product</Link>
      <table className="basic mt-8">
        <thead>
          <tr>
            <td>Product name</td>
            <td></td>
            <td></td>
          </tr>
        </thead>
        <tbody>
          {isLoading && (
            <tr>
              <td colSpan={2}>
                <div className="py-4">
                  <Spinner fullWidth={true} />
                </div>
              </td>
            </tr>
          )}
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.title}</td>
              <td className="blank">  </td>
              <td>
                <Link className="btn-default" href={'/products/edit/'+product._id}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                  </svg>
                  Edit
                </Link>
                <Link className="btn-red" href={'/products/delete/'+product._id}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
                  </svg>
                  Archive
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </Layout>
  );
}