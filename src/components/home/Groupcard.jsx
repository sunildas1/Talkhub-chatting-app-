import React from 'react'
import './groupcard.css'
import { PiDotsThreeVerticalBold } from "react-icons/pi";


const Groupcard = ({children,cardtitle}) => {
  return (
    <div className='groupcard'>
       <div className='group_heading'>
          <h4>{cardtitle}</h4>
          <div className="dots">
            <PiDotsThreeVerticalBold />
          </div>
       </div>
        {children}
    </div>
  )
}

export default Groupcard