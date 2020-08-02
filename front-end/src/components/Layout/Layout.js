import React from 'react'
import Aux from '../../hoc/Auxiliary'
import './Layout.css'
import logo from '../../assets/CORD-19.jpg'

const layout = (props) => (
    <Aux >
        <img className="Content" src={logo} alt='Logo' />
        <main className="Main"> {props.children} </main>
    </Aux>
)

export default layout