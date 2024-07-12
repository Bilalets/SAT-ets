import { Select, Datepicker, Button } from 'flowbite-react';
import { HiOutlineSearch } from 'react-icons/hi';

interface heading {
  myTitle: string;
}
const SuperAdminHeader: React.FC<heading> = ({ myTitle }) => {
  const testTypes = ['Monthly Tests', 'Mid Term', 'Final Exam'];
  return (
    <div className="flex justify-between -mt-12 relative z-10 mr-6">
      <div className="flex items-center ml-10">
        <p className="text-xl">{myTitle}</p>
      </div>

      <div className="flex items-center justify-between gap-x-4">
        <div className="flex items-center">
          <div className="mr-4">
            <Datepicker placeholder="From" />
          </div>
          <Datepicker placeholder="To" />
        </div>

        <div className="flex items-center gap-x-2">
          <Select>
            <option>Select Type</option>
            {testTypes.map((item, i) => (
              <option key={i} value={item}>
                {item}
              </option>
            ))}
          </Select>
          <Button color="dark" pill>
            Search
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminHeader;
