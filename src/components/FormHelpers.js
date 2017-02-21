import React from 'react';
import { Field } from 'redux-form';
import classNames from 'classnames';
import {Grid, Row, Col, Alert} from 'react-bootstrap';
import DatePicker from 'react-bootstrap-date-picker';

export const renderRangeSlider = ({ input, label, meta: { touched, error, warning } }) => {
  const formGroupClasses = classNames({'form-group':true, 'has-error':touched && error});
  return (
    <div className={formGroupClasses}>
      <label className="control-label">{label}</label>
      <input className="form-control" {...input} type="range" min="0" max="1" step=".01"/>
      {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  );
};

export const renderField = ({ input, label, type, placeholder, isImage=false, meta: { touched, error, warning } }) => {
  const formGroupClasses = classNames({'form-group':true, 'has-error':touched && error});
  return (
    <div className={formGroupClasses}>
      <label className="control-label">{label}</label>
      {isImage && input.value ?
        <div className="edit-image">
          <div className="edit-image-item">
            <img src={input.value}/>
          </div>
          <div className="edit-image-frame">
            <input className="form-control" {...input} placeholder={placeholder} type={type}/>
          </div>
        </div>
        :
        <input className="form-control" {...input} placeholder={placeholder} type={type}/>
      }

      {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  );
};

export const renderTextAreaField = ({ input, label, placeholder, meta: { touched, error, warning } }) => {
  const formGroupClasses = classNames({'form-group':true, 'has-error': error});
  return (
    <div className={formGroupClasses}>
      <label className="control-label">{label}</label>
      <textarea className="form-control" {...input} placeholder={placeholder} rows="10" style={{width:'100%'}}/>
      {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  );
};


export const renderDatePicker = ({ input, label, type, placeholder, meta: { touched, error, warning } }) => {
  const formGroupClasses = classNames({'form-group':true, 'has-error':touched && error});
  return (
    <div className={formGroupClasses}>
      <label className="control-label">{label}</label>
      {/*<input className="form-control" {...input} placeholder={placeholder} type={type}/>*/}

      <DatePicker {...input} />
      {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  );
};

export const renderCheckbox = ({ input, label, meta: { touched, error, warning } }) => {
  const formGroupClasses = classNames({'form-group':true, 'has-error':touched && error});
  return (
    <div className={formGroupClasses}>
      <label>
        <input type="checkbox" {...input}/> {label}
      </label>
      {/*<input className="form-control" {...input} placeholder={placeholder} type="checkbox"/>*/}
      {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  );
};

export const renderSubItem = ({ input, label, type, placeholder, index, fields, isImage=false, meta: { touched, error, warning } }) => {
  return (
    <Grid>
      <Row>
        <Col xs={11}>
          {renderField({ input, label, type, placeholder, isImage, meta: { touched, error, warning } })}
        </Col>
        <Col xs={1}><button className="btn btn-danger mt25" type="button" title="Remove" onClick={() => fields.remove(index)}><i className="fa fa-trash"></i></button></Col>
      </Row>
    </Grid>
  );
};

export const renderSelect = ({ input, label, placeholder, data, keyField, valueField, labelField, addEmptyOption=false, meta: { touched, error, warning } }) => {
  console.log('renderSelect', input);
  const formGroupClasses = classNames({'form-group':true, 'has-error':touched && error});
  return (
    <div className={formGroupClasses}>
      <label className="control-label">{label} </label>
      {keyField && valueField && labelField ?
        <select {...input} className="form-control">
          {addEmptyOption ?
            <option></option>
            : null}
          {data && data.map((item) =>
            <option key={item[keyField]} value={item[valueField]}>{item[labelField]}</option>
          )}
        </select>
        :
        <select {...input} className="form-control">
          {addEmptyOption ?
            <option></option>
            : null}
          {data && data.map((item) =>
            <option key={item} value={item}>{item}</option>
          )}
        </select>
      }
      {touched && ((error && <span className="help-block">{error}</span>) || (warning && <span>{warning}</span>))}
    </div>
  );
};

export const renderItems = ({fields, meta: {pristine, touched, error}, collectionLabel, prefixKey, label, placeholder, isImage=false}) => {
  return (
    <div className="mt5 mb5">
      {collectionLabel && <label>{collectionLabel}</label>}
      <div className={classNames({'ml30':true, 'form-section':fields.length > 0})}>
        {fields.map((item, index) =>
          <div key={`${prefixKey}_${index}`}>
            <Field name={item} component={renderSubItem} isImage={isImage} type="text" label={label} index={index} fields={fields} placeholder={placeholder}/>
          </div>
        )}
      </div>

      <button className="btn btn-secondary m5" type="button" onClick={() => fields.push()}>Add Another {label ? label : placeholder}</button>
      {touched && error && <Alert bsStyle="danger">{error}</Alert>}
    </div>
  )
};

export const renderPersonNames = ({fields, meta: {pristine, touched, error}, collectionLabel, prefixKey, label, placeholder}) => {
  return (
    <div className="mt5 mb5">
      {collectionLabel && <label>{collectionLabel}</label>}
      {fields.map((item, index) =>
        <div key={`${prefixKey}_${index}`} className="mt10">
          <div className={classNames({'ml30':true, 'form-section':fields.length > 0})}>
            <Field name={`${item}.fullname`} component={renderField} type="text" label="Fullname" index={index} fields={fields} placeholder="FullName"/>
            <Field name={`${item}.firstname`} component={renderField} type="text" label="First Name" index={index} fields={fields} placeholder="First Name"/>
            <Field name={`${item}.lastname`} component={renderField} type="text" label="Last Name" index={index} fields={fields} placeholder="Last Name"/>
            <button className="btn btn-danger mt5" type="button" title="Remove" onClick={() => fields.remove(index)}><i className="fa fa-trash"></i></button>
            {error && <span className="help-block">{error}</span>}
          </div>
        </div>
      )}
      <button className="btn btn-secondary m5" type="button" onClick={() => fields.push({fullname:null, firstname:null, lastname:null})}>Add Another {label ? label : placeholder}</button>
      {touched && error && <Alert bsStyle="danger">{error}</Alert>}
    </div>
  )
};

export const renderDefaultValueSelect = ({ input, label, data}) => {
  console.log('renderDefaultValueSelect', input, label, data);
  return (
    <div className="form-group">
      <label className="control-label">{label} </label>
      <select name={input.name} defaultValue={input.value} className="form-control">
        {data && data.map((item) =>
          <option key={item} value={item}>{item}</option>
        )}
      </select>
    </div>
  );
};
