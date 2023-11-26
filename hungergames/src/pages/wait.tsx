import React, { useState, useEffect } from 'react';
import './wait.css';
import Link from 'next/link'; 


export default function Wait() {
  const [isResultReady, setIsResultReady] = useState(false);

  // useEffect(() => {
  //   // Fetch the backend boolean value
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch('/api/your-endpoint'); // Replace with your actual API endpoint
  //       const data = await response.json();
  //       setIsResultReady(data.isResultReady); // Assuming your backend returns { "isResultReady": true/false }
  //     } catch (error) {
  //       console.error('Error fetching data:', error);
  //     }
  //   };

  //   fetchData();
  // }, []); // Run once when the component mounts



  return (
    <div className="page">
      <div className="main">
        <div className="title">
          <h1>
            Waiting <br />
            for <br />
            everyone <br />
            to finish
          </h1>

          {isResultReady && (
             <Link href="/leaderboard">
             <a className="button">Check result</a>
           </Link>
          )}
        </div>
      </div>
    </div>
  );
}
