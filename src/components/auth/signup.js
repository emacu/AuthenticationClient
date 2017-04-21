import React, {Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const renderInput = field => {
  return (
    <div>
    <input {...field.input} className="form-control" type={field.type} />
    {field.meta.touched && field.meta.error && <div className='error'>{field.meta.error}</div>}
    </div>
  );
};

function validate(formProps){
  const errors = {};

  if (!formProps.email){
    errors.email = 'Please enter an email';
  }
  else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(formProps.email)) {
     errors.email = 'Invalid email address'
  }

  if (!formProps.password){
    errors.password = 'Please enter a password';
  }

  if (!formProps.passwordConfirm){
    errors.passwordConfirm = 'Please enter a password confirmation';
  }

  if(formProps.password !== formProps.passwordConfirm){
    errors.password = 'Passwords must match';
  }

  return errors;
}

class Signup extends Component{

  handleFormSubmit(formProps){

    this.props.signupUser(formProps);
  }
  renderAlert(){
    if (this.props.errorMessage){
      return (<div className="alert alert-danger">
        <strong>Oops!</strong> {this.props.errorMessage}
      </div>);
    }
  }

  render(){
    const { handleSubmit } = this.props;
    return(
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field name="email" type="text" component={renderInput} />
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field name="password" type="password" component={renderInput} />
        </fieldset>
        <fieldset className="form-group">
          <label>Confirm Password:</label>
          <Field name="passwordConfirm" type="password" component={renderInput} />
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign up</button>
      </form>
    );
  }

}

function mapStateToProps(state){
  return {errorMessage: state.auth.error};
}

Signup = reduxForm({
  form: 'signup',
  validate
})(Signup);

export default connect(mapStateToProps,actions)(Signup);
