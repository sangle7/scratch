import React from 'react'
import {
    observer
} from 'mobx-react';
import {
    AppState
} from "./Appstate.js"
import {
    FormGroup,
    ControlLabel,
    FormControl,
    HelpBlock,
    Button
} from "react-bootstrap"

export default @observer class signupPage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            password: '',
            repassword: '',
            userName: '',
            validateUser: null,
            validate1: null,
            validate2: null,
            isLoading: false
        }
    }
    validateUser = () => {
        const user = this.state.userName;
        if (user.length >= 4 && /^\w*$/.test(user)) {
            this.setState({
                validateUser: 'success'
            })
        } else {
            this.setState({
                validateUser: 'error'
            })
        }
    }
    validatePW = () => {
        const str = this.state.password;
        //含有数字和字母，不含特殊字符，长度8以上
        if (str.length >= 8 && /[A-Za-z]/.test(str) && /\d/.test(str) && /^\w*$/.test(str)) {
            this.setState({
                validate1: 'success'
            })
        } else {
            this.setState({
                validate1: 'error'
            })
        }
    }
    validatePW2 = () => {
        const str2 = this.state.repassword;
        //含有数字和字母，不含特殊字符，长度8以上
        if (str2.length >= 8 && str2 == this.state.password) {
            this.setState({
                validate2: 'success'
            })
        } else {
            this.setState({
                validate2: 'error'
            })
        };
    }
    handleUserChange = (e) => {
        this.setState({
            userName: e.target.value
        }, this.validateUser)
    }
    handleChange = (e) => {
        this.setState({
            password: e.target.value
        }, this.validatePW)
    }
    handleChange2 = (e) => {
        this.setState({
            repassword: e.target.value
        }, this.validatePW2)
    }
    handleSignup(e) {
        e.preventDefault();
        this.setState({
            isLoading: true
        });
        fetch('/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': "application/json;charset=utf-8",
                },
                body: JSON.stringify({
                    name: this.state.userName,
                    password: this.state.password
                })
            })
            .then(blob => blob.json())
            .then(code => {
                if (code.status == 'success') {
                    this.setState({
                        isLoading: false
                    });
                    //跳转，更改全局用户名，登录状态
                    AppState.user = this.state.userName;
                    AppState.handleLogin()
                    this.props.history.push('/');
                    console.log(AppState.user)
                } else {
                    this.setState({
                        isLoading: false
                    });
                    alert(code.status)
                }
            })
    }

    render() {
        let loading = this.state.validateUser == 'success' && this.state.validate1 == 'success' && this.state.validate2 == 'success' ? false : true
        return (<form>
            
    <FormGroup
          controlId="User" validationState={this.state.validateUser}>
          <ControlLabel>User:</ControlLabel>
          <FormControl
            type="text"
            placeholder='insert UserName Here'
            value={this.state.userName}
            onChange={this.handleUserChange}
          />
          <FormControl.Feedback />
          <HelpBlock>The user name should be at least four characters.</HelpBlock>
        </FormGroup>

    <FormGroup
          controlId="password" validationState={this.state.validate1}>
          <ControlLabel>Password:</ControlLabel>
          <FormControl
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
          />
          <FormControl.Feedback />
          <HelpBlock>The password should be at least eight characters,including numbers and letters</HelpBlock>
        </FormGroup>

    <FormGroup
          controlId="repassword"
           ref='thatpassword' validationState={this.state.validate2}>
          <ControlLabel>Confirm Password:</ControlLabel>
          <FormControl
            type="password"
            value={this.state.repassword}
            onChange={this.handleChange2}
          />
          <FormControl.Feedback />
        </FormGroup>

    <Button bsStyle="primary" ref='sumbitbutton' disabled={loading||this.state.isLoading} onClick={this.handleSignup.bind(this)}>Signup</Button> < /form>)

    }
}
