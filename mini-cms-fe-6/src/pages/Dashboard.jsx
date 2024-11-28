import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { fetchAllEmployees } from "../api/Fetchs/FetchEmployees";
import { useEffect, useState } from "react";
import Loading from "../components/Elements/Loading";

const Dashboard = () => {
  const [employees, setEmployees] = useState([]);
  const { data: listE, isLoading } = useQuery({
    queryKey: ["allEmployees"],
    queryFn: () => fetchAllEmployees(),
    placeholderData: keepPreviousData,
  });

  useEffect(() => {
    if (listE) {
      setEmployees(listE);
    }
  }, [listE]);

  if (isLoading) {
    return <Loading />;
  }

  return <p>Total Employee: {employees.length}</p>;
};

export default Dashboard;
