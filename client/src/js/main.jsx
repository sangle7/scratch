import React from 'react'
import ReactDOM from 'react-dom'
import {
	BrowserRouter as Router,
	Route,
	Switch
} from 'react-router-dom';
import Head from "./Head"
import mainpage from "./mainpage"
import signupPage from "./signupPage";
import loginPage from "./loginPage";
import ErrorPage from "./ErrorPage";
import newNote from "./newNote";
import noteEdit from "./noteEdit";


class Main extends React.Component {

    render() {
        return (<Router><div>
	<Head />
<Switch>
	<Route exact path='/' component={mainpage}/>
	<Route exact path="/login" component={loginPage}/>
	<Route exact path="/signup" component={signupPage}/>
	<Route exact path="/notes/new" component={newNote}/>
	<Route path="/notes/:id" component={noteEdit}/>
	<Route  component={ErrorPage}/>
</Switch></div>
</Router>)
    }
}

ReactDOM.render(<Main />,document.getElementById('root'))