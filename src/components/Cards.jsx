import React from 'react';
import './styles.css';

const Cards = ({ note, onDelete, onEdit }) => {
  const { title, category, amount, description } = note;

  const getCategory = (category) => {
    switch (category.toLowerCase()) {
      case 'vivienda':
        return 'vivienda';
      case 'transporte':
        return 'transporte';
      case 'deudas':
        return 'deudas';
      case 'otros':
        return 'otros';
      default:
        return '';
    }
  };

  return (
    <div className={`card h-100 ${getCategory(category)}`}>
      <div className="note-header ">
        <h5 className="card-title">{title}</h5>
      </div>
      <div className="note-content card-body">
        <p className="card-text"><strong>Categoría:</strong> {category}</p>
        <p className="card-text"><strong>Monto:</strong> {amount}</p>
        <p className="card-text"><strong>Descripción:</strong> {description}</p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <button className="btn btn-danger" onClick={onDelete}>Eliminar</button>
          <button className="btn btn-primary" onClick={onEdit}>Editar</button>
        </div>
      </div>
    </div>
  );
};

export default Cards;
