import React, { useState, useRef } from "react";
import { Button } from "primereact/button";
import { Toast } from "primereact/toast";
import { Dialog } from "primereact/dialog";
import { InputTextarea } from "primereact/inputtextarea";
export default function PersonalDetails({person}) {
  const [show, setShow] = useState(false);
  const [request, setRequest] = useState("");
  const [requestData, setData] = useState([]);
  const toast = useRef();

  const basicDialogFooter = (
    <>
      <Button
        type="button"
        label="Cancel"
        onClick={() => setShow(false)}
        icon="pi pi-times"
        className="p-button-secondary"
      />
      <Button
        label="Save"
        className="p-button-raised p-button-info"
        icon="pi pi-check"
        onClick={() => {
          if (request !== "") {
            setShow(false);
            setData((prevData) => [...prevData, { name: request }]);
            toast.current.show({
              severity: "success",
              summary: "Success",
              detail: "New Prayer Request Added",
              life: 3000,
            });
          } else {
            toast.current.show({
              severity: "error",
              summary: "Invalid Input",
              detail: "Please Enter a Prayer request",
              life: 4000,
            });
          }
        }}
      />
    </>
  );

  const isDesktop = () => {
    return window.innerWidth > 991;
  };
  const {
    firstName,
    lastName,
    middleName,
    phoneNumber,
    physicalAddress,
    emailAddress,
    yearJoined,
    occupation,
    nin,
  } = person;
  return (
    <>
      <div className="col-12">
        <div className="p-fluid formgrid grid border-round border-1 surface-border p-4">
          <div className="field col-12 md:col-12">
            <h5>Personal Details</h5>
          </div>

          <div className="field col-12 md:col-4 mb-5">
            <h6 className="p-component">First Name:</h6>
            <span className="p-text-secondary">{firstName}</span>
          </div>

          <div className="field col-12 md:col-4 mb-5">
            <h6 className="p-component">Last Name:</h6>
            <span className="p-text-secondary">{lastName}</span>
          </div>

          <div className="field col-12 md:col-4 mb-5">
            <h6 className="p-component">Middle Name:</h6>
            <span className="p-component">{middleName}</span>
          </div>

          <div className="field col-12 md:col-4 mb-5">
            <h6 className="p-component">Phone Number:</h6>
            <span className="p-text-secondary">{phoneNumber}</span>
          </div>

          <div className="field col-12 md:col-4 mb-5">
            <h6 className="p-component">Email Address:</h6>
            <span className="p-text-secondary">{emailAddress}</span>
          </div>

          <div className="field col-12 md:col-4 mb-5">
            <h6 className="p-component">Location:</h6>
            <span className="p-text-secondary">{physicalAddress}</span>
          </div>

          <div className="field col-12 md:col-4 mb-5">
            <h6 className="p-component">Year Joined:</h6>
            <span className="p-text-secondary">{yearJoined}</span>
          </div>

          <div className="field col-12 md:col-4 mb-5">
            <h6 className="p-component">NIN:</h6>
            <span className="p-text-secondary">{nin}</span>
          </div>

          <div className="field col-12 md:col-4 mb-5">
            <h6 className="p-component">Occupation:</h6>
            <span className="p-text-secondary">{occupation}</span>
          </div>

          <div className="field col-12 md:col-12 mb-5">
            <h6 className="p-component">Prayer Requests:</h6>
            {requestData.length < 1 ? (
              <h6 className="p-text-secondary">No Prayer Requests Yet!</h6>
            ) : (
              requestData.map((req, i) => (
                <p key={i} className="p-text-secondary">
                  {req.name}
                </p>
              ))
            )}
            <div
              style={{
                width: "fit-content",
              }}
            >
              <Button
                label="New"
                icon="pi pi-plus"
                onClick={() => setShow(true)}
                className="p-button-raised p-button-info"
              />
            </div>
          </div>
        </div>
      </div>

      <Toast ref={toast} />

      <Dialog
        header="New Prayer Request"
        visible={show}
        style={{ height: "fit-content" }}
        modal
        footer={basicDialogFooter}
        onHide={() => setShow(false)}
        className={isDesktop() ? "col-6" : "col-12"}
      >
        <div className=" p-fluid formgrid grid">
          <div className="field col-12 md:col-12 ">
            <label htmlFor="request">Enter Prayer Request</label>
            <InputTextarea
              placeholder="Your request"
              autoResize
              rows="3"
              value={request}
              onChange={(e) => setRequest(e.target.value)}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}
