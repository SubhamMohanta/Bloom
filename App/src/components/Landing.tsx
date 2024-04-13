import { Button } from './ui/button'
import Navbar from './Navbar'
import Image from "../assets/pexels-julia-m-cameron-4144533.jpg"
import { Link } from 'react-router-dom'

const Landing = () => {
    return (
        <>
            <Navbar/>
            <div className='landing-container'>
                <div className='text'>
                    <div className='text-1'>
                    <p className="leading-7 [&:not(:first-child)]:mt-6">
                    Welcome to Bloom,
    </p>
                    </div>
                    <div className='text-2'>
                    <h1 className="scroll-m-20 text-4xl lg:text-5xl font-extrabold tracking-tight">
                    Where Learning<br/> Knows No<br/> Bounds
    </h1>
                    </div>
                    <div className='text-3'>
                    <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                    Your Gateway to Unlimited<br/> Learning Possibilities
    </h4>
                    </div>
                    <div className='CTA'>
                        <Link to="/Mainpage"><Button style={{borderRadius:"12px", display: "flex", alignItems:"center", justifyContent:"center", padding:"4%"}}>Start learning</Button></Link>
                    </div>
                </div>
                    <img src={Image} width="30%" alt="A kid studying at the comfort of his room"/>

            </div>
        </>
    )
}

export default Landing