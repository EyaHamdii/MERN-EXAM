import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'

const UpdatePet = () => {
  const { id } = useParams()
  const [pet, setPet] = useState({})
  const [skills, setSkills] = useState([])
  const nav = useNavigate()

  const [errors, setErrors] = useState([])
  const [errorObject, setErrorObject] = useState({})
  useEffect(() => {
    axios.get('http://localhost:8000/api/pets/' + id)
        .then(res => {
            console.log("============",res.data.skills);
            setPet(res.data)
            setSkills(res.data.skills)
        })
        .catch(err => {
            console.error(err)
        });
}, [id, setPet]);

useEffect(() => {
  console.log("skills:", skills);
}, [skills]);

  const handleSkillChange = (e, index) => {
        const newSkills = [...pet.skills];
        newSkills[index] = e.target.value;
        setPet({ ...pet, skills: newSkills });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.put("http://localhost:8000/api/pets/"+id, pet)
            .then((res) => {
                console.log(res, "success pet add")
                console.log(pet, "success")
                nav("/pets")
            })
            .catch((err) => {
                console.log(err)
                console.log(err.response.data)
                setErrorObject(err.response.data.error.errors)
                if (err.response.data.keyValue){
                    setErrorObject({...errorObject, uniqueName: "Name must be unique"})
                }
                // const errorResponse = err.response.data.errors
                const errorArr =[]
                 for (const key of Object.keys(err.response.data.error.errors)) {
                  errorArr.push(err.response.data.error.errors[key].message)
                 }
                console.log("==============",errorArr)
                setErrors(errorArr)
            })
        // Reset the form fields

    }

  return (
    <div className='container'>

      <div >
        <h1>Pet Shelter</h1>
        <h3>Edit {pet.name}</h3></div>
      <div>
        <Link to={`/pets`}> Back to Home </Link>
      </div>
      <form onSubmit={handleSubmit} >
        <div className="mb-3">
          <label className='form-label'>Pet Name :</label>
          <input type="text" onChange={(e) =>  setPet({ ...pet, name: e.target.value }) } value={pet.name} />
          {errorObject.name ? <p className='text-danger'>{errorObject.name.message}</p> : ""}
        </div>
        <div className="mb-3">
          <label className='form-label'>Pet Type :</label>
          <input type="text" onChange={(e) =>  setPet({ ...pet, type: e.target.value }) } value={pet.type} />
          {errorObject.type ? <p className='text-danger'>{errorObject.type.message}</p> : ""}
          {errorObject.uniqueName?<p className='text-danger'>{errorObject.uniqueName}</p>:""}
        </div>


        <div className="mb-3">
          <label className="form-label">Description :</label>
          <textarea className="form-control" rows="2" onChange={(e) =>  setPet({ ...pet, description: e.target.value }) } value={pet.description}>{pet.description}</textarea>
          {errorObject.description ? <p className='text-danger'>{errorObject.description.message}</p> : ""}
        </div>
        <div className="mb-3" style={{ display: 'flex', flexDirection: 'column' }}>
          <label className='form-label'>Skills (Optional) :</label>
          <label> Skill 1:</label>
          <input type="text"  onChange={(e) => handleSkillChange(e, 0)} value={skills[0]} />
          <label> Skill 2:</label>
          <input type="text"  onChange={(e) => handleSkillChange(e, 1)} value={skills[1]}  />
          <label> Skill 3:</label>
          <input type="text" onChange={(e) => handleSkillChange(e, 2)} value={skills[2]}  />
        </div>
        <div className="mb-3">
          <button className="btn btn-primary">Edit Pet</button>
        </div>

      </form>
    </div>
  )

}

export default UpdatePet