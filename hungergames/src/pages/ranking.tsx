import React, { useState, useEffect } from 'react';
import './ranking.css';

interface RestaurantData {
  name: string;
  location: string;
  priceLevel: number;
  rating: number;
  score: number;
  imageUrl: string;
}

// Custom hook for fetching and cleaning data
function useFetchGameData(gameId: number): [RestaurantData[], boolean, string | null] {
  const [data, setData] = useState<RestaurantData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchGameData = async () => {
      const apiUrl = `http://localhost:8000/results/${gameId}`;

      try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const jsonData = await response.json();

        // Clean and transform the data
        const cleanedData: RestaurantData[] = jsonData.map((entry: any) => ({
          name: entry[0].name,
          location: entry[0].address,
          priceLevel: entry[0].priceLevel,
          rating: entry[0].rating,
          score: entry[1],
          imageUrl: entry[0].photo,
        }));

        setData(cleanedData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching jsonData:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchGameData();
  }, [gameId]);

  return [data, loading, error];
}

export default function Wait() {
  const [restaurantData, loading, error] = useFetchGameData(1);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }



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
            <div className="restaurant" key={index} style={{ backgroundColor: index === 0 ? '#D56359' : index === 1 ? '#1B765F' : index === 2 ? '#A184D1' : '#219fdf' }}>
              <div className="rank">
                <h1 className='ranking'>{index + 1}</h1>
                <div className="score">
                  <h2 className="score">{restaurant.score}</h2>
                  {index == 0 && <img src="./winner.png"></img>}
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
