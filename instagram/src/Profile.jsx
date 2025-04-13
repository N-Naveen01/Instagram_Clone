import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Profile() {

    const[profile,setprofile] = useState(null)

    const[followers , setfollowers] = useState([])

    const[unfollowed , setunfollowed] = useState(0)

    useEffect(()=>{
        axios.get('http://localhost:3001/profile')
        .then(data => setprofile(data.data))
        .catch(err => console.log(err))

        axios.get('http://localhost:3001/followers')
        .then(data => setfollowers(data.data))
        .catch(err => console.log(err))

    },[unfollowed])

    function HandleOnChange(e){
        setprofile(prev => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

    const HandleUpdate = async () => {
        axios.put('http://localhost:3001/profile',profile)
        .then(console.log("Updated"))
        .catch(err => {console.log(error)})
    }

    const handleunfollow = async (id) => {
        axios.delete(`http://localhost:3001/followers/${id}`)
        .then(alert('Unfollowed'))
        .then(setunfollowed(!unfollowed))
        .catch(err => console.log(err))
    }

  return (
    <div className="m-5">
        { profile ? ( 
            <div >
                <img className="profile rounded-circle" src={profile.profile_pic} alt="" />
                <h5>{profile.username}</h5>

                <input type="text"
                   value={profile.username}
                   name="username"
                   className="form-control my-4"
                   onChange={HandleOnChange}
                />

                <input type="text" 
                    name="profile_pic" 
                    value={profile.profile_pic}
                    className="form-control"
                    onChange={HandleOnChange}
                />

                <button className="btn btn-primary my-4" onClick={HandleUpdate}>Update</button>



            </div> ): (
           <div>
            Loading...
           </div> 
        )}
        <h4>My Followers</h4>
        {followers.length >0 ? (
            followers.map(follower => (
                <div key={follower.id} className="d-flex">
                    {follower.username}
                    <button className="btn btn-secondary my-2 ms-auto" 
                         onClick={()=> {handleunfollow(follower.id)}}>Un follow</button>
                </div>
            ))

        ):(
            <div>
                Loading followers...
            </div>
        )}
    </div>
  )
}

export default Profile