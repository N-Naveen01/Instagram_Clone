import axios from 'axios';
import React, { useEffect, useState } from 'react'

function Suggestions() {

  const[profile,setprofile]=useState(null);
  const[suggestion,setsuggestion]=useState([]);
  //const [followed, setFollowed] = useState([]);

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

  /*const handleFollowToggle = (id) => {
    setFollowed((prev) =>
      prev.includes(id) ? prev.filter((fid) => fid !== id) : [...prev, id]
    );
  }; */

  const handlefollow = async (id , username) => {
    axios.post('http://localhost:3001/followers', {"id" :id , "username":username})
    .then(alert('followed'))
    .catch(err => console.log(err))
  }

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

          <div className="d-flex">
            <p>Suggested for you</p>
            <b className="ms-auto">See All</b>
          </div>

          {suggestion.length > 0 ? (
            <div>
                {suggestion.map((suggest) => (
                    <div className="" key="suggest.id">
                        <div className="d-flex">
                            <img className="dp rounded-circle" src={suggest.profile_pic} alt="Profile pic" />
                            <h5>{suggest.username}</h5>
                            <p className="text-primary ms-auto" style={{ cursor: 'pointer' }} onClick={() => {handlefollow(suggest.id,suggest.username)}}>Follow</p>
                            {/*<p
                              className="text-primary ms-auto"
                              style={{ cursor: 'pointer' }}
                              onClick={() => handleFollowToggle(suggest.id)}
                            >
                              {followed.includes(suggest.id) ? 'Unfollow' : 'Follow'}
                            </p> */}
                        </div>
                        
                    </div>
                ))}
            </div>
        ) : (
            <div>Loading posts...</div>
        )
    }
      </div>
      
    </div>
  )
}

export default Suggestions