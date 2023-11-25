import Link from 'next/link'; 
import React, { useState } from 'react';
import './preference.css' 

export default function Preference(){
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(100);
 const [distance, setDistance] = useState<number>(10); // Default distance value

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(Number(event.target.value));
  };
    return(
        <div className="page">
            <div className="main">
              <div className="title">
                <h1>Select Your </h1>
                <h1>Preference</h1>
              </div>
            
            
            <div className='Selection'>
              <div className="Selection1">
                <h3>Price Range</h3>
                <div className='editBox'>
                    <div className="container">
                        <p>min</p>
                        <div className='userInput'>
                            <h2>$</h2>
                            <input className="Input"type="text" id="min" value={minPrice}/>
                        </div>
                    </div>
                    <img className="arrow" src="/arrow.svg"></img>
                    <div className="container">
                        <p>max</p>
                        <div className='userInput'>
                            <h2>$</h2>
                            <input className="Input"type="text" id="max" value={maxPrice}/>
                        </div>
                    </div>
                </div>
                <div className="Selection2">
                    <h3>Distance</h3>
                    <div className='editBox'>
                    {/* Scrollable input range for distance */}
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={distance}
                        onChange={handleDistanceChange}
                        step="1"/>
                    <p className='distance'>{distance} Km</p>
                </div>

                </div>
              </div>

            </div>


                <div>
                    <button className="button">Generate PIN</button>
                </div>
            </div>
        </div>
    ); 
}