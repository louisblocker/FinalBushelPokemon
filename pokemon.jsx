import React from 'react';
import ReactDOM from 'react-dom';
import PokemonPull from './axiospull.jsx';
import "./style.css";
import Pokemon_Zoom from './pokezoom.jsx';
import ZoomType from './zoomcomponents/ZoomType.jsx'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
  useRouteMatch
} from "react-router-dom";

// In this main document I kept the classes together following the React tutorials. 
// I disliked them being in the same section so I split off after this into more organized files.

class Pokemon_Image extends React.Component {
    render () {
        const pokemon_image = this.props.pokemon.image;
        const pokemon_name = this.props.pokemon.name;
        if (this.props.mobile){
          return (
            <div className = "image">
                <img src={pokemon_image} alt={pokemon_name}></img>
            </div>
        );}
        else {
          return (
            <div className = "dtimage">
                <img src={pokemon_image} alt={pokemon_name}></img>
            </div>
        );
        }
        
    }
}

class Pokemon_Name extends React.Component {
    render () {
        const pokemon_name = this.props.pokemon.name;
        return (
            <div className = "name">
               {pokemon_name}
            </div>
        );
    }
}

// I was debating how to implement the mobile-desktop split. I decided on passing "isMobile" as a state and rendering differently in each class.

class Pokemon_Card extends React.Component {
  render () {
    const pokemon = this.props.pokemon;
    let id = pokemon.id;
    const isMobile = this.props.mobile;
    if (isMobile) {return (
      <div className = "card" id = {this.props.pokemon.name}>
        <Link to = {`/id/${id}`}>
          <Pokemon_Name pokemon = {this.props.pokemon} mobile = {isMobile} />
          <div className = "divider" />
          <Pokemon_Image pokemon = {this.props.pokemon} mobile = {isMobile} />
          </Link>
      </div>
    )}    
    else {
      return (
        <div className = "dtcard" id = {this.props.pokemon.name}>
        <Link to = {`/id/${id}`}>
          <Pokemon_Name pokemon = {this.props.pokemon} mobile = {isMobile}  />
          <div className = "divider" />
          <Pokemon_Image pokemon = {this.props.pokemon} mobile = {isMobile} />
          <div className = "dtypes">
          <ZoomType pokemon = {this.props.pokemon} mobile = {isMobile} /></div>
          </Link>
      </div>
      )
    }
    
  }
}

class PokeTable extends React.Component {
    render() {  
      const cards = [];
      this.props.pokemon.forEach((poke) => {
        cards.push(
          <Pokemon_Card mobile = {this.props.mobile} pokemon = {poke}
          key = {poke.id} />
        );
      }); 

      return (         
          <div id = "PokeTable">
            {cards}
          </div>
      );
    }
  }

// PokeDex is the meat and potatoes of the main section. The specs were not clear on implementation so I adjusted based on what I thought might be best.
// I based mobile v. desktop on the width of the screen as that worked best for my testing environment.

class PokeDex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      width: window.innerWidth,
      pokemon: this.props.pokemon,
      filtered: [],
      page: parseInt(window.location.search.split('""').join("").split('&')[0].split('?page=').join("")),
      nextpage: parseInt(window.location.search.split('""').join("").split('&')[0].split('?page=').join("")) + 1,
      prevpage: parseInt(window.location.search.split('""').join("").split('&')[0].split('?page=').join("")) - 1,
      search: ""
    };
    this.handlechange = this.handlechange.bind(this);
    this.pagefilter = this.pagefilter.bind(this);
    this.pageup = this.pageup.bind(this);
    this.pageback = this.pageback.bind(this);
    this.handlesubmit = this.handlesubmit.bind(this);
    this.searchfilter = this.searchfilter.bind(this);
    this.handleWindowSizeChange = this.handleWindowSizeChange.bind(this);
}

pagefilter(page = this.state.page) {
  let pagenum = page;
  let currentpokemon = this.props.pokemon;
  let filteredpokemon = currentpokemon.filter( poke => {
    const pokeid = poke.id;
    const targetbot = (pagenum * 20) - 20;
    if (pokeid > targetbot && pokeid <= targetbot + 20){
      return pokeid
    };
  })
  this.setState ({
    filtered: filteredpokemon
  });   
}

searchfilter(search = this.state.search) {
  let currentpokemon = [];
  let filteredpokemon = [];
  if (search !== ""){
    currentpokemon = this.props.pokemon;
    filteredpokemon = currentpokemon.filter( poke=> {
      const lcpoke = poke.name.toLowerCase();
      const filter = search.toLowerCase();
      return lcpoke.includes(filter);
    });}
    else {
    filteredpokemon = this.props.pokemon;
    }
    this.setState ({
      filtered: filteredpokemon
    }); 
}

