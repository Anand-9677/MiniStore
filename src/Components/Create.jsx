import React, { useContext, useState } from 'react'
import { ProductContext } from '../utils/Context';
import {nanoid} from 'nanoid';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function Create() {
    const navigate = useNavigate();
    const [products, setProducts] = useContext(ProductContext);

    const [title, settitle] = useState("");
    const [image, setimage] = useState("");
    const [category, setcategory] = useState("");
    const [price, setprice] = useState("");
    const [description, setdescription] = useState("");

    const AddProductHandler = (e) => {
        e.preventDefault();

        if(title.trim().length <5 || image.trim().length<5 || category.trim().length<5 || price.trim().length<1 || description.trim().length<5){
            alert("All fields must be filled out correctly");
            return;
        }

        const product = {id:nanoid(), title, image, category, price, description};
        setProducts([...products, product]);
        localStorage.setItem("products", JSON.stringify([...products, product]));
        toast.success("Product Added Successfully");
        navigate('/');
    }


  return (
    <form onSubmit={AddProductHandler} className="flex flex-col items-center p-[4.5%] w-screen h-screen">
        <h1 className='w-1/2 text-2xl mb-2'>Add New Product</h1>
      <input type="url" placeholder='image link' className='text-1xl mb-2 bg-zinc-100 rounded p-2 w-1/2' onChange={(e)=>setimage(e.target.value)} value={image} />
      <input type="text" placeholder='title' className='text-1xl bg-zinc-100 rounded p-2 w-1/2 mb-2' onChange={(e)=>settitle(e.target.value)} value={title} />
      <div className='w-1/2 flex items-center justify-between mb-2'>
      <input type="text" placeholder='category' className='text-1xl bg-zinc-100 rounded p-2 w-[49%]' onChange={(e)=>setcategory(e.target.value)} value={category} />      
      <input type="number" placeholder='price' className='text-1xl bg-zinc-100 rounded p-2 w-[49%]' onChange={(e)=>setprice(e.target.value)} value={price} />
      </div>
      <textarea onChange={(e)=>setdescription(e.target.value)} value={description} className='w-1/2 text-1xl p-2 bg-zinc-100 mb-2' rows="10" placeholder='description'></textarea>
      <div className='w-1/2'>
        <button className='py-3 px-5 border rounded border-blue-200 text-blue-300'>Add Product</button>
      </div>
    </form>
  )
}

export default Create