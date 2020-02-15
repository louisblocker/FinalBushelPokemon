import React from 'react';
import ReactDOM from 'react-dom';
import DetailPull from './detailpull';
import "./style.css"
import ZoomTopBar from './zoomcomponents/ZoomTopBar';
import ZoomImage from './zoomcomponents/ZoomImage';
import ZoomTable from './zoomcomponents/ZoomTable';

import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams
  } from "react-router-dom";

export default class Pokemon_Zoom extends React.Component {
    constructor(props) {
            super(props)
            this.state = {
                width: window.innerWidth,
                resolved: false,
                pokemon: {},
            };
            this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
        }
        componentDidMount (){
            window.addEventListener('resize', this.handleWindowSizeChange);
            const idstring = window.location.pathname;
            const id = idstring.split('""').join("").split('/id/').join("");
            DetailPull(id).then((response) => {
                    this.setState({resolved: true, pokemon: response.data});
                  });
            
            }

        handleWindowSizeChange() {
            this.setState ({ width: window.innerWidth});
        }

        render () {
            const isMobile = this.state.width <= 500;
        if (!this.state.resolved){return (
            <div>
                Loading...
            </div>
        )}
        if (this.state.resolved && isMobile) {return (
            <div id = "PokeZoom">
                <ZoomImage pokemon = {this.state.pokemon} mobile = {isMobile}/>
                <ZoomTopBar pokemon = {this.state.pokemon} mobile = {isMobile}/>
                <ZoomTable pokemon = {this.state.pokemon} mobile = {isMobile}/>
        </div>
        );}
        if (this.state.resolved && !isMobile) {return (
            <div id = "PokeZoom">
                <div id = "header">
                <Link to={`/`} className = "circle"><span id = "zoomdesktopbackarrow" /></Link>
                <span id = "dtname">{this.state.pokemon.name}</span>
                </div>
                <ZoomTable pokemon = {this.state.pokemon} mobile = {isMobile}/>
            </div>
        );}
    }
}