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
            fname: "Fname",
            selector: row => row.fname,
            sortable: true
        },
        {
            mname: "Mname",
            selector: row => row.mname,
            sortable: true
        },
        {
            lname: "Lname",
            selector: row => row.lname,
            sortable: true
        },
        {
            role: "Role",
            selector: row => row.role,
            sortable: true
        }
    ];
    
    const data = [  
        {
            id: id,
            fname: fname,
            mname: mname,
            lname: lname,
            role: role
        }
    ]

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
                <div className="text-end "><input type="text" onChange={handleFilter} /></div>
                <DataTable>
                    columns={columns}
                    data={records}
                    selectableRows
                    fixedHeader
                    pagination
                </DataTable>
            </div>
        </>
    )
}

export default ReactTable
