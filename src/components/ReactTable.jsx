import DataTable from "react-data-table-component";
import { useState } from "react";

function ReactTable () {
    const columns = [
        {
            id: 'Id',
            selector: row => row.id,
            sortable: true
        },
        {
            name: "Fname",  
            selector: row => row.fname,
            sortable: true
        },
        {
            name: "Mname",  
            selector: row => row.mname,
            sortable: true
        },
        {
            name: "Lname",  
            selector: row => row.lname,
            sortable: true
        },
        {
            name: "Role",  
            selector: row => row.role,
            sortable: true
        }
    ];

    const data = [  
        {
            id: 1,
            fname: "John",
            mname: "Doe",
            lname: "Smith",
            role: "Admin"
        },
        {
            id: 2,
            fname: "Jane",
            mname: "Alice",
            lname: "Doe",
            role: "User"
        },
        {
            id: 3,
            fname: "Michael",
            mname: "David",
            lname: "Brown",
            role: "Moderator"
        }
    ];

    const [records, setRecords] = useState(data);

    const handleFilter = (e) => {
        const newData = data.filter(row => {
            return row.fname.toLowerCase().includes(e.target.value.toLowerCase());
        })
        setRecords(newData);
    }

    return (
        <>
            <div className="container mt-5">
                <div className="text-end">
                    <input type="text" onChange={handleFilter} placeholder="Search by first name" />
                </div>
                <DataTable
                    columns={columns}
                    data={records}
                    selectableRows
                    fixedHeader
                    pagination
                />
            </div>
        </>
    )
}

export default ReactTable;
