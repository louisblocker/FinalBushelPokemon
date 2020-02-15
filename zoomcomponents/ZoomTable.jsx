import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import ZoomStat from './ZoomStat';
import ZoomType from './ZoomType'

// For most of the project used CSS to style, in this section I switched to using more direct styling.

export default class ZoomTable extends React.Component {
    render() {
        const isMobile = this.props.mobile;
        const pokemon = this.props.pokemon;
        const abilities = [];
        pokemon.abilities.forEach((ability) => {
            abilities.push(ability.charAt(0).toUpperCase() + ability.substring(1));
        })
        const egg_groups = [];
        pokemon.egg_groups.forEach((egg) => {
            egg_groups.push(egg.charAt(0).toUpperCase() + egg.substring(1));
        })
        if (isMobile) {
        return (
            <div id = "ZoomTable">
                <ZoomType pokemon = {pokemon} mobile = {isMobile} />
                <hr />
                <ZoomStat pokemon = {pokemon} />
                <p className = "genus" style = {{fontWeight: "bold"}}> {pokemon.genus} </p>
                <p className = "description"> {pokemon.description} </p>
                <p className = "profile"> Profile </p>
                <p> <span style = {{fontWeight: "bold"}}>Height: </span><span style = {{width: "65%", float: "right"}}>{pokemon.height}m</span> </p>
                <p><span style = {{fontWeight: "bold"}}>Weight: </span><span style = {{width: "65%", float: "right"}}>{pokemon.weight}kg</span></p>
                <p><span style = {{fontWeight: "bold"}}>Abilities: </span><span style = {{width: "65%", float: "right"}}>{abilities.join(", ")} </span></p>
                <p><span style = {{fontWeight: "bold"}}>Egg Group: </span><span style = {{width: "65%", float: "right"}}>{egg_groups.join(", ")}</span></p>
            </div>
        )}
        else {
            return (
                <div id = "DTZoomTable">
                    <span style = {{fontWeight: "bold"}}>{pokemon.name}</span> <span style = {{color: "rgba(0, 0, 0, 0.85)", opacity: "35%"}}>#{pokemon.id}</span> <span style ={{float: "right"}}><ZoomType pokemon = {pokemon} mobile = {isMobile} /></span>
                    <hr />
                    <img className = "dtzoomimage" src={pokemon.image} alt={pokemon.name}></img><span style = {{float: "right", width:"70%", padding: "10px"}}><ZoomStat pokemon = {pokemon} /></span>
                    <br />
                    <p className = "genus" style = {{fontWeight: "bold"}}> {pokemon.genus} </p>
                    <p className = "description"> {pokemon.description} </p>
                    <p className = "profile"> Profile </p>
                    <p> <span style = {{fontWeight: "bold"}}>Height: </span><span style = {{width: "65%", float: "right"}}>{pokemon.height}m</span> </p>
                    <p><span style = {{fontWeight: "bold"}}>Weight: </span><span style = {{width: "65%", float: "right"}}>{pokemon.weight}kg</span></p>
                    <p><span style = {{fontWeight: "bold"}}>Abilities: </span><span style = {{width: "65%", float: "right"}}>{abilities.join(", ")} </span></p>
                    <p><span style = {{fontWeight: "bold"}}>Egg Group: </span><span style = {{width: "65%", float: "right"}}>{egg_groups.join(", ")}</span></p>
                </div>
            )}
    }
}