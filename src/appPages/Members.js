import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { useData } from "../context/pageContent";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { FilterMatchMode } from "primereact/api";
import {
  isValidEmail,
  isValidPhoneNumber,
  isValidText,
  isValidYear,
  toSentenceCase,
} from "../utils/validations";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import BaseApiService from "../utils/BaseApiService";
import { DEFAULT_PAGINATION_LIMIT } from "../constants/Constants";
export default function Members() {
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [filters1, setFilters1] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
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
  const [salutation, setSalutation] = useState("");
  const [members, setMembers] = useState([]);
  const [offset, setOffset] = useState(0);

  const memberData = {
    firstName: toSentenceCase(firstName),
    lastName: toSentenceCase(lastName),
    middleName: toSentenceCase(middleName),
    phoneNumber: phoneNumber.trim(),
    physicalAddress: toSentenceCase(physicalAddress),
    emailAddress: emailAddress.trim(),
    yearJoined: yearJoined.trim(),
    occupation: toSentenceCase(occupation),
    nin: nin.trim(),
    salutation: salutation.name,
    //toSentenceCase is to prevent submiting content with difernet cases
    //trim() is to remove trailing spaces int the input field
  };

  const salutations = [
    { name: "MR" },
    { name: "MS" },
    { name: "DOCTOR" },
    { name: "PROFESSOR" },
    { name: "HONOURABLE" },
    { name: "ENGINEER" },
  ];

  const initFilters1 = () => {
    setFilters1({
      global: { value: null, matchMode: FilterMatchMode.CONTAINS },
    });
    setGlobalFilterValue1("");
  };

  const clearFilter1 = () => {
    initFilters1();
  };

  function fetchMembers() {
    new BaseApiService()
      .makeGetRequest("/members/get", {
        searchTerm: searchTerm,
        offset: offset,
        limit: DEFAULT_PAGINATION_LIMIT,
      })
      .then(async (response) => {
        setMembers(response);
      })
      .catch((error) => {
        console.log("Erooor>>>>>>>>>>>>", error);
      });
  }

  async function addMember(data) {
    try {
      const path = "/members/save";
      const response = await new BaseApiService().makePostRequest(data, path);
      console.log(response);
      return response ? response.status === 200 : false;
    } catch (e) {
      console.log("Error", e);
      return false;
    }
  }

  useEffect(() => {
    initFilters1();
    fetchMembers();
  }, []);

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
    setSalutation("");
  }

  const Submit = async () => {
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
      showToast("First Name is not a valid word or too short");
    }

    if (!isValidText(memberData.lastName)) {
      isValid = false;
      showToast("Last Name is not a valid word or too short");
    }

    if (memberData.middleName !== "") {
      //making consideration for those without middle names
      if (isValidText(memberData.middleName) === false) {
        isValid = false;
        showToast("Middle Name is not a valid word or too short");
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

    if (memberData.salutation === "") {
      isValid = false;

      showToast("Select a Salutation");
    }

    if (isValid === true) {
      console.log(memberData);

      const saved = await addMember(memberData);

      if (saved === true) {
        let message = "Member Saved Successfuly";
        fetchMembers(); //refreshing the table
        showToast(message, "success", "Message");
        setDisplayBasic(false);
        console.log("saved");
        clearForm();
      } else {
        let message = "An error occured while adding the member";
        showToast(message, "error", "Error");
      }
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
            value={searchTerm}
            onChange={onGlobalFilterChange1}
            placeholder="Keyword Search"
            style={{ width: "auto" }}
          />
        </span>
      </div>
    );
  };

  const isDesktop = () => {
    return window.innerWidth > 991;
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
          // loading='true'
          // showGridlines
          rows={20}
          dataKey="id"
          filters={filters1}
          filterDisplay="menu"
          responsiveLayout="scroll"
          emptyMessage="No Church Members found."
          header={header1}
        >
          <Column
            field="salutation"
            header="Salutation"
            style={{ flexGrow: 1, minWidth: "12rem" }}
          ></Column>
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
            header="Year Joined"
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

        <Dialog // the form
          header="Add Church Member"
          visible={displayBasic}
          style={{ height: "fit-content" }}
          modal
          footer={basicDialogFooter}
          onHide={() => setDisplayBasic(false)}
          className={isDesktop() ? "col-9" : "col-11"}
        >
          <div className=" p-fluid formgrid grid">
            <div className="field col-12 md:col-4">
              <label htmlFor="name1">Salutation</label>
              <Dropdown
                value={salutation}
                onChange={(e) => setSalutation(e.value)}
                options={salutations}
                optionLabel="name"
              />
            </div>
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
              <label htmlFor="address">Occupation</label>
              <InputText
                id="occupation"
                type="text"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
              />
            </div>
            <div className="field col-12 md:col-8 ">
              <label htmlFor="address">Prayer Request</label>
              <InputTextarea placeholder="Your request" autoResize rows="3" />
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
