import React, { Component } from 'react';

export class Footer extends Component {
    render () {
        return (
            <footer className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col">

                        </div>
                        <div className="col">
                            <a href="/">Impressum</a>
                            <a href="/">Datenschutzerklärung</a>
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
