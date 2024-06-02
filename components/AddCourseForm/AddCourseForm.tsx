"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import addCourse, { ICourse } from "@/utils/addCourse";
import TextAreaComponents from "@/components/TextAreaComponents/TextAreaComponents";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { useCourses } from "@/ApiProviders/CourseProvider";
import getCourses from "@/utils/getCourses";
import { uploadSingleFile } from "@/utils/uploadSingleFile";
import "./AddCourseForm.css";

const initialState = {
  title: "",
  price: "",
  imageFile: null,
  previewUrl: null,
  disCountPrice: "",
  hours: "",
  likesInNumbers: "",
  likesInProcent: "",
  author: "",
  isBestSeller: true,
  isFeatured: false,
  isActive: false,
};

const AddCourseForm = () => {
  const [formState, setFormState] = useState(initialState);
  const [resetKey, setResetKey] = useState(0);
  const { setCourses } = useCourses();

  const handleChange = (field: string, value: any) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      handleChange("imageFile", file);
      handleChange("previewUrl", URL.createObjectURL(file));
    }
  };

  const handleRemoveImage = () => {
    handleChange("imageFile", null);
    handleChange("previewUrl", null);
  };

  const validateFields = () => {
    const requiredFields = [
      "title",
      "price",
      "disCountPrice",
      "hours",
      "likesInNumbers",
      "likesInProcent",
      "author",
      "imageFile",
    ];

    const fieldNames = {
      title: "Title",
      price: "Price",
      disCountPrice: "Discount Price",
      hours: "Total Hours",
      likesInNumbers: "Likes in Numbers",
      likesInProcent: "Likes in Percentage",
      author: "Author",
      imageFile: "Image",
    };

    for (let field of requiredFields) {
      if (!formState[field as keyof typeof formState]) {
        toast.error(
          `${fieldNames[field as keyof typeof fieldNames]} is required`,
          {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored",
          }
        );
        return false;
      }
    }
    return true;
  };

  const onSubmit = async () => {
    if (!validateFields()) return;

    try {
      const uploadedImageName = await uploadSingleFile(formState.imageFile);
      const addedCourse: ICourse = {
        title: formState.title,
        price: parseFloat(formState.price),
        imageName: uploadedImageName,
        disCountPrice: parseFloat(formState.disCountPrice),
        hours: parseFloat(formState.hours),
        likesInProcent: parseFloat(formState.likesInProcent),
        likesInNumbers: parseInt(formState.likesInNumbers, 10),
        author: formState.author,
        isBestSeller: formState.isBestSeller,
        creatorId: "1",
        modifierId: "1",
      };

      await addCourse(addedCourse);
      toast.success("Course added successfully", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });

      // set Real time course global state.
      const coursesData = await getCourses();
      setCourses(coursesData);
      // Reset form state after successful submission
      setFormState(initialState);
      // Increment resetKey to force re-render of TextAreaComponents
      setResetKey((prevKey) => prevKey + 1);
    } catch (error) {
      console.error("Error adding course:", error);
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
  };

  return (
    <>
      <ToastContainer />
      <div className="flex justify-center items-center">
        <div className="w-full mx-auto lg:w-[900px] shadow-lg bg-white grid rounded-lg border p-8">
          <div className="w-full text-center">
            <h1 className="text-3xl pb-4">Add Course</h1>
            <hr className="h-1 w-4/5 mx-auto rounded-xl" />
          </div>
          <div className="p-8 gap-4 justify-center items-center grid grid-cols-1 md:grid-cols-2">
            <div className="w-full mt-4">
              <TextAreaComponents
                key={`title-${resetKey}`}
                id={6}
                label={"Course Title"}
                placeholder={"Course Title"}
                sx={{ fontSize: "1.6rem !important" }}
                value={(props) => handleChange("title", props)}
              />
            </div>
            <div className="w-full mt-4">
              <TextAreaComponents
                key={`price-${resetKey}`}
                id={2}
                label={"Course Price"}
                placeholder={"Course Price"}
                value={(props) => handleChange("price", props)}
              />
            </div>
            <div className="w-full mt-4">
              <TextAreaComponents
                key={`disCountPrice-${resetKey}`}
                id={2}
                label={"Discount Price"}
                placeholder={"Discount Price"}
                value={(props) => handleChange("disCountPrice", props)}
              />
            </div>
            <div className="w-full mt-4">
              <TextAreaComponents
                key={`hours-${resetKey}`}
                id={2}
                label={"Total Hours"}
                placeholder={"Total Hours"}
                value={(props) => handleChange("hours", props)}
              />
            </div>
            <div className="w-full mt-4">
              <TextAreaComponents
                key={`likesInProcent-${resetKey}`}
                id={2}
                label={"Likes Percentage"}
                placeholder={"Likes Percentage"}
                value={(props) => handleChange("likesInProcent", props)}
              />
            </div>
            <div className="w-full mt-4">
              <TextAreaComponents
                key={`likesInNumbers-${resetKey}`}
                id={2}
                label={"Likes Numbers"}
                placeholder={"Likes Numbers"}
                value={(props) => handleChange("likesInNumbers", props)}
              />
            </div>
            <div className="w-full mt-4">
              <TextAreaComponents
                key={`author-${resetKey}`}
                id={6}
                label={"Author"}
                placeholder={"Author"}
                value={(props) => handleChange("author", props)}
              />
            </div>
            <div className="w-full mt-4 flex gap-2 md:gap-4 justify-center md:justify-start pl-6">
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formState.isBestSeller}
                    onChange={(event) =>
                      handleChange("isBestSeller", event.target.checked)
                    }
                  />
                }
                label="Best Seller"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "1.25rem",
                  },
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formState.isFeatured}
                    onChange={(event) =>
                      handleChange("isFeatured", event.target.checked)
                    }
                  />
                }
                label="Featured"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "1.25rem",
                  },
                }}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formState.isActive}
                    onChange={(event) =>
                      handleChange("isActive", event.target.checked)
                    }
                  />
                }
                label="Active"
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "1.25rem",
                  },
                }}
              />
            </div>
            {formState.previewUrl && (
              <div className="relative w-full mt-4 pl-6 col-span-2">
                <div className="relative inline-block">
                  <IconButton
                    onClick={handleRemoveImage}
                    style={{
                      position: "absolute",
                      top: 0,
                      right: 0,
                      zIndex: 10,
                      backgroundColor: "rgba(0, 0, 0, 0.6)",
                      color: "white",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <CloseIcon style={{ fontSize: "24px" }} />
                  </IconButton>
                  <Image
                    src={formState.previewUrl}
                    alt="Course Preview"
                    className="rounded-lg shadow-md"
                    style={{ maxHeight: "600px", maxWidth: "100%" }}
                    width={300}
                    height={300}
                    layout="intrinsic"
                  />
                </div>
              </div>
            )}
            <div className="w-full mt-4 pl-6 col-span-2">
              <Button
                variant="contained"
                component="label"
                size="small"
                startIcon={<AddPhotoAlternateIcon />}
                sx={{
                  fontSize: "1.5rem",
                  padding: "10px",
                  backgroundColor: "#1976d2",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                Upload Image
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Button>
            </div>
            {/* 
            

            */}
            <div className="w-full mt-4 flex justify-center md:justify-end add-course-btn col-span-2">
              <button
                type="submit"
                className="rounded-lg border-2 px-8 py-3 text-xl duration-200"
                onClick={() => {
                  onSubmit();
                }}
              >
                Add Course
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourseForm;
