import Swal from "sweetalert2";

const FailedAlert = (msg) => {
    return  Swal.fire({
        position: "center",
        icon: "error",
        title: `${msg}`,
        showConfirmButton: false,
        timer: 1500,
      });
};

export default FailedAlert;