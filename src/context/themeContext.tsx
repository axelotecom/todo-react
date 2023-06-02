import React from 'react';
import PageContext from 'context';

const themeContext = <P extends unknown>(Component: React.ComponentType<P>) =>
    function contextComponent(props: any) {
        return (
            <PageContext.Consumer>
                {({ activeTheme }: { activeTheme: string }) => <Component {...props} themeContext={activeTheme} />}
            </PageContext.Consumer>
        );
    };

export default themeContext;
