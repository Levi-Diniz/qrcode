'use client';

import React, { useState } from 'react';
import QRCode from 'qrcode';
import './qrcode.css';

export default function Teste() {
    const [username, setUsername] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);
    const [qrcodes, setQrcodes] = useState<string[]>([]);

    const generate = () => {
        const qrPromises = [];
        for (let i = 1; i <= quantity; i++) {
            qrPromises.push(
                QRCode.toDataURL(`https://github.com/${username}-${i}`)
            );
        }
        Promise.all(qrPromises)
            .then(setQrcodes)
            .catch(err => console.error(err));
    };

    return (
        <>
            <div id='container'>
                <div className="input-container">
                    <input
                        type="text"
                        placeholder="Enter your name"
                        name="text"
                        id="text"
                        className="input-field"
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="input-label" htmlFor="text">Name</label>
                </div>

                <div className="input-container">
                    <input
                        type="number"
                        placeholder="Enter quantity"
                        name="quantity"
                        id="quantity"
                        className="input-field"
                        min="1"
                        onChange={(e) => setQuantity(Number(e.target.value))}
                    />
                    <label className="input-label" htmlFor="quantity">Quantity</label>
                </div>

                <button onClick={generate}>
                    <div className="svg-wrapper-1">
                        <div className="svg-wrapper">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                width="24"
                                height="24"
                            >
                                <path fill="none" d="M0 0h24v24H0z"></path>
                                <path
                                    fill="currentColor"
                                    d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
                                ></path>
                            </svg>
                        </div>
                    </div>
                    <span>Send</span>
                </button>

                <div id='container2'>
                    {qrcodes.map((src, index) => (
                        <img key={index} src={src} alt={`qrcode ${index + 1}`} />
                    ))}
                </div>
            </div>
        </>
    );
}
