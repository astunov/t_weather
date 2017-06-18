import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchWeather } from '../../actions/index'

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = { query: '' }
  }
  onInputChange = e => {
    this.setState({ query: e.target.value })
  }
  onFormSubmit = e => {
    e.preventDefault()

    this.props.fetchWeather(this.state.query)
    this.setState({ query: '' })
  }
  render() {
    return (
      <form className="input-group" onSubmit={this.onFormSubmit}>
        <input
          className="form-control"
          type="text"
          value={this.state.query}
          onChange={this.onInputChange}
          placeholder="Search for a city"
        />
        <span className="input-group-btn">
          <button className="btn btn-default>">Search</button>
        </span>
      </form>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchWeather }, dispatch)
}

export default connect(null, mapDispatchToProps)(SearchBar)
