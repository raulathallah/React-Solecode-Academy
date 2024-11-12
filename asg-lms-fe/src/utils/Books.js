export const getBooks = () => {
  let books = JSON.parse(localStorage.getItem("books"));
  if (!books) {
    return [];
  }

  return books;
};

export const generateBookId = () => {
  let id = parseInt(JSON.parse(localStorage.getItem("bookId")));
  console.log(id);
  if (!id) {
    id = 1;

    localStorage.setItem("bookId", id);
    return id;
  }

  id = id + 1;
  localStorage.setItem("bookId", id);
  return id;
};
