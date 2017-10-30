import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class Editor extends Component {
  constructor() {
    super()
    this.state = {
      content: '<h1>React.js 小书</h1>'
    }
  }

  render () {
    return (
      <div
        className='editor-wrapper'
        dangerouslySetInnerHTML={{__html: this.state.content}} />
    )
  }
}

ReactDOM.render(
  <Editor />
  ,document.getElementById('root')
)
