import React, { Component } from 'react';
import ReactDOM from 'react-dom';

export default class ZoomType extends React.Component {
    render() {
        const types = [];
      this.props.pokemon.types.forEach((poke) => {
        types.push(
          <Pokemon_Type type = {poke}
          key = {poke.id} />
        );
      });
      if(this.props.mobile){
        return (
            <div id = "ZoomTypes">
                {types}
            </div>
        )}
        else {return (
            <div id = "DTTypes">
                {types}
            </div>
        )}
    }
}

class Pokemon_Type extends React.Component {
    render () {
        const type = this.props.type.toUpperCase()
        return (
            <div className = {`${type}`}> {type} </div>     
        )
    }
}