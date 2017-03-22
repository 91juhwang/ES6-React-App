import React from 'react';

export default class Items extends React.Component {
  constructor(props) {
    super(props);
    this.state = {items: []}
    this.filter = this.filter.bind(this)
  }

  componentWillMount() {
    fetch( 'http://swapi.co/api/people/?format=json' )
      .then( response => response.json() )
      .then( ({results: items}) => this.setState({items}))
  }
  
  filter(e) {
    this.setState({filter: e.target.value})
  }

  render() {
    let items = this.state.items

    if (this.state.filter) {
      items = items.filter( item => 
        item.name.toLowerCase()
        .includes(this.state.filter.toLowerCase()))
    }

    return (
      <div>
        <hr/>
        <h3>Search for the Star Wars name in the below search bar</h3>
        <input type="text"
          onChange={this.filter} />

        {items.map(item => 
          <Person key={item.name} swPerson={item} />
        )}
      </div>
    )
  }
}

const Person = (props) => <h4>{props.swPerson.name}</h4>
