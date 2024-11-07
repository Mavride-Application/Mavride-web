import React from 'react'
import vector from '../assets/Vector.png'
import plus from '../assets/plus.png'

const Registered = () => {
    return (
      <div className="flex w-full h-[80vh] flex-col pt-5">
        <header className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold">Registered Drivers</h1>
  
          <button className="items-center flex justify-center  px-4 py-2 bg-[#0A1ED9] text-white font-semibold rounded gap-1.5"><img src={plus} alt="" />Create New Profile</button>
        </header>

        <div className="justify-center align-center m-auto">
            <img src={vector} style={{alignItems: 'center', justifyContent: 'center', width: '25%', margin: 'auto', paddingBottom: '100'}} alt="vector" />
            <p className="text-gray-500">No driver registered yet</p>
        </div>
      </div>
    );
  };
 

export default Registered