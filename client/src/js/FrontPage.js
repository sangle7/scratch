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
    ListGroup
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
                        // AppState.updateMynotes(data)
                } else {
                    console.log(request.status);
                }
            }
        }
        request.open('get', 'http://45.76.223.155:7070/?user=' + AppState.user);
        request.send()
    }

    render() {
        const mynotes = AppState.mynotes.map((elem, index) => {
            return <ListGroupItem header={elem.content} href="#" key={index}>{elem.time}</ListGroupItem>
        })

        return (<ListGroup>
     <Link to='/notes/new'><ListGroupItem header="New Note">Start From Here</ListGroupItem></Link>
    {mynotes}
  </ListGroup>)
    }
}
