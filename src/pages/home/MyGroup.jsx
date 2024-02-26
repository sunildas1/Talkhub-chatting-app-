import React from 'react'
import Groupcard from '../../components/home/Groupcard'
import './home.css'
import Image from '../../utilities/Image'

const MyGroup = () => {
  return (
    <Groupcard cardtitle="My Groups">
        <div className='groupmain'> 
           <div className="groupitem">
              <div className="friendimg">
                <Image source="" alt=""/>
              </div>
              <div className='friendinfo'>
                <div className='groupname'>
                  <h4>Sunil</h4>
                  <p>Hi.....</p>
                </div>
                  <p>Today, 8:56pm</p>
              </div>
           </div>
           <div className="groupitem">
              <div className="friendimg">
                <Image source="" alt=""/>
              </div>
              <div className='friendinfo'>
                <div className='groupname'>
                  <h4>Sunil</h4>
                  <p>Hi.....</p>
                </div>
                  <p>Today, 8:56pm</p>
              </div>
           </div>
           <div className="groupitem">
              <div className="friendimg">
                <Image source="" alt=""/>
              </div>
              <div className='friendinfo'>
                <div className='groupname'>
                  <h4>Sunil</h4>
                  <p>Hi.....</p>
                </div>
                  <p>Today, 8:56pm</p>
              </div>
           </div>
           <div className="groupitem">
              <div className="friendimg">
                <Image source="" alt=""/>
              </div>
              <div className='friendinfo'>
                <div className='groupname'>
                  <h4>Sunil</h4>
                  <p>Hi.....</p>
                </div>
                  <p>Today, 8:56pm</p>
              </div>
           </div>
           <div className="groupitem">
              <div className="friendimg">
                <Image source="" alt=""/>
              </div>
              <div className='friendinfo'>
                <div className='groupname'>
                  <h4>Sunil</h4>
                  <p>Hi.....</p>
                </div>
                  <p>Today, 8:56pm</p>
              </div>
           </div>
        </div>
    </Groupcard>
  )
}

export default MyGroup
