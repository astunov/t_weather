import React, { Component } from 'react'
import { connect } from 'react-redux'
import { v4 } from 'uuid'
import { bindActionCreators } from 'redux'
import { removeCity, fetchCity } from '../../actions/index'
import { getCurrentGeoPosition } from '../../helpers'

class WeatherList extends Component {
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    getCurrentGeoPosition()
      .then(response =>
        this.props.fetchCity({
          lat: response.coords.latitude,
          lon: response.coords.longitude
        })
      )
      .catch(err => console.log(err).message)
  }

  onCityRemove = id => {
    this.props.removeCity(id)
  }

  renderCities = cityData => {
    if (!cityData || cityData.err) return false

    const { city: { name, id } } = cityData
    const key = v4()

    return (
      <tr key={id}>
        <td>
          {name}
        </td>
        <td>
          <button
            type="button"
            className="btn btn-danger"
            onClick={e => this.onCityRemove(id)}>
            Remove
          </button>
        </td>
      </tr>
    )
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th>City</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {this.props.weather.map(this.renderCities)}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps({ weather }) {
  return { weather }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeCity, fetchCity }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherList)
