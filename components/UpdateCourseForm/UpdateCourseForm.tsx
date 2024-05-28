"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import addCourse, { ICourse } from "@/utils/addCourse";
import TextAreaComponents from "@/components/TextAreaComponents/TextAreaComponents";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { Button, TextField } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import updateCourse from "@/utils/updateCourse";
import getCourses, { ICourseFromDB } from "@/utils/getCourses";
import { useCourses } from "@/ApiProviders/CourseProvider";
// import CoursesTable from "@/components/CoursesTable/CoursesTable";

const UpdateCourseForm = ({ updatableCourse, handleClose }) => {
  const [title, setTitle] = useState<string>(updatableCourse?.title || "");
  const [price, setPrice] = useState<string>(updatableCourse?.price || "");
  const [imageName, setImageName] = useState<string>(
    updatableCourse.imageName || ""
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
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
    updatableCourse?.setIsFeatured || false
  );
  const [isActive, setIsActive] = useState<boolean>(
    updatableCourse?.setIsFeatured || false
  );
  const [isDelete, setIsDelete] = useState<boolean>(
    updatableCourse?.setIsFeatured || false
  );

  const { courses, error, loading, setCourses } = useCourses();

  // function to upload the image
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setImageName(file.name);
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

  console.log("upgradable course", updatableCourse);

  interface IUpdatedCourse {
    id: number;
    title: string;
    price: number;
    imageName: string;
    disCountPrice: number;
    hours: number;
    likesInProcent: number;
    likesInNumbers: number;
    author: string;
    isBestSeller: boolean;
    creatorId: string;
    modifierId: string;
    // isFeatured?: boolean;
    // isActive?: boolean;
    // isDelete?: boolean;
  }

  const onSubmit = async () => {
    try {
      let isValid = true;
      const updatedCourse: IUpdatedCourse = {
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
      if (!title) {
        toast.error(`Title is required`, {
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
        toast.error(`Price is required`, {
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
      if (!imageName) {
        toast.error(`Image is required`, {
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
        toast.error(`Discount Price is required`, {
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
      if (!totalHours) {
        toast.error(`Total Hours is required`, {
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
        toast.error(`Likes In Percentage is required`, {
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
        toast.error(`Likes In Numbers is required`, {
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
        toast.error(`Author is required`, {
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
        console.log("updated full course", updatedCourse);
        const res = await updateCourse(updatableCourse.id, updatedCourse);
        console.log(res);

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
        // get all courses again
        const coursesData = await getCourses();
        setCourses(coursesData);
        // reset form fields
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

      <div className="w-full mx-auto   grid  p-8 ">
        <div className="w-full text-center">
          <h1 className="text-3xl pb-4">Update Course</h1>
          <hr className=" h-1 w-4/5 mx-auto rounded-xl " />
        </div>
        <div className="p-8  gap-4 justify-center items-center grid grid-cols-1 md:grid-cols-2 ">
          <div className="w-full mt-4">
            <TextField
              id="outlined-multiline-static"
              placeholder="Course Title"
              fullWidth
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              label="Course Title"
              variant="outlined"
            />
          </div>
          <div className="w-full mt-4">
            <TextField
              id="outlined-multiline-static"
              placeholder={"Course Price"}
              type="number"
              fullWidth
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              label="Course Price"
              variant="outlined"
            />
          </div>
          <div className="w-full mt-4">
            <TextField
              id="outlined-multiline-static"
              placeholder={"Discount Price"}
              type="number"
              fullWidth
              value={disCountPrice}
              onChange={(event) => setDiscountPrice(event.target.value)}
              label="Discount Price"
              variant="outlined"
            />
          </div>

          <div className="w-full mt-4 ">
            <TextField
              id="outlined-multiline-static"
              placeholder={"Total Hours"}
              type="number"
              fullWidth
              value={totalHours}
              onChange={(event) => setTotalHours(event.target.value)}
              label="Total Hours"
              variant="outlined"
            />
          </div>
          <div className="w-full mt-4">
            <TextField
              id="outlined-multiline-static"
              placeholder={"Likes Percentage"}
              type="number"
              fullWidth
              value={likesInProcent}
              onChange={(event) => setLikesInProcent(event.target.value)}
              label="Likes Percentage"
              variant="outlined"
            />
          </div>
          <div className="w-full mt-4">
            <TextField
              id="outlined-multiline-static"
              placeholder={"Likes Numbers"}
              type="number"
              fullWidth
              value={likesInNumbers}
              onChange={(event) => setLikesInNumbers(event.target.value)}
              label="Likes Numbers"
              variant="outlined"
            />
          </div>
          <div className="w-full mt-4">
            <TextField
              id="outlined-multiline-static"
              placeholder={"Author"}
              fullWidth
              value={author}
              onChange={(event) => setAuthor(event.target.value)}
              label="Author"
              variant="outlined"
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
          {/* {previewUrl && (
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
                    Change Course Image
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
          </div> */}
        </div>
        <div className="w-full mt-4 flex justify-center md:justify-end">
          <button
            type="submit"
            className="rounded-lg border-2 border-sky-500 px-8 py-3 text-xl text-sky-500 duration-200 hover:bg-sky-500 hover:text-white "
            onClick={() => {
              onSubmit();
            }}
          >
            Update Course
          </button>
        </div>
      </div>
    </>
  );
};

export default UpdateCourseForm;
