import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useData } from "../context/pageContent";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { FilterMatchMode, FilterOperator } from "primereact/api";
import {
  isValidEmail,
  isValidPhoneNumber,
  isValidText,
  isValidYear,
} from "../utils/validations";

export default function Members() {
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [filters1, setFilters1] = useState(null);
  const { members, addMember } = useData();
  const [displayBasic, setDisplayBasic] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [yearJoined, setYearJoined] = useState("");
  const [occupation, setOccupation] = useState("");
  const [nin, setNin] = useState(""); //pending validation format
  const toast = useRef();
  const memberData = {
    firstName: firstName.trim(),
    lastName: lastName.trim(),
    middleName: middleName.trim(),
    phoneNumber: phoneNumber.trim(),
    physicalAddress: physicalAddress.trim(),
    emailAddress: emailAddress.trim(),
    yearJoined: yearJoined.trim(),
    occupation: occupation.trim(),
    nin: nin.trim(),
    //trim() is to remove trailing spaces int the input field
  };

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue1("");
  };

  const clearFilter1 = () => {
    initFilters1();
  };
  useEffect(() => initFilters1(), []);
  const onGlobalFilterChange1 = (e) => {
    const value = e.target.value;
    let _filters1 = { ...filters1 };
    _filters1["global"].value = value;

    setFilters1(_filters1);
    setGlobalFilterValue1(value);
  };

  function showToast(message, e = "error", s = "Invalid Input") {
    toast.current.show({
      severity: e,
      summary: s,
      detail: message,
      life: 5000,
    });
  }

  function clearForm() {
    // reseting input fields to default
    setFirstName("");
    setLastName("");
    setEmailAddress("");
    setMiddleName("");
    setNin("");
    setOccupation("");
    setPhysicalAddress("");
    setPhoneNumber("");
    setYearJoined("");
  }
  const Submit = () => {
    let isValid = true; // validation flag

    if (memberData.emailAddress !== "") {
      // making consideration for members without emails
      if (!isValidEmail(memberData.emailAddress)) {
        isValid = false;
        showToast("Please Enter a Valid Email address");
      }
    }

    if (!isValidPhoneNumber(memberData.phoneNumber)) {
      isValid = false;
      showToast("Please Enter a Valid Phone Number");
    }

    if (!isValidText(memberData.firstName)) {
      isValid = false;
      showToast("First Name is not Valid or too short");
    }

    if (!isValidText(memberData.lastName)) {
      isValid = false;
      showToast("Last Name is not Valid or too short");
    }

    if (memberData.middleName !== "") {
        //making consideration for those without middle names
      if (isValidText(memberData.middleName) === false) {
        isValid = false;
        showToast("Middle Name is not Valid or too short");
      }
    }

    if (!isValidText(memberData.occupation)) {
      isValid = false;
      showToast("Occupation is not a word or too short");
    }

    if (!isValidText(memberData.physicalAddress)) {
      isValid = false;
      showToast("Location is not a valid word or too short");
    }

    if (!isValidYear(Number(memberData.yearJoined))) {
      isValid = false;

      showToast(
        `Year Joined is not Valid, should be 2002 and later or before ${new Date().getFullYear()}`
      );
    }

    if (isValid === true) {
      console.log(memberData);
      let message = "Member Saved Successfuly";
      showToast(message, "success", "Message");
      addMember(memberData);
      setDisplayBasic(false);
      clearForm();
    }
  };

  const renderHeader1 = () => {
    return (
      <div className="flex justify-content-between">
        <Button
          type="button"
          icon="pi pi-filter-slash"
          label="Clear"
          className="p-button-outlined"
          onClick={clearFilter1}
        />
        <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText
            value={globalFilterValue1}
            onChange={onGlobalFilterChange1}
            placeholder="Keyword Search"
            style={{ width: "auto" }}
          />
        </span>
      </div>
    );
  };

  const header1 = renderHeader1();
  const basicDialogFooter = (
    <>
      <Button
        type="button"
        label="Cancel"
        onClick={() => setDisplayBasic(false)}
        icon="pi pi-times"
        className="p-button-secondary"
      />
      <Button
        label="Save"
        className="p-button-raised p-button-success"
        icon="pi pi-check"
        onClick={Submit}
      />
    </>
  );
  return (
    <div className="col-12">
      <div className="card">
        <h5>Church Members</h5>
        <Button
          label="Add Member"
          icon="pi pi-user-plus"
          style={{ marginRight: ".5em" }}
          onClick={() => setDisplayBasic(true)}
        />
        <DataTable
          value={members}
          paginator
          className="mt-3"
          showGridlines
          rows={20}
          dataKey="id"
          filters={filters1}
          filterDisplay="menu"
          responsiveLayout="scroll"
          emptyMessage="No Church Members found."
          header={header1}
        >
          <Column
            field="firstName"
            header="First Name"
            style={{ flexGrow: 1, minWidth: "12rem" }}
          ></Column>

          <Column
            field="lastName"
            header="Last Name"
            style={{ flexGrow: 1, minWidth: "12rem" }}
          ></Column>

          <Column
            field="phoneNumber"
            header="Contact"
            style={{ flexGrow: 1, minWidth: "12rem" }}
          ></Column>

          <Column
            field="physicalAddress"
            header="Address"
            style={{ flexGrow: 1, minWidth: "12rem" }}
          ></Column>

          <Column
            field="emailAddress"
            header="Email"
            style={{ flexGrow: 1, minWidth: "12rem" }}
          ></Column>

          <Column
            field="yearJoined"
            header="Member Since"
            style={{ flexGrow: 1, minWidth: "12rem" }}
          ></Column>
          <Column
            field="occupation"
            header="Ocupation"
            style={{ flexGrow: 1, minWidth: "12rem" }}
          ></Column>
          <Column
            field="nin"
            header="NIN"
            style={{ flexGrow: 1, minWidth: "12rem" }}
          ></Column>
        </DataTable>

        <Toast ref={toast} />

        <Dialog
          header="Add Church Member"
          visible={displayBasic}
          style={{ height: "fit-content" }}
          modal
          footer={basicDialogFooter}
          onHide={() => setDisplayBasic(false)}
          className="col-11"
        >
          <div className=" p-fluid formgrid grid">
            <div className="field col-12 md:col-4">
              <label htmlFor="name1">First Name</label>
              <InputText
                id="name1"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="name1">Middle Name</label>
              <InputText
                id="name2"
                type="text"
                value={middleName}
                onChange={(e) => setMiddleName(e.target.value)}
              />
            </div>
            <div className="field col-12 md:col-4">
              <label htmlFor="name1">Last Name</label>
              <InputText
                id="name3"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div className="field col-12 md:col-4">
              <label htmlFor="phoneNumber">Phone Number</label>
              <InputText
                id="phoneNumber"
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>

            <div className="field col-12 md:col-4 ">
              <label htmlFor="email">Email</label>
              <InputText
                id="email"
                value={emailAddress}
                onChange={(e) => setEmailAddress(e.target.value)}
              />
            </div>

            <div className="field col-12 md:col-4 ">
              <label htmlFor="address">Location</label>
              <InputText
                type="text"
                id="address"
                value={physicalAddress}
                onChange={(e) => setPhysicalAddress(e.target.value)}
              />
            </div>

            <div className="field col-12 md:col-4 ">
              <label htmlFor="address">Year Joined</label>
              <InputText
                type="text"
                id="yearJoined"
                value={yearJoined}
                onChange={(e) => setYearJoined(e.target.value)}
              />
            </div>

            <div className="field col-12 md:col-4 ">
              <label htmlFor="address">NIN</label>
              <InputText
                id="nin"
                type="text"
                value={nin}
                onChange={(e) => setNin(e.target.value)}
              />
            </div>

            <div className="field col-12 md:col-4 ">
              <label htmlFor="address">Ocupation</label>
              <InputText
                id="occupation"
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
