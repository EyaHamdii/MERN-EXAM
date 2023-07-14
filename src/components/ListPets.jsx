import React, { useState, useEffect} from 'react'
import axios from 'axios'
import { Link ,useNavigate} from 'react-router-dom'

const ListPets = () => {
    const [pets, setPets] = useState([])
    useEffect(() => {
      axios.get("http://localhost:8000/api/pets")
        .then(res => {
          console.log(res.data)
          setPets(res.data)
        })
        .catch(err => console.log(err))
    }, [])
    const navigate = useNavigate();
    const Logout = () => {
      navigate("/");
  };

      // Sort pets alphabetically
      pets.sort((a, b) => a.type.localeCompare(b.type));
  return (
    <div className="container">
      
      <div >
      <button className="btn btn-danger  m-3 p-2" onClick={Logout}>LOGOUT</button>
        <h1>Pet Shelter</h1>
        <h2>🐾 These pets are looking for a good home 🐾</h2></div>
      <div>
       <button className="btn btn-info"><Link to={`/pets/new`}>Add a pet to the shelter </Link></button> 
      </div>
      
      <div>
        <table className="table">
          <thead>
            <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Actions</th></tr>
          </thead>
          <tbody>
            {pets.map((onepet) => {
              return (
                <tr key={onepet._id}>
                  <td>{onepet.name}</td>
                  <td>{onepet.type}</td>
                  <td><button className="btn btn-info"><Link to={`/pets/${onepet._id}`}>Details </Link></button >|<button className="btn btn-info"><Link to={`/pets/${onepet._id}/edit`}>Edit </Link></button> </td>
                </tr>
              )
            })}
          </tbody>

        </table>
      </div>


    </div>
  )
}

export default ListPets