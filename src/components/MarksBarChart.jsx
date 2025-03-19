import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  LabelList,
} from "recharts";

const MarksBarChart = ({ data }) => {
  return (
    <div className='bg-gray-50 p-4 rounded-lg mb-6'>
      <h3 className='text-lg font-semibold text-gray-800 mb-4'>
        Marks Overview
      </h3>
      <ResponsiveContainer width='100%' height={350}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 50 }}
        >
          <CartesianGrid strokeDasharray='3 3' />
          <XAxis dataKey='date' tick={{ fontSize: 12 }} />
          <YAxis />
          <Tooltip
            formatter={(value, name, props) => [
              `${props.payload.examName}: ${value} Marks`,
              "Exam",
            ]}
          />
          <Legend />
          <Bar dataKey='marks' fill='#4f46e5' barSize={40}>
            {/* Display marks on top of bars */}
            <LabelList dataKey='marks' position='top' fill='#333' />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MarksBarChart;
