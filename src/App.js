import React from 'react'
import Button from './Button'

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      txt: 'This is the state text',
      currentEvent: '---'
    }
    this.update = this.update.bind(this)
    this.updateEvent = this.updateEvent.bind(this)
  }

  update(e) {
    this.setState({txt: e.target.value})
  }

  updateEvent(e) {
    this.setState({currentEvent: e.type})
  }

  render() {
    // Reusing Widget component in the parent component
    return (
      <div>
        <h1>{this.state.txt} - {this.props.cat}</h1>
        <Widget update={this.update} updateEvent={this.updateEvent}/>
        <Widget update={this.update} updateEvent={this.updateEvent}/>
        <Widget update={this.update} updateEvent={this.updateEvent}/>
        <Button />
        <h1>{this.state.currentEvent}</h1>
      </div>
    )
  }
}

// Making a stateless component, the lowest child
const Widget = (props) =>
  <input type="text" 
    onChange={props.update} 
    onCopy={props.updateEvent}
    onCut={props.updateEvent}
    onPaste={props.updateEvent}
    cols="30"
    rows="10" />

App.propTypes = {
  txt: React.PropTypes.string.isRequired,
  cat: React.PropTypes.number.isRequired
} 

export default App