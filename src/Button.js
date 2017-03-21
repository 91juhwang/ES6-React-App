import React from 'react'

class Button extends React.Component {
  render() {
    return (
      <Widget>
        I <Heart /> React 
      </Widget>
    )
  }
}

const Widget = (props) => 
  <button>{props.children}</button>

class Heart extends React.Component {
  render() {
    return <span>&hearts;</span>
  }
}

export default Button