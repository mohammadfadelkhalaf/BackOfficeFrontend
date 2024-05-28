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
// import CoursesTable from "@/components/CoursesTable/CoursesTable";

const AddCourseForm = () => {
  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [imageName, setImageName] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [disCountPrice, setDiscountPrice] = useState<string>("");
  const [hours, setHours] = useState<string>("");
  const [likesInNumbers, setLikesInNumbers] = useState<string>("");
  const [likesInProcent, setLikesInProcent] = useState<string>("");
  const [author, setAuthor] = useState<string>("");
  const [isBestSeller, setisBestSeller] = useState<boolean>(true);
  const [isFeatured, setIsFeatured] = useState<boolean>(false);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [isDelete, setIsDelete] = useState<boolean>(false);
  const { courses, error, loading, setCourses } = useCourses();

  // function to handle file change
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  // function to remove the image
  const handleRemoveImage = () => {
    setImageName("");
    setImageFile(null);
    setPreviewUrl(null);
  };

  const onSubmit = async () => {
    try {
      let isValid = true;
      const addedCourse: ICourse = {
        title,
        price: parseFloat(price),
        imageName,
        disCountPrice: parseFloat(disCountPrice),
        hours: parseFloat(hours),
        likesInProcent: parseFloat(likesInProcent),
        likesInNumbers: parseInt(likesInNumbers, 10),
        author,
        isBestSeller,
        creatorId: "1",
        modifierId: "1",
        // isFeatured,
        // isActive,
        // isDelete,
      };

      // Validations
      if (!title) {
        toast.error("Title is required", {
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
      if (!price) {
        toast.error("Price is required", {
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
      if (!imageFile) {
        // todo
        toast.error("Image is required", {
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
      if (!disCountPrice) {
        toast.error("Discount Price is required", {
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
      if (!hours) {
        toast.error("Total Hours is required", {
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
      if (!likesInProcent) {
        toast.error("Likes In Percentage is required", {
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
      if (!likesInNumbers) {
        toast.error("Likes In Numbers is required", {
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
      if (!author) {
        toast.error("Author is required", {
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

      if (isValid && imageFile) {
        const uploadedImageName = await uploadSingleFile(imageFile);
        console.log(uploadedImageName);
        addedCourse.imageName = uploadedImageName;

        //  console.log("added course", addedCourse);
        const res = await addCourse(addedCourse);
        //  console.log(res);

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

        // Get all courses again
        const coursesData = await getCourses();
        setCourses(coursesData);

        // Reset form fields

        // TODO Uncomment Later
        // setTitle("");
        // setPrice("");
        // setDiscountPrice("");
        // setHours("");
        // setLikesInProcent("");
        // setLikesInNumbers("");
        // setAuthor("");
        // setImageName("");
        // setImageFile(null);
        // setPreviewUrl(null);
        // setisBestSeller(true);
        // setIsFeatured(false);
        // setIsActive(false);
        // setIsDelete(false);
      }
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
      <div className=" flex justify-center items-center">
        <div className="w-full mx-auto lg:w-[900px] shadow-lg bg-white grid rounded-lg border p-8 ">
          <div className="w-full text-center">
            <h1 className="text-3xl pb-4">Add Course</h1>
            <hr className=" h-1 w-4/5 mx-auto rounded-xl " />
          </div>
          <div className="p-8  gap-4 justify-center items-center grid grid-cols-1 md:grid-cols-2 ">
            <div className="w-full mt-4">
              <TextAreaComponents
                id={6}
                label={"Course Title"}
                placeholder={"Course Title"}
                value={(props) => {
                  setTitle(props);
                }}
              />
            </div>
            <div className="w-full mt-4">
              <TextAreaComponents
                id={2}
                label={"Course Price"}
                placeholder={"Course Price"}
                value={(props) => {
                  setPrice(props);
                }}
              />
            </div>
            <div className="w-full mt-4">
              <TextAreaComponents
                id={2}
                label={"Discount Price"}
                placeholder={"Discount Price"}
                value={(props) => {
                  setDiscountPrice(props);
                }}
              />
            </div>

            <div className="w-full mt-4 ">
              <TextAreaComponents
                id={2}
                label={"Total Hours"}
                placeholder={"Total Hours"}
                value={(props) => {
                  setHours(props);
                }}
              />
            </div>
            <div className="w-full mt-4">
              <TextAreaComponents
                id={2}
                label={"Likes Percentage"}
                placeholder={"Likes Percentage"}
                value={(props) => {
                  setLikesInProcent(props);
                }}
              />
            </div>
            <div className="w-full mt-4">
              <TextAreaComponents
                id={2}
                label={"Likes Numbers"}
                placeholder={"Likes Numbers"}
                value={(props) => {
                  setLikesInNumbers(props);
                }}
              />
            </div>
            <div className="w-full mt-4">
              <TextAreaComponents
                id={6}
                label={"Author"}
                placeholder={"Author"}
                value={(props) => {
                  setAuthor(props);
                }}
              />
            </div>
            <div className="w-full mt-4 flex   gap-2 md:gap-4 justify-center md:justify-start pl-6">
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
                    fontSize: "1.25rem",
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
                    fontSize: "1.25rem",
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
                    fontSize: "1.25rem",
                  },
                }}
              />
            </div>
            {previewUrl && (
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
                    src={previewUrl}
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

            <div className="w-full mt-4 pl-6">
              <FormControlLabel
                control={
                  <Button
                    variant="outlined"
                    component="label"
                    startIcon={<AddPhotoAlternateIcon />}
                    sx={{ marginRight: "8px" }}
                  >
                    <span style={{ fontSize: "1.25rem" }}>
                      Upload Course Image
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      style={{ display: "none" }}
                    />
                  </Button>
                }
                label={imageName || "No file chosen"}
                sx={{
                  "& .MuiFormControlLabel-label": {
                    fontSize: "1.25rem",
                  },
                }}
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
              Add Course
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCourseForm;
