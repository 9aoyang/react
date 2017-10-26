import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import './index.css'

class LikeButton extends Component {

  constructor() {
    super()
    this.state = { isLiked: false }
  }

  handleOnClickButton () {
    this.setState ({
      isLiked : !this.state.isLiked
    })
  }

  render () {
    return (
      <button onClick={this.handleOnClickButton.bind(this)}>
        {this.state.isLiked ? this.props.likedText : this.props.unlikedText} 👍
      </button>
    )
  }
}

LikeButton.defaultProps = {
  likedText: '取消',
  unlikedText: '点赞'
}

class Index extends Component {
  constructor () {
    super()
    this.state = {
      likedText: '取消',
      unlikedText: '点赞'
    }
  }

  handleOnClickChange () {
    this.setState({
      likedText: '已赞',
      unlikedText: '赞'
    })
  }

  render () {
    return (
      <div>
        <LikeButton
          likedText = {this.state.likedText}
          unlikedText = {this.state.unlikedText} />
        <button onClick={this.handleOnClickChange.bind(this)}>修改点赞文案</button>
      </div>
    )
  }
}

ReactDOM.render(
  <Index />,
  document.getElementById('root')
)
