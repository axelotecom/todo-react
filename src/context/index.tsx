/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';

const PageContext = React.createContext<any>({ activeTheme: 'dark' });

export default PageContext;
