import React,{useState, useEffect} from "react";
import Navbar from "./component/Navbar/Navbar.js";
import Home from "./component/Home/Home.js";
import { Container } from "@material-ui/core";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import PostDetails from "./component/PostDetails/PostDetails.jsx";
import Auth from "./component/Auth/Auth.js";
import {GoogleOAuthProvider} from "@react-oauth/google";
function App()
{
    
    const [user, setUser] = useState(()=>{
        const savedUser = localStorage.getItem('profile');
        return savedUser? JSON.parse(savedUser) : null;
    });

    useEffect(()=>{
        const savedUser = localStorage.getItem('profile');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
          } else {
            setUser(null);
          }
    },[]);
    
    {console.log(user?.result)}
    return(
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
        <BrowserRouter>
            <Container maxWidth='xl'>
             <Navbar/>
             <Switch>
                <Route path="/" exact component={()=>(<Redirect to='/posts'/>)}/>
                <Route path='/posts' exact component={Home}/>
                <Route path='/posts/search' exact component={Home}/>
                <Route path='/posts/:id' exact component={PostDetails}/>
                {console.log(user?.result)}
                <Route path="/auth" exact render={()=>!(user?.result)?<Auth/>:<Redirect to='/posts'/>}/>
             </Switch>
            </Container>
        </BrowserRouter>
        </GoogleOAuthProvider>
    );
}

export default App;