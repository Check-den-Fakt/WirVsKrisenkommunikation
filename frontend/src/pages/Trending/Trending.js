import React, { useState } from 'react';
import './Trending.css'

export default function Trending() {
    // Declare a new state variable, which we'll call "count"
    return (
        <div>
            <h1></h1>
            <div className="container">
                <div className="raw">
                    <div className="text-center">
                        <div className="arrow">
                        <i className="material-icons">trending_up</i>
                        </div>
                    </div>
                </div>
            </div>
            <h1 className="display-4">Trending Fake News zu Corona</h1>
        </div>
    );
}