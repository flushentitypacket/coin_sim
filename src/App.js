import React from 'react'
import {blockchainSizeAtTime} from './utils/calc'

export class App extends React.Component {
  state = {
    blockSize: 1024,
    blockDifficulty: 60,
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Block size (bytes)
            <input type='text' onChange={this.handleChangeBlockSize} value={this.state.blockSize} />
          </label>
          <label>
            Block difficulty (seconds)
            <input type='text' onChange={this.handleChangeBlockDifficulty} value={this.state.blockDifficulty} />
          </label>
        </form>

        <div>
          <p>1 year: {blockchainSizeAtTime(1 * 365.25 * 24 * 60 * 60, this.state.blockSize, this.state.blockDifficulty)}</p>
          <p>2 year: {blockchainSizeAtTime(2 * 365.25 * 24 * 60 * 60, this.state.blockSize, this.state.blockDifficulty)}</p>
          <p>4 year: {blockchainSizeAtTime(4 * 365.25 * 24 * 60 * 60, this.state.blockSize, this.state.blockDifficulty)}</p>
          <p>8 year: {blockchainSizeAtTime(8 * 365.25 * 24 * 60 * 60, this.state.blockSize, this.state.blockDifficulty)}</p>
          <p>16 year: {blockchainSizeAtTime(16 * 365.25 * 24 * 60 * 60, this.state.blockSize, this.state.blockDifficulty)}</p>
        </div>
      </div>
    )
  }

  handleChangeBlockSize = (node) => this.setState({blockSize: node.target.value})
  handleChangeBlockDifficulty = (node) => this.setState({blockDifficulty: node.target.value})
}
