import React from 'react';
import { LayoutProvider } from '../layout/context/layoutcontext';
import Layout from '../layout/layout';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';
import '../styles/layout/layout.scss';
import '../styles/demo/Demos.scss';
import { Provider } from '../layout/context/pageContent';
export default function MyApp({ Component, pageProps }) {
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
}
