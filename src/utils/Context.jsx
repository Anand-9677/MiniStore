import React, { createContext, useEffect, useState } from 'react'
import Axios from './Axios';

export const ProductContext = createContext();
function Context(props) {
    
    const [products, setProducts] = useState(JSON.parse(localStorage.getItem("products")) || null); 

    // const getProducts = async () => {
    //     try {
    //         const {data} = await Axios("/products");
    //         setProducts(data);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // console.log(products);

    // useEffect(() => {
    //     getProducts();
    // }, [])

    return (
    <ProductContext.Provider value={[products, setProducts]}>
      {props.children}
    </ProductContext.Provider>
  )
}

export default Context
