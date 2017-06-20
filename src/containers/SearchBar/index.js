import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { fetchCity, clearError } from '../../actions/index'
import Autocomplete from 'react-google-autocomplete'

class SearchBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      query: '',
      lat: '',
      lon: '',
      formError: {
        message: ''
      }
    }
  }

  onInputChange = e => {
    this.setState({
      query: e.target.value
    })
  }

  onPlaceSelected = place => {
    if (place && place.formatted_address) {
      this.setState({
        query: place.formatted_address,
        lat: place.geometry.location.lat(),
        lon: place.geometry.location.lng(),
        formError: { message: '' }
      })
    } else {
      this.setState({
        formError: {
          message: 'There is no city. Try again'
        }
      })
    }
  }

  onFormSubmit = e => {
    const { lat, lon } = this.state
    e && e.preventDefault()
    if (lat && lon) {
      this.props.error && this.props.clearError()
      this.props.fetchCity({ lat, lon })
      this.setState({ query: '', lat: '', lon: '' })
    }
  }

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <div className="form-group">
          <Autocomplete
            className="form-control"
            value={this.state.query}
            onChange={this.onInputChange}
            onPlaceSelected={place => {
              this.onPlaceSelected(place)
              this.onFormSubmit()
            }}
            types={['(regions)']}
          />

        </div>

        {this.state.formError.message &&
          <div className="has-error"> {this.state.formError.message} </div>}

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
