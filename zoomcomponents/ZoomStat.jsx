import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import NameBar from './NameBar';

export default class ZoomStat extends React.Component {
    render () {
        const stats = this.props.pokemon.stats;
        
        return (
            <div id="statblock">
                HP <StatBar stats = {stats.hp} /> <br />
                Attack <StatBar stats = {stats.attack} /> <br />
                Defense <StatBar stats = {stats.defense} /> <br />
                Speed <StatBar stats = {stats.speed} /> <br />
                Sp. Atk <StatBar stats = {stats["special-attack"]} /> <br />
                Sp. Def <StatBar stats = {stats["special-defense"]} /> <br />
            </div>
        );
    }
}

// Helper method to render each stat bar inline. Set out of 150. With the statbar variable decided to do styling directly in React instead of CSS.

class StatBar extends React.Component {
    render () {
        const stats = this.props.stats;
        const statbar = stats / 150 * 100;
        return (
                <div className = "progressoutline" style = {{backgroundColor: "khaki", width: "70%", height: "24px", float: "right", right: "5%", display: "inline-block"}}>
                    <div className = "progress" style = {{backgroundColor: "cadetblue", width: `${statbar}%`, height: "24px", display: "inline-block"}}> {stats} </div>
                </div>
        )
    }
}