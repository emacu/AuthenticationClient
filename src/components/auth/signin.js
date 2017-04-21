import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import * as actions from '../../actions';

const renderInput = field =>   // Define stateless component to render input and errors
      <input {...field.input} className="form-control" type={field.type}/>  // Type specified below in <Field>

class Signin extends Component{

  handleFormSubmit({email, password}){
    console.log(email,password);
    this.props.signinUser({email, password});
  }
  renderAlert() {
    if (this.props.errorMessage){
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage}
        </div>
      );
    }
  }

  render(){
    const { handleSubmit } = this.props;

    return (
      <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
        <fieldset className="form-group">
          <label>Email:</label>
          <Field name="email" type="text" component={renderInput}/>
        </fieldset>
        <fieldset className="form-group">
          <label>Password:</label>
          <Field name="password" type="password" component={renderInput}/>
        </fieldset>
        {this.renderAlert()}
        <button action="submit" className="btn btn-primary">Sign in</button>
      </form>
    );
  }

}

function mapStateToProps(state){
  return { errorMessage: state.auth.error };
}

Signin = reduxForm({
  form: 'signin'
})(Signin);

export default connect(mapStateToProps,actions)(Signin);
