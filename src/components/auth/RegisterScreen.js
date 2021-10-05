import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';

export const RegisterScreen = () => {
  const dispatch = useDispatch();
  const { msgError } = useSelector((state) => state.ui);

  const [formValues, handleInputChange] = useForm({
    name: 'Nelson',
    email: 'nelson@gmail.com',
    password: '@1%$#df',
    password2: '@1%$#df',
  });

  const { name, email, password, password2 } = formValues;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (isFormValid()) {
      console.log('formulario correcto');
    }
  };

  const isFormValid = () => {
    if (name.trim().length === 0) {
      console.log('name is required');
      dispatch(setError('name is required'));
      return false;
    } else if (!validator.isEmail(email)) {
      console.log('email no válido');
      dispatch(setError('email no válido'));
      return false;
    } else if (password !== password2 || password.length < 5) {
      console.log('password no válido');
      dispatch(setError('password no válido'));

      return false;
    }

    dispatch(removeError());
    return true;
  };

  return (
    <>
      <h3 className='auth__title mb-5'>Register</h3>
      <form onSubmit={handleSubmit}>
        {msgError && <div className='auth__alert-error'>Error de datos</div>}
        <input
          className='auth__input'
          type='text'
          placeholder='Name'
          name='name'
          autoComplete='off'
          value={name}
          onChange={handleInputChange}
        />
        <input
          className='auth__input'
          type='text'
          placeholder='Email'
          name='email'
          autoComplete='off'
          value={email}
          onChange={handleInputChange}
        />
        <input
          className='auth__input'
          type='password'
          placeholder='Password'
          name='password'
          value={password}
          onChange={handleInputChange}
        />
        <input
          className='auth__input'
          type='password'
          placeholder='Confirm password'
          name='password2'
          value={password2}
          onChange={handleInputChange}
        />
        <button
          className='btn btn-primary btn-block mb-5'
          type='submit'
          disabled={false}
        >
          Register
        </button>

        <Link className='link' to='/auth/login'>
          Already registered?
        </Link>
      </form>
    </>
  );
};
