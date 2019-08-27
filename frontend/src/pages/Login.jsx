import React, { Component } from 'react';
import logo from "../assets/logo.svg";
import '../css/Login.css';
import api from "../services/api";

export default class Login extends Component {

    constructor(props){
        super(props);
        this.state = {
            userName : "",
        }
    }

    handleChangeUserName(evt) {
        this.setState({userName : evt.target.value});
    }

    async handleLogin(evt){
        evt.preventDefault();

        console.log('username', document.querySelector("#login-form input").value);
        const response = await api.post("/devs", {
            username : this.state.userName,
        });

        const { _id } = response.data.new_user;
        console.log('_id', _id);

        this.props.history.push(`/dev/${_id}`);
    }

    render() {
        return (
            <div className="login-container">
                <img src={logo} alt="Tindev"/>
                <form id="login-form" onSubmit={evt => this.handleLogin(evt)}>
                    <input type="text" placeholder="Digite seu usuario do github" onChange={evt => this.handleChangeUserName(evt)}/>
                    <button type="submit">Entrar</button>
                </form>
            </div>
        );
    }
}