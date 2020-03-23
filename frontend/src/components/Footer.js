import React, { Component } from 'react';
import {Nav} from "react-bootstrap";
import "./Footer.css";


export class Footer extends Component {
    render () {
        return (
            <footer className="footer mt-5 mb-5">
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <a href="#"><img alt="Check den Fakt" src="/img/header_logo_lite.svg" width="200" height="60" className="d-inline-block align-top"/></a>
                        </div>
                        <div className="col fact-footer-col">
                            <a href="/dsgvo">Datenschutzerkl&auml;rung</a>
                        </div>
                        <div className="col fact-footer-col">
                            <a href="/imprint">Impressum</a>
                        </div>
                        <div className="col fact-footer-col">
                            <span className="text-muted">Copyright © 2020</span>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
