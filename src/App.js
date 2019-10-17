import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './App.css';

import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shoppage/ShopPage';
import SignInAndSignUp from './pages/sign-in-and-sign-up/SignInAndSignUp';
import Header from './components/header/Header';
import { auth } from './firebase/firebase.utils';

class App extends React.Component {
  state = {
    currentUser: null
  };

  unsubscribeFromAuth = null;

  componentDidMount() {
    console.log('componentDidMount');
    this.unsubscribeFromAuth = auth.onAuthStateChanged(user => {
      console.log('unsubscribeFromAuth');
      this.setState({ currentUser: user });
      console.log(user);
    });
  }

  componentWillUnmount() {
    console.log('componentWillUnmount');
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <BrowserRouter>
          <Header currentUser={this.state.currentUser} />
          <Switch>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route path='/signin' component={SignInAndSignUp} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
