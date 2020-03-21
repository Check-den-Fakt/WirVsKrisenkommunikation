import React, { useState } from 'react';
import './Sources.css'

export default function Sources() {
    // Declare a new state variable, which we'll call "count"
    return (
        <div>
            <h1>Unseriöse Seiten/Quellen</h1>
            <div className="container">
                <div className="raw">
                    <div className="text-center">
                        <div className="arrow">
                            <i className="material-icons">trending_up</i>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}