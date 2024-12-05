import axios from "axios";
import Api from "../Api";

const borrowBook = async (body, callback, errorcallback, config) => {
  await axios
    .post(`http://localhost/api/transactions/borrow`, body, config) //API TIDAK TERSEDIA
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
};

const returnBook = async (body, callback, errorcallback, config) => {
  await axios
    .post(`http://localhost/api/transactions/return`, body, config) //API TIDAK TERSEDIA
    .then((res) => {
      if (callback != null) {
        callback(res);
      }
    })
    .catch((err) => {
      if (errorcallback != null) {
        errorcallback(err);
      }
    });
};

const getAllBorrow = async () => {
  try {
    return await Api.get(`/api/stocks/transactions/all`); //API TIDAK TERSEDIA
  } catch (err) {
    return err;
  }
};
const getAllRequestList = async () => {
  try {
    return await Api.get(`/api/stocks/request/list`);
  } catch (err) {
    return err;
  }
};
const getAllRequestListPaged = async (body, searchParams) => {
  try {
    return await Api.post(`/api/stocks/request/list`, body, {
      params: searchParams,
    });
  } catch (err) {
    return err;
  }
};

const bookRequest = async (body) => {
  try {
    return await Api.post(`/api/stocks/book-request`, body);
  } catch (err) {
    return err;
  }
};

const getBookRequestDetail = async (id) => {
  try {
    return await Api.get(`/api/stocks/request/${id}`);
  } catch (err) {
    return err;
  }
};

const bookApproval = async (body) => {
  try {
    return await Api.post(`/api/stocks/book-approval`, body);
  } catch (err) {
    return err;
  }
};

export {
  borrowBook,
  getAllBorrow,
  returnBook,
  getAllRequestList,
  bookRequest,
  getBookRequestDetail,
  bookApproval,
  getAllRequestListPaged,
};
