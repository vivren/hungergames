import React, { useEffect, useState } from 'react';
import MobileFrame from '../components/MobileFrame';
import RestaurantCard from '@/components/RestaurantCard';
import './game.css'; // Import the CSS file for styling
import Queue from './Queue';

type Restaurant = {
  gameId: number;
  restaurantId: number;
  name: string;
  address: string;
  rating: number;
  priceLevel: number;
  photo: string;
};

const restaurantData = [
  {
    "gameId": 1,
    "restaurantId": 1,
    "name": "Subway",
    "address": "@, 941 Oxford St E, Quebec Street, London",
    "rating": 3.8,
    "priceLevel": 1,
    "photo": "https://lh3.googleusercontent.com/places/ANXAkqG2L54xCB8BCWBMDHvoQL9fQVbAfzfYJHv-zj7vZeRzFuHXBQA92n_-2FQxt8325vUe__6yEG9yo6GNt_aDq87N87xINtzn6lQ=s1600-h400"
  },
  {
    "gameId": 1,
    "restaurantId": 2,
    "name": "The Springs Restaurant",
    "address": "310 Springbank Drive, London",
    "rating": 4.6,
    "priceLevel": 3,
    "photo": "https://lh3.googleusercontent.com/places/ANXAkqFsYmyyLWe6EYPHZxTOfREXE7wQIhsHcncaAzQZ_036PGfpL7XBFKsXhMDDBU-JFJT9LDx9Ke41n_K8Ywk2Al30m1KAZdd2tHk=s1600-h400"
  },
  {
    "gameId": 1,
    "restaurantId": 3,
    "name": "Tim Hortons",
    "address": "111 Wharncliffe Road North, London",
    "rating": 3.7,
    "priceLevel": 1,
    "photo": "https://lh3.googleusercontent.com/places/ANXAkqFcHcqdLhV7x14xZhMJPRAaCSM-Qb6QgI3-nJ1G6HaHA3gVT3gV2KJiVXHRz6u13K0mUeZlAGBFzGJGaf3INUL8Sq5l_hhbriM=s1600-h400"
  },
  {
    "gameId": 1,
    "restaurantId": 4,
    "name": "Jack Astor's Bar & Grill Richmond Row",
    "address": "660 Richmond Street Unit #10, London",
    "rating": 3.9,
    "priceLevel": 2,
    "photo": "https://lh3.googleusercontent.com/places/ANXAkqGZTABH1pTpHLrh60M_RRouNmdPP52Aa3FsPy1f4BsLY_g1vwvBXxMRfGZnoZsvqufRfUj-Q-n5WlzgOuUXwyBnmKXNyfvQi7c=s1600-h400"
  },
  {
    "gameId": 1,
    "restaurantId": 5,
    "name": "Hubway",
    "address": "@, 941 Oxford St E, Quebec Street, London",
    "rating": 3.8,
    "priceLevel": 1,
    "photo": "https://lh3.googleusercontent.com/places/ANXAkqG2L54xCB8BCWBMDHvoQL9fQVbAfzfYJHv-zj7vZeRzFuHXBQA92n_-2FQxt8325vUe__6yEG9yo6GNt_aDq87N87xINtzn6lQ=s1600-h400"
  },
  {
    "gameId": 1,
    "restaurantId": 6,
    "name": "The Summerss Restaurant",
    "address": "310 Springbank Drive, London",
    "rating": 4.6,
    "priceLevel": 3,
    "photo": "https://lh3.googleusercontent.com/places/ANXAkqFsYmyyLWe6EYPHZxTOfREXE7wQIhsHcncaAzQZ_036PGfpL7XBFKsXhMDDBU-JFJT9LDx9Ke41n_K8Ywk2Al30m1KAZdd2tHk=s1600-h400"
  },
  {
    "gameId": 1,
    "restaurantId": 7,
    "name": "Jim Hortons",
    "address": "111 Wharncliffe Road North, London",
    "rating": 3.7,
    "priceLevel": 1,
    "photo": "https://lh3.googleusercontent.com/places/ANXAkqFcHcqdLhV7x14xZhMJPRAaCSM-Qb6QgI3-nJ1G6HaHA3gVT3gV2KJiVXHRz6u13K0mUeZlAGBFzGJGaf3INUL8Sq5l_hhbriM=s1600-h400"
  },
  {
    "gameId": 1,
    "restaurantId": 8,
    "name": "Back Astor's Bar & Grill Richmond Row",
    "address": "660 Richmond Street Unit #10, London",
    "rating": 3.9,
    "priceLevel": 2,
    "photo": "https://lh3.googleusercontent.com/places/ANXAkqGZTABH1pTpHLrh60M_RRouNmdPP52Aa3FsPy1f4BsLY_g1vwvBXxMRfGZnoZsvqufRfUj-Q-n5WlzgOuUXwyBnmKXNyfvQi7c=s1600-h400"
  }
];

