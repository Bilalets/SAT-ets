import { create } from "zustand";
import axios from "axios";
import { useEffect } from "react";
import { getEmail } from "../libs/myeail";

// Define the store interface
interface AppState {
  getData: { id: string } | undefined;
  getRecord: Record[] | undefined;
  getUserPosition: number | undefined;
  allServicesData: Test[] | undefined;
  loading: boolean;
  fetchUserId: (email: string) => void;
  fetchRecords: (userId: string) => void;
  fetchUserPosition: (id: string) => void;
  fetchAllServicesData: () => void;
}

// Define the record and other interfaces
interface Record {
  Percentage: string;
  Correctawn: string;
  Wrongawn: string;
  subjectname: string;
  createdAt: string;
}

interface Chapter {
  id: string;
  name: string;
}

interface Subject {
  id: string;
  name: string;
  chapters: Chapter[];
}

interface Subcategory {
  id: string;
  name: string;
  subject: Subject[];
}

interface Category {
  id: string;
  name: string;
  Desc: string;
  Prep: string;
  Subs: string[];
  subcategory: Subcategory[];
}

interface Test {
  id: string;
  name: string;
  category: Category[];
}

// Create the store using zustand
const useAppStore = create<AppState>((set, get) => ({
  getData: undefined,
  getRecord: undefined,
  getUserPosition: undefined,
  allServicesData: undefined,
  loading: false,
  fetchUserId: async (email: string) => {
    const { getData } = get();
    if (!getData) {
      set({ loading: true });
      try {
        const response = await axios.post("/api/Getuserid", { email }, { headers: { "Cache-Control": "no-store" } });
        set({ getData: response.data });
      } catch (error) {
        console.error("Error fetching user ID:", error);
      } finally {
        set({ loading: false });
      }
    }
  },
  fetchRecords: async (userId: string) => {
    const { getRecord } = get();
    if (!getRecord) {
      set({ loading: true });
      try {
        const response = await axios.post("/api/Service/Subrecord", { userId }, { headers: { "Cache-Control": "no-store" } });
        set({ getRecord: response.data });
      } catch (error) {
        console.error("Error fetching records:", error);
      } finally {
        set({ loading: false });
      }
    }
  },
  fetchUserPosition: async (id: string) => {
    const { getUserPosition } = get();
    if (getUserPosition === undefined) {
      set({ loading: true });
      try {
        const response = await axios.post("/api/Userposition", { userId: id }, { headers: { "Cache-Control": "no-store" } });
        set({ getUserPosition: response.data.rank }); // Extract rank from response data
      } catch (error) {
        console.error("Error fetching user position:", error);
      } finally {
        set({ loading: false });
      }
    }
  },
  fetchAllServicesData: async () => {
    const { allServicesData } = get();
    if (!allServicesData) {
      set({ loading: true });
      try {
        const response = await axios.get("/api/Allservices/", { headers: { "Cache-Control": "no-store" } });
        set({ allServicesData: response.data });
      } catch (error) {
        console.error("Error fetching all services data:", error);
      } finally {
        set({ loading: false });
      }
    }
  },
}));

// Custom hook to use the store
const useAppContext = () => {
  const userEmail = getEmail();

  const getData = useAppStore((state) => state.getData);
  const getRecord = useAppStore((state) => state.getRecord);
  const getUserPosition = useAppStore((state) => state.getUserPosition);
  const allServicesData = useAppStore((state) => state.allServicesData);
  const loading = useAppStore((state) => state.loading);

  const fetchUserId = useAppStore((state) => state.fetchUserId);
  const fetchRecords = useAppStore((state) => state.fetchRecords);
  const fetchUserPosition = useAppStore((state) => state.fetchUserPosition);
  const fetchAllServicesData = useAppStore((state) => state.fetchAllServicesData);

  // Fetch user ID when session changes (assuming session holds email)
  useEffect(() => {
    if (userEmail) {
      fetchUserId(userEmail);
    }
  }, [userEmail, fetchUserId]);

  // Fetch records when getData?.id changes (ensures data exists before access)
  useEffect(() => {
    if (getData?.id) {
      fetchRecords(getData.id);
    }
  }, [getData?.id, fetchRecords]);

  // Fetch user position when getData?.id changes (consistent logic)
  useEffect(() => {
    if (getData?.id) {
      fetchUserPosition(getData.id);
    }
  }, [getData?.id, fetchUserPosition]);

  // Fetch all services data on initial load
  useEffect(() => {
    fetchAllServicesData();
  }, [fetchAllServicesData]);

  return { getData, getRecord, getUserPosition, allServicesData, loading, userEmail };
};

// Export the custom hook
export default useAppContext;
