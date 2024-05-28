import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import getCourses, { ICourseFromDB } from "@/utils/getCourses";
import { useEffect, useState } from "react";
// import { useCourses } from "@/app/Providers/CourseProvider";
import CourseTableRow from "../CoursesTable/CourseTableRow";
import { useOrders } from "@/ApiProviders/OrdersProvider";
import getOrders from "@/utils/getOrders";
import OrdersTableRow from "./OrdersTableRow";
const OrdersTable = () => {
  const { orders, error, loading, setOrders } = useOrders();
  // const { courses, error, loading, setCourses } = useCourses();
  // const {
  //   orders,
  //   loading: ordersLoading,
  //   error: ordersLoadingError,
  //   setOrders,
  // } = useOrders();
  // console.log(orders);
  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }
  // const orders = await getOrders();
  // console.log(orders);
  return (
    <div className="max-w-screen-lg mx-auto">
      <div className="w-full text-center my-20">
        <h1 className="text-3xl pb-10">All Orders</h1>
        <hr className=" h-1 w-4/5 mx-auto rounded-xl " />
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead sx={{ bgcolor: "#eef1f8" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                User Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                User email
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Batch Name
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Paid Amount
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                align="right"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((order) => (
              <OrdersTableRow key={order.id} order={order} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default OrdersTable;
