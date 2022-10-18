import axios from 'axios';

const AUTH_API_URL = 'https://detracnghiem.vn/api/auth';
// const AUTH_API_URL = 'http://localhost:4000/api/auth';

const register = ({ username, email, password }) => {
  return axios.post(AUTH_API_URL + '/register', {
    username,
    email,
    password,
  });
};

const login = ({ email, password }) => {
  return axios.post(AUTH_API_URL + '/login', {
    email,
    password,
  });
};

const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
};

const authService = { register, login, logout };
export default authService;
