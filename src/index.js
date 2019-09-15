import './index.css'

import React from 'react'
import ReactDOM from 'react-dom'

function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      <font color={props.color}>{props.value}</font>
    </button>
  )
}

class Board extends React.Component {
  renderSquare(i) {
    let color
    if (this.props.line && this.props.line.includes(i)) {
      color = 'red'
    } else {
      color = 'black'
    }
    return (
      <Square
        value={this.props.squares[i]}
        key={i}
        color={color}
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  renderRow(cur, cols) {
    const row = []
    for (let i = 0; i < cols; i++) {
      row.push(this.renderSquare(cols * cur + i))
    }
    return row
  }

  renderBoard(rows, cols) {
    const boardElement = []
    for (let i = 0; i < rows; i++) {
      boardElement.push(
        <div className="board-row" key={'row-' + i}>
          {this.renderRow(i, cols)}
        </div>
      )
    }
    return boardElement
  }

  render() {
    return <div>{this.renderBoard(3, 3)}</div>
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          coordinate: Array(2).fill(null)
        }
      ],
      xIsNext: true,
      stepNumber: 0,
      order: 1
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
    const current = history[history.length - 1]
    const squares = current.squares.slice()

    if (calculateWinner(squares).winner || squares[i]) {
      return
    }
    const coordinate = [~~(i / 3) + 1, (i % 3) + 1]
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat({
        squares,
        coordinate
      }),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    })
  }

  handleOrder() {
    this.setState({
      order: this.state.order ? 0 : 1
    })
  }

  render() {
    const history = this.state.history
    const order = this.state.order
    const current = history[this.state.stepNumber]
    const result = calculateWinner(current.squares)
    const winner = result.winner
    const line = result.line
    const moves = history.map((step, move) => {
      const [x, y] = step.coordinate
      const desc = move
        ? `${move}. Go to move [${x}, ${y}]`
        : '0. Go to game start'

      if (move === this.state.stepNumber) {
        return (
          <li key={move} className="current">
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        )
      } else {
        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        )
      }
    })

    let status
    if (winner) {
      status = 'Winner: ' + winner
    } else {
      if (this.state.stepNumber === 9) {
        status = 'Draw'
      } else {
        status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O')
      }
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            line={line}
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{order ? moves : moves.reverse()}</ol>
          <button onClick={() => this.handleOrder()}>
            {order ? '降序' : '升序'}
          </button>
        </div>
      </div>
    )
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'))

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i]
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return {
        winner: squares[a],
        line: lines[i]
      }
    }
  }
  return {
    winner: null,
    line: null
  }
}
