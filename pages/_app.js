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
    if (logged === true) {
        if (Component.getLayout) {
            return (
                <Provider>
                    <LayoutProvider>{Component.getLayout(<Component {...pageProps} />)}</LayoutProvider>
                </Provider>
            );
        } else {
            return (
                <Provider>
                    <LayoutProvider>
                        <Layout>
                            <Component {...pageProps} />
                        </Layout>
                    </LayoutProvider>
                </Provider>
            );
        }
    } else {
        return (
            <LayoutProvider>
                <LoginPage setLogged={setLogged} />
            </LayoutProvider>
        );
    }
}
