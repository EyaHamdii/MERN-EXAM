import { Route, Routes } from 'react-router-dom';
import './App.css';
import NewPet from './components/NewPet'
import ListPets from './components/ListPets';
import UpdatePet from './components/UpdatePet';
import ShowPet from './components/ShowPet';
import LoginRegister from "./components/logreg";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<LoginRegister />} />
        <Route path="/pets" element={<ListPets />} />
        <Route path="/pets/new" element={<NewPet />} />
        <Route path="/pets/:id" element={<ShowPet />} />
        <Route path="/pets/:id/edit" element={<UpdatePet />} />
      </Routes>



    </>
  );
}

export default App;
