import React , {useState} from "react";

function Addition(){
    const[number1, setNumber1] = useState('');
    const [number2, setNumber2] = useState('');
    const [frontEndSum, setFrontEndSum] = useState(null);
    const [backEndSum, setBackEndSum] = useState(null);

    const handleFrontEndAddition =()=>{
        setFrontEndSum(Number(number1)+ Number(number2));
    };

    const handleBackEndAddition = async ()=>{
        try{
            const response= await fetch('http://localhost:8000/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({number1: Number(number1), number2: Number(number2)}),
            });
            const data=await response.json();
            setBackEndSum(data.sum);
        }
          catch(error){
            console.error('Error: ', error);
            setBackEndSum("Error in calculation");
          }
        };
    const handleSubmit = (event) => {
        event.preventDefault();
        handleFrontEndAddition();
        handleBackEndAddition();
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit}>
                <div className="form-group row">
                    <label htmlFor="number1Input" className="col-sm-2 col-form-label">Enter First Number:</label>
                    <div className="col-sm-10">
                        <input
                            type="number"
                            className="form-control"
                            id="number1Input"
                            value={number1}
                            onChange={(e) => setNumber1(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-group row">
                    <label htmlFor="number2Input" className="col-sm-2 col-form-label">Enter Second Number:</label>
                    <div className="col-sm-10">
                        <input
                            type="number"
                            className="form-control"
                            id="number2Input"
                            value={number2}
                            onChange={(e) => setNumber2(e.target.value)}
                        />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {frontEndSum !== null && <p>Your Addition Result (from ReactJS) is: {frontEndSum}</p>}
            {backEndSum !== null && <p>Your Addition Result (from server) is: {backEndSum}</p>}
        </div>
    );
}

export default Addition;