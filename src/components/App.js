import {Component, html, createElement} from 'brahmos'

import Header from './Header'
import MainSection from './MainSection'

const initialState = [
  {
    text: 'Brahmos TodoMVC',
    completed: false,
    id: 0
  }
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: initialState,
      gameID: null,
      player: 0
    }
  }

  addTodo = (text) => {
    const todos = [
      {
        id: this.state.todos.reduce((maxId, todo) => Math.max(todo.id, maxId), -1) + 1,
        completed: false,
        text: text
      },
      ...this.state.todos
    ]
    this.setState({todos})
  }

  deleteTodo = (id) => {
    const todos = this.state.todos.filter(todo => todo.id !== id)
    this.setState({todos})
  }

  editTodo = (id, text) => {
    const todos = this.state.todos.map(todo =>
      todo.id === id ? {...todo, text} : todo
    )
    this.setState({todos})
  }

  completeTodo = (id) => {
    const todos = this.state.todos.map(todo =>
      todo.id === id ? {...todo, completed: !todo.completed} : todo
    )
    this.setState({todos})
  }

  completeAll = () => {
    const areAllMarked = this.state.todos.every(todo => todo.completed)
    const todos = this.state.todos.map(todo => {
      return {...todo, completed: !areAllMarked}
    })
    this.setState({todos})
  }

  clearCompleted = () => {
    const todos = this.state.todos.filter(todo => todo.completed === false)
    this.setState({todos})
  }

  actions = {
    addTodo: this.addTodo,
    deleteTodo: this.deleteTodo,
    editTodo: this.editTodo,
    completeTodo: this.completeTodo,
    completeAll: this.completeAll,
    clearCompleted: this.clearCompleted
  }

  render() {
    return(
      <div>
        <div className="todoapp">
          <Header addTodo={this.actions.addTodo} />
          <MainSection todos={this.state.todos} actions={this.actions} />
        </div>
      	<p align="center"><a href="https://github.com/s-yadav/brahmos-todo-mvc">Todo MVC</a> Built with <a href="https://github.com/s-yadav/brahmos">Brahmos</a></p>
      </div>
    )
  }
}

export default App
