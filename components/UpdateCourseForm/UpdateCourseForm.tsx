"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, TextField } from "@mui/material";
import { useCourses } from "@/ApiProviders/CourseProvider";
import updateCourse from "@/utils/updateCourse";
import getCourses from "@/utils/getCourses";

const UpdateCourseForm = ({ updatableCourse, handleClose }) => {
  const [title, setTitle] = useState<string>(updatableCourse?.title || "");
  const [price, setPrice] = useState<string>(updatableCourse?.price || "");
  const [imageName, setImageName] = useState<string>(
    updatableCourse.imageName || ""
  );
  const [disCountPrice, setDiscountPrice] = useState<string>(
    updatableCourse?.disCountPrice || ""
  );
  const [totalHours, setTotalHours] = useState<string>(
    updatableCourse?.totalHours || ""
  );
  const [likesInNumbers, setLikesInNumbers] = useState<string>(
    updatableCourse?.likesInNumbers || ""
  );
  const [likesInProcent, setLikesInProcent] = useState<string>(
    updatableCourse?.likesInProcent || ""
  );
  const [author, setAuthor] = useState<string>(updatableCourse?.author || "");
  const [isBestSeller, setisBestSeller] = useState<boolean>(
    updatableCourse?.isBestSeller || false
  );
  const [isFeatured, setIsFeatured] = useState<boolean>(
    updatableCourse?.isFeatured || false
  );
  const [isActive, setIsActive] = useState<boolean>(
    updatableCourse?.isActive || false
  );
  const { courses, error, loading, setCourses } = useCourses();

  const onSubmit = async () => {
    try {
      let isValid = true;
      const updatedCourse = {
        id: updatableCourse?.id,
        title,
        price: parseFloat(price),
        imageName,
        disCountPrice: parseFloat(disCountPrice),
        hours: parseFloat(totalHours),
        likesInProcent: parseFloat(likesInProcent),
        likesInNumbers: parseInt(likesInNumbers, 10),
        author,
        isBestSeller,
        creatorId: updatableCourse?.creatorId,
        modifierId: updatableCourse?.modifierId,
      };

      // Validations
      const validations = [
        { field: title, message: "Title is required" },
        { field: price, message: "Price is required" },
        { field: imageName, message: "Image is required" },
        { field: disCountPrice, message: "Discount Price is required" },
        { field: totalHours, message: "Total Hours is required" },
        { field: likesInProcent, message: "Likes In Percentage is required" },
        { field: likesInNumbers, message: "Likes In Numbers is required" },
        { field: author, message: "Author is required" },
      ];

      for (const validation of validations) {
        if (!validation.field) {
          toast.error(validation.message, {
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
      }

      if (isValid) {
        console.log("updated full course", updatedCourse);
        const res = await updateCourse(updatableCourse.id, updatedCourse);
        console.log(res);

        toast.success("Course updated successfully", {
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

        handleClose();
      }
    } catch (error) {
      console.error("Error updating course:", error);

      toast.error("Failed to update course", {
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
  };

  return (
    <>
      <ToastContainer />

      <div className="w-full mx-auto grid p-8 ">
        <div className="w-full text-center">
          <h1 className="text-3xl pb-4">Update Course</h1>
          <hr className="h-1 w-4/5 mx-auto rounded-xl" />
        </div>
        <div className="p-8 gap-4 justify-center items-center grid grid-cols-1 md:grid-cols-2">
          <div className="w-full mt-4">
            <TextField
              placeholder="Course Title"
              fullWidth
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              label="Course Title"
              variant="outlined"
              InputProps={{
                style: { fontSize: "1.6rem" },
              }}
              InputLabelProps={{
                style: { fontSize: "1.6rem" },
              }}
            />
          </div>
          <div className="w-full mt-4">
            <TextField
              placeholder="Course Price"
              type="number"
              fullWidth
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              label="Course Price"
              variant="outlined"
              InputProps={{
                style: { fontSize: "1.6rem" },
              }}
              InputLabelProps={{
                style: { fontSize: "1.6rem" },
              }}
            />
          </div>
          <div className="w-full mt-4">
            <TextField
              placeholder="Discount Price"
              type="number"
              fullWidth
              value={disCountPrice}
              onChange={(event) => setDiscountPrice(event.target.value)}
              label="Discount Price"
              variant="outlined"
              InputProps={{
                style: { fontSize: "1.6rem" },
              }}
              InputLabelProps={{
                style: { fontSize: "1.6rem" },
              }}
            />
          </div>

          <div className="w-full mt-4">
            <TextField
              placeholder="Total Hours"
              type="number"
              fullWidth
              value={totalHours}
              onChange={(event) => setTotalHours(event.target.value)}
              label="Total Hours"
              variant="outlined"
              InputProps={{
                style: { fontSize: "1.6rem" },
              }}
              InputLabelProps={{
                style: { fontSize: "1.6rem" },
              }}
            />
          </div>
          <div className="w-full mt-4">
            <TextField
              placeholder="Likes Percentage"
              type="number"
              fullWidth
              value={likesInProcent}
              onChange={(event) => setLikesInProcent(event.target.value)}
              label="Likes Percentage"
              variant="outlined"
              InputProps={{
                style: { fontSize: "1.6rem" },
              }}
              InputLabelProps={{
                style: { fontSize: "1.6rem" },
              }}
            />
          </div>
          <div className="w-full mt-4">
            <TextField
              placeholder="Likes Numbers"
              type="number"
              fullWidth
              value={likesInNumbers}
              onChange={(event) => setLikesInNumbers(event.target.value)}
              label="Likes Numbers"
              variant="outlined"
              InputProps={{
                style: { fontSize: "1.6rem" },
              }}
              InputLabelProps={{
                style: { fontSize: "1.6rem" },
              }}
            />
          </div>
          <div className="w-full mt-4">
            <TextField
              placeholder="Author"
              fullWidth
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              label="Author"
              variant="outlined"
              InputProps={{
                style: { fontSize: "1.6rem" },
              }}
              InputLabelProps={{
                style: { fontSize: "1.6rem" },
              }}
            />
          </div>
          <div className="w-full mt-4 flex gap-2 md:gap-4 justify-center md:justify-start pl-6">
            <FormControlLabel
              control={
                <Checkbox
                  checked={isBestSeller}
                  onChange={(event) => setisBestSeller(event.target.checked)}
                />
              }
              label="Best Seller"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "1.6rem",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isFeatured}
                  onChange={(event) => setIsFeatured(event.target.checked)}
                />
              }
              label="Featured"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "1.6rem",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={isActive}
                  onChange={(event) => setIsActive(event.target.checked)}
                />
              }
              label="Active"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "1.6rem",
                },
              }}
            />
          </div>
        </div>
        <div className="w-full mt-4 flex justify-center md:justify-end gap-2 md:gap-4">
          <button
            className="rounded-lg border-2 border-red-500 px-8 py-3 text-xl text-red-500 duration-200 hover:bg-red-500 hover:text-white"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-lg border-2 border-sky-500 px-8 py-3 text-xl text-sky-500 duration-200 hover:bg-sky-500 hover:text-white"
            onClick={onSubmit}
          >
            Update Course
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateCourseForm;
