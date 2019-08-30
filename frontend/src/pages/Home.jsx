import React, { Component } from 'react';
import {Link} from "react-router-dom";
import io from 'socket.io-client';

import '../css/Home.css';

import api from "../services/api";
import CONSTANTES from '../constantes';

import logo from "../assets/logo.svg";
import like from "../assets/like.svg";
import dislike from "../assets/dislike.svg";
import Match from '../components/Match';

export default class Home extends Component {

    constructor(props){
        super(props);

        this.state = {
            user_id : this.props.match.params.id,
            otherDevs : [],
            match : null,
        }

        this.socket = io(CONSTANTES.BASE_URL, {
            query: {
                dev_id : this.props.match.params.id
            }
        });
        this.configureSocketListeners();


    }

    loadUsers(){
        var self = this;
        async function loadUsers() {
                const response =  await api.get("/devs", {headers : {user : self.state.user_id}});
                self.setState({otherDevs : response.data.users});
            }
        loadUsers();

    }

    componentDidMount(){
        this.loadUsers();
    }

    handleLike(otherDevId){
        var self = this;
        async function _like() {
            await api.post(`/like/${otherDevId}`, null, { headers: { user: self.props.match.params.id } });
            self.loadUsers();
        }

        _like();
    }

    handleDislike(otherDevId){
        var self = this;
        async function _dislike() {
            await api.post(`/like/${otherDevId}`, null, { headers: { user: self.props.match.params.id } });
            self.loadUsers();
        }
        _dislike();
    }

    configureSocketListeners(){
        this.socket.on('match', (response) => {
            this.setState({match : response.other_dev});

        })
    }

    clearMatch(){
        this.setState({ match: null });
    }


    render() {

        return (
            <div className="main-container">
                <Link to="/">
                    <img src={logo} alt="Logo"/>
                </Link>


                {
                    <Match match={this.state.match} clearMatch={() => this.clearMatch()}></Match>
                }


                {
                    (this.state.otherDevs.length > 0) ?
                    (<ul>
                        {this.state.otherDevs.map((dev) => {
                            return (
                                <li key={dev._id}>
                                    <img src={dev.avatar} alt="dev_image" />
                                    <footer>
                                        <strong>{dev.name}</strong>
                                        <p>{dev.bio}</p>
                                    </footer>
                                    <div className="buttons">
                                        <button type="button" className="like" onClick={() => this.handleLike(dev._id)}>
                                            <img src={like} alt="" />
                                        </button>
                                        <button type="button" className="dislike" onClick={() => this.handleDislike(dev._id)}>
                                            <img src={dislike} alt="" />
                                        </button>
                                    </div>
                                </li>)
                        })}

                    </ul>)

                    :
                    ( <div className="empty">Acabou os usuarios</div> )

                }

            </div>
        );
    }
}