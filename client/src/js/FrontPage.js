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
import {
    ListGroupItem,
    ListGroup,
    Col
} from 'react-bootstrap'

export default @observer class LoggedFp extends React.Component {
    componentWillMount() {
        //获取用户笔记列表，ajax根据用户名筛选数据库，获得数组后render
        var request = new XMLHttpRequest();
        request.onreadystatechange = function() {
            if (request.readyState == 4) {
                if (request.status == 200) {
                    var data = JSON.parse(request.responseText)
                    AppState.mynotes = data
                } else {
                    console.log(request.status);
                }
            }
        }
        request.open('get', '/mynote?user=' + AppState.user);
        request.send()
    }
    handleClick(url) {
        this.props.history.push(url)
    }

    render() {
        const mynotes = AppState.mynotes.map((elem, index) => {
            var url = '/notes/' + elem.id
            var header = elem.content.length > 20 ? elem.content.slice(0, 20) + '...' : elem.content
            return <Link to={url}><ListGroupItem  header={header}  key={index}>{elem.time}</ListGroupItem></Link>
        })

        return (
            <Col md={8} mdOffset={2} sm={10} smOffset={1}>
    <h2 style={{'margin': '30px 0 0 0'}}>Welcome back, {AppState.user}</h2><hr/>
            <ListGroup>
     <Link to='/notes/new'><ListGroupItem header="New Note">Start From Here</ListGroupItem></Link>
    {mynotes}
  </ListGroup></Col>)
    }
}
