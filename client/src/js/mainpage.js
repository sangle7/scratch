import React from 'react'
import {
    observer
} from 'mobx-react';
import {
    AppState
} from "./Appstate.js"
import {
    Jumbotron
} from 'react-bootstrap'


import {
    Link
} from 'react-router-dom'
import LoggedFp from './FrontPage'

export default @observer class Frontpage extends React.Component {
    render() {
        const page = AppState.login == true ?
            <LoggedFp /> :
            <Jumbotron>
    <h1>Scratch</h1>
    <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
  </Jumbotron>
        return (<div>{page}</div>)
    }
}
