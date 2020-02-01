import React from 'react'

function TimerDetails(props) {

  console.log( '*** props.match: ', props.match );

  return (
    <div>
      <h1>{props.match.params.id}</h1>
			
    </div>
  )
}

export default TimerDetails
