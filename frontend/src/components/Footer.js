import React, { Component } from 'react';
import {Nav} from "react-bootstrap";


export class Footer extends Component {
    render () {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col">

                        </div>
                        <div className="col">
                            <a href="/impressum">Impressum </a>
                            <a href="/datenschutzerklaerung">Datenschutzerklärung</a>
                        </div>
                        <div className="col">
                            <span className="text-muted">Copyright© 2020</span>
                        </div>
                    </div>
                </div>
            </footer>
        );
    }
}
