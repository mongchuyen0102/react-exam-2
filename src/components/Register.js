import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { authSelector, clear, registerUser } from '../features/auth/authSlice';

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogged, isSuccess, isError, errorMessage } =
    useSelector(authSelector);

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({ mode: 'onChange' });

  const onSubmit = (data) => {
    dispatch(registerUser(data));
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

    if (isSuccess) {
      navigate('/login');
    }
  }, [isLogged, isSuccess, isError, errorMessage, navigate]);

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>REGISTER</h1>
        </div>
        <div>
          <input
            placeholder="Username"
            {...register('username', { required: true, minLength: 2 })}
          />
          {errors.username && errors.username.type === 'required' && (
            <p>Username is required</p>
          )}
          {errors.username && errors.username.type === 'minLength' && (
            <p>Username must be at least 2 characters</p>
          )}
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
            <p>Password must be at least 6 characters</p>
          )}
        </div>
        <div>
          <input
            type="password"
            placeholder="Confirm Password"
            {...register('confirmPassword', {
              required: true,
              validate: (value) => {
                const { password } = getValues();
                return password === value;
              },
            })}
          />
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'required' && (
              <p>Confirm Password is required</p>
            )}
          {errors.confirmPassword &&
            errors.confirmPassword.type === 'validate' && (
              <p>Password and confirm password does not match</p>
            )}
        </div>
        <button>Sign Up</button>
        <div className="option">
          Already have an account?{' '}
          <Link to="/login" onClick={onHandleRedirect}>
            <span>Login</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
