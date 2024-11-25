import Api from "../Api";

const getAllBook = async () => {
  try {
    return await Api.get(`/api/books`);
  } catch (err) {
    return err;
  }
};

const getAllBookSearchPaged = async (body, searchParams) => {
  try {
    return await Api.post(`/api/books/search`, body, {
      params: searchParams,
    });
  } catch (err) {
    return err;
  }
};

const getBook = async (id) => {
  try {
    return await Api.get(`/api/books/${id}`);
  } catch (err) {
    return err;
  }
};

const updateBook = async (id, body) => {
  try {
    return await Api.put(`/api/books/${id}`, body);
  } catch (err) {
    return err;
  }
};

const addBook = async (body) => {
  try {
    return await Api.post(`/api/books`, body);
  } catch (err) {
    return err;
  }
};

const deleteBook = async (id, body) => {
  try {
    return await Api.delete(`/api/books/${id}`, {
      data: body,
    });
  } catch (err) {
    return err;
  }
};

export {
  getAllBook,
  getBook,
  updateBook,
  addBook,
  deleteBook,
  getAllBookSearchPaged,
};
