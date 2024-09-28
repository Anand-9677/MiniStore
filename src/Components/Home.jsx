import React, { useContext, useState, useEffect } from 'react'
import Nav from './Nav'
import { Link, useLocation } from 'react-router-dom'
import {ProductContext} from '../utils/Context'
import Loading from './Loading'
import Axios from '../utils/Axios'

function Home() {

    const [products] = useContext(ProductContext);
    const {search} = useLocation();
    const category = decodeURIComponent(search.split("=")[1]);

    const [filteredProducts, setFilteredProducts] = useState(null);

    const getProductsCategory = async() =>{
      try {
        const {data} = await Axios.get(`/products/category/${category}`);
        setFilteredProducts(data);
      } catch (error) {
        console.log(error);
      }
    }

    useEffect(()=>{
        if(!filteredProducts || category=='undefined') setFilteredProducts(products);

        if(category != "undefined") {
          // getProductsCategory();
          setFilteredProducts(products.filter((p) => p.category == category));
        }
    }, [category, products]);


  return products ? (
    <>
        <Nav />
        <div className='h-full w-[85%] p-10 pt-[5%] flex flex-wrap overflow-x-hidden overflow-y-auto'>
        {filteredProducts && filteredProducts.map((product, index)=>(
            <Link key={product.id} to={`/details/${product.id}`} className='card hover:bg-sky-100 mb-3 mr-3 p-3 border shadow rounded w-[18%] h-[40vh] flex flex-col items-center justify-between'>
                <div className=' mb-2 w-full h-[80%] bg-contain bg-no-repeat bg-center'
                style={{backgroundImage: `url(${product.image})`}}
                >
                </div>
                <h1 className=' mt-2 text-md font-semibold'>{product.title}</h1>
            </Link>
        ))}
        </div>
    </>
  ) : (<Loading />);
}

export default Home
