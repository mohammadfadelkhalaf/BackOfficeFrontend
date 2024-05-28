import { useOrders } from "@/ApiProviders/OrdersProvider";
import fetchSingleOrderById from "@/utils/fetcSingleOrderById";
import getOrders from "@/utils/getOrders";
import updateOrder from "@/utils/updateOrder";
import { TextField } from "@mui/material";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const OrderUpdateForm = ({ updatableOrder, setOrder, handleClose }) => {
  const [paidAmount, setPaidAmount] = useState<string>(
    updatableOrder?.paidAmount
  );
  const {setOrders} = useOrders();
  const onSubmit = async () => {
    try {
      let isValid = true;
      const updatedOrder = {
        userId: updatableOrder?.userId,
        courseBatchId: updatableOrder?.courseBatchId,
        paidAmount: parseFloat(paidAmount),
      };

      // Validations
      if (!paidAmount) {
        toast.error(`Paid Amount is required`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        isValid = false;
      }
      if (isValid) {
        console.log("updated full course", updatedOrder);
        const res = await updateOrder(updatableOrder.id, updatedOrder);
        console.log(res); // todo : undefined fix

        // toast.success("order updated", {
        //   position: "top-right",
        //   autoClose: 5000,
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   theme: "colored",
        // });

        const orderData = await fetchSingleOrderById(updatableOrder.id);
        setOrder(orderData);
        handleClose();
        const allOrderData = await getOrders();
        setOrders(allOrderData);
      }
    } catch (error) {}
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full mx-auto p-8 ">
        <div className="w-full text-center">
          <h1 className="text-3xl pb-4">Update Order</h1>
          <hr className=" h-1 w-4/5 mx-auto rounded-xl " />
        </div>
        <div className="p-8">
          <div className="w-full mt-4">
            <TextField
              id="outlined-multiline-static"
              placeholder={"Course Price"}
              type="number"
              fullWidth
              value={paidAmount}
              onChange={(event) => setPaidAmount(event.target.value)}
              label="Paid Amount"
              variant="outlined"
            />
          </div>
        </div>
        <div className="w-full mt-4 flex justify-center md:justify-end">
          <button
            type="submit"
            className="rounded-lg border-2 border-sky-500 px-8 py-3 text-xl text-sky-500 duration-200 hover:bg-sky-500 hover:text-white "
            onClick={() => {
              onSubmit();
            }}
          >
            Update Order
          </button>
        </div>
      </div>
    </>
  );
};

export default OrderUpdateForm;
