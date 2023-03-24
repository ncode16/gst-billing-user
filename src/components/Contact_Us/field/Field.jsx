import React from 'react'
import './Field.css'

const Field = ({title,width,height,astrich,textarea,func}) => {
    const fieldStyle = {
        width: `${width}%`,
        height: `${height}vw`,
    }

  return (
    <div className='field' style={fieldStyle}>
        <div className='fieldTitleContainer'>
            <div className='fieldTitle'>
                { astrich && <span>*</span> }
                <span>{title}</span>
            </div>
        </div>
        <div className='fieldAreaContainer'>
            <div className='fieldArea'>
                {
                     textarea ? <textarea onChange={func}  className='fieldAreaInput textarea'></textarea> :
                    <input onChange={func} className='fieldAreaInput' type='text' required/>
                }
            </div>
        </div>
    </div>
  )
}

export default Field