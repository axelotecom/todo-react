import React from 'react';
import MainTemplate from './views/mainTemplate';
import UserPageTemplate from './views/userPageTemplate';
import { Provider } from 'react-redux';
import { store } from 'store';
import LoginForm from 'components/LoginForm/LoginForm';
import WithAuthentication from 'components/WithAuthentication/WithAuthentication';
import { createRoot } from 'react-dom/client';

const App: React.FC = () => (
    <Provider store={store}>
        <MainTemplate>
            <WithAuthentication authenticated={<UserPageTemplate />} unauthenticated={<LoginForm />} />
        </MainTemplate>
    </Provider>
);

createRoot(document.getElementById('root')!).render(<App/>)
