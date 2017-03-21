import React from 'react'
import ReactDOM from 'react-dom'

class IncrementButton extends React.Component {
  constructor() {
    super();
    this.state = {val: 0}
    this.update = this.update.bind(this)
  }
  update() {
    this.setState({val: this.state.val + 1})
  }
  componentWillMount() {
    console.log("will mount")
    this.setState({m: 2})
  }
  componentDidMount() {
    console.log("did mount. Happends after render")
    this.inc = setInterval(this.update, 1000)
  }
  render() {
    console.log('render')
    return (
      <button onClick={this.update}>
        {this.state.val * this.state.m}
      </button>
    )
  }
}
// Wrapper that renders the Increment button
class Wrapper extends React.Component {
  constructor(props) {
    super(props);
    this.mount = this.mount.bind(this)
    this.unmount = this.unmount.bind(this)
  }
  mount() {
    console.log('mount')
    ReactDOM.render(<IncrementButton />, document.getElementById('a'))
  }
  unmount() {
    console.log('Unmount')
    ReactDOM.unmountComponentAtNode(document.getElementById('a'))
    clearInterval(this.inc)
  }
  render() {
    return (
      <div>
        <button onClick={this.mount}>Mount</button>
        <button onClick={this.unmount}>Unmount</button>
        <div id="a"></div>
      </div>
    )
  }
}
export default Wrapper
