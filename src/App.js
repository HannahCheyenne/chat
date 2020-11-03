import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Chat from './components/Chat/Chat'
import Join from './components/Join/Join'


export default class App extends Component {
  render() {
    return (
      <main className="App">
        <Switch>
          <Route exact path='/' component={Join}/>
          <Route path='/chat' component={Chat}/>
        </Switch>
      </main>
    )
  }
}
