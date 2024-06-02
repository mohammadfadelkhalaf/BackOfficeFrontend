"use client";
import getCourses, { ICourseFromDB } from "@/utils/getCourses";
import { Box, Button, Modal, TableCell, TableRow } from "@mui/material";
import { useState } from "react";
import deleteCourse from "@/utils/deleteCourse";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import DeleteIcon from "@mui/icons-material/Delete";
import ViewHeadlineIcon from "@mui/icons-material/ViewHeadline";
import EditNote from "@mui/icons-material/EditNote";
import { useNewsLetters } from "@/ApiProviders/NewslettersProvider";
import getNewsLetters, { INewsLetter } from "@/utils/getNewsletters";
import deleteNewsletter from "@/utils/deleteNewsletter";
import UpdateNewsLetterForm from "../UpdateNewsLetterForm/UpdateNewsLetterForm";

const NewsletterTableRow = ({
  newsLetter,
  setNewsLetters,
}: {
  newsLetter: INewsLetter;
  setNewsLetters: React.Dispatch<React.SetStateAction<INewsLetter[]>>;
}) => {
  // const { newsLetters, error, loading, setNewsLetters } = useNewsLetters();

  const {
    email,
    dailynewsletter,
    advertisingupdates,
    weekinreview,
    eventupdates,
    startupweekly,
    podcasts,
  } = newsLetter;

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
    display: "flex",
    flexDirection: "column",
    maxWidth: 800,
    maxHeight: "85%",
    overflow: "hidden",
    "@media (max-width: 600px)": {
      maxWidth: "85%",
    },
  };

  // delete operation
  const handleDelete = async (subscriberEmail: string) => {
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
        const result = await deleteNewsletter(subscriberEmail);
        toast.success("Newsletter deleted successfully", {
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
        const newsLetterData = await getNewsLetters();
        setNewsLetters(newsLetterData);
      } catch (error) {
        console.error("Error deleting :", error);

        toast.error("Failed to delete", {
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
      <TableCell sx={{ fontSize: "1.6rem" }}>{email}</TableCell>
      <TableCell sx={{ fontSize: "1.6rem" }}>
        {dailynewsletter ? "Yes" : "No"}
      </TableCell>
      <TableCell sx={{ fontSize: "1.6rem" }}>
        {advertisingupdates ? "Yes" : "No"}
      </TableCell>
      <TableCell sx={{ fontSize: "1.6rem" }}>
        {weekinreview ? "Yes" : "No"}
      </TableCell>
      <TableCell sx={{ fontSize: "1.6rem" }}>
        {eventupdates ? "Yes" : "No"}
      </TableCell>
      <TableCell sx={{ fontSize: "1.6rem" }}>
        {startupweekly ? "Yes" : "No"}
      </TableCell>
      <TableCell sx={{ fontSize: "1.6rem" }}>
        {podcasts ? "Yes" : "No"}
      </TableCell>
      <TableCell sx={{ fontSize: "1.6rem" }}>
        <div className="flex justify-end gap-2">
          <Button
            //   onClick={() => handleDetails(courseeId)}
            variant="text"
            color="primary"
          >
            <ViewHeadlineIcon />
          </Button>

          <Button
            onClick={handleOpen}
            variant="text"
            color="info"
            title="Update"
          >
            <EditNote />
          </Button>
          <Button
            onClick={() => handleDelete(email)}
            variant="text"
            color="error"
            title="Delete"
          >
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
          <UpdateNewsLetterForm
            updatableNewsLetter={newsLetter}
            // refetch={refetch}
            handleClose={handleClose}
            setNewsLetters={setNewsLetters}
          ></UpdateNewsLetterForm>
        </Box>
      </Modal>
    </TableRow>
  );
};

export default NewsletterTableRow;
