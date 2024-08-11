import { useUser } from "@clerk/clerk-react";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

export interface financialRecords {
  id: string;
  userId: string;
  description: string;
  amount: number;
  category: string;
  paymentMethod: string;
  date: Date;
}

interface financialRecordsContextType {
  records: financialRecords[];
  addRecord: (record: financialRecords) => void;

  updateRecord: (id: string, newRecord: financialRecords) => void;
  deleteRecord: (id: string) => void;
}

const FinanceContext = createContext<financialRecordsContextType | undefined>(
  undefined
);

export const FinanceProvider = ({ children }: { children: ReactNode }) => {
  const [records, setRecords] = useState<financialRecords[]>([]);
  const { user } = useUser();

  const updateRecord = async (id: string, newRecord: financialRecords) => {
    const response = await fetch(
      `http://localhost:5000/finance/api/update/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(newRecord),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    try {
      if (response.ok) {
        const newRecord = await response.json();
        setRecords((prev) =>
          prev.map((record) => {
            if (record._id === id) {
              return newRecord;
            } else {
              return record;
            }
          })
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteRecord = async (id: string) => {
    const response = await fetch(
      `http://localhost:5000/finance/api/delete/${id}`,
      {
        method: "DELETE",
      }
    );

    try {
      if (response.ok) {
        const deletedRecord = await response.json();
        setRecords((prev) =>
          prev.filter((record) => record._id !== deletedRecord._id)
        );
      }
    } catch (err) {
      console.log(err);
    }
  };

  const fetchData = async () => {
    try {
      if (!user) return;
      console.log(user.id);

      const res = await fetch(
        `http://localhost:5000/finance/api/all/${user.id}`
      );
      if (!res.ok) return;

      const data = await res.json();

      setRecords(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, [user]);
  console.log(records);

  const addRecord = async (record: financialRecords) => {
    try {
      const response = await fetch("http://localhost:5000/finance/api/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(record),
      });

      if (!response.ok) {
        // Handle HTTP errors
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      // setRecords((prev) => [...prev, data.data]);
      // console.log(records);
    } catch (error) {
      console.log(error);
    }
  };

  // const readRecord = async (record: financialRecords) => {
  //   try {
  //     const response = await fetch("http://localhost:5000/finance/api/read", {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(record),
  //     });

  //     if (!response.ok) {
  //       // Handle HTTP errors
  //       throw new Error(`HTTP error! status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     setRecords((prev)=>[...prev,data.data])
  //     console.log(records);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <FinanceContext.Provider value={{ records, addRecord,deleteRecord,updateRecord }}>
      {children}
    </FinanceContext.Provider>
  );
};

export default FinanceContext;

export const useCustomContext = () => {
  return useContext<financialRecordsContextType | undefined>(FinanceContext);
};
