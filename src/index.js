import React from 'react';
import ReactDOM from 'react-dom';
import {Pokedex} from 'pokeapi-js-wrapper';

var dex = new Pokedex({
  protocol: 'https'
});

class Pokemon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: false,
      name: '',
      imageUrl: null
    };

    dex.getPokemonByName(props.id).then((response) => {
      this.setState({
        loaded: true,
        name: response.name,
        imageUrl: response.sprites.front_default
      });
    });
  }

  render() {
    if (this.state.loaded) {
      return (
        <div>
          <span>{this.state.name}</span>
          <img src={this.state.imageUrl} />
        </div>
      );
    } else {
      return <span>Loading...</span>;
    }
  }
}

class PokemonList extends React.Component {
  constructor() {
    super();
    this.state = {
      pokemons: []
    };
  }

  addPokemon(id) {
    this.setState({
      pokemons: this.state.pokemons.concat([id])
    });
  }

  render() {
    return (
      <div className="pokemon-list">
        <h1>Pokemon list</h1>
        <ul>
          {this.state.pokemons.map((e) => (<li key={e}><Pokemon id={e} /></li>))}
        </ul>
      </div>
    );
  }
}

class PokemonForm extends React.Component {
  addPokemon() {
    this.props.list.addPokemon(this.textField.value);
  }

  render() {
    return (
      <div>
        <input type="text" ref={(e) => {
          this.textField = e;
        }} />
        <button onClick={this.addPokemon.bind(this)}>Add</button>
      </div>
    );
  }
}

const list = ReactDOM.render(
  <PokemonList />,
  document.getElementById('list-container')
);

ReactDOM.render(
  <PokemonForm list={list} />,
  document.getElementById('form-container')
);

list.addPokemon('charmander');
list.addPokemon('bulbasaur');
