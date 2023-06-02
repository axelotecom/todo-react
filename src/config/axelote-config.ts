import { Axelote, AxeloteConfig } from '@axelote/js';
import Cookies from 'js-cookie';
import { SESSION_COOKIE } from 'services/session-service';

const axeloteConfig: AxeloteConfig = {
    url: `${process.env.REACT_APP_AXELOTE_URL}`,
    devToken: `${process.env.REACT_APP_AXELOTE_DEV_TOKEN}`,
    requestConfig: {
        headers: {
            authorization: 'Basic ' + Cookies.get(SESSION_COOKIE),
        },
    },
};
export const axelote = new Axelote(axeloteConfig);
