import { useRouter } from 'next/router';
import Link from 'next/link';
import './url.css'

export default function URL() {
    const router = useRouter();
    const { gameId } = router.query;

    return (
        <div className="page">
            <div className="main">
                <div className='return'>
                    <Link href="/"><img className='returnImage' src="/icon/return.png" /></Link>
                </div>

                <div className='text'>
                    <h2>
                        Your Game PIN is generated. <br />
                        Share with your friends to start the game!
                    </h2>
                </div>

                <div className="urlLink">
                    <h2>{gameId}</h2>
                </div>

                <div className="userZone">
                    <Link href={`/preference?gameId=${gameId}`}><button className="button">Enter Game</button></Link>
                </div>

                <div className='footer'>
                    <img src="/footer.png"></img>
                </div>
            </div>
        </div>
    );
}