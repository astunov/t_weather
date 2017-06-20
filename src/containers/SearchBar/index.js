import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchCity, clearError } from '../../actions/index'

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
    this.props.error && this.props.clearError()
    this.props.fetchCity({ name: this.state.query })
    this.setState({ query: '' })
  }
  render() {
    return (
      <form onSubmit={this.onFormSubmit}>

        <div className="input-group">
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
        </div>
        {this.props.error &&
          <div className="alert alert-danger" role="alert">
            {this.props.error.message}
          </div>}

      </form>
    )
  }
}

function mapStateToProps({ cities: { error } }) {
  return { error }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchCity, clearError }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar)
