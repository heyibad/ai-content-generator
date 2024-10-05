import React from "react";
import HistoryTable from "../_components/HistoryTable";

const Page = () => {
    return (
        <div className="bg-white m-5 p-4 dark:bg-[#18181B] dark:text-white rounded h-screen">
            <div className="py-2">
                {" "}
                <h1 className="text-3xl font-extrabold">History</h1>
                <p className="py-1 text-gray-600">Search your all previous ai generated content</p>{" "}
            </div>
            <div>
              <HistoryTable />  
            </div>
          
        </div>
    );
};

export default Page;
