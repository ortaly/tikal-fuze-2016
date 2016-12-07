import React, { Component } from 'react'
import State from '../State.js'
import NavBar from '../components/NavBar.jsx'
import Table from '../components/Table.jsx'

const tableHeaders = [
  {
    id: 'firstName',
    title: 'Movie Title'
  }, {
    id: 'lastName',
    title: 'Last Name'
  }, {
    id: 'company',
    title: 'Company'
  }, {
    id: 'email',
    title: 'Email'
  }
]

export default class APP extends Component {
  constructor(props) {
    super(props)
    this._onUpdate = state => this.forceUpdate()
    this._onSearch = event => State.get().app.set('searchString', event.target.value)
    State.trigger('loadResources')
  }

  _processRows() {
    const searchString = State.get().app.searchString;
    return State.get().rawResources
      .map((row) => tableHeaders.map((header) => row[header.id].toString()))
      .filter(row => row.some((cell => cell.includes(searchString) || !searchString)))
  }

  render() {
    const state = State.get().app
    return (
      <div>
        <NavBar />
        <div>
          <div className="input-field">
            <i className="material-icons prefix">search</i>
            <input id="icon_prefix" 
              type="text" 
              className="validate" 
              value={state.searchString} 
              onChange={this._onSearch} />
            <label htmlFor="icon_prefix">Search</label>
          </div>
          <Table headers={tableHeaders} rows={this._processRows()} marker={state.searchString} />
        </div>
      </div>
    )
  }
  componentDidMount() {
    State.get().getListener().on('update', this._onUpdate)
  }
  componentWillUnmount() {
    State.get().getListener().off('update', state => this._onUpdate)
  }
}