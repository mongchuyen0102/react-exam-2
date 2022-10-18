import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authSelector, clear, loginUser } from '../features/auth/authSlice';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogged, isError, errorMessage } = useSelector(authSelector);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    dispatch(loginUser(data));
  };

  const onHandleRedirect = () => {
    dispatch(clear());
  };

  useEffect(() => {
    if (isError && errorMessage) {
      alert(errorMessage);
    }

    if (isLogged) {
      navigate('/');
    }
  }, [isLogged, isError, errorMessage, navigate]);

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>LOGIN</h1>
        </div>
        <div>
          <input
            placeholder="Email"
            {...register('email', {
              required: true,
              pattern:
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email && errors.email.type === 'required' && (
            <p>Email is required</p>
          )}
          {errors.email && errors.email.type === 'pattern' && (
            <p>Email is invalid</p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Password"
            {...register('password', { required: true, minLength: 6 })}
          />
          {errors.password && errors.password.type === 'required' && (
            <p>Password is required</p>
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <p>Password is incorrect</p>
          )}
        </div>
        <button type="submit">Login</button>
        <div className="option">
          Don't have account?{' '}
          <Link to="/register" onClick={onHandleRedirect}>
            <span>Register</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
