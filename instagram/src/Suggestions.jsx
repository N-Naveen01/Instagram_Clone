import React, { useEffect, useState } from 'react'

function Suggestions() {

  const[profile,setprofile]=useState(null);
  const[suggestion,setsuggestion]=useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/profile')
    .then(data => data.json())
    .then(data => setprofile(data))
    .catch(err => console.log(err))

    fetch('http://localhost:3001/suggestions')
    .then(data => data.json())
    .then(data => setsuggestion(data))
    .catch(err => console.log(err))

  },[]);

  return (
    <div>
      <div className="suggestions w-75 m-4">
          {profile ? 
          <div className="d-flex">
            <img className="dp rounded-circle" src={profile.profile_pic} alt="Profile pic" />
            <h5>{profile.username}</h5>
            <small className="ms-auto text-primary">Switch</small>
          </div>
          : <p>Loading...</p> }
      </div>
      
    </div>
  )
}

export default Suggestions