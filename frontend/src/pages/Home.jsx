import React, { Component } from 'react';
import {Link} from "react-router-dom";
import '../css/Home.css';
import api from "../services/api"

import logo from "../assets/logo.svg";
import like from "../assets/like.svg";
import dislike from "../assets/dislike.svg";

export default class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            user_id : this.props.match.params.id,
            otherDevs : [],
        }

    }

    componentDidMount(){
        var self = this;
        async function loadUsers() {
                console.log('this.state', self.state);
                const response =  await api.get("/devs", {headers : {user : self.state.user_id}});

                console.log('response', response);

                self.setState({otherDevs : response.data.users});
                console.log('this.state', self.state);
            }
        loadUsers();
    }

    handleLike(){
        alert("In development");
    }
    handleDislike(){
        alert("In development");
    }


    render() {

        return (
            <div className="main-container">
                <Link to="/">
                    <img src={logo} alt="Logo"/>
                </Link>

                <ul>
                    {this.state.otherDevs.map((dev) => {
                        return (
                            <li key={dev._id}>
                                <img src={dev.avatar} alt="dev_image" />
                                <footer>
                                    <strong>{dev.name}</strong>
                                    <p>{dev.bio}</p>
                                </footer>
                                <div className="buttons">
                                    <button type="button" className="like" onClick={this.handleLike}>
                                        <img src={like} alt="" />
                                    </button>
                                    <button type="button" className="dislike" onClick={this.handleDislike}>
                                        <img src={dislike} alt="" />
                                    </button>
                                </div>
                            </li>)
                    })}

                </ul>
            </div>
        );
    }
}