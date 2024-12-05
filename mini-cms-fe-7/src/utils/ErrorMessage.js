import Swal from "sweetalert2";

const ErrorMessage = (message) => {
  Swal.fire({
    position: "center",
    icon: "error",
    title: "Error!",
    text: message,
    showConfirmButton: true,
  });
};

export default ErrorMessage;
