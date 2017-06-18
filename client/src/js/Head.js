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
import style from './../css/Head.scss'

export default @observer class Head extends React.Component {
    handleLogout = () => {
        AppState.handleLogout()
    }
    render() {
        const page = AppState.login == true ? <Link to='/'><li className={style.list} onClick={this.handleLogout}>Logout</li></Link> : <div><Link to='/login'><li className={style.list}>Login</li></Link> <Link to = '/signup' > <li className={style.list}>Signup</li> </Link></div>


        return (<div className={style.title}>
    <ul className={style.ul}>
    <Link to='/'><li className={style.logo}>Scratch</li></Link>
    {page}
      </ul>
    </div>)
    }
}
