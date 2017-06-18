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
    Jumbotron
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

    render() {
        const mynotes = AppState.mynotes.map((elem, index) => {
            var url = '/notes/' + elem.id
            return <Link to={url}><ListGroupItem header={elem.content}  key={index}>{elem.time}</ListGroupItem></Link>
        })

        return (<div>
              <Jumbotron>
    <h1>Welcome back,{AppState.user}</h1>
    <p>This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
  </Jumbotron>
            <ListGroup>
     <Link to='/notes/new'><ListGroupItem header="New Note">Start From Here</ListGroupItem></Link>
    {mynotes}
  </ListGroup></div>)
    }
}
