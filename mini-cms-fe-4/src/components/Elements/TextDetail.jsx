/* eslint-disable react/prop-types */
const TextDetail = ({ label, children }) => {
  return (
    <div className="tw-grid tw-grid-cols-2">
      <span className="tw-font-medium">{label}</span>
      <span>{children ? children : "-"}</span>
    </div>
  );
};

export default TextDetail;
