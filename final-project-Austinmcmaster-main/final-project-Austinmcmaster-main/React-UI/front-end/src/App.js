import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Rootpage from './Components/Rootpage';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Events from './Components/Events'
import { AuthProvider } from './context/AuthProvider'
import React from 'react'
import Newevent from './Components/Newevent';
import OneEvent from './Components/OneEvent';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      jwt_token:null
    };
  }

  handleLogin(jwt_token) {
    console.log(jwt_token)
    this.setState({
      logged_in: true,
      jwt_token: jwt_token
  })
  }

  handleLogout() {
    console.log("Logout");
    this.setState({
    logged_in: false,
    jwt_token: null,
    })
    }
    render() {
      return (
        <AuthProvider>
          <BrowserRouter>
           <Routes>
             <Route path= "/" element = {<Rootpage />} />
             <Route path = "Login" element = {<Login handleLogin = {(jwt_token) => this.handleLogin(jwt_token)} />} />
             <Route path = "Signup" element = {<Signup/>} />
             <Route path = "Events" element = {<Events jwt_token ={this.state.jwt_token} />} />
             <Route path = "Newevent" element = {<Newevent jwt_token = {this.state.jwt_token} />} />
             <Route path = "GetEvent" element = {<OneEvent jwt_token = {this.state.jwt_token} />} />
           </Routes>
          </BrowserRouter>
        </AuthProvider>
      )
    }

}

export default App;

