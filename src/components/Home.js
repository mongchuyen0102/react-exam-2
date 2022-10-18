import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authSelector } from '../features/auth/authSlice';
import { logout } from '../features/auth/authSlice';

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogged, user } = useSelector(authSelector);

  useEffect(() => {
    if (!isLogged) {
      alert("Please login!");
      navigate('/login');
    }
  }, [isLogged, navigate]);

  const onHandleClick = () => {
    dispatch(logout());
  };

  return (
    <div className="wrapper">
      <form>
        <div>
          <h2>Hello {user?.username}</h2>
        </div>
        <button onClick={onHandleClick}>Logout</button>
      </form>
    </div>
  );
};

export default Home;
