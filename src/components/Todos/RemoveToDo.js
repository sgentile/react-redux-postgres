import React from 'react';

const RemoveToDo = ({id, deleteToDo}) => {
  return (
    <i className="fa fa-trash delete-todo" onClick={deleteToDo.bind(this, id)}></i>
  )
};

export default RemoveToDo;
