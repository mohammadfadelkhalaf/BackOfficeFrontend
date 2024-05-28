import deleteOrderById from "@/utils/deleteOrderById";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import Swal from "sweetalert2";
import { Box, Button, Modal, TableCell, TableRow } from "@mui/material";
import OrderUpdateForm from "../OrderUpdateForm/OrderUpdateForm";
import { useRouter } from "next/navigation";
import { useOrders } from "@/ApiProviders/OrdersProvider";
import getOrders from "@/utils/getOrders";
import "react-toastify/dist/ReactToastify.css";
const SingleOrder = ({ order, setOrder }) => {
  const { orders, error, loading, setOrders } = useOrders();

  const { id, userId, courseBatchId, paidAmount, userName, email, batch } =
    order;
  const router = useRouter();

  // modal operations
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "white",
    borderRadius: "0.5rem",
    boxShadow: 24,
    p: 2,
    width: "80%",
    height: "45%",
    maxWidth: 800,
    "@media (max-width: 600px)": {
      width: "85%",
      maxWidth: "85%",
    },
  };

  // delete operation
  const handleDelete = async (orderId: number) => {
    const confirmationResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    if (confirmationResult.isConfirmed) {
      try {
        const result = await deleteOrderById(orderId);
        console.log("Delete result:", result); // todo undefined fix
        toast.success("Order deleted successfully", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        // get all orders again
        const orderData = await getOrders();
        setOrders(orderData);
        router.push("/orders");
      } catch (error) {
        console.error("Error deleting course:", error);

        toast.error("Failed to delete course", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen flex justify-center items-center">
        <div className="max-w-screen-lg w-full bg-white shadow-md rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Order Details</h2>
            <table className="w-full">
              <tbody>
                <tr>
                  <td className="font-semibold">Order ID:</td>
                  <td>{id}</td>
                </tr>
                <tr>
                  <td className="font-semibold">User ID:</td>
                  <td>{userId}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Course Batch ID:</td>
                  <td>{courseBatchId}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Paid Amount:</td>
                  <td>${paidAmount}</td>
                </tr>
                <tr>
                  <td className="font-semibold">User Name:</td>
                  <td>{userName}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Email:</td>
                  <td>{email}</td>
                </tr>
                <tr>
                  <td className="font-semibold">Batch:</td>
                  <td>{batch?.batchName}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="p-4 bg-gray-100 flex justify-end">
            <button
              className="px-4 py-2 bg-blue-500 text-white rounded mr-2"
              onClick={handleOpen}
            >
              Update
            </button>
            <button
              className="px-4 py-2 bg-red-500 text-white rounded"
              onClick={() => handleDelete(id)}
            >
              Delete
            </button>
          </div>
          {/* Modal */}
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <OrderUpdateForm
                updatableOrder={order}
                // refetch={refetch}
                handleClose={handleClose}
                setOrder={setOrder}
              ></OrderUpdateForm>
            </Box>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default SingleOrder;
