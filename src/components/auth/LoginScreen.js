import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { login } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
  const dispatch = useDispatch();

  const [formValues, handleInputChange] = useForm({
    email: 'nando@gmail.com',
    password: '@#%$1234',
  });

  const { email, password } = formValues;

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(login(12345, 'Hernando'));
  };

  return (
    <>
      <h3 className='auth__title mb-5'>Login</h3>
      <form>
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
        <button
          className='btn btn-primary btn-block'
          type='submit'
          disabled={false}
          onClick={handleLogin}
        >
          Login
        </button>
        <hr />

        <div className='auth__social-network'>
          <p>Login with social network</p>
          <div className='google-btn'>
            <div className='google-icon-wrapper'>
              <img
                className='google-icon'
                src='https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg'
                alt='google button'
              />
            </div>
            <p className='btn-text'>
              <b>Sign in with google</b>
            </p>
          </div>
        </div>
        <Link className='link' to='/auth/register'>
          Create new account
        </Link>
      </form>
    </>
  );
};
