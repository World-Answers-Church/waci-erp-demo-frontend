import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import LoginPage from '../pages/auth/login';
import { Routes } from 'react-router-dom';
import Layout from '../layout/layout';
export default function NavigationContainer() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/dashboard" element={<Layout />} />
            </Routes>
        </Router>
    );
}
