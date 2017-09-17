export const getCurrentGeoPosition = options => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}
export const convertKelvinToCelsius = kelvin => Math.round(kelvin - 273.15)
