import React from 'react'
import Nav from './Nav'
import { useState , useEffect } from 'react'
import axios from '../api/axios'

const Newevent = (jwt_token) => {
    const Events_URL = "/events"
    const accessToken = jwt_token.jwt_token;
    const[title, setTitle] = useState("");
    const[type, setType] = useState("");
    const[description, setDescription] = useState("");
    const[color,setColor] = useState("");
    const[success, setSuccess] = useState(false);
    const[errMsg, setErrMsg] = useState('');

    useEffect(() => {
        setErrMsg('');
    }, [title,type,description,color]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(Events_URL, JSON.stringify({title,type,description,color}),
            {headers: { 'Content-Type': 'application/json',
                        'Authorization': accessToken}}
            );
            console.log(response.data);
            setSuccess(true);
            setTitle('');
            setType('');
            setDescription('');
            setColor('');
        }

        catch(err) {
            console.log(err);
            if(!err?.response) {
                setErrMsg('No Server Response');
            }
            else if (err.response?.status === 400) {
                setErrMsg("Title is missing");
            }
            else if (err.response?.status === 401) {
                setErrMsg('Unauthorized');
            }
            else {
                setErrMsg("Login Failed!")
            }

            console.log(errMsg);

        }

    }


    if(jwt_token.jwt_token === null){
    return (
        <div>
            <h1>New Event Page</h1>
            <Nav/>
            <section>Log in to create events</section>
        </div>
    )
    }

    else {
        return (
            <div>
                <h1>New Event Page</h1>
            <Nav/>
            {success ? (
                <section>
                    <h1>You have created a new Event</h1> <br/>
                </section>
            ) : (
                <section>
                    <h1>Event Creation Form</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor='title'>Title: </label>
                        <input
                        type="text"
                        id="title"
                        autoComplete="off"
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        />
                        <label htmlFor='type'>Type of Event:  </label>
                        <input
                        type="text"
                        id="type"
                        autoComplete="off"
                        onChange={(e) => setType(e.target.value)}
                        />
                        <label htmlFor='description'>Description:  </label>
                        <input
                        type="text"
                        id="description"
                        autoComplete="off"
                        onChange={(e) => setDescription(e.target.value)}
                        />
                        <label htmlFor='color'>Color:  </label>
                        <input
                        type="text"
                        id="color"
                        autoComplete="off"
                        onChange={(e) => setColor(e.target.value)}
                        />
                    <button disabled = {!title ? true : false}>Create Event</button>
                    </form>
                </section>
            )}
            </div>
        )
    }


}

export default Newevent