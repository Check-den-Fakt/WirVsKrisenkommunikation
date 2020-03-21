import React, { useState } from 'react';
import { AddNews } from '../../components/AddNews';
import { Diagram } from '../../components/Diagram';

export default function trending() {
    // Declare a new state variable, which we'll call "count"
    return (
        <div>
            <h1></h1>
            <div className="container">
                <div className="raw">
                    <div className="text-center">
                        <div className="arrow"></div>
                    </div>
                </div>
            </div>
            <h1 className="display-4">Trending Fake News zu Corona</h1>
        </div>
    );
}