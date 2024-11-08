export const getWorksOn = () => {
  let worksOns = JSON.parse(localStorage.getItem("worksOns"));
  if (!worksOns) {
    return [];
  }

  return worksOns;
};
