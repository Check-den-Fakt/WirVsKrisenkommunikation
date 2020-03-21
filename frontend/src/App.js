import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from './logo.svg';
import './App.css';
import Home from './pages/Home/Home';
import About from './pages/About/About';
import { Layout } from './components/Layout';
import Check from './pages/Check/Check';

function App() {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/home">
            <Home />
          </Route>
          <Route path="/">
            <Check />
          </Route>
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
