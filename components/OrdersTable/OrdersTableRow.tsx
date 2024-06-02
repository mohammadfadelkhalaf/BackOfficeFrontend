"use client";
import getCourses, { ICourseFromDB } from "@/utils/getCourses";
import { Box, Button, Modal, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import deleteCourse from "@/utils/deleteCourse";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
// import EditNoteIcon from '@mui/icons-material/EditNote';
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import EditNote from "@mui/icons-material/EditNote";
// import { useCourses } from "@/app/Providers/CourseProvider";
import UpdateCourseForm from "../UpdateCourseForm/UpdateCourseForm";
import { IOrder } from "@/utils/getOrders";
import Link from "next/link";
import DirectionsIcon from "@mui/icons-material/Directions";

const OrdersTableRow = ({ order }: { order: IOrder }) => {
  //   const { courses, error, loading, setCourses } = useCourses();

  const { id, userId, courseBatchId, paidAmount, userName, email, batch } =
    order;

  // delete operation
  const handleDelete = async (courseId) => {
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
        const result = await deleteCourse(courseId);
        toast.success("Course deleted successfully", {
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
        // const coursesData = await getCourses();
        // setCourses(coursesData);
      } catch (error) {
        console.error("Error deleting course:", error);

        toast.error("Failed to add course", {
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
    <TableRow>
      <TableCell sx={{ fontSize: "1.6rem" }}>{userName}</TableCell>
      <TableCell sx={{ fontSize: "1.6rem" }}>{email}</TableCell>
      <TableCell sx={{ fontSize: "1.6rem" }}>$ {batch?.batchName}</TableCell>
      <TableCell sx={{ fontSize: "1.6rem" }}>{paidAmount}</TableCell>
      <TableCell sx={{ fontSize: "1.6rem" }}>
        <div className="flex justify-end gap-2">
          <Link href={`/orders/${id}`} style={{fontSize: "1.6rem"}}>
            <Button variant="text" color="primary">
              <DirectionsIcon />
            </Button>
          </Link>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default OrdersTableRow;
