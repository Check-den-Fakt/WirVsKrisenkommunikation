import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import About from './pages/About/About';
import Rules from './pages/Rules/Rules';
import { Layout } from './components/Layout';
import Check from './pages/Check/Check';
import Result from './pages/Result/Result';
import Landing from './pages/Landing/Landing';
import Report from './pages/Report/Report';
import Sources from './pages/Sources/Sources';
import Imprint from "./pages/Imprint/Imprint";
import DSGVO from "./pages/DSGVO/DSGVO";

function App() {
  return (
    <Layout>
      <Router>
        <Switch>
          <Route path="/about">
            <About />
          </Route>
          <Route path="/rules">
            <Rules />
          </Route>
          <Route path="/result">
            <Result />
          </Route>          
          <Route path="/report">
            <Report />
          </Route>
          <Route path="/check">
            <Check />
          </Route>
          <Route path="/sources">
            <Sources />
          </Route>
          <Route path="/imprint">
            <Imprint />
          </Route>
          <Route path="/dsgvo">
            <DSGVO />
          </Route>
          <Route path="/">
            <Landing />
          </Route>
        </Switch>
      </Router>
    </Layout>
  );
}

export default App;
