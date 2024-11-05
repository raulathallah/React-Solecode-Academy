export const getBooks = () => {
  let books = JSON.parse(localStorage.getItem("books"));
  if (!books) {
    return [];
  }

  return books;
};

export const generateBookId = () => {
  let id = parseInt(JSON.parse(localStorage.getItem("id")));
  console.log(id);
  if (!id) {
    id = 1;

    localStorage.setItem("id", id);
    return id;
  }

  id = id + 1;
  localStorage.setItem("id", id);
  return id;
};
