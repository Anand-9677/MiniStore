import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Axios from '../utils/Axios'
import Loading from './Loading';
import { ProductContext } from '../utils/Context';

function Details() {
  const navigate = useNavigate();
  const [products, setProducts] = useContext(ProductContext);

    const [product, setProduct] = useState(null);
    const {id} = useParams();
    

    // const getsingleProduct = async () => {
    //     try {
    //         const {data} = await Axios.get(`/products/${id}`);
    //         setProduct(data);
            
    //     } catch (error) {
    //         console.log(error);
            
    //     }
    // }

    useEffect(()=>{
      if(!product) {
        setProduct(products.filter((p)=> p.id == id)[0]);
      }  
      //getsingleProduct();
    }, [])

    const productDeleteHandler = () => {
      const filteredProducts = products.filter((p)=> p.id !== id);
      setProducts(filteredProducts);
      localStorage.setItem('products', JSON.stringify(filteredProducts));
      navigate("/");
    }


  return product ? (
        <div className='w-[80%] h-screen m-auto p-[8%] flex gap-10'>
      <img className='h-[80%] w-[40%] object-contain' src={`${product.image}`} alt="" />
      <div className='content'>
        <h1 className='text-4xl'>{product.title}</h1>
        <h2 className='text-xl mt-3 font-bold'>{product.price}</h2>
        <h2 className='text-lg text-zinc-400 mt-3 '>{product.category}</h2>
        <p className='text-md font-medium mb-[5%] mt-3'>{product.description}</p>
        <Link to={`/edit/${product.id}`} className='py-2 px-5 mr-2 border rounded border-blue-200 text-blue-600 text-lg'>Edit</Link>
        <button onClick={() => productDeleteHandler(product.id)} className='py-2 px-5 border rounded border-red-200 text-red-600 text-lg'>Delete</button>
      </div>
    </div>
  ) : (<Loading />)
}

export default Details