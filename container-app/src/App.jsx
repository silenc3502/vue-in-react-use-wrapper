import React, {useEffect, useRef, useState} from "react";
import ReactDOM from 'react-dom'
import mitt from "mitt";
import {BrowserRouter, Link, Route, Routes, useNavigate} from "react-router-dom";
import {Button} from "@mui/material";
//import VueCounterContainerRemoteApp from "./router/vueCounterContainerApp/VueCounterContainerRemoteApp";
import VueCounterWrapper from "./router/vueCounterApp/VueCounterWrapper";
import Home from "./router/Home";

const eventBus = mitt();

const withSingleInstance = (Component) => {
    let instance = null;

    return (props) => {
        if (!instance) {
            instance = <Component {...props} />;
        }

        return instance;
    };
};

const App = () => {
    return (
        <BrowserRouter>
            <div>
                <div>
                    <h1>React Container App</h1>
                    <Button component={Link} to="/" variant="contained">
                        홈
                    </Button>
                    <Button component={Link} to="/vue-counter-app" variant="contained">
                        Vue remotes use wrapper
                    </Button>
                </div>
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route exact path="/vue-counter-app" element={<VueCounterWrapper/>} />
                </Routes>
            </div>
        </BrowserRouter>
    );
};

export default App;



