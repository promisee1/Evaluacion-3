import React from 'react';
import './styles.css';

const Search = ({ setSearch }) => {
  return (
    <form className='d-flex justify-content-center gap-4 mb-5'>
      <input onChange={(e) => setSearch(e.target.value)} placeholder="Buscar por título" type="text" className="form-control"/>
      <button onClick={e => e.preventDefault()} className="btn btn-primary">Buscar</button>
    </form>
  );
};

export default Search;
