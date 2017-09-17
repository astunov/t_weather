import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { removeCity, fetchCity } from '../../actions/index'
import { getCurrentGeoPosition } from '../../helpers'
import Chart from '../../components/chart'
import GoogleMap from '../../components/google_map'
import { FETCH_CURRENT_CITY } from '../../actions/types'

class WeatherList extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    getCurrentGeoPosition()
      .then(response => {
        const lat = response.coords.latitude
        const lon = response.coords.longitude
        this.props.fetchCity(
          {
            lat,
            lon
          },
          FETCH_CURRENT_CITY
        )
      })
      // probably we don't need to handle errors here
      .catch(err => console.log(err))
  }

  onCityRemove = id => {
    this.props.removeCity(id)
  }

  renderCities = cityData => {
    if (!cityData || cityData.err) return false

    const { id, city: { name, coord: { lon, lat } } } = cityData
    const temps = cityData.list.map(weather => weather.main.temp)

    return (
      <tr key={id}>
        <td>
          {name}
        </td>
        <td className="map">
          <GoogleMap lon={lon} lat={lat} />
        </td>
        <td> <Chart data={temps} color={'red'} /></td>
        <td />
        <td>
          {id !== 'currentCity' &&
            <button
              type="button"
              className="btn btn-danger"
              onClick={event => this.onCityRemove(id)}>
              Remove
            </button>}
        </td>
      </tr>
    )
  }

  render() {
    return (
      <table className="table table-hover">
        <thead>
          <tr>
            <th width="200">City</th>
            <th width="300">Map</th>
            <th width="300">Tempeture °C</th>
            <th />
            <th width="100" />
          </tr>

        </thead>
        <tbody>
          {this.props.cities.map(this.renderCities)}
        </tbody>
      </table>
    )
  }
}

function mapStateToProps({ cities: { currentCity, queryCities } }) {
  return { cities: [currentCity, ...queryCities] }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ removeCity, fetchCity }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(WeatherList)
