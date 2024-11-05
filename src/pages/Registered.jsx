import React from 'react'
import vector from '../assets/vector.png'

const Registered = () => {
    return (
      <div className="flex w-full flex-col">
        <header className="flex w-full items-center justify-between">
          <h1 className="text-xl font-bold">Registered Drivers</h1>
  
          <button>Create New Profile</button>
        </header>

        <div className="justify-center align-center m-auto">
            <img src={vector} style={{alignItems: 'center', justifyContent: 'center', width: '25%', margin: 'auto', paddingBottom: '100'}} alt="vector" />
            <p className="text-gray-500">No driver registered yet</p>
        </div>
      </div>
    );
  };
 

export default Registered