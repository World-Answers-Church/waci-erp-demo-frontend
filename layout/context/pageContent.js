import React, { useState, useContext, createContext } from 'react';
import Dashboard from '../../pages';
import useLocalStorage from '../../hooks/useLocalStorage';
import { churchMembers } from '../../constants/churchMembers';
import { churchPlans } from '../../constants/churchPlans';
import { churchPayments } from '../../constants/churchPayments';
const pageContext = createContext();
export function useData() {
    return useContext(pageContext);
}
export const Provider = ({ children }) => {
    const [page, setPage] = useState(<Dashboard />);
    const [members, setMembers] = useState(churchMembers);
    const [plans, setPlans] = useState(churchPlans);
    const [payments, setPayments] = useState(churchPayments);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    function addMember({ name, contact, location }) {
        setMembers((prevMembers) => {
            return [...prevMembers, { name, contact, location }];
        });
    }

    function addPlan({ name, targetAmount, description, minPledge }) {
        setPlans((prevMembers) => {
            return [...prevMembers, { name, targetAmount, description, minPledge, numberOfPledges: 0 }];
        });
    }
    function addPayment({ person, amount, date }) {
        setPayments((prevMembers) => {
            return [...prevMembers, { person, amount, date }];
        });
    }
    const data = {
        page,
        setPage,
        members,
        addMember,
        plans,
        addPlan,
        payments,
        addPayment,
        isLoggedIn,
        setIsLoggedIn
    };
    return <pageContext.Provider value={data}>{children}</pageContext.Provider>;
};
