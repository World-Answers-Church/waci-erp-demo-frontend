import React, { useState, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Button } from 'primereact/button';
import { Column } from 'primereact/column';
import { CurrencyFormater } from '../utils/currencyFormatter';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Toast } from 'primereact/toast';
import { InputTextarea } from 'primereact/inputtextarea';
import { useData } from '../layout/context/pageContent';

export default function Plans() {
    const [displayBasic, setDisplayBasic] = useState(false);
    const toast = useRef();
    const [name, setName] = useState('');
    const [target, setTaget] = useState(0);
    const [description, setDescription] = useState('');
    const [min, setMin] = useState(0);
    const {plans, addPlan} = useData();

    const plan = {
        name,
        targetAmount:target,
        description,
        minPledge:min
    };
    const showSuccess = () => {
        //
        console.log(plan)
        addPlan(plan)
        toast.current.show({ severity: 'success', summary: 'Success', detail: 'Plan Added Successfully', life: 3000 });
        setDisplayBasic(false);
    };

    const basicDialogFooter = (
        <>
            <Button type="button" label="Cancel" onClick={() => setDisplayBasic(false)} icon="pi pi-times" className="p-button-secondary" />
            <Button label="Save" className="p-button-raised p-button-success" icon="pi pi-check" onClick={showSuccess} />
        </>
    );
    return (
        <div className="col-12">
            <div className="card">
                <div className="">
                    <h5>Church Plans</h5>
                    <Button label="Add Plan" icon="pi pi-plus" style={{ marginRight: '.5em' }} onClick={() => setDisplayBasic(true)} />
                </div>
                <DataTable value={plans} paginator className="mt-3 " rows={10} dataKey="id" filterDisplay="menu" responsiveLayout="scroll" emptyMessage="No Plans found.">
                    <Column field="name" header="Name" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                    <Column field="targetAmount" header="Target" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                    {/* <Column field="progress" header="Progress" style={{ flexGrow: 1, flexBasis: '160px' }}></Column> */}
                    <Column field="minPledge" header="Minimum Pledge" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                    <Column field="numberOfPledges" header="Pledges" style={{ flexGrow: 1, flexBasis: '160px' }}></Column>
                </DataTable>
                <Toast ref={toast} />
                <Dialog header="Add Plan" visible={displayBasic} style={{ width: '40vw', height: 'fit-content' }} modal footer={basicDialogFooter} onHide={() => setDisplayBasic(false)}>
                    <div className=" p-fluid">
                        {/* <h5>Vertical</h5> */}
                        <div className="field">
                            <label htmlFor="name1">Name</label>
                            <InputText id="name1" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>
                        <div className="field">
                            <label htmlFor="email1">Target Amount</label>
                            <InputText id="target1" type="number" value={target} onChange={(e) => setTaget(e.target.value)} />
                        </div>
                        <div className="field">
                            <label htmlFor="age1">Mininum Pledge</label>
                            <InputText id="min1" type="number" value={min} onChange={(e) => setMin(e.target.value)} />
                        </div>
                        <div className="field ">
                            <label htmlFor="address">Description</label>
                            <InputTextarea id="address" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} />
                        </div>
                    </div>
                </Dialog>
            </div>
        </div>
    );
}
