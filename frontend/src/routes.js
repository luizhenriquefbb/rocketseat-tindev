import React from 'react';
import { Switch, Route } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";

function Routes(){
    return (
        <Switch>
            <Route path="/" exact component={Login}/>
            <Route path="/dev/:id" component={Home}/>
        </Switch>
    );
}

export default Routes;


