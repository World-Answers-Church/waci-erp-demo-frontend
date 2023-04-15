import React, { useState, useRef, useContext } from "react";
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
import { useData } from "../context/pageContent";
import getDate from "../utils/getDate";
import { AutoComplete } from "primereact/autocomplete";
import names from "../constants/dummy/names";
import { LayoutContext } from "../context/layoutcontext";
import { isPositiveNumber } from "../utils/validations";
import BaseApiService from "../utils/BaseApiService";

export default function Payments() {
  const [plan, setPlan] = useState({});
  const [name, setName] = useState("");
  const [displayBasic, setDisplayBasic] = useState(false);
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const toast = useRef();
  const { payments } = useData();
  const [suggestions, setSuggestions] = useState([]);

  const { isDesktop } = useContext(LayoutContext);

  const handleSelect = (event) => {
    setName(event.value);
  };
  const handleSearch = (event) => {
    let filteredSuggestions = [];
    console.log(event);
    if (event.query.trim().length > 0) {
      filteredSuggestions = names.filter((item) => {
        return item.label.toLowerCase().includes(event.query.toLowerCase());
      });
    }

    setSuggestions(filteredSuggestions);
  };

  const paymentInfo = {
    person: name.label,
    plan: plan.name,
    amount: Number(amount),
    description,
    date: getDate(),
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
    setAmount("");
    setName("");
    setPlan({});
    setDescription("");
  }

  async function addPayment(data) {
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

  const handleSubmit = async () => {
    let isValid = true;
    if (typeof name !== typeof {}) {
      showToast("Please choose a name");
      isValid = false;
    }
    if (!plan.name) {
      showToast("What is the payment for?");
      isValid = false;
    }
    if (!isPositiveNumber(amount)) {
      showToast("Enter a valid amount");
      isValid = false;
    }

    if (isValid === true) {
      const saved = await addPayment(paymentInfo);

      console.log(paymentInfo);
      if (saved === true) {
        toast.current.show({
          severity: "success",
          summary: "Success",
          detail: "Payment Added Successfully",
          life: 3000,
        });
        clearForm();
        setDisplayBasic(false);
      } else {
        let message = "An error occured while adding the Payment, please try agin later!";
        showToast(message, "error", "Error");
        setDisplayBasic(false);
      }
    }
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
        onClick={() => handleSubmit()}
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
            header="Amount"
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
          style={{ height: "fit-content" }}
          modal
          footer={basicDialogFooter}
          onHide={() => setDisplayBasic(false)}
          className={isDesktop() ? "col-6" : "col-12"}
        >
          <div className=" p-fluid">
            <div className="field">
              <label htmlFor="name1">Member Name</label>

              <AutoComplete
                value={name}
                suggestions={suggestions}
                completeMethod={handleSearch}
                field="label"
                placeholder="Enter a name"
                minLength={1}
                onChange={handleSelect}
              />
            </div>
            <div className="field">
              <label htmlFor="email1">Amount</label>
              <InputText
                id="target1"
                type="text"
                required
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
            <div className="field">
              <label htmlFor="plan">Payment For</label>
              <Dropdown
                id="dropdown"
                options={churchPlans}
                value={plan}
                onChange={(e) => setPlan(e.value)}
                optionLabel="name"
              ></Dropdown>
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
