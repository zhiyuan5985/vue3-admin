import Cookie from 'cookie_js'

export function getToken() {
    return Cookie.get('admin_token');
}