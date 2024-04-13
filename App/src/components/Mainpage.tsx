import React from 'react'
import Navbar from './Navbar'
import { useClerk } from "@clerk/clerk-react";
import { Link } from 'react-router-dom';

const Mainpage = () => {
    const { user } = useClerk();
    return (
        <>
            <Navbar />
            <div className='mainpage-container'>
                <div className='profile'>
                    <div className='pic'>
                        <img src={user?.imageUrl} width="35%" alt="Profile pic" />
                    </div>
                    <div className='Name'>
                        <h2 className='scroll-m-20 pb-2 text-3xl font-semibold tracking-tight first:mt-0'>{user?.fullName}</h2>
                    </div>
                </div>
                <div className='grid-container'>
                    
                        <Link  className='item1' to="https://bloom-hazel.vercel.app/meeting/user_2f27fi90uncOehi1jWd05XYbMkE?personal=true">
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                Interact with peers
                            </h3>
                        </Link>
                    
                    
                        <Link className='item2' to="/Forum">
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                Discussion forum
                            </h3>
                        </Link>
                
                        <Link className="item3" to="https://bloom-hazel.vercel.app/">
                            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">
                                Attend lecture
                            </h3>
                        </Link>

                </div>
            </div>
        </>
    )
}

export default Mainpage;