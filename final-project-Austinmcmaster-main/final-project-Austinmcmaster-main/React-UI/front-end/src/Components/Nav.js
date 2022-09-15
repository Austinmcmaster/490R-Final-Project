import { Link } from "react-router-dom";

const Nav = () => {
    return (
        <nav className = "Nav">
            <Link to = "/">Home</Link>  | {" "}
            <Link to = "/login">Login</Link> | {" "}
            <Link to = "/signup">Sign Up</Link> | {" "}
            <Link to = "/events">Admin Events</Link> | {" "}
            <Link to = "/NewEvent">Create Event</Link> | {" "}
            <Link to = "/GetEvent">Get Event</Link>
        </nav>
    )
}
export default Nav