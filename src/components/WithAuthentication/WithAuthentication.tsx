import React, { useEffect, useState } from 'react';
import { isUserAuthenticated } from 'services/session-service';

interface Props {
    authenticated: JSX.Element;
    unauthenticated: JSX.Element;
}

const WithAuthentication: React.FC<Props> = (props) => {
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        if (isUserAuthenticated()) {
            setIsAuthenticated(true);
        }
    }, []);

    return isAuthenticated ? props.authenticated : props.unauthenticated;
};

export default WithAuthentication;
