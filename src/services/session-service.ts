import Cookies from 'js-cookie';
import { User } from '../model/users';
import Axios from "axios";

export const SESSION_COOKIE: string = 'session';

export const encode = (username: string, password: string): string => {
    return btoa(unescape(encodeURIComponent(username + ':' + password)));
};

export const isUserAuthenticated = (): boolean => {
    const sessionToken = Cookies.get(SESSION_COOKIE);
    return !(sessionToken === undefined);
};

export const login = async (user: User): Promise<boolean> => {
    return Axios.post(`${process.env.REACT_APP_AXELOTE_URL}/api/authenticate`, user)
        .then((res) => {
            if(res.data === 'BAD_USER_CREDENTIALS'){
                return false;
            }
            const token = encode(user.username, user.password);
            Cookies.set(SESSION_COOKIE, token, { expires: 1 });
            return true;
        })
        .catch((err) => false);
};

export const logout = (): void => {
    Cookies.remove(SESSION_COOKIE);
    window.location.reload();
};
