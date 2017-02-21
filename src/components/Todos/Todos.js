import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import CompletedStatus from './CompletedStatus';
import RemoveToDo from './RemoveToDo';

export default class Todos extends Component {
  constructor(props) {
    super(props);

    this.options = {
      noDataText: 'There are currently no todos',
      sizePerPage: 10
    };

    this.formatCompleted = this.formatCompleted.bind(this);
    this.formatName = this.formatName.bind(this);
    this.onCompletedChanged = this.onCompletedChanged.bind(this);
    this.deleteTodoFormat = this.deleteTodoFormat.bind(this);
    this.deleteToDo = this.deleteToDo.bind(this);
  }

  onCompletedChanged(todo) {
    console.log('onCompletedChanged', todo);
    todo.completed = !todo.completed;
    this.props.onTodoStatusChange(todo)
  };

  formatCompleted(completed, todo) {
    return <CompletedStatus todo={todo} onTodoStatusChange={this.onCompletedChanged}/>
  };

  formatName(name, todo){
    return <span className={todo.completed ? 'completed-todo' : ''}>{name}</span>
  }

  deleteToDo(todo) {
    this.props.deleteToDo(todo);
  }

  deleteTodoFormat(id) {
    return <RemoveToDo id={id} deleteToDo={this.deleteToDo}/>
  };


  render() {
    return (
      <Grid>
        <Row>
          <Col xs={12} md={8}>
            {this.props.todos &&
            <BootstrapTable keyField="id" search={true} data={this.props.todos} bordered={false} striped={true} hover={true}
                            options={this.options}>
              <TableHeaderColumn dataField="name" dataSort={true} dataFormat={this.formatName}>Name</TableHeaderColumn>
              <TableHeaderColumn dataField="completed" dataSort={true} dataFormat={this.formatCompleted}>Completed
                ?</TableHeaderColumn>
              <TableHeaderColumn dataField="id" dataFormat={this.deleteTodoFormat}>Delete ?</TableHeaderColumn>
            </BootstrapTable>
            }
          </Col>
        </Row>
      </Grid>
    );
  }
};
