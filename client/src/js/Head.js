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

export default @observer class Head extends React.Component {
    handleLogout() {
        AppState.handleLogout()
    }
    render() {
        const page = AppState.login == true ? <Nav pullRight><NavItem onClick={this.handleLogout.bind(this)} eventKey={1}><Link to='/'>Logout</Link></NavItem></Nav> : <Nav pullRight>
        <NavItem eventKey={1}><Link to='/signup'>Signup</Link></NavItem>
        <NavItem eventKey={2}><Link to='/login'>Login</Link></NavItem>
      </Nav>
        return (<Navbar collapseOnSelect>
    <Navbar.Header>
      <Navbar.Brand>
       <Link to='/'>Scratch</Link>
      </Navbar.Brand>
      <Navbar.Toggle />
    </Navbar.Header>
    <Navbar.Collapse>
     {page}
    </Navbar.Collapse>
  </Navbar>)
    }
}
