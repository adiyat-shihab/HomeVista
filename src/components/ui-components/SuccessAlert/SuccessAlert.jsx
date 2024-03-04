"use client"

import Swal from 'sweetalert2';

const SuccessAlert = (msg) => {
    return  Swal.fire({
        position: "center",
        icon: "success",
        title: `${msg}`,
        showConfirmButton: false,
        timer: 1500,
      });
};

export default SuccessAlert;