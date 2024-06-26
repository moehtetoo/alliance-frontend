import axios from 'axios';

/**
 * Request Success Handler
 */
const requestSuccessHandler = (config) => {
  const auth = localStorage.getItem('token');
  const headers = config.headers;
  return { ...config, headers: { ...headers, auth } };
};

/**
 * Request Fail Handler
 */
const requestErrorHandler = (err) => {
  return Promise.reject(err);
};

/**
 * Response Success Handler
 */
const responseSuccessHandler = (res) => {
  const response = res.data;
  if (200 <= res.status && res.status < 300) {
    return response.data;
  } else {
    return responseErrorHandler(res);
  }
};

/**
 * Response Fail handler
 */
const responseErrorHandler = (err) => {
  return Promise.reject(err);
};

/**
 * Axios 객체
 */
const request = axios.create({
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

/**
 * Axios Request Middleware
 */
request.interceptors.request.use(
  (config) => requestSuccessHandler(config),
  (err) => requestErrorHandler(err)
);

/**
 * Axios Response Middleware
 */
request.interceptors.response.use(
  (res) => responseSuccessHandler(res),
  (err) => responseErrorHandler(err)
);

export default request;
