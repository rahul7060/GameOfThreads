import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import authServices from "../service/authServices";
import Swal from "sweetalert2";

const Logout = () => {
    const navigate = useNavigate();

    // perform the logout function
    useEffect(() => {
       authServices.lout()
            .then((response) => {
                // alert(response.data.message);
  Swal.fire({
          title: "Success!",
          text: response.data.message,
          icon: "success",
          showConfirmButton: false,
          timer: 2000, // Auto close in 2 seconds
        });
                setTimeout(() => {
                    navigate("/Login", { replace: true });
                }, 500);
            })
            .catch(error => {
                alert(error.response.data.message);
            });

    }, []);

    return (
        <div>Logging out...</div>
    )
};


export default Logout;