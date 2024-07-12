import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from 'flowbite-react';

export const studentData = [
  {
    name: 'Shah Fahad',
    class: '2nd Year',
    rollNumber: '23123',
    branch: 'Branch A',
    result: '99%',
  },
  {
    name: 'Abdullah',
    class: '2nd Year',
    rollNumber: '23123',
    branch: 'Branch B',
    result: '98%',
  },
  {
    name: 'Wadood',
    class: '2nd Year',
    rollNumber: '23123',
    branch: 'Branch C',
    result: '95%',
  },
  {
    name: 'Zubair',
    class: '9th',
    rollNumber: '23123',
    branch: 'Branch D',
    result: '80%',
  },
];
const TopTen = () => {
  return (
    <div className=" overflow-auto">
      <p className="text-xl  mt-0 mb-12 text-left">Top five Students</p>
      <Table striped>
        <TableHead>
          <TableHeadCell>No</TableHeadCell>
          <TableHeadCell>Name</TableHeadCell>
          <TableHeadCell>Class</TableHeadCell>
          <TableHeadCell>Roll #</TableHeadCell>
          <TableHeadCell>Branch</TableHeadCell>
          <TableHeadCell>Result</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {studentData.map((item, index) => (
            <TableRow
              key={index}
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.name}
              </TableCell>
              <TableCell>{item.class}</TableCell>
              <TableCell>{item.rollNumber}</TableCell>
              <TableCell>{item.branch}</TableCell>
              <TableCell>{item.result}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TopTen;
