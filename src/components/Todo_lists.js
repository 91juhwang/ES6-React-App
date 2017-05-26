import React from 'react'
import ReactDOM from 'react-dom'

class TodoLists extends React.Component{
  constructor() {
    super()
  }

  render() {
    return(
      <div>
        <ul>
          <li>List 1</li>
          <li>List 2</li>
          <li>List 3</li>
        </ul>
      </div>
    )
  }
}

export default TodoLists