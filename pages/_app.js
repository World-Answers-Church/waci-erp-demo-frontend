import React, { useState } from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import { Provider } from '../layout/context/pageContent';
import LoginPage from './auth/login';
export default function MyApp({ Component, pageProps }) {
    const [logged, setLogged] = useState(false);
    return (
        <Provider>
            {logged === true ? (
                <LayoutProvider>
                    {Component.getLayout ? (
                        Component.getLayout(<Component {...pageProps} />)
                    ) : (
                        <Layout setLogged={setLogged}>
                            <Component {...pageProps} />
                        </Layout>
                    )}
                </LayoutProvider>
            ) : (
                <LayoutProvider>
                    <LoginPage setLogged={setLogged} />
                </LayoutProvider>
            )}
        </Provider>
    );
}
