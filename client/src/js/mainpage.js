import React from 'react'
import {
    observer
} from 'mobx-react';
import {
    AppState
} from "./Appstate.js"
import {
    Col
} from 'react-bootstrap'


import {
    Link
} from 'react-router-dom'
import LoggedFp from './FrontPage'

export default @observer class Frontpage extends React.Component {
    render() {
        const page = AppState.login == true ?
            <LoggedFp /> : <Col md={6} mdOffset={3} sm={8} smOffset={2}>
    <h1 style={{'marginTop': '100px'}}>Scratch</h1>
    <p style={{'textAlign': 'center'}}>A simple note-taking app.</p></Col>
        return (<div>{page}</div>)
    }
}
