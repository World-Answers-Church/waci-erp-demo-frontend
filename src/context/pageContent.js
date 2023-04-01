import React, { useState, useContext, createContext } from "react";
import Dashboard from "../appPages/Dashboard";
import { churchPlans } from "../constants/dummy/churchPlans";
import { churchPayments } from "../constants/dummy/churchPayments";

const pageContext = createContext();

export function useData() {
  return useContext(pageContext);
}

export const Provider = ({ children }) => {
  const [page, setPage] = useState(<Dashboard />);
  const [plans, setPlans] = useState(churchPlans);
  const [payments, setPayments] = useState(churchPayments);

  function addPlan({ name, targetAmount, description, minPledge }) {
    setPlans((prevMembers) => {
      return [
        ...prevMembers,
        { name, targetAmount, description, minPledge, numberOfPledges: 0 },
      ];
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
    plans,
    addPlan,
    payments,
    addPayment,
  };

  return <pageContext.Provider value={data}>{children}</pageContext.Provider>;
};
