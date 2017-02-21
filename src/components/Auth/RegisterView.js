import React from 'react';
import {Grid, Row, Col, Alert, PageHeader} from 'react-bootstrap';
import {renderField} from '../FormHelpers';
import { Field, reduxForm } from 'redux-form';

const validate = (values) => {
  const errors = {};
  if (!values.email) {
    errors.email = 'Required'
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Invalid email address'
  }

  if (!values.name) {
    errors.name = 'Required'
  }

  if (!values.username) {
    errors.username = 'Required'
  }

  if (!values.password) {
    errors.password = 'Required'
  }

  if(!values.confirmPassword){
    errors.confirmPassword = 'Required'
  }

  if(values.password && values.confirmPassword){
    if(values.password !== values.confirmPassword){
      errors.confirmPassword = 'Confirmation Password must match password';
    }
  }
  // }
  return errors;
};

const RegisterView = (props) => {
  const {registerUser, handleSubmit, submitting, invalid, authState, toggleRegister } = props;
  return (
    <Grid>
      <Row>
        <Col md={12}>
          <PageHeader>Register</PageHeader>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {registerUser &&
          <form onSubmit={handleSubmit(registerUser)}>
            <Field name="username" component={renderField} type="text" label={'User Name * :'} placeholder={'UserName'}/>
            <Field name="name" component={renderField} type="text" label={'Name * :'} placeholder={'Name'}/>
            <Field name="email" component={renderField} type="text" label={'Email * :'} placeholder={'Email'}/>
            <Field name="password" component={renderField} type="password" label={'Password * :'}
                   placeholder={'Password'}/>
            <Field name="confirmPassword" component={renderField} type="password" label={'Confirm Password * :'}
                   placeholder={'Confirm Password'}/>
            <div className="pull-right mb10">
              <button className="btn btn-primary" style={{marginRight: '5px'}} type="submit"
                      disabled={invalid || submitting}>Submit
              </button>
            </div>
          </form>
          }
          <div>If you have an existing account please <button className="btn btn-link" onClick={toggleRegister}>Login</button></div>

        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {authState && authState.statusText ?
            <Alert bsStyle={authState.hasError ? 'danger' : 'success'}>
              {authState.statusText}
            </Alert>
            : null}
        </Col>
      </Row>

    </Grid>
  )
};

//Decorate the form component:
export default reduxForm({
  form: 'login',
  validate
})(RegisterView);
