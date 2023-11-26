'use client'

import React, { useState } from 'react';
import './preference.css'
import { useRouter } from 'next/router';

export default function Preference() {
  const router = useRouter();

  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [distance, setDistance] = useState<number>(10); // Default distance value


  const handlePriceLevelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Math.min(4, Math.max(0, Number(event.target.value)));
    setMaxPrice(newValue);
  };

  const handleDistanceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDistance(Number(event.target.value));
  };

  const handleGetRestaurants = async (event: { preventDefault: () => void; }) => {
    event.preventDefault(); // Prevent the default link click action

    const { gameId } = router.query;

    try {
      // Get latitude and longitude from the browser
      const apiKey = '6ca90725cc9a41afbeffbfd09ddda785';
      const locationResponse = await fetch(`https://api.geoapify.com/v1/ipinfo?&apiKey=${apiKey}`);
      const locationData = await locationResponse.json();
      let { latitude: lat, longitude: long } = locationData.location;
      if (!lat || !long) {
        console.log("Could not get location from browser, using default location instead");
        lat = 42.9926;
        long = -81.3322;
      }

      const baseUrl = `http://${process.env.NEXT_PUBLIC_API_IP}:${process.env.NEXT_PUBLIC_API_PORT}`;
      const response = await fetch(`${baseUrl}/restaurants/${gameId}?lat=${lat}&long=${long}&radius=${distance}&maxPrice=${maxPrice}&`);
      const data = await response.json();
      console.log(data);

      router.push(`/Game?gameId=${data}`); // Redirect to the Game page with the gameId
    } catch (error) {
      console.error('Error:', error);
    }
  };


  return (
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
              <input
                type="range"
                min="0"
                max="4"
                value={maxPrice}
                onChange={handlePriceLevelChange}
                step="1" />
              <p className='distance'>{maxPrice} $ </p>
              {/* <div className="container">
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
                    </div> */}
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
                  step="5" />
                <p className='distance'>{distance} Km</p>
              </div>

            </div>
          </div>

        </div>


        <div>
          <button className="button" onClick={handleGetRestaurants}>Get Restaurants</button>
        </div>
      </div>
    </div>
  );
}