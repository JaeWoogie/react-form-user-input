import { useState } from "react";

const SimpleInput = (props) => {
  const [enteredName, setEnteredName] = useState('');
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);
  const [emailFormat, setEmailFormat] = useState(false);

  const [enteredEmail, setenteredEmail] = useState('');
  const [enteredEmailTouched, setenteredEmailTouched] = useState(false);

  const enteredNameIsValid = enteredName.trim() !== '';
  const enteredEmailIsValid = enteredEmail.trim() !== '';
  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  const emailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid && !emailFormat) {
    formIsValid = true;
  } 
  else {
    formIsValid = false;
  }

  const nameInputChangeHandler = event => {
    setEnteredName(event.target.value);
  };

  const emailInputChangeHandler = event => {
    setenteredEmail(event.target.value);
    let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if(!regEmail.test(event.target.value)){
      setEmailFormat(true);
    } else {
      setEmailFormat(false);
    }
  }

  const formSubmissionHandler = event => {
    event.preventDefault();

    setEnteredNameTouched(true);
    setenteredEmailTouched(true);

    if(!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    console.log(enteredName)
    console.log(enteredEmail)

    setEnteredName('');
    setEnteredNameTouched(false);
    setenteredEmail('');
    setenteredEmailTouched(false);
  };

  const nameInputBlurHandler = (event) => {
    setEnteredNameTouched(true);
  }

  const emailInputBlurHandler = (event) => {
    setenteredEmailTouched(true);
  }

  const nameInputClasses = nameInputIsInvalid ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputIsInvalid ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' onChange={nameInputChangeHandler} value={enteredName} onBlur={nameInputBlurHandler}/>
        {nameInputIsInvalid && <p className="error-text">Name must not be empty.</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='name'>Email</label>
        <input type='text' id='name' onChange={emailInputChangeHandler} value={enteredEmail} onBlur={emailInputBlurHandler}/>
        {emailInputIsInvalid && <p className="error-text">Email must not be empty.</p>}
        {emailFormat && enteredEmail.length > 0 && <p className="error-text">Wrong email format.</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
