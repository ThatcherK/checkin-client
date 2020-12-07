import React from 'react'
import { Switch, Route } from 'react-router-dom';
import Layout from '../components/Layout';
import SignIn from '../components/auth/SignIn'
import SignUp from '../components/auth/SignUp'
import VisitorForm from '../components/VisitorForm';

export default function MainNavigation() {
	return (
		<Switch>
			<Route exact path="/" component={Layout} />
			<Route  exact path="/signup" component={SignUp} />
			<Route exact path="/signin" component={SignIn} />
			<Route exact path="/new-visitor" component={VisitorForm}/>
		</Switch>
	);
}
