import React from 'react'
import Aux from '../../hoc/Auxiliary'
import './Layout.css'
import logo from '../../assets/CORD-19.jpg'

const layout = (props) => (
    <Aux>
        <div style={{backgroundColor: 'linen'}} >
            <img className='Content'src={logo} alt='Logo'/>
        </div>
        <main className="Main"> {props.children} </main>
        <div style={{backgroundColor: 'linen', height: 1000}}></div>
    </Aux>
)

export default layout