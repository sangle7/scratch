import React from 'react';
import {
    Link
} from "react-router-dom";
import {
    observer
} from 'mobx-react';
import {
    AppState
} from "./Appstate.js"
import {
    Navbar,
    Nav,
    NavItem
} from 'react-bootstrap'
import style from './../css/Head.scss'

export default @observer class Head extends React.Component {
    handleLogout() {
        AppState.handleLogout()
    }
    render() {
        const page = AppState.login == true ? <Link to='/'>Logout</Link> : <div></div>


        return (<div className={style.title}>
    <ul className={style.ul}>
    <li className={style.logo}><Link to='/'>Scratch</Link></li>
    <Link to='/login'><li>Login</li></Link>
    <Link to='/signup'><li>Signup</li></Link>
      </ul>
    </div>)
    }
}
