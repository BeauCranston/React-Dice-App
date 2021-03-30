import React, {useState, useEffect} from 'react'

// export function Slider({start, min, max, setState}){
//     return(
//         <div>
//             <input type='range' min={min} max={max} defaultValue={start} onChange={(event)=>{setState(event.target.value)}}/>
//         </div>
//     )
// }
export function Slider(props){
    return(
        <input type='range' {...props}/>
    )
}
export function DataListSlider({id, options, setState}){
    return(
        <div>
            <input type='range' list={id} onChange={(event)=>{setState(event.target.value)}}/>
            <datalist id={id}>
                {options.map((val, index)=>{
                    return <option value={val} key={index}></option>
                })}
            </datalist>
        </div>
    )
}