import React from 'react';
import './leadboard.css';

interface RestaurantData {
  name: string;
  location: string;
  priceLevel: number;
  votes: string[];
  score: number;
  imageUrl: string;
}

const restaurantData: RestaurantData[] = [
  {
    name: 'Restaurant 1',
    location: 'Location 1',
    priceLevel: 4,
    votes: ['p1', 'p2', 'p3'],
    score: 20,
    imageUrl: '/fries1.png',
  },
  // fetch data from backend 
];

export default function Leadboard() {
  return (
    <div className="page">
      <div className="main">
        <div className="leadboard">
          <h1 className="title">RANKING</h1>

          {restaurantData.map((restaurant, index) => (
            <div key={index} className={`leadboardCard cardElem${index + 1}`}>
              <h1 className="index">{index + 1}</h1>
              <img className="restaurantImage" src={restaurant.imageUrl} />
              <div className="listInfo">
                <h1 className="name">{restaurant.name}</h1>
                <p>📍 {restaurant.location}</p>
                <p> 💵 Price Level: {restaurant.priceLevel}</p>
                <p>🗳️ Rating: {restaurant.votes.join(', ')}</p>
                <div className="cardElem2">
                  <h1>{restaurant.score} </h1>
                   {index ==0 && <img src="/winner.png" />}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
