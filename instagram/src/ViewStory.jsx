import React, { useEffect, useState } from 'react'
import { useParams,Link, useNavigate } from 'react-router-dom'
import imageMap from './imageMap';

function ViewStory() {

    const {id,tot} = useParams();

    const [storyy,setstoryy] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        fetch(`http://localhost:3001/story/${id}`)
        .then(data => data.json())
        .then(data => setstoryy(data))
        .catch(error => console.log(error))
    },[id])

    if(id > tot || id<=0){
        navigate('/');
    }

  return (
    <div>
        {storyy ? <div className="d-flex justify-content-center align-items-center">
            <Link to={`http://localhost:5173/story/${Number(id)-1}/${tot}`} ><i class="bi bi-arrow-left-circle-fill"></i></Link>
            <img className="vh-100" src={imageMap[storyy.image]} alt="story" />
            <Link to={`http://localhost:5173/story/${Number(id)+1}/${tot}`}><i class="bi bi-arrow-right-circle-fill"></i></Link> 
        </div> :
        <div>   Loading... </div>}
    </div>
  )
}

export default ViewStory