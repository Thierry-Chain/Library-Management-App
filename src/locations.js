/* eslint-disable no-unused-vars */
export const location = 'https://manage-library-api.onrender.com/'; //backend links
export const headers = {
  'Content-Type': 'application/json',
};
const token = localStorage.getItem('token');
export const authHeader = {
  'Content-Type': 'application/json',
  'auth-token': `${JSON.parse(token)}`,
};
