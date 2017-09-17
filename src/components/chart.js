import React from 'react'
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine
} from 'react-sparklines'
import { convertKelvinToCelsius } from '../helpers'

function average(temp) {
  const sum = temp.reduce(function(a, b) {
    return a + b
  })

  return convertKelvinToCelsius(sum / temp.length)
}

export default props => {
  return (
    <div>
      <Sparklines height={270} width={270} data={props.data}>
        <SparklinesLine color={props.color} />
        <SparklinesReferenceLine type="avg" />
      </Sparklines>
      <div>Average {average(props.data)} °C</div>
    </div>
  )
}
