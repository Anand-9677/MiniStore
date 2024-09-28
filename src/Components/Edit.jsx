import React, { useContext, useEffect, useState } from 'react'
import { ProductContext } from '../utils/Context';
import {nanoid} from 'nanoid';
import { useNavigate, useParams } from 'react-router-dom';

function Edit() {
    const [products, setProducts] = useContext(ProductContext);
    const navigate = useNavigate();
    const {id} = useParams();

    //Two way binding
    const [product, setProduct] = useState({
        title: "",
        image: "",
        category: "",
        price: "",
        description: ""
    })

    const changeHandler = (e) => {
        // console.log(e.target.name, e.target.value); 
        
        setProduct({...product, [e.target.name]: e.target.value});
    }

    useEffect(()=>{
        setProduct(products.filter((p) => p.id == id)[0]);
    }, [id])

    const AddProductHandler = (e) => {
        e.preventDefault();

        if(product.title.trim().length <5 || product.image.trim().length<5 || product.category.trim().length<5 || product.price.trim().length<1 || product.description.trim().length<5){
            alert("All fields must be filled out correctly");
            return;
        }
        console.log(product);
        
        const pindex = products.findIndex((p)=> p.id == id);

        const copyData = [...products];
        copyData[pindex] = {...products[pindex], ...product};

        console.log(copyData);
        
        setProducts(copyData);
        localStorage.setItem("products", JSON.stringify(copyData));
        navigate(-1);
    }

  return (
    <form onSubmit={AddProductHandler} className="flex flex-col items-center p-[4.5%] w-screen h-screen">
        <h1 className='w-1/2 text-2xl mb-2'>Edit Product</h1>
      <input type="url" placeholder='image link' className='text-1xl mb-2 bg-zinc-100 rounded p-2 w-1/2' name='image' onChange={changeHandler} value={product && product.image} />
      <input type="text" placeholder='title' className='text-1xl bg-zinc-100 rounded p-2 w-1/2 mb-2' name='title' onChange={changeHandler} value={product && product.title} />
      <div className='w-1/2 flex items-center justify-between mb-2'>
      <input type="text" placeholder='category' className='text-1xl bg-zinc-100 rounded p-2 w-[49%]' name='category' onChange={changeHandler} value={product && product.category} />      
      <input type="number" placeholder='price' className='text-1xl bg-zinc-100 rounded p-2 w-[49%]' name='price' onChange={changeHandler} value={product && product.price} />
      </div>
      <textarea name='description' onChange={changeHandler} value={product && product.description} className='w-1/2 text-1xl p-2 bg-zinc-100 mb-2' rows="10" placeholder='description'></textarea>
      <div className='w-1/2'>
        <button className='py-3 px-5 border rounded border-blue-200 text-blue-300'>Edit Product</button>
      </div>
    </form>
  )
}

export default Edit