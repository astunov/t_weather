import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import { removeCity, fetchCity } from '../../actions/index'
import { getCurrentGeoPosition } from '../../helpers'
import Chart from '../../components/chart'
import GoogleMap from '../../components/google_map'

class WeatherList extends Component {
  constructor(props) {
    super(props)
  }
  // todo: probably not a best place for this logic
  componentWillMount() {
    getCurrentGeoPosition()
      .then(response => {
        const lat = response.coords.latitude
        const lon = response.coords.longitude
        this.props.fetchCity({
          lat,
          lon
        })
        // todo: use reselect
        const duplicateCity = this.props.weather.filter(item => {
          return (item.city.coord.lat = lat && item.city.coord.lon)
        })[0]
        this.props.removeCity(duplicateCity.id)
      })
      .catch(err => console.log(err))
  }

  onCityRemove = id => {
    this.props.removeCity(id)
  }

  renderCities = cityData => {
    if (!cityData || cityData.err) return false

    const { id, city: { coord: { lon, lat } } } = cityData
    const temps = cityData.list.map(weather => weather.main.temp)

    return (
      <tr key={id}>
        <td>
          <GoogleMap lon={lon} lat={lat} />
        </td>
        <td> <Chart data={temps} color={'red'} /></td>
        <td />
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
            <th width="300">City</th>
            <th width="300">Tempeture °C</th>
            <th />
            <th width="100" />
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
