import React from 'react'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import Home from './Components/Home'
import Details from './Components/Details'
import Create from './Components/Create';
import Edit from './Components/Edit';


function App() {
  const {search, pathname} = useLocation();
  console.log(search, pathname);

  return (
    <div className='h-screen w-full flex'>
      {(pathname != "/" || search.length > 0) && (<Link to="/" className='text-red-300 font-semibold px-2 py-1 border border-red-300 absolute top-[3.5%] left-[18%] text-xl'>Home</Link>)}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/create' element={<Create />} />
        <Route path='/details/:id' element={<Details />} />
        <Route path='/edit/:id' element={<Edit />} />
      </Routes>

    </div>
  )
}

export default App
