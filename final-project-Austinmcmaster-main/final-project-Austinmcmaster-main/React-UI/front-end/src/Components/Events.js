import axios from "../api/axios"
import {useState, useEffect} from 'react'
import Nav from "./Nav";

function Events(jwt_token){
    const[events , setEvents] = useState([]);
    const EVENTS_URL = '/events'
    const accessToken = jwt_token.jwt_token
    console.log(accessToken)


        const fetchEvents = async () => {
            try {
                const response = await axios.get(EVENTS_URL, {
                    headers: {
                        'Authorization': accessToken
                    }
                })
                    if(response && response.data){
                    setEvents(response.data)
                    }
        
            }
            catch(err) {
                console.log(err);
            }
        }
    
    
        useEffect(() => {
            fetchEvents();
        })


    return (
        <div className="Events">
            <h1>Events</h1>
            <Nav />
            
            { events && events.length > 0 ? events.map(event => (
                <div key={event.id}>
                    <section>
                        <h3>Event Title:  {event.title}</h3>
                        <p>Event ID: {event._id}</p>
                        <p>Description: {event.description}</p>
                        <p>Event Start: {event.day_start}</p>
                        <p>Event End: {event.day_end}</p>
                        <p>Event Type: {event.type}</p>
                        <p>Color: {event.color}</p>
                        <p>Event Creation: {event.created_at}</p>
                        <p>Last Update to Event: {event.update_at}</p>
                        <p>Author: {event.author}</p>
                    </section>
                </div>
            )) :
            <section>
            <p>The entire event DataBase is only accessible to Admin Users</p> 
            </section>}
        </div>
    )



}

export default Events
