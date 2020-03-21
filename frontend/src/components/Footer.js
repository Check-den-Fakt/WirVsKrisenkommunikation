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
                            <Nav.Link href="/impressum">Impressum</Nav.Link>
                            <Nav.Link href="/datenschutzerklaerung">Datenschutzerklärung</Nav.Link>
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
