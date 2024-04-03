import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function ProfileApp() {
    const [name, setName] = useState('James Smith');
    const [bio, setBio] = useState('Lorem ipsum...');
    const [number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [frontendSum, setFrontendSum] = useState(0);
    const [backendSum, setBackendSum] = useState(0);

    const handleFrontendAddition = () => {
        setFrontendSum((parseInt(number1) || 0) + (parseInt(number2) || 0));
    };

    const handleBackendAddition = async () => {
        // Assume the server is running on ec2-3-18-106-116.us-east-2.compute.amazonaws.com:8000
        const response = await fetch('http://ec2-3-18-106-116.us-east-2.compute.amazonaws.com:8000/add', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ number1: parseInt(number1), number2: parseInt(number2) }),
        });
        const data = await response.json();
        setBackendSum(data.sum);
    };

    const handleAddition = () => {
        handleFrontendAddition();
        handleBackendAddition();
    };

    return (
        <div className="container mt-3">
            <div className="mb-3">
                <label htmlFor="nameInput" className="form-label">Name</label>
                <input type="text" id="nameInput" className="form-control"
                    value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="bioInput" className="form-label">Biography</label>
                <textarea id="bioInput" className="form-control"
                    value={bio} onChange={(e) => setBio(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="number1Input" className="form-label">Enter First Number:</label>
                <input type="number" id="number1Input" className="form-control"
                    value={number1} onChange={(e) => setNumber1(e.target.value)} />
            </div>
            <div className="mb-3">
                <label htmlFor="number2Input" className="form-label">Enter Second Number:</label>
                <input type="number" id="number2Input" className="form-control"
                    value={number2} onChange={(e) => setNumber2(e.target.value)} />
            </div>
            <button onClick={handleAddition} className="btn btn-primary">Submit</button>
            <p>Your Addition Result (from ReactJS) is: {frontendSum}</p>
            <p>Your Addition Result (from server) is: {backendSum}</p>
        </div>
    );
}

export default ProfileApp;