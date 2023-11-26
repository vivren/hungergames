import React, { useEffect } from 'react';
import MobileFrame from '../components/MobileFrame';
import RestaurantCard from '@/components/RestaurantCard';
import './game.css'; // Import the CSS file for styling
import Queue from '../components/Queue';


const restaurantQueue = new Queue<string>();

const Game: React.FC = () => {
  

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
  restaurantQueue.enqueue('Mcdonalds');
  restaurantQueue.enqueue('KFC');
  restaurantQueue.enqueue('Pizza Hut');
  restaurantQueue.enqueue('Chiptole');

  
  // Grab the two options
  const [choiceA, setChoiceA] = React.useState<string>('');
  const [choiceB, setChoiceB] = React.useState<string>('');

  const dequeueRestaurants = () => {
    const newA = restaurantQueue.dequeue();
    const newB = restaurantQueue.dequeue();
    // Post
    setChoiceA(newA || '');
    setChoiceB(newB || '');
  };

  // Use useEffect to dequeue restaurants when the component is mounted
  useEffect(() => {
    dequeueRestaurants();
  }, []);  return (
    <div className="mainPage">
      <MobileFrame>
        <div className='header'>
          <h1>SWIPE TO PICK!</h1>
        </div>
        <div className='cardContainer'>
          <div className='topCard' onClick={dequeueRestaurants}>
            <RestaurantCard 
              restaurantName={choiceA || ''} // Display the dequeued restaurant name
              cuisine='American'
              distance='5'
              imageUrl='/fries.png'
            />
          </div>
    
          <div className='bottomCard'  onClick={dequeueRestaurants}>
            <RestaurantCard 
              restaurantName={choiceB || ''} // Display the dequeued restaurant name
              cuisine='American'
              distance='5'
              imageUrl='/fries.png'
            />
          </div>
        </div>
      </MobileFrame>
    </div>
  );
};

export default Game;