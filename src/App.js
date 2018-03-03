import React from 'react'
import {blockchainSizeAtTime} from './utils/calc'
import {AreaChart, XAxis, YAxis, CartesianGrid, Tooltip, Area} from 'recharts'
import {bitcoin, bitcoinCash, litecoin} from './presets'

const NUM_YEARS = 100

export class App extends React.Component {
  state = {
    blockSize: 1,
    blockDifficulty: 60,
  }

  render() {
    return (
      <div>
        <form>
          <label>
            Block size (megabytes)
            <input type='text' onChange={this.handleChangeBlockSize} value={this.state.blockSize} />
          </label>
          <label>
            Block difficulty (seconds)
            <input type='text' onChange={this.handleChangeBlockDifficulty} value={this.state.blockDifficulty} />
          </label>
        </form>

        <div>
          <AreaChart width={730} height={250} data={this.calcChartData()}
            margin={{top: 10, right: 30, left: 0, bottom: 0}}>
            <defs>
              <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorBitcoin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#82ca9d" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorBitcoinCash" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffd700" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ffd700" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorStorage" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#881111" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#881111" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorLitecoin" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ffd700" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#ffd700" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="name" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
            <Area type="monotone" dataKey="bitcoin" stroke="#82ca9d" fillOpacity={1} fill="url(#colorBitcoin)" />
            <Area type="monotone" dataKey="storage" stroke="#881111" fillOpacity={1} fill="url(#colorStorage)" />
            <Area type="monotone" dataKey="bitcoinCash" stroke="#ff9900" fillOpacity={1} fill="url(#colorBitcoinCash)" />
            <Area type="monotone" dataKey="litecoin" stroke="#ffd700" fillOpacity={1} fill="url(#colorLitecoin)" />
          </AreaChart>
        </div>
      </div>
    )
  }

  calcChartData = () => {
    return [...Array(NUM_YEARS).keys()].map((i) => ({
      name: i,
      uv: blockchainSizeAtTime(
        i * 365.25 * 24 * 60 * 60,
        this.state.blockSize,
        this.state.blockDifficulty,
      ) / 1000, // GB
      bitcoin: blockchainSizeAtTime(
        i * 365.25 * 24 * 60 * 60,
        bitcoin.blockSize,
        bitcoin.blockDifficulty,
      ) / 1000,
      bitcoinCash: blockchainSizeAtTime(
        i * 365.25 * 24 * 60 * 60,
        bitcoinCash.blockSize,
        bitcoinCash.blockDifficulty,
      ) / 1000,
      litecoin: blockchainSizeAtTime(
        i * 365.25 * 24 * 60 * 60,
        litecoin.blockSize,
        litecoin.blockDifficulty,
      ) / 1000,
      storage: 1600 + i * 200,
    }))
  }

  handleChangeBlockSize = (node) => this.setState({blockSize: node.target.value})
  handleChangeBlockDifficulty = (node) => this.setState({blockDifficulty: node.target.value})
}
