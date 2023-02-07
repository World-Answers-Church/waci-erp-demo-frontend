import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { InputText } from 'primereact/inputtext';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import {useData} from '../context/pageContent'
import { Toast } from 'primereact/toast';
import { Dialog } from 'primereact/dialog';
export default function Members() {
    const [globalFilterValue1, setGlobalFilterValue1] = useState('');
    const [filters1, setFilters1] = useState(null);
    const { members, addMember } = useData();
    const [displayBasic, setDisplayBasic] = useState(false);
    const [name, setName] = useState('');
    const [contact, setContact] = useState('');
    const [location, setLocation] = useState('');

    const memberData ={
        name,
        contact,
        location
    }


    const initFilters1 = () => {
        setFilters1({
            // global: { value: null, matchMode: FilterMatchMode.CONTAINS },
            // name: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            // 'country.name': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            // representative: { value: null, matchMode: FilterMatchMode.IN },
            // date: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            // balance: { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            // status: { operator: FilterOperator.OR, constraints: [{ value: null, matchMode: FilterMatchMode.EQUALS }] },
            // activity: { value: null, matchMode: FilterMatchMode.BETWEEN },
            // verified: { value: null, matchMode: FilterMatchMode.EQUALS }
        });
        setGlobalFilterValue1('');
    };

    const clearFilter1 = () => {
        initFilters1();
    };

    const onGlobalFilterChange1 = (e) => {
        const value = e.target.value;
        let _filters1 = { ...filters1 };
        _filters1['global'].value = value;
        setFilters1(_filters1);
        setGlobalFilterValue1(value);
    };

    const toast = useRef();
    const showSuccess = () => {
        //
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Member Added Successfully', life: 3000 });
        setDisplayBasic(false);
        addMember(memberData)
        console.log(memberData)
    };
    const renderHeader1 = () => {
        return (
            <div className="flex justify-content-between">
                <Button type="button" icon="pi pi-filter-slash" label="Clear" className="p-button-outlined" onClick={clearFilter1} />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText value={globalFilterValue1} onChange={onGlobalFilterChange1} placeholder="Keyword Search" />
                </span>
            </div>
        );
    };
    const header1 = renderHeader1();
    const basicDialogFooter = (
        <>
            <Button type="button" label="Cancel" onClick={() => setDisplayBasic(false)} icon="pi pi-times" className="p-button-secondary" />
            <Button label="Save" className="p-button-raised p-button-success" icon="pi pi-check" onClick={showSuccess} />
        </>
    );
    return (
        <div className="col-12">
            <div className="card">
                <h5>Church Members</h5>
                <Button label="Add Member" icon="pi pi-user-plus" style={{ marginRight: '.5em' }} onClick={() => setDisplayBasic(true)} />
                <DataTable value={members} paginator className="mt-3 " showGridlines rows={10} dataKey="id" filters={filters1} filterDisplay="menu" responsiveLayout="scroll" emptyMessage="No Church Members found." header={header1}>
                    <Column field="name" header="Name" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                    <Column field="contact" header="Contact" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                    <Column field="location" header="Location" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                </DataTable>
                <Toast ref={toast} />
                <Dialog header="Add Church Member" visible={displayBasic} style={{ width: '40vw', height: 'fit-content' }} modal footer={basicDialogFooter} onHide={() => setDisplayBasic(false)}>
                    <div className=" p-fluid">
                        {/* <h5>Vertical</h5> */}
                        <div className="field">
                            <label htmlFor="name1">Member Name</label>
                            <InputText id="name1" type="text"  value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="field">
                            <label htmlFor="email1">Contact</label>
                            <InputText id="contact" type="text"  value={contact} onChange={(e) => setContact(e.target.value)}/>
                        </div>

                        <div className="field ">
                            <label htmlFor="address">Location</label>
                            <InputText id="address" required value={location} onChange={(e) => setLocation(e.target.value)}/>
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    );
}
