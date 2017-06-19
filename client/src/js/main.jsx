import React from 'react'
import ReactDOM from 'react-dom'
import {
	BrowserRouter as Router,
	Route,
	Switch,Redirect
} from 'react-router-dom';
import Head from "./Head"
import mainpage from "./mainpage"
import signupPage from "./signupPage";
import loginPage from "./loginPage";
import ErrorPage from "./ErrorPage";
import newNote from "./newNote";
import noteEdit from "./noteEdit";
import './../css/global.css'
import {
    AppState
} from "./Appstate.js"



const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route {...rest} render={props => (
    AppState.login ? (
      <Component {...props}/>
    ) : (
      <Redirect to={{
        pathname: '/login',
        state: { from: props.location }
      }}/>
    )
  )}/>
)

class Main extends React.Component {

    render() {
        return (<Router><div>
	<Head />
<Switch>
	<Route exact path='/' component={mainpage}/>
	<Route exact path="/login" component={loginPage}/>
	<Route exact path="/signup" component={signupPage}/>
	<PrivateRoute exact path="/notes/new" component={newNote}/>
	<PrivateRoute path="/notes/:id" component={noteEdit}/>
	<Route  component={ErrorPage}/>
</Switch></div>
</Router>)
    }
}


ReactDOM.render(<Main />,document.getElementById('root'))