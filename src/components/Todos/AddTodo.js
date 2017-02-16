import React, {Component} from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import classNames from 'classnames';
import { Field, reduxForm } from 'redux-form';

const validate = (values) => {
    const errors = {};
    if (!values.name) {
        errors.name = 'Required'
    }
    // if (!values.email) {
    //     errors.email = 'Required'
    // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    //     errors.email = 'Invalid email address'
    // }
    // if (!values.age) {
    //     errors.age = 'Required'
    // } else if (isNaN(Number(values.age))) {
    //     errors.age = 'Must be a number'
    // } else if (Number(values.age) < 18) {
    //     errors.age = 'Sorry, you must be at least 18 years old'
    // }
    return errors;
};

const renderField = ({ input, label, type, meta: { touched, error } }) => {
    const formGroupClasses = classNames({'form-group':true, 'has-error':touched && error})
    return (
        <div className={formGroupClasses}>
            <label className="control-label">{label}</label>
            <input className="form-control" {...input} placeholder={label} type={type}/>
        </div>
    );
};

const AddTodo = (props) => {
    const {handleSubmit, addTodo, pristine, reset, submitting, invalid } = props;
    return (
        <Grid>
            <Row>
                <Col xs={12} md={8}>
                    <form onSubmit={handleSubmit(addTodo)}>
                        <Field name="name" component={renderField} type="text" label={'Add new todo:'} placeholder={'Name'} />
                        <div className="pull-right">
                            <button className="btn btn-primary" style={{marginRight:'5px'}} type="submit" disabled={invalid || submitting}>Submit</button>
                            <button className="btn btn-secondary" type="button" disabled={pristine || submitting} onClick={reset}>Clear Values</button>
                        </div>
                    </form>
                </Col>
            </Row>
        </Grid>
    );
};
//Decorate the form component:
export default reduxForm({
    form: 'addTodo',
    validate
})(AddTodo);

