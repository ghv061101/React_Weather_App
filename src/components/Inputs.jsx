import React, { useState } from 'react';
import { BiCurrentLocation, BiSearch } from 'react-icons/bi';

const Inputs = ({setQuery,setUnits}) => {

  const [city,setCity]=useState("");

  const handleSerachClick = ()=>{

    if (city !=="") setQuery({q:city});
  };

  const handleLocationClick = () =>{
    if (navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position)=>{
        const {latitude,longitude} =position.coords
        setQuery({lat:latitude,lon:longitude})
      })
    }

  };

  return (
    <div className='flex flex-row justify-center my-6'>
      <div className="flex flex-row w-3/4 items-center justify-center space-x-4">
        <input 
          value={city}
          onChange={(e)=>setCity(e.currentTarget.value)}
          type="text" 
          placeholder='Search by City' 
          className='text-gray-500 text-xl font-light p-2 w-full shadow-xl capitalize focus:outline-none'
        />
        <BiSearch 
          className='cursor-pointer transition ease-out hover:scale-125 hover:text-black' 
          size={30} 
          aria-label="Search" 
          onClick={handleSerachClick}
        />
        <BiCurrentLocation 
          className='cursor-pointer transition ease-out hover:scale-125 hover:text-black' 
          size={30} 
          aria-label="Current Location" 
          onClick={handleLocationClick}
        />
      </div>

      <div className='flex flex-row w-1/4 items-center justify-center'>
        <button className='text-2xl font-medium transition ease-out hover:scale-125 hover:text-black'
        onClick={()=>setUnits("metric")}
        >°C</button>
        <p className='text-2xl font-medium mx-1'>|</p>
        <button className='text-2xl font-medium transition ease-out hover:scale-125 hover:text-black'
        onClick={()=>setUnits("imperial")}
        >°F</button>
        <p className='text-2xl font-medium mx-1'>|</p>
        <button className='text-2xl font-medium transition ease-out hover:scale-125 hover:text-black '
        onClick={()=>setUnits("standard")}
        >°K</button>
      </div>
    </div>
  );
}

export default Inputs;
