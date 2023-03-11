import React, { useState, useContext, createContext } from "react";
import Dashboard from "../appPages/dashboard";
import { churchMembers } from "../constants/dummy/churchMembers";
import { churchPlans } from "../constants/dummy/churchPlans";
import { churchPayments } from "../constants/dummy/churchPayments";
import {BASE_URL} from "../constants/Constants";
import axios from "axios";
const pageContext = createContext();

export function useData() {
  return useContext(pageContext);
}

//
export const Provider = ({ children }) => {
  const [page, setPage] = useState(<Dashboard />);
  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState(churchPlans);
  const [payments, setPayments] = useState(churchPayments);

  //
  // geting church members
  async function fetchMembers() {
    try {
      const response = await axios.get(
        BASE_URL + "/members/get?searchTerm=members&offset=100&limit=100"
      );
      // console.log(response)
      setMembers(response.data);
    } catch (e) {
      console.log("Erooor>>>>>>>>>>>>", e);
    }
  }

  async function addMember(memberData) {
    try {
      const response = await axios.post(BASE_URL + "/members/save", memberData);

      console.log(response);

      return response.status === 200;
    } catch (e) {
      console.log("Error", e);
      return false;
    }
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
