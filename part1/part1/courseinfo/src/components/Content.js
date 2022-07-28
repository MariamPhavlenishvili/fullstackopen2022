import React from 'react'
import Part from "./Part"

const Content = (props) => (
    <div>
        {props.parts.map((data, index) => <Part key={index} data={data} />)}
    </div>
)

export default Content