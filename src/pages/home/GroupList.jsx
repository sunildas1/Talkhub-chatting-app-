import React from 'react'
import Groupcard from '../../components/home/Groupcard'
import './home.css'
import Image from '../../utilities/Image'

const GroupList = () => {
  return (
    <>
     <Groupcard cardtitle="Groups List">
        <div className='groupmain'> 
        <div className="groupitem">
            <div className="groupimg">
                <Image source="" alt=""/>
            </div>
            <div className='groupinfo'>
                <div className='groupname'>
                <h4>Sunil</h4>
                <p>Hi Guys, Wassup!</p>
                </div>
                <button className='join_btn'>Join</button>
            </div>
        </div>
        <div className="groupitem">
            <div className="groupimg">
                <Image source="" alt=""/>
            </div>
            <div className='groupinfo'>
                <div className='groupname'>
                <h4>Sunil</h4>
                <p>Hi Guys, Wassup!</p>
                </div>
                <button className='join_btn'>Join</button>
            </div>
        </div>
        <div className="groupitem">
            <div className="groupimg">
                <Image source="" alt=""/>
            </div>
            <div className='groupinfo'>
                <div className='groupname'>
                <h4>Sunil</h4>
                <p>Hi Guys, Wassup!</p>
                </div>
                <button className='join_btn'>Join</button>
            </div>
        </div>
        <div className="groupitem">
            <div className="groupimg">
                <Image source="" alt=""/>
            </div>
            <div className='groupinfo'>
                <div className='groupname'>
                <h4>Sunil</h4>
                <p>Hi Guys, Wassup!</p>
                </div>
                <button className='join_btn'>Join</button>
            </div>
        </div>
        <div className="groupitem">
            <div className="groupimg">
                <Image source="" alt=""/>
            </div>
            <div className='groupinfo'>
                <div className='groupname'>
                <h4>Sunil</h4>
                <p>Hi Guys, Wassup!</p>
                </div>
                <button className='join_btn'>Join</button>
            </div>
        </div>
        </div>
     </Groupcard>
    </>
  )
}

export default GroupList