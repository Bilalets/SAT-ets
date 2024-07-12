import React from 'react';

type GeneralHeaderProps = {
  myTitle: string;
};
const GeneralHeader: React.FC<GeneralHeaderProps> = ({ myTitle }) => {
  return (
    <div className="flex justify-between -mt-12 relative z-10 mr-6">
      <div className="flex items-center ml-10">
        <p className="text-xl">{myTitle}</p>
      </div>
    </div>
  );
};

export default GeneralHeader;
