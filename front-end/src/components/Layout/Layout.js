import React from 'react'
import { Link } from 'react-router-dom'
import Aux from '../../hoc/Auxiliary'
import './Layout.css'
import logo from '../../assets/CORD-19.jpg'

const layout = (props) => (
    <Aux>
        <div style={{backgroundColor: 'rgb(252, 229, 207)'}} >
            <Link to='/'>
                <img className='Content'src={logo} alt='Logo'/>
            </Link>
        </div>
        <main className="Main"> {props.children} </main>
        <div style={{backgroundColor: 'rgb(252, 229, 207)', height: 1000}}></div>
    </Aux>
)

export default layout