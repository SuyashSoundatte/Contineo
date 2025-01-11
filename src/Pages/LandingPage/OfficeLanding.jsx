import ReactTable from "../../components/ReactTable";

const OfficeLanding = () => {
  // Define the button action that will be called when the button is clicked
  const handleButtonClick = (row) => {
    alert(`Button clicked for: ${row.fname} ${row.lname}`);
  };

  return (
    <>
      <h1>Office</h1>
      <div className="container mx-auto my-8 p-6 max-w-5xl bg-gray-50 border border-gray-200 rounded-lg shadow">
        <ReactTable buttonAction={handleButtonClick} />
      </div>
    </>
  );
};

export default OfficeLanding;
