import React, { useState, useEffect, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { InputText } from "primereact/inputtext";
import { Column } from "primereact/column";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { FilterMatchMode } from "primereact/api";
import {
  isValidEmail,
  isValidPhoneNumber,
  isValidText,
  isValidYear,
} from "../utils/validations";
import BaseApiService from "../utils/BaseApiService";
import { DEFAULT_PAGINATION_LIMIT } from "../constants/Constants";
import PersonalDetails from "../components/PersonalDetails";
import MemberForm from "../components/MemberForm";

export default function Members() {
  const [globalFilterValue1, setGlobalFilterValue1] = useState("");
  const [filters1, setFilters1] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [displayBasic, setDisplayBasic] = useState(false);
  const toast = useRef();
  const [members, setMembers] = useState([]);
  const [offset, setOffset] = useState(0);
  const [details, setDetails] = useState(null);

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

  const Submit = async (memberData, clearForm) => {
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
    const isPhone = window.innerWidth > 470;

    if (isPhone) {
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
    }
  };

  const header1 = renderHeader1();

  return (
    <div className="col-12">
      <div className="card">
        <h5>Church Members</h5>
        {details === null ? (
          <Button
            label="Add Member"
            icon="pi pi-user-plus"
            style={{ marginRight: ".5em" }}
            onClick={() => setDisplayBasic(true)}
          />
        ) : (
          <>
            <div
              onClick={() => setDetails(null)}
              style={{
                cursor: "pointer",
              }}
              className="mb-4 mt-4"
            >
              <i className="pi pi-chevron-left" />
              <span
                style={{
                  marginLeft: "6px",
                }}
              >
                Back
              </span>
            </div>
          </>
        )}
        {details === null ? (
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
            selectionMode="single"
            onSelectionChange={(e) => setDetails(e.value)}
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
              style={{ flexGrow: 1, minWidth: "10rem" }}
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
        ) : (
          <PersonalDetails person={details} />
        )}

        <Toast ref={toast} />

        <MemberForm
          salutations={salutations}
          displayBasic={displayBasic}
          setDisplayBasic={setDisplayBasic}
          Submit={Submit}
        />
      </div>
    </div>
  );
}
