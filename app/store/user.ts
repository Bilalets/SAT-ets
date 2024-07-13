// Import useState for state management
import { create } from "zustand";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useEffect } from "react";
import { getEmail, setEmail } from "../libs/myeail";


// Define the store interface
interface AppState {
  getData: { id: string } | undefined;
  getRecord: Record[] | undefined;
  getuserposition: number | undefined;
  fetchUserId: (email: string) => void;
  fetchRecords: (userId: string) => void;
  fetchUserPosition: (id: string) => void;
}

// Define the record interface
interface Record {
  Percentage: string;
  Correctawn: string;
  Wrongawn: string;
  subjectname: string;
  createdAt: string;
}

// Define the ID interface
interface ID {
  id: string;
}

// Create the store using zustand
const useAppStore = create<AppState>((set) => ({
  getData: undefined,
  getRecord: undefined,
  getuserposition: undefined,
  fetchUserId: async (email: string) => {
    try {
      const response = await axios.post("/api/Getuserid", { email }, { headers: { "Cache-Control": "no-store" } });
      console.log(response.data)
      set({ getData: response.data });
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  },
  fetchRecords: async (userId: string) => {
    try {
      const response = await axios.post("/api/Service/Subrecord", { userId }, { headers: { "Cache-Control": "no-store" } });
      set({ getRecord: response.data });
    } catch (error) {
      console.error("Error fetching records:", error);
    }
  },
  fetchUserPosition: async (id: string) => {
    try {
      const response = await axios.post("/api/Userposition", { userId: id }, { headers: { "Cache-Control": "no-store" } });
      set({ getuserposition: response.data.rank }); // Extract rank from response data
    } catch (error) {
      console.error("Error fetching user position:", error);
    }
  },
}));

// Custom hook to use the store
const useAppContext = () => {
  const userEmail=getEmail()

  const getData = useAppStore((state) => state.getData);
  const getRecord = useAppStore((state) => state.getRecord);
  // Corrected variable name
  const fetchUserId = useAppStore((state) => state.fetchUserId);
  const fetchRecords = useAppStore((state) => state.fetchRecords);

  // Fetch user ID when session changes (assuming session holds email)
  useEffect(() => {
    if (userEmail) {
      fetchUserId(userEmail);
    }
    // Add fetchUserId to the dependency array
  }, [ userEmail,fetchUserId]);

  // Fetch records when getData?.id changes (ensures data exists before access)
  useEffect(() => {
    if (getData?.id) {
      fetchRecords(getData.id);
    }
    // Add fetchRecords and getData to the dependency array
  }, [getData?.id, fetchRecords]);

  // Fetch user position when getData?.id changes (consistent logic)

  return { getData, getRecord,userEmail }; // Consistent naming
};

// Export the custom hook
export default useAppContext;
