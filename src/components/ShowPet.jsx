import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const ShowPet = () => {
  const [pet, setPet] = useState({});
  const { id } = useParams();
  const initialLikes = JSON.parse(localStorage.getItem('likes')) || {};
  const [likes, setLikes] = useState(initialLikes);

  const incrementLikes = (petId) => {
    setLikes((prevLikes) => ({
      ...prevLikes,
      [petId]: (prevLikes[petId] || 0) + 1,
    }));
  };

  useEffect(() => {
    localStorage.setItem('likes', JSON.stringify(likes));
  }, [likes]);

  useEffect(() => {
    axios
      .get('http://localhost:8000/api/pets/' + id)
      .then((res) => {
        console.log(res.data);
        setPet(res.data);
      })
      .catch((err) => console.error(err));
  }, [id, setPet]);

  const navigate = useNavigate();

  const adoptPet = (id) => {
    axios
      .delete("http://localhost:8000/api/pets/" + id)
      .then((res) => {
        navigate("/pets");
        console.log(res, "success pet adopted");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className='container'>
      <div>
        <h1>Pet Shelter</h1>
        <p>Details about {pet.name}</p>
      </div>
      <div>
        <Link to={`/pets`}> Back to Home </Link>
      </div>
      <div>
        <button onClick={() => adoptPet(`${pet._id}`)}>Adopt {pet.name}</button>
      </div>
      <div>
        <h5>Pet type:</h5>
        {pet.type}
        <h5>Description:</h5> {pet.description}
        <h5>Skills:</h5>
        {pet.skills && pet.skills.length > 0 ? (
          <ul>
            {pet.skills.map((skill, index) => {
              return skill ? <li key={index}>{skill}</li> : "";
            })}
          </ul>
        ) : (
          <p>No skills available</p>
        )}
      </div>
      <div>
        Likes: {likes[pet._id] || 0}
        <button onClick={() => incrementLikes(pet._id)}>Like</button>
      </div>
    </div>
  );
};

export default ShowPet;
