import Cookie from 'cookie_js';

export function getToken() {
  return Cookie.get('token');
}

export function setToken(token) {
  Cookie.set('token', token);
}

export function removeToken(token) {
  Cookie.remove('token', token);
}

export function setUserName(username) {
  Cookie.set('username', username);
}

export function getUserName(username) {
  return Cookie.get(username);
}

export function removeUserName(username) {
  return Cookie.remove(username);
}
