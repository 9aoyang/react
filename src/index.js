import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

const users = [
  { username: 'Jerry', age: 21, gender: 'male' },
  { username: 'Tomy', age: 22, gender: 'male' },
  { username: 'Lily', age: 19, gender: 'female' },
  { username: 'Lucy', age: 20, gender: 'female' }
]

class User extends Component {
  render () {
    const { user: {
      username,
      age,
      gender
    } } = this.props
    return (
      <div>
        <div>name: {username}</div>
        <div>age: {age}</div>
        <div>gender: {gender}</div>
        <hr/>
      </div>
    )
  }
}

class Index extends Component {
  render () {
    return (
      <div>
        { users.map( (user, i) => <User key={i} user={user}/> ) }
      </div>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
)


