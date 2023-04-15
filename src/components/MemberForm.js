import React, { useState, useContext } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { InputTextarea } from "primereact/inputtextarea";
import { Dialog } from "primereact/dialog";
import { Button } from "primereact/button";
import { toSentenceCase } from "../utils/validations";
import { LayoutContext } from "../context/layoutcontext";
export default function MemberForm({
  salutations,
  Submit,
  displayBasic,
  setDisplayBasic,
}) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [physicalAddress, setPhysicalAddress] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [yearJoined, setYearJoined] = useState("");
  const [occupation, setOccupation] = useState("");
  const [nin, setNin] = useState("");
  const [salutation, setSalutation] = useState("");
  const { isDesktop } = useContext(LayoutContext);
  
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
  };
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
        onClick={() => Submit(memberData, clearForm)}
      />
    </>
  );

  return (
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
  );
}
