import React from 'react'
import Nav from './Nav';
import axios from '../api/axios';
import { useState, useEffect,useRef } from 'react';

const OneEvent = (jwt_token) => {
    const accessToken = jwt_token.jwt_token;
    const[eventID, setEventID] = useState('');
    const[event, setEvent] = useState('');
    const[success, setSuccess] = useState(false);
    const[errMsg, setErrMsg] = useState('');
    const errRef = useRef();
    
    useEffect(() => { setErrMsg('')}, [eventID]);

    const handleSubmit = async(e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`/events/${eventID}`, {
                headers: {
                    'Authorization': accessToken
                }
            })
            setEvent(response.data);
            setErrMsg("")
            setSuccess(true);
        }
        catch(err) {
            console.log(err);
            if(!err?.response) {
                setErrMsg('No Server Response');
            }
            else if (err.response?.status === 401) {
                setErrMsg('Unauthorized access to this event');
            }
            else {
                setErrMsg("Invaild ID inserted")
            }

        }
    }   
    
    if(accessToken === null) {
        return(
            <div>
                <h1>Get Event</h1>
                <Nav/>
                <section>
                    <h1>Authorization Required:</h1> <br/>
                    Sign in to have access to this page
                </section>
            </div>
        )
    }
    else {
    return (
        <div>
            <h1>Get Event</h1>
            <Nav />
            {success ? 
            (<section>
                <h3>Successful Event Retrieval</h3>
                <p>Event Title:  {event.title}</p>
                    <p>Event ID: {event._id}</p>
                    <p>Description: {event.description}</p>
                    <p>Event Start: {event.day_start}</p>
                    <p>Event End: {event.day_end}</p>
                    <p>Event Type: {event.type}</p>
                    <p>Color: {event.color}</p>
                    <p>Event Creation: {event.created_at}</p>
                    <p>Last Update to Event: {event.update_at}</p>
                    <p>Author: {event.author}</p>
            </section>) 
            : (
            <section>
            <p ref ={errRef} className = {errMsg ? "errmsg" : "offscreen"} aria-live = "assertive">{errMsg}</p>
            <h1>Event Form</h1>
            <form onSubmit={handleSubmit}>
            <label htmlFor='eventID'>Event ID: </label>
            <input 
                type = "text"
                id = "eventID"
                autoComplete = "off"
                onChange={(e) => setEventID(e.target.value)}
                required
                />
                <button disabled = {!eventID ? true : false}>Get Event Data</button>
            </form>
            </section>
            )} 
        </div>
    )
    }
}

export default OneEvent