import React from 'react';

const CompletedStatus = ({todo, onTodoStatusChange}) => {
    return (
        <input type="checkbox" defaultChecked={todo.completed} onChange={onTodoStatusChange.bind(this, todo)}/>
    );
};

export default CompletedStatus;
