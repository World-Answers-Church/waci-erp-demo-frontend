import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import { Button } from "primereact/button";
import { Column } from "primereact/column";
import { CurrencyFormater } from "../utils/currencyFormatter";
import { Dialog } from "primereact/dialog";
import { InputText } from "primereact/inputtext";
import { Toast } from "primereact/toast";
import { InputTextarea } from "primereact/inputtextarea";
import { Dropdown } from "primereact/dropdown";
import { churchPlans } from "../constants/dummy/churchPlans";
import { churchMembers } from "../constants/dummy/churchMembers";
import { useData } from "../context/pageContent";
import getDate from "../utils/getDate";
export default function Payments() {
  const [plan, setValue10] = useState({});
  const [name, setValue1] = useState({});
  const [displayBasic, setDisplayBasic] = useState(false);
  const [amount, setAmount] = useState(0);
  const [description, setDescription] = useState("");
  const toast = useRef();

  const { payments, addPayment } = useData();
  console.log(payments)
  const payment = {
    person: name.name,
    plan: name.name,
    amount,
    description,
    date: getDate(),
  };
  const showSuccess = () => {
    addPayment(payment);
    console.log(payment);
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Payment Added Successfully",
      life: 3000,
    });
    setDisplayBasic(false);
  };

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
        onClick={showSuccess}
      />
    </>
  );
  return (
    <div className="col-12">
      <div className="card">
        <div className="">
          <h5>Church Payments</h5>
          <Button
            label="Make Payment"
            icon="pi pi-plus"
            style={{ marginRight: ".5em" }}
            onClick={() => setDisplayBasic(true)}
          />
        </div>
        <DataTable
          paginator
          value={payments}
          className="mt-3 "
          rows={10}
          dataKey="id"
          filterDisplay="menu"
          responsiveLayout="scroll"
          emptyMessage="No Payments found."
        >
          <Column
            field="person"
            header="Name"
            style={{ flexGrow: 1, flexBasis: "160px" }}
          ></Column>
          <Column
            field="amount"
            header="Payment"
            style={{ flexGrow: 1, flexBasis: "160px" }}
          ></Column>
          <Column
            field="date"
            header="Date"
            style={{ flexGrow: 1, flexBasis: "160px" }}
          ></Column>
          {/* <Column field="minPledge" header="Minimum Pledge" style={{ flexGrow: 1, flexBasis: '160px' }}></Column> */}
        </DataTable>
        <Toast ref={toast} />
        <Dialog
          header="Add Payment"
          visible={displayBasic}
          style={{ width: "40vw", height: "fit-content" }}
          modal
          footer={basicDialogFooter}
          onHide={() => setDisplayBasic(false)}
        >
          <div className=" p-fluid">
            {/* <h5>Vertical</h5> */}
            <div className="field">
              <label htmlFor="name1">Member Name</label>
              <Dropdown
                id="dropdown"
                options={churchMembers}
                value={name}
                onChange={(e) => setValue1(e.value)}
                optionLabel="name"
              ></Dropdown>
            </div>
            <div className="field">
              <label htmlFor="email1">Amount</label>
              <InputText
                id="target1"
                type="number"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="plan">Plan</label>
              <Dropdown
                id="dropdown"
                options={churchPlans}
                value={plan}
                onChange={(e) => setValue10(e.value)}
                optionLabel="name"
              ></Dropdown>
              {/* <label htmlFor="dropdown">Dropdown</label> */}
            </div>
            <div className="field ">
              <label htmlFor="address">Description</label>
              <InputTextarea
                id="address"
                rows="4"
                draggable={false}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </Dialog>
      </div>
    </div>
  );
}