const gameId = 1; // Hardcoded game ID
const restaurantQueue = new Queue<Restaurant>();

restaurantData
  .filter((restaurant) => restaurant.gameId === gameId)
  .forEach((restaurant) => {
    restaurantQueue.enqueue(restaurant);
  });

console.log("initial queue: ", restaurantQueue.getItems()); // Add a getItems() method in your Queue class to retrieve the items



const Game: React.FC = () => {
  console.log('Rendering Game component');
  const [restaurants, setRestaurants] = useState(restaurantData);



  //GET restaurant (dictionary) -> queue -> randomize order
  //queue is restaurants FIFO
  //START
  //Grab 2 from head
  //draw 2
  //Selection handler, *note we are not keeping track of rounds*
  //POST to DB to tally aka VOTE && requeue
  //go back to START until 1 element left

  //once 1 element left -> list view

  // Ennqueue some restaurants

  // Grab the two options
  const [choiceA, setChoiceA] = React.useState<Restaurant>({
    gameId: 0,
    restaurantId: 0,
    name: '',
    address: '',
    rating: 0,
    priceLevel: 0,
    photo: '',
  });

  const [choiceB, setChoiceB] = React.useState<Restaurant>({
    gameId: 0,
    restaurantId: 0,
    name: '',
    address: '',
    rating: 0,
    priceLevel: 0,
    photo: '',
  });

  useEffect(() => {
    console.log("choiceA: ", choiceA);
    console.log("choiceB: ", choiceB);
  }, [choiceA, choiceB]);


  const dequeueRestaurants = () => {
    const newA = restaurantQueue.dequeue();
    console.log("dequeued, newA: ", newA);
    const newB = restaurantQueue.dequeue();
    console.log("dequeued, newB: ", newB);

    console.log("new queue: ", restaurantQueue.getItems()); // Add a getItems() method in your Queue class to retrieve the items

    setChoiceA(newA || {
      gameId: 0,
      restaurantId: 0,
      name: '',
      address: '',
      rating: 0,
      priceLevel: 0,
      photo: '/fries.png',
    });
    setChoiceB(newB || {
      gameId: 0,
      restaurantId: 0,
      name: '',
      address: '',
      rating: 0,
      priceLevel: 0,
      photo: '/fries.png',
    });
  };

  const enqueueRestaurant = (restaurantName: Restaurant) => {
    restaurantQueue.enqueue(restaurantName);
    console.log("enqueued: ", restaurantName);
  };

  // Use useEffect to dequeue restaurants when the component is mounted
  useEffect(() => {
    dequeueRestaurants();
  }, []);

  return (
    <div className="mainPage">
      <MobileFrame>
        <div className='header'>
          <h1>SWIPE TO PICK!</h1>
        </div>
        <div className='cardContainer'>
          <div className='topCard' onClick={() => { enqueueRestaurant(choiceA); dequeueRestaurants(); }}>
            <RestaurantCard
              restaurantName={choiceA.name || ''}
              price={choiceA ? choiceA.priceLevel : 0}
              rating={choiceA ? choiceA.rating : 0}
              imageUrl={choiceA ? choiceA.photo : '/fries.png'}
            />
          </div>

          <div className='bottomCard' onClick={() => { enqueueRestaurant(choiceB); dequeueRestaurants(); }}>
            <RestaurantCard
              restaurantName={choiceB.name || ''}
              price={choiceB ? choiceB.priceLevel : 0}
              rating={choiceB ? choiceB.rating : 0}
              imageUrl={choiceB ? choiceB.photo : '/fries.png'}
            />
          </div>
        </div>
      </MobileFrame>
    </div>
  );
};

export default Game;