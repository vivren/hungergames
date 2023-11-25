import Link from 'next/link'; 
import './url.css' 

export default function URL(){
    return(
        <div className="page">
            <div className="main">
               <div className='return'>
                <Link href="/"><img className='returnImage' src="/icon/return.png"/></Link>
               </div>

               <div className='text'>
                <h2>
                Your Game URI generated. <br/>
                Share to your friend to start the Game!
                </h2>
               </div>

               <div className="urlLink">
                    <h2>www.hungerGame.com</h2>
                    <img className="copy" src="/icon/copy.svg" alt="copy png"/>
               </div>

               <div className='footer'>
                    <img src="/footer.png"></img>
               </div>
            </div>
        </div>
    ); 
}