import React, { useState } from 'react'
import logo from '../../Assets/logo.png'
import { Link } from 'react-router-dom'
import "./navbar.css"
import Sidebar from './Sidebar'
import { signInWithPopup, signOut } from 'firebase/auth'
import { auth, provider } from '../../firebase/firebase'
import { useSelector } from 'react-redux'
import { selectUser } from '../../Feature/Userslice'
import { useNavigate } from 'react-router-dom'
//import { ToastContainer, toast } from 'react-toastify'
//import 'react-toastify/dist/ReactToastify.css';
//import axios from 'axios';

function Navbar() {
    const navigate = useNavigate()
    const user = useSelector(selectUser)
    const [isDivVisibleForintern, setDivVisibleForintern] = useState(false)
    const [isDivVisibleForJob, setDivVisibleFroJob] = useState(false)
    const [isDivVisibleForProfile, setDivVisibleProfile] = useState(false)
    

    //  for showing profile dropdown
    const showtheProfile = () => {
        setDivVisibleProfile(true)
        document.getElementById("ico3").className = "bi bi-caret-up-fill"
    }
    const hidetheProfile = () => {
        document.getElementById("ico3").className = "bi bi-caret-down-fill"
        setDivVisibleProfile(false)
    }


    const showInternShips = () => {
        document.getElementById("ico").className = "bi bi-caret-up-fill"
        setDivVisibleForintern(true)
    }
    const hideInternShips = () => {
        document.getElementById("ico").className = "bi bi-caret-down-fill"
        setDivVisibleForintern(false)
    }
    const showJobs = () => {
        document.getElementById("ico2").className = "bi bi-caret-up-fill"
        setDivVisibleFroJob(true)
    }
    const hideJobs = () => {
        document.getElementById("ico2").className = "bi bi-caret-down-fill"
        setDivVisibleFroJob(false)
    }

    const logoutFunction = () => {
        signOut(auth)
        navigate("/")
    }

    return (
        <div>

            <nav className='nav1'>
                <ul>
                    <div className="img">
                        <Link to={"/"}><img src={logo} alt="" srcset="" /></Link>
                    </div>
                    <div className="elem">
                        <Link to={"/Internship"}>   <p id='int' className='' onMouseEnter={showInternShips} > Internships  <i onClick={hideInternShips} id='ico' class="bi bi-caret-down-fill"></i></p></Link>
                        <Link to={"/Jobs"}> <p onMouseEnter={showJobs} >Jobs  <i class="bi bi-caret-down-fill" id='ico2' onClick={hideJobs}></i></p></Link>
                    </div>
                    <div className="search">
                        <i class="bi bi-search"></i>
                        <input type="text" placeholder='Search' />
                    </div>
                    {
                        user ? (
                            <>
                                <div className='Profile'>
                                    <Link to={"/profile"}>
                                        <img src={user?.photo} alt="" onMouseEnter={showtheProfile} className='rounded-full w-12' id='picpro' />
                                        <i className='bi bi-caret-up-fill' id='ico3' onClick={hidetheProfile}></i>
                                    </Link>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className="auth">
                                    <button className='btn1'><Link to="/loginpage">Login</Link></button>


                                    <button className='btn2'><Link to="/register">Register</Link></button>
                                </div>
                            </>
                        )


                    }
                    {
                        user ? (
                            <>
                                <button className='bt-log' id='bt' onClick={logoutFunction}>Logout <i class="bi bi-box-arrow-right"></i></button>
                            </>
                        ) : (
                            <>
                                {/* <div className="flex mt-7 hire">
Hire Talent
    </div> */}

                                <div className="admin">
                                    <Link to={"/adminLogin"}>
                                        <button>Admin</button>
                                    </Link>
                                </div>
                            </>
                        )
                    }

                </ul>
            </nav>


            {
                isDivVisibleForintern && (
                    <div className="profile-dropdown-2">
                        <div className="left-section">

                            <p>Top Locations</p>
                            <p>Profile</p>
                            <p>Top Category</p>
                            <p>Explore More Internships</p>
                        </div>
                        <div className="line flex bg-slate-400">

                        </div>
                        <div className="right-section">
                            <p>Intern at India</p>
                            <p>Intern at India</p>
                            <p>Intern at India</p>
                            <p>Intern at India</p>
                            <p>Intern at India</p>
                        </div>
                    </div>


                )
            }
            {
                isDivVisibleForJob && (
                    <div className="profile-dropdown-1">
                        <div className="left-section">

                            <p>Top Locations</p>
                            <p>Profile</p>
                            <p>Top Category</p>
                            <p>Explore More Internships</p>
                        </div>
                        <div className="line flex bg-slate-400">

                        </div>
                        <div className="right-section">
                            <p>Intern at India</p>
                            <p>Intern at India</p>
                            <p>Intern at India</p>
                            <p>Intern at India</p>
                            <p>Intern at India</p>
                        </div>
                    </div>


                )
            }
            
                {isDivVisibleForProfile && (
                    <div className="profile-dropdown h-16 rounded-sm shadow-sm">
                        <p className='font-bold'>{user?.name}</p>
                        <p className='font-medium'>{user?.email}</p>

                    </div>
                )

                }
            
            <Sidebar />
        </div>
    )
}

export default Navbar
