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
import { useCourses } from "@/ApiProviders/CourseProvider";
import UpdateCourseForm from "../UpdateCourseForm/UpdateCourseForm";

const CourseTableRow = ({ course }: { course: ICourseFromDB }) => {
  const { courses, error, loading, setCourses } = useCourses();

  const { id, title, price, totalHours, author } = course;

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
    height: "85%",
    maxWidth: 800,
    "@media (max-width: 600px)": {
      width: "85%",
      maxWidth: "85%",
    },
  };

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
        // get all courses again
        const coursesData = await getCourses();
        setCourses(coursesData);
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
      <TableCell sx={{ fontSize: "1.2rem" }}>{title}</TableCell>
      <TableCell sx={{ fontSize: "1.2rem" }}>{author}</TableCell>
      <TableCell sx={{ fontSize: "1.2rem" }}>$ {price}</TableCell>
      <TableCell sx={{ fontSize: "1.2rem" }}>{totalHours}</TableCell>
      <TableCell sx={{ fontSize: "1.2rem" }}>
        <div className="flex justify-end gap-2">
          <Button
            //   onClick={() => handleDetails(employeeId)}
            variant="text"
            color="primary"
          >
            <ViewHeadlineIcon />
          </Button>

          <Button onClick={handleOpen} variant="text" color="info">
            <EditNote />
          </Button>
          <Button onClick={() => handleDelete(id)} variant="text" color="error">
            <DeleteIcon />
          </Button>
        </div>
      </TableCell>
      {/* Modal */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <UpdateCourseForm
            updatableCourse={course}
            // refetch={refetch}
            handleClose={handleClose}
          ></UpdateCourseForm>
        </Box>
      </Modal>
    </TableRow>
  );
};

export default CourseTableRow;
