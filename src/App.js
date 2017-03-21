import React from 'react'
import Button from './Button'
import Wrapper from './IncrementButton'
import Items from './Items'

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
        <hr/>
        <Widget update={this.update} updateEvent={this.updateEvent}/>
        <hr/>
        <Widget update={this.update} updateEvent={this.updateEvent}/>
        <br/>
        <Button />
        <h1>{this.state.currentEvent}</h1>

        <Wrapper />

        <Items />
      </div>
    )
  }
}

// Making a stateless component, the lowest child
// props = <Widget update={this.update} updateEvent={updateEvent} />
// props.update is poinging to the update property not the function. 
// line 28~30 is where function update is defined by calling this.update
// onSomething is called synthetic Events in JavaScript
const Widget = (props) =>
  <input type="text" 
    onChange={props.update}
    onCopy={props.updateEvent}
    onCut={props.updateEvent}
    onPaste={props.updateEvent}
    onClick={props.updateEvent}
    cols="30"
    rows="10" />

export default App
