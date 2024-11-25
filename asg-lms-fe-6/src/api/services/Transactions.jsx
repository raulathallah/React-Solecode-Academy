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

export { borrowBook, getAllBorrow, returnBook };
