import React from 'react'
import {
  Sparklines,
  SparklinesLine,
  SparklinesReferenceLine
} from 'react-sparklines'

function average(data) {
  let sum = data.reduce(function(a, b) {
    return a + b
  })

  return Math.round(sum / data.length - 273.15)
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
