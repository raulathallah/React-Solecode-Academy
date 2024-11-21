import { useEffect, useState } from "react";
import { getAllBook } from "../api/Books";
import { getAllUser } from "../api/Users";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import Loading from "../components/Elements/Loading";
import ErrorMessage from "../utils/ErrorMessage";

const fetchBooks = async () => {
  const { data } = await getAllBook();
  return data;
};

const fetchUsers = async () => {
  const { data } = await getAllUser();
  return data;
};

const Home = () => {
  const {
    data: books,
    isLoading: isLoadingBooks,
    isError: isErrorBooks,
    error: errorBooks,
  } = useQuery({
    queryKey: ["books"],
    queryFn: () => fetchBooks(),
    placeholderData: keepPreviousData,
  });

  const {
    data: users,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
    error: errorUsers,
  } = useQuery({
    queryKey: ["users"],
    queryFn: () => fetchUsers(),
    placeholderData: keepPreviousData,
  });

  if (isLoadingUsers && isLoadingBooks) {
    return <Loading />;
  }

  if (isErrorBooks && errorBooks) {
    return ErrorMessage(errorBooks.message);
  }
  if (isErrorUsers && errorUsers) {
    return ErrorMessage(errorUsers.message);
  }

  return (
    <div>
      <p className="d-flex gap-2">
        Total Books available:
        <span className="fw-bold">{books.length}</span>
      </p>
      <p className="d-flex gap-2">
        Total Member available:
        <span className="fw-bold">{users.length}</span>
      </p>
    </div>
  );
};

export default Home;
