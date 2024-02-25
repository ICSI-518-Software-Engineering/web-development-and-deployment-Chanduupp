import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const SelfProfile = () => {
    const [name, setName] = useState(localStorage.getItem('name')||'Chandra Sekhar Reddy Uppela');
    const [description, setDescription] = useState(localStorage.getItem('description') ||  'I am currently a graduate student in computer science at university at albany');


    //saving to the local storage 

    const handleBlur =() =>{
        localStorage.setItem('name' , name);
        localStorage.setItem('description' , description);
    }

    return (
        <div className="container my-4">
            <div className="row">
                <div className="col-md-4 d-flex align-items-start">
                    {/* Ensure the image source matches the one you're using */}
                    <img src="sample.png" alt="Profile" style={{ width: '300px', height: '300px' }} />
                </div>
                <div className="col-md-8">
                    <div className="form-group">
                        <label htmlFor="nameInput" className="form-label">Name</label>
                        <input
                            id="nameInput"
                            className="form-control"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onBlur={handleBlur} // Save on losing focus
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="bioInput" className="form-label">Biography</label>
                        <textarea
                            id="bioInput"
                            className="form-control"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            onBlur={handleBlur} // Save on losing focus
                            style={{ height: 'calc(300px - 88px)' }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SelfProfile;