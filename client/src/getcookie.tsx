/**
 * gets value of cookie by cookie name.
 * cookie names: "email", "loggedIn", "admin", "first_name", "last_name",
 * "user_id"
 * @export
 * @param {string} name name of cookie
 * @return {*} string value of cookie
 */
export function getCookieValue(name: string) {
  const cookies = document.cookie.split(';');
  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i].trim();
    if (cookie.startsWith(name + '=')) {
      return cookie.substring(name.length + 1);
    }
  }
  return '';
}

/**
 * Deletes all login related cookies.
 * cookie names: "email", "loggedIn", "admin", "first_name", "last_name",
 * "user_id"
 * @export
 */
export function forgetLogin() {
  document.cookie = 'loggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'admin=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'first_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'last_name=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'user_id=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
  document.cookie = 'email=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
}

/**
 * Sets all login related cookies.
 * cookie names: "email", "loggedIn", "admin", "first_name", "last_name",
 * "user_id"
 * @export
 * @param {*} currentUser
 * @return {*}  {void}
 *
 */

export function setLoginCookies(currentUser: any) {
  document.cookie = `loggedIn=true; path=/`;
  document.cookie = `admin=${currentUser.admin}; path=/`;
  document.cookie = `first_name=${currentUser.first_name}; path=/`;
  document.cookie = `user_id=${currentUser.user_id}; path=/`;
  document.cookie = `last_name=${currentUser.last_name}; path=/`;
  document.cookie = `email=${currentUser.email}; path=/`;
}

export function setDarkModCookies(isDarkModeEnabled: boolean) {
  document.cookie = `darkModeEnabled=${isDarkModeEnabled}; path=/`;
}

export function getDarkModeCookies() {
  const cookie = document.cookie
    .split(';')
    .find((cookie) => cookie.trim().startsWith('darkModeEnabled='));
  return cookie ? cookie.split('=')[1] === 'true' : false;
}
