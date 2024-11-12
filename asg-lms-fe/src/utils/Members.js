export const getMembers = () => {
  let members = JSON.parse(localStorage.getItem("members"));
  if (!members) {
    return [];
  }

  return members;
};

export const generateMemberId = () => {
  let id = parseInt(JSON.parse(localStorage.getItem("memberId")));
  if (!id) {
    id = 1;

    localStorage.setItem("memberId", id);
    return id;
  }

  id = id + 1;
  localStorage.setItem("memberId", id);
  return id;
};
