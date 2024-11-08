export const getProjects = () => {
  let projects = JSON.parse(localStorage.getItem("projects"));
  if (!projects) {
    return [];
  }

  return projects;
};

export const generateProjNo = () => {
  let projNo = parseInt(JSON.parse(localStorage.getItem("projNo")));
  if (!projNo) {
    projNo = 1;

    localStorage.setItem("projNo", projNo);
    return projNo;
  }

  projNo = projNo + 1;
  localStorage.setItem("projNo", projNo);
  return projNo;
};
