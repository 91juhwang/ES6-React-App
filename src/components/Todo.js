import React from "react"
import AddNewTask from "./Add_new_task"
import TodoLists from "./Todo_lists"

class Todo extends React.Component {
  constructor() {
    super()
  }

  render() {
    return(
      <div>
        <h1>To Do Application</h1>
        <AddNewTask />
        <TodoLists />
      </div>
    )
  }
}

export default Todo