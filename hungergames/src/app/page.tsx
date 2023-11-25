import './main.css'
import Link from 'next/link'; 

export default function Home() {
  return (
    <div className="main">
      <div className="title">
        <img className="hunger" src="/title/Hunger_text.svg" alt="hunger text"/>
        <img className="game" src="/title/Game_text.png" alt="game text"/>
      </div>
      <div className="userZone">

       <input className="userInput"type="text" id="userInput" value="Enter your PIN Number"/>
       <div>
       <button className="button">ENTER GAME</button>
       </div>
       

       <Link href="/url"><p className="newGame">Create New Game</p></Link>
      </div>

    <div className="foodImage">
       <div className='food'>
           <img className="foodImage1" src="/fries.png" alt="fries"/>
        </div>
       <div className='food'>
           <img className="foodImage2" src="/noodle.png" alt="fries"/>
        </div>
    </div>
      


    <div className="bottom">
        <img src="/Hand.png" alt="hand"/>
     </div>


    </div>
    
  )
}
