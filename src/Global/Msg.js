import Swal from "sweetalert2";

export const SUCCESS = (msg) =>
  Swal.fire({
    position: "center",
    icon: "success",
    title: msg,
    showConfirmButton: false,
    timer: 2000,
  });

export const ERROR = (msg) =>
  Swal.fire({
    position: "center",
    icon: "error",
    title: msg,
    showConfirmButton: false,
    timer: 2000,
  });
