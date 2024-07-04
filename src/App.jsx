import React, { useState, useEffect } from 'react';
import Cards from './components/Cards'; 
import Search from './components/Search';
import './components/styles.css'; 

function App() {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [search, setSearch] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  //guardar las notas en localStorage
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  // Función para manejar el cambio en el monto, permitiendo solo valores numéricos
  const AmountChange = (e) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setAmount(value);
    }
  };

  // Función para agregar una nueva nota o guardar los cambios en una nota existente
  const addNote = () => {
    if (!title || !category || !amount) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    if (editMode) {
      // Editar nota existente
      const updatedNotes = [...notes];
      updatedNotes[editIndex] = { title, category, amount, description };
      setNotes(updatedNotes);
      setEditMode(false);
      setEditIndex(null);
    } else {
      // Agregar nueva nota
      const newNote = { title, category, amount, description };
      setNotes([...notes, newNote]);
    }

    // Limpiar los campos
    setTitle('');
    setCategory('');
    setAmount('');
    setDescription('');
  };

  // Función para eliminar una nota
  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  // Función para editar una nota existente
  const editNote = (index) => {
    const noteToEdit = notes[index];
    setTitle(noteToEdit.title);
    setCategory(noteToEdit.category);
    setAmount(noteToEdit.amount);
    setDescription(noteToEdit.description);
    setEditMode(true);
    setEditIndex(index);
  };

  // Función para cancelar la edición
  const cancelEdit = () => {
    setEditMode(false);
    setEditIndex(null);
    setTitle('');
    setCategory('');
    setAmount('');
    setDescription('');
  };

  // Buscar por titulo
  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app container">
      <h1 className='text-center pb-5'>💵 Administrador de Presupuesto Personal</h1>
      <Search setSearch={setSearch} />

      <div className="row">
        <div className="col-md-4">
          <h4 className='mb-3'>{editMode ? 'Editar Gasto' : 'Agregar Gastos'}</h4>
          <div className="mb-3">
            <input type="text" className='form-control' placeholder="Titulo" value={title} onChange={(e) => setTitle(e.target.value)} required />
          </div>
          <div className="mb-3">
            <select className="form-select" aria-label="Default select example"value={category}onChange={(e) => setCategory(e.target.value)}required>
              <option value="">Categoria</option>
              <option value="Vivienda">Vivienda</option>
              <option value="Transporte">Transporte</option>
              <option value="Deudas">Deudas</option>
              <option value="Otros">Otros</option>
            </select>
          </div>
          <div className="mb-3">
            <input type="text" className='form-control' placeholder="Monto" value={amount} onChange={AmountChange} required/>
          </div>
          <div className="mb-3">
            <input type="text" className='form-control' placeholder="Descripción" value={description} onChange={(e) => setDescription(e.target.value)} />
          </div>
          {editMode?(
            <div className="d-flex">
              <button className='btn btn-primary flex-grow-1 me-2 mb-5' onClick={addNote}>GUARDAR CAMBIOS</button>
              <button className='btn btn-secondary flex-grow-1 mb-5' onClick={cancelEdit}>CANCELAR</button>
            </div>
          ):(
            <button className='btn btn-primary w-100 mb-5' onClick={addNote}>AGREGAR</button>
          )}
        </div>
        <div className="col-md-8">
          <div className="row row-cols-1 row-cols-md-3 g-4">
            {filteredNotes.map((note, index) => (
              <div key={index} className="col mb-4">
                <Cards note={note} onDelete={() => deleteNote(index)} onEdit={() => editNote(index)} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
