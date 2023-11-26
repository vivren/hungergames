import React, { useState, useEffect } from 'react';
import './ranking.css';
import Link from 'next/link'; 


export default function Wait() {
  interface RestaurantData {
    name: string;
    location: string;
    priceLevel: number;
    rating: number;
    score: number;
    imageUrl: string;
  }
  
  const restaurantData: RestaurantData[] = [
    {
      name: 'Restaurant 1',
      location: 'Location 1',
      priceLevel: 4,
      rating: 4.6,
      score: 20,
      imageUrl: '/fries1.png',
    },
    {
      name: 'Restaurant 2',
      location: 'Location 1',
      priceLevel: 4,
      rating: 4.8,
      score: 20,
      imageUrl: '/fries1.png',
    },
    {
      name: 'Restaurant 3',
      location: 'Location 1',
      priceLevel: 4,
      rating: 4.5,
      score: 20,
      imageUrl: '/fries1.png',
    },
   
    // fetch data from backend 
  ];

  return (
    <div className="page">
      <div className="main">
        <div className="title">
          <h1 className="bigTitle">
            RANKINGS
          </h1>
        </div>
        <hr></hr>

        <div className="restaurantList">
          {/* Map over the restaurantData array and create a div for each restaurant */}
          {restaurantData.map((restaurant, index) => (
              <div className="restaurant" key={index} style={{ backgroundColor: index === 0 ? '#D56359;' : (index === 1 ? '#1B765F' : (index === 2 ? '#A184D1' : '#D56359')) }}>
              <div className="rank">
                <h1 className='ranking'>{index + 1}</h1>
                <div className="score"> 
                  <h2 className="score">{restaurant.score}</h2>
                  {index ==0 && <img src="./winner.png"></img>}
                </div>
              </div>
              <div className="restaurantInfo">
              <img className="restaurantImg" src={restaurant.imageUrl} alt={`Image of ${restaurant.name}`} />
                <div className="Info">
                  <h2>{restaurant.name}</h2>
                  <div className="level1">
                     <p>💵{restaurant.priceLevel}</p>
                     <p>🌟 {restaurant.rating}</p>
                  </div>
                  <p>📍{restaurant.location}</p>
                 
               </div>
              </div>
              
            </div>
          ))}
        </div>
  
      </div>
    </div>
  );
}
