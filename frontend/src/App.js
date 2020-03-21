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
import Result from './pages/Result/Result';
import trending from './pages/trending/trending';

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
          <Route path="/result">
            <Result />
          </Route>
          <Route path="/">
            <Check />
          </Route>
          <Route path="/trending">
            <trending />
          </Route>
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
