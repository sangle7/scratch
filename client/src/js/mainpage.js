import React from 'react'
import {
    observer
} from 'mobx-react';
import {
    AppState
} from "./Appstate.js"

import {
    Link
} from 'react-router-dom'
import LoggedFp from './FrontPage'

export default @observer class Frontpage extends React.Component {
    render() {
        const page = AppState.login == true ?
            <LoggedFp /> :
            <h1>Scratch</h1>
        return (<div>{page}</div>)
    }
}
