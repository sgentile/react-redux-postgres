import React from 'react';
import {Grid, Row, Col, Alert, PageHeader} from 'react-bootstrap';
import {renderField} from '../FormHelpers';
import { Field, reduxForm } from 'redux-form';

const validate = (values) => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Required'
  }

  if (!values.password) {
    errors.password = 'Required'
  }
  // }
  return errors;
};

const LoginView = (props) => {
  const {loginUser, handleSubmit, submitting, invalid, authState, toggleRegister } = props;
  return (
    <Grid>
      <Row>
        <Col md={12}>
          <PageHeader>Sign In</PageHeader>
        </Col>
      </Row>
      <Row>
        <Col md={12}>
          {loginUser &&
          <form onSubmit={handleSubmit(loginUser)}>
            <Field name="username" component={renderField} type="text" label={'Username * :'} placeholder={'User Name'}/>
            <Field name="password" component={renderField} type="password" label={'Password * :'}
                   placeholder={'Password'}/>

            <div className="pull-right mb10">
              <button className="btn btn-primary" style={{marginRight: '5px'}} type="submit"
                      disabled={invalid || submitting}>Submit
              </button>
            </div>
          </form>
          }
          <div>If you do not have an account please <button className="btn btn-link" onClick={toggleRegister}>Register</button></div>

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
})(LoginView);