pageup() {
  if (this.state.page !== 28) {
  this.pagefilter(this.state.page + 1);
  this.setState ((state) => ({
    page: state.page + 1,
    nextpage: state.page + 2,
    prevpage: state.page
  }));}
  else {
    this.setState ((state) => ({
      page: 28,
      nextpage: 28,
      prevpage: 27
    }));     
  }
  
}

pageback() {
  if (this.state.page !== 1) {
  this.pagefilter(this.state.page - 1);
  this.setState ((state) => ({
    page: state.page - 1,
    nextpage: state.page,
    prevpage: state.page - 2 
  }));}
  else {
    this.setState ((state) => ({
      page: 1,
      nextpage: 2,
      prevpage: 1
    }));     
  }
}

handleWindowSizeChange() {
  this.setState ({ width: window.innerWidth});
}

componentDidMount() {
  window.addEventListener('resize', this.handleWindowSizeChange);
  let search = window.location.search.split('""').join("").split('&')[1];
  this.pagefilter();
  if (search){
    this.searchfilter(window.location.search.split('""').join("").split('&')[1].split('search=').join(""));
    this.setState({search: window.location.search.split('""').join("").split('&')[1].split('search=').join("")});
  };
}

handlesubmit(event) {
  event.preventDefault();
  var newurl = window.location.protocol + "//" + window.location.host + window.location.pathname + `?page=${this.state.page}` + `&search=${this.state.search}`;
  window.history.pushState({path:newurl},'',newurl);
  this.searchfilter();
}

handlechange(names) {
  this.setState({search: names.target.value});
  event.preventDefault();
}

  render() {
    const isMobile = this.state.width <= 500;
    if (document.location.search === "") 
      {document.location.search = "?page=1"};
    if (isMobile){
      return (
        <div id= "PokeDex">
          <form onSubmit = {this.handlesubmit} >
          <span className = "magnifying-glass" />
          <input type="text" id = "searchbar" className = "input" value={this.state.search} onChange = {this.handlechange} placeholder="Search Pok&eacute;dex" />
          </form>
          
          <PokeTable pokemon = {this.state.filtered} mobile = {isMobile} />
          <span id= "footer">
          <Link to={`/?page=${this.state.prevpage}`} onClick = {this.pageback} id = "backarrow"></Link>
          <Link to={`/?page=${this.state.nextpage}`} onClick = {this.pageup} id = "frontarrow"></Link>
          </span>
        </div>
    );}
    else {
      return (
        <div id= "PokeDex">
          <div id= "header">
            <Link to={`/?page=${this.state.prevpage}`} onClick = {this.pageback} className = "circle"><span id = "desktopbackarrow" /></Link>
            <form onSubmit = {this.handlesubmit} >
            <span className = "dtmagnifying-glass" />
            <input type="text" id = "dtsearchbar" className = "input" value={this.state.search} onChange = {this.handlechange} placeholder="Pok&eacute;dex!" />
            </form>
            <Link to={`/?page=${this.state.nextpage}`} onClick = {this.pageup} className = "circle"><span id = "desktopfrontarrow" /></Link>
          </div>
          <PokeTable pokemon = {this.state.filtered} mobile = {isMobile} />
        </div>
      )}
    }
}

document.addEventListener("DOMContentLoaded", () => {
  Promise.all([PokemonPull(1),PokemonPull(2),PokemonPull(3),PokemonPull(4),PokemonPull(5),PokemonPull(6),PokemonPull(7),PokemonPull(8),PokemonPull(9),PokemonPull(10),PokemonPull(11),PokemonPull(12),PokemonPull(13),PokemonPull(14),PokemonPull(15),PokemonPull(16),PokemonPull(17),PokemonPull(18),PokemonPull(19),PokemonPull(20),PokemonPull(21),PokemonPull(22),PokemonPull(23),PokemonPull(24),PokemonPull(25),PokemonPull(26),PokemonPull(27),PokemonPull(28),PokemonPull(29),PokemonPull(30),PokemonPull(31),PokemonPull(32),PokemonPull(33),PokemonPull(34),PokemonPull(35),PokemonPull(36),PokemonPull(37)]).then ((response) => {
    var pokemon = [];
    response.forEach((page) => {
      pokemon = pokemon.concat(page.data);
    })
    window.POKEMON = pokemon; 
    ReactDOM.render(
      <Router>
        <Switch>
          <Route exact path = '/'>
            <PokeDex pokemon = {POKEMON} />
          </Route>
          <Route path = "/id/">
             <Pokemon_Zoom /></Route>
        </Switch>
      </Router>,
  document.getElementById('root'))})
})

export {PokeDex}