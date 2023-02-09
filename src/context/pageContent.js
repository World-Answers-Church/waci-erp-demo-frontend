import React, { useState, useContext, createContext } from "react";
import Dashboard from "../appPages/dashboard";
import { churchMembers } from "../constants/churchMembers";
import { churchPlans } from "../constants/churchPlans";
import { churchPayments } from "../constants/churchPayments";
import BASE_URL from "../constants/baseUrl";

const pageContext = createContext();

export function useData() {
  return useContext(pageContext);
}

//
export const Provider = ({ children }) => {
  const [page, setPage] = useState(<Dashboard />);
  const [members, setMembers] = useState(churchMembers);
  const [plans, setPlans] = useState(churchPlans);
  const [payments, setPayments] = useState(churchPayments);

  //
  // geting church members
  async function fetchMembers() {
    try {
      const response = await fetch(BASE_URL + "/members/get");
      console.log(response);
    } catch (e) {
      console.log("Erooor>>>>>>>>>>>>", e);
    }
  }

  function addMember({
    firstName,
    lastName,
    middleName,
    phoneNumber,
    physicalAddress,
    emailAddress,
    yearJoined,
    occupation,
    nin,
  }) {
    setMembers((prevMembers) => {
      return [
        ...prevMembers,
        {
          firstName,
          lastName,
          middleName,
          phoneNumber,
          physicalAddress,
          emailAddress,
          yearJoined,
          occupation,
          nin,
        },
      ];
    });
  }

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
    members,
    addMember,
    plans,
    addPlan,
    payments,
    addPayment,
    fetchMembers,
  };

  return <pageContext.Provider value={data}>{children}</pageContext.Provider>;
};
