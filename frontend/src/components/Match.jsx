import React, { Component } from 'react';
import itsamatch from "../assets/itsamatch.png";

import '../css/Match.css'

export default class Match extends Component {


    render() {
        const {match, clearMatch} = this.props;
        return (
            <div>
                {
                    (match) &&
                    (
                        <div className="match-container">
                            <img src={itsamatch} alt="Its a match" />
                            <img className="avatar" src={match.avatar} alt="Dev Avatar" />
                            <strong className="dev-name">{match.name}</strong>
                            <p className="dev-bio">{match.bio}</p>
                            <button onClick={() => clearMatch()}>Fechar</button>
                        </div>
                    )
                }
            </div>
        );
    }
}