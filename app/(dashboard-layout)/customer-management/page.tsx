"use client";
import React, { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Link from "next/link";
import axios from "axios";
import "./customerManagement.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WithAuth from "@/components/WithAuth/WithAuth";
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb";
import Swal from "sweetalert2";

interface HeadCell {
  disablePadding: boolean;
  id: string;
  label: string;
  numeric: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "firstname",
    numeric: false,
    disablePadding: false,
    label: "First Name",
  },
  {
    id: "lastname",
    numeric: false,
    disablePadding: false,
    label: "Last Name",
  },
  {
    id: "username",
    numeric: false,
    disablePadding: false,
    label: "User Name",
  },
  {
    id: "email",
    numeric: false,
    disablePadding: false,
    label: "Email",
  },
  {
    id: "bio",
    numeric: false,
    disablePadding: false,
    label: "Bio",
  },
  {
    id: "profileimage",
    numeric: false,
    disablePadding: false,
    label: "Profile Image",
  },
  {
    id: "currentbalance",
    numeric: false,
    disablePadding: false,
    label: "Current Balance",
  },
  {
    id: "action",
    numeric: true,
    disablePadding: false,
    label: "Actions",
  },
];

interface EnhancedTableProps {
  numSelected: number;
  orderBy: string;
  rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sx={{ fontSize: "1.6rem", fontWeight: "bold" }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const CustomerManagement = () => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = useState<boolean>(false);
  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");
  const [rows, setRows] = useState([]);
  const [user, setUser] = useState({});
  const [uploadedProfileImage, setUploadedProfileImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  const handleClose = () => {
    setOpen(false);
  };

  const descriptionElementRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);

  const refetchUser = async () => {
    const response = await axios.get(
      "https://coursesmanagementsapi.azurewebsites.net/api/Users"
    );
    console.log(response.data);
    setRows(response.data);
  };

  useEffect(() => {
    const getUser = async () => {
      const response = await axios.get(
        "https://coursesmanagementsapi.azurewebsites.net/api/Users"
      );
      console.log(response.data);
      setRows(response.data);
    };

    getUser();
  }, []);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleImageChange = (event: any) => {
    const file: any = event.target.files[0];
    if (file) {
      setUploadedProfileImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const uploadImage = async (imageFile: any) => {
    const formData = new FormData();
    formData.append("file", imageFile);

    try {
      const response = await axios.post(
        "https://coursesmanagementsapi.azurewebsites.net/api/FileUploader",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      return response.data; // Adjust this according to your API response structure
    } catch (error) {
      console.error("An error occurred while uploading the image:", error);
      throw error;
    }
  };

  const handleDelete = async (id: string) => {
    const confirmationResult = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });
    console.log(confirmationResult.isConfirmed);

    if (confirmationResult.isConfirmed) {
      try {
        const response = await axios.delete(
          `https://coursesmanagementsapi.azurewebsites.net/api/Users/${id}`
        );
        if (response.status === 200) {
          toast.success("User deleted");
          refetchUser();
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to delete the user");
      }
    }
  };

  const handleEdit = (row: any) => {
    setOpen(true);
    setScroll("paper");
    setUser(row);
  };

  const handleUpdateUser = async (event: any) => {
    event.preventDefault();
    const form = event.target;

    const firstName = form.firstName.value;
    const lastName = form.lastName.value;
    const userName = form.userName.value;
    const email = form.email.value;
    const bio = form.bio.value;
    const id = form.userId.value;
    const emailConfirmed = form.emailConfirmed.value === "true" ? true : false;
    const currentBalance = form.currentBalance.value;

    let profileImageUrl = null;
    if (uploadedProfileImage) {
      try {
        profileImageUrl = await uploadImage(uploadedProfileImage);
      } catch (error) {
        // Handle the error appropriately
        toast.error("unable to upload image");
        console.error("Failed to upload image");
        return;
      }
    }

    const userObj = {
      firstName,
      lastName,
      userName,
      email,
      bio,
      id,
      emailConfirmed,
      profileImage: profileImageUrl,
      currentBalance,
    };

    try {
      const response = await axios.put(
        `https://coursesmanagementsapi.azurewebsites.net/api/Users/${id}`,
        userObj
      );
      console.log(response);
      if (response.data) {
        handleClose();
        toast.success("User Updated");
        refetchUser();
      }
    } catch (error) {
      toast.error("Unable to update the user");
      console.log(error);
    }

    console.log(userObj);
  };

  const isEmailConfirmed = user.emailConfirmed ? "true" : "false";

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - 10) : 0; // rows.length

  return (
    <>
      <CustomBreadcrumb pageName={"Customers"} />
      <div className="shadow-xl max-w-screen-xl mx-auto mt-32 overflow-hidden mb-20">
        <ToastContainer />
        <Box sx={{ width: "100%", maxHeight: "25em", overflowY: "auto" }}>
          <Paper sx={{ width: "100%" }}>
            <TableContainer>
              <Table Nutrition={{ minWidth: 750 }} aria-labelledby="tableTitle">
                <EnhancedTableHead rowCount={rows.length} />
                <TableBody>
                  {rows
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    .map((row) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={row.id}
                          sx={{ cursor: "pointer" }}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            padding="none"
                            sx={{ fontSize: "1.6rem" }}
                            align="center"
                          >
                            {row.firstName}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                            {row.lastName}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                            {row.userName}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                            {row.email}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                            {row.bio}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                            {row.profileImage}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                            {row.currentBalance}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                            <div className="flex justify-center items-center">
                              <button
                                title="Edit"
                                onClick={() => handleEdit(row)}
                              >
                                <Image
                                  src="/Icons/edit.png"
                                  alt="edit"
                                  width={20}
                                  height={20}
                                />
                              </button>

                              <Link
                                href={`/customer-management/${row.id}`}
                                title="View"
                                className="mx-4"
                              >
                                <Image
                                  src="/Icons/eye.png"
                                  alt="view"
                                  width={20}
                                  height={20}
                                />
                              </Link>

                              <button
                                title="Delete"
                                onClick={() => handleDelete(row.id)}
                              >
                                <Image
                                  src="/Icons/bin.png"
                                  alt="delete"
                                  width={20}
                                  height={20}
                                />
                              </button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ fontSize: "1.6rem" }}
            />
          </Paper>
        </Box>

        <Dialog
          open={open}
          onClose={handleClose}
          scroll={scroll}
          aria-labelledby="scroll-dialog-title"
          aria-describedby="scroll-dialog-description"
        >
          <DialogTitle
            id="scroll-dialog-title"
            className="!text-[2rem] !font-semibold"
          >
            Edit User
          </DialogTitle>
          <DialogContent dividers={scroll === "paper"}>
            <DialogContentText
              id="scroll-dialog-description"
              ref={descriptionElementRef}
              tabIndex={-1}
              className="!text-[1.6rem]"
            >
              <form
                className="batch-form w-full p-5 mx-auto"
                onSubmit={(e) => handleUpdateUser(e)}
              >
                <div className="flex">
                  <div className="flex flex-col w-full my-3 mx-4">
                    <label>First Name</label>
                    <input
                      type="text"
                      name="firstName"
                      defaultValue={user.firstName}
                      placeholder="First Name"
                    />
                  </div>

                  <div className="flex flex-col w-full my-3 mx-4">
                    <label>Last Name</label>
                    <input
                      type="text"
                      name="lastName"
                      defaultValue={user.lastName}
                      placeholder="Last Name"
                    />
                  </div>
                </div>

                <div className="flex">
                  <div className="flex flex-col w-full my-3 mx-4">
                    <label>User Name</label>
                    <input
                      type="text"
                      name="userName"
                      defaultValue={user.userName}
                      placeholder="User Name"
                    />
                  </div>

                  <div className="flex flex-col w-full my-3 mx-4">
                    <label>Bio</label>
                    <input
                      type="text"
                      defaultValue={user.bio}
                      placeholder="Bio"
                      name="bio"
                    />
                  </div>

                  <input type="hidden" value={user.id} name="userId" readOnly />
                </div>

                <div className="flex">
                  <div className="flex flex-col w-full my-3 mx-4">
                    <label>Email</label>
                    <input
                      type="email"
                      defaultValue={user.email}
                      name="email"
                      placeholder="Email"
                    />
                  </div>

                  <div className="flex flex-col w-full my-3 mx-4">
                    <label>Profile Image</label>
                    <input
                      type="file"
                      name="profileImage"
                      onChange={(e) => handleImageChange(e)}
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full my-3 mx-4">
                  <label>Current Balance</label>
                  <input
                    type="number"
                    name="currentBalance"
                    defaultValue={user.currentBalance}
                    placeholder="Current Balanace"
                  />
                </div>

                <div className="flex">
                  <div className="flex flex-col w-full my-3 mx-4">
                    <FormLabel
                      id="demo-row-radio-buttons-group-label"
                      className="!text-3xl !text-black"
                    >
                      Is Email Confirmed
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="emailConfirmed"
                      defaultValue={isEmailConfirmed}
                    >
                      <FormControlLabel
                        value="true"
                        control={<Radio />}
                        label="Yes"
                      />
                      <FormControlLabel
                        value="false"
                        control={<Radio />}
                        label="No"
                      />
                    </RadioGroup>
                  </div>

                  <div className="flex flex-col w-full my-3 mx-4">
                    <div className="w-[10rem] h-[10rem] overflow-hidden">
                      <img
                        src={
                          imagePreviewUrl ? imagePreviewUrl : user.profileImage
                        }
                        alt="profile Image"
                        className="object-cover w-full h-full"
                      />
                    </div>
                  </div>
                </div>

                <div className="submit-btn">
                  <input
                    type="submit"
                    className="cursor-pointer"
                    value="Update User"
                  />
                </div>
              </form>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button className="!text-[1.6rem]" onClick={handleClose}>
              Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default WithAuth(CustomerManagement);
