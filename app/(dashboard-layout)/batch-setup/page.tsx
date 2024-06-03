"use client";
import React, { useEffect, useRef, useState } from "react";
import "./batch.css";
import axios from "axios";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import DataTable from "@/components/DataTable/DataTable";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { DialogProps } from "@mui/material/Dialog";
import WithAuth from "@/components/WithAuth/WithAuth";
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb";
import Swal from "sweetalert2";

type TCourse = {
  id: number;
  title: string;
  imageName: string;
  author: string;
};

const BatchSetup = () => {
  const [courses, setCourses] = useState<TCourse[]>([]);
  const [batches, setBatches] = useState([]);
  const [open, setOpen] = useState<boolean>(false);
  const [scroll, setScroll] = useState<DialogProps["scroll"]>("paper");
  const [batch, setBatch] = useState({});
  const [initialDate, setInitialDate] = useState("");

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

  const refetchBatches = async () => {
    const batches = await axios.get(
      "https://coursesmanagementsapi.azurewebsites.net/api/Batch"
    );
    console.log(batches.data);
    setBatches(batches.data);
  };

  useEffect(() => {
    const getCourses = async () => {
      const response = await axios.get(
        "https://coursesmanagementsapi.azurewebsites.net/api/Courses/GetCoursesGrpc"
      );
      console.log(response.data);
      setCourses(response.data);
    };

    const getBatches = async () => {
      const batches = await axios.get(
        "https://coursesmanagementsapi.azurewebsites.net/api/Batch"
      );
      console.log(batches.data);
      setBatches(batches.data);
    };

    getCourses();
    getBatches();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const form = event.target;

    const batchName: string = form.batchName.value;
    const course: number = parseInt(form.course.value);
    const date: Date = form.date.value;
    // const date: Date = new Date(form.date.value);
    const maximumMember: number = parseInt(form.maxMember.value);
    const isActive: boolean = form.active.value === "true" ? true : false;
    const isExpired: boolean = form.expire.value === "true" ? true : false;

    const batchObj = {
      batchName,
      courseId: course,
      startDate: date,
      maxMemberCount: maximumMember,
      isActive,
      isExpire: isExpired,
    };

    const response = await axios.post(
      "https://coursesmanagementsapi.azurewebsites.net/api/Batch",
      batchObj
    );

    if (response.data) {
      toast.success("Batch added");
      form.reset();
      refetchBatches();
    }
  };

  const handleDelete = async (id: number) => {
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
          `https://coursesmanagementsapi.azurewebsites.net/api/Batch/${id}`
        );
        if (response.status === 200) {
          toast.success("Batch deleted");
          refetchBatches();
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to deleted");
      }
    }
  };
  console.log("date: ", initialDate);

  const handleEdit = (row) => {
    // const batch = axios.get("")
    setOpen(true);
    setScroll("paper");
    setBatch(row);
    setInitialDate(row.startDate.split("T")[0]);
    // handleClickOpen('paper');
    console.log("edited", row, open, scroll);
  };

  const handleDateChange = (event) => {
    setInitialDate(event.target.value);
  };

  const handleUpdate = async (event: any) => {
    event.preventDefault();

    const form = event.target;

    const batchName: string = form.batchName.value;
    const course: number = parseInt(form.course.value);
    const date: Date = form.date.value;
    // const date: Date = new Date(form.date.value);
    const maximumMember: number = parseInt(form.maxMember.value);
    const isActive: boolean = form.active.value === "true" ? true : false;
    const isExpired: boolean = form.expire.value === "true" ? true : false;
    const id: number = form.batchId.value;

    const batchObj = {
      id,
      batchName,
      courseId: course,
      startDate: date,
      maxMemberCount: maximumMember,
      isActive,
      isExpire: isExpired,
    };

    console.log("response: ", batchObj);
    const response = await axios.put(
      `https://coursesmanagementsapi.azurewebsites.net/api/Batch/${id}`,
      batchObj
    );
    console.log("response: ", response);
    if (response.data) {
      toast.success("Batch Updated");
      handleClose();
      refetchBatches();
    }
  };

  return (
    <div>
      <ToastContainer />
      <CustomBreadcrumb pageName={"Batches"} />
      <form
        className="batch-form max-w-screen-lg rounded-xl mt-9 shadow-xl p-5 mx-auto mb-15"
        onSubmit={(e) => handleSubmit(e)}
      >
        <div className="flex">
          <div className="flex flex-col w-full my-3 mx-4">
            <label>Batch Name</label>
            <input
              required
              type="text"
              name="batchName"
              placeholder="Batch Name"
            />
          </div>

          <div className="flex flex-col w-full my-3 mx-4">
            <label>Select a Course</label>
            <select name="course" required>
              <option value="" selected disabled hidden>
                Select a Course
              </option>
              {courses?.map((course) => (
                <option key={course.id} value={course.id}>
                  {course.title}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex">
          <div className="flex flex-col w-full my-3 mx-4">
            <label>Select Starting Date</label>
            <input required type="date" name="date" />
          </div>

          <div className="flex flex-col w-full my-3 mx-4">
            <label>Maximum Students</label>
            <input
              type="number"
              required
              placeholder="Add Maximum number of student"
              name="maxMember"
            />
          </div>
        </div>

        <div className="flex">
          <div className="flex flex-col w-full my-3 mx-4">
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              className="!text-3xl !text-black"
            >
              Is Active
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="active"
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </div>

          <div className="flex flex-col w-full my-3 mx-4">
            <FormLabel
              id="demo-row-radio-buttons-group-label"
              className="!text-3xl !text-black"
            >
              Is Expired
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="expire"
            >
              <FormControlLabel value="true" control={<Radio />} label="Yes" />
              <FormControlLabel value="false" control={<Radio />} label="No" />
            </RadioGroup>
          </div>
        </div>

        <div className="submit-btn">
          <input type="submit" className="cursor-pointer" value="Add Batch" />
        </div>
      </form>

      <DataTable
        rows={batches}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        handleClose={handleClose}
        scroll={scroll}
        open={open}
        descriptionElementRef={descriptionElementRef}
        courses={courses}
        batch={batch}
        initialDate={initialDate}
        handleDateChange={handleDateChange}
        handleUpdate={handleUpdate}
      ></DataTable>
    </div>
  );
};

export default WithAuth(BatchSetup);
