"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { Button, TextField } from "@mui/material";
import getNewsLetters from "@/utils/getNewsletters";
import { useNewsLetters } from "@/ApiProviders/NewslettersProvider";
import updateNewsletter from "@/utils/updateNewsletter";

const UpdateNewsLetterForm = ({
  updatableNewsLetter,
  handleClose,
  setNewsLetters,
}) => {
  console.log(updatableNewsLetter);
  const [email, setEmail] = useState<string>(updatableNewsLetter?.email || "");
  const [dailynewsletter, setDailynewsletter] = useState<boolean>(
    updatableNewsLetter?.dailynewsletter || false
  );
  const [advertisingupdates, setAdvertisingupdates] = useState<boolean>(
    updatableNewsLetter?.advertisingupdates || false
  );
  const [weekinreview, setWeekinreview] = useState<boolean>(
    updatableNewsLetter?.weekinreview || false
  );
  const [eventupdates, setEventupdates] = useState<boolean>(
    updatableNewsLetter?.eventupdates || false
  );
  const [startupweekly, setStartupweekly] = useState<boolean>(
    updatableNewsLetter?.startupweekly || false
  );
  const [podcasts, setPodcasts] = useState<boolean>(
    updatableNewsLetter?.podcasts || false
  );
  // const { newsLetters, error, loading, setNewsLetters } = useNewsLetters();

  const onSubmit = async () => {
    try {
      let isValid = true;
      const updatedNewsLetter = {
        email,
        dailynewsletter,
        advertisingupdates,
        weekinreview,
        eventupdates,
        startupweekly,
        podcasts,
      };

      // Validations
      const validations = [
        { field: email, message: "Email is required" },
        {
          field: dailynewsletter,
          message: "Daily newsletter info is required",
        },
        {
          field: advertisingupdates,
          message: "Advertising updates is required",
        },
        { field: weekinreview, message: "Week in review info is required" },
        { field: eventupdates, message: "Event updates info is required" },
        { field: startupweekly, message: "Startup weekly info is required" },
        { field: podcasts, message: "Podcasts is required" },
      ];

      for (const validation of validations) {
        if (validation.field === null || validation.field === "") {
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
        console.log("updated full NewsLetter", updatedNewsLetter);
        const res = await updateNewsletter(
          updatableNewsLetter.email,
          updatedNewsLetter
        );
        //   console.log(res);

        toast.success("Newsletter updated", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        // get all newsletters again
        const newsLettersData = await getNewsLetters();
        setNewsLetters(newsLettersData);

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
        <div className="p-8 gap-4 justify-center items-center grid grid-cols-1 ">
          <div className="w-full mt-4">
            <TextField
              placeholder="Email"
              fullWidth
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              label="Email"
              variant="outlined"
              InputProps={{
                style: { fontSize: "1.6rem" },
              }}
              InputLabelProps={{
                style: { fontSize: "1.6rem" },
              }}
            />
          </div>

          <div className="w-full mt-4 flex flex-col gap-2 md:gap-4 justify-center md:justify-start pl-6 ">
            <FormControlLabel
              control={
                <Checkbox
                  checked={dailynewsletter}
                  onChange={(event) => setDailynewsletter(event.target.checked)}
                />
              }
              label="Daily Newsletter"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "1.6rem",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={advertisingupdates}
                  onChange={(event) =>
                    setAdvertisingupdates(event.target.checked)
                  }
                />
              }
              label="Advertising updates"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "1.6rem",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={weekinreview}
                  onChange={(event) => setWeekinreview(event.target.checked)}
                />
              }
              label="Week in review"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "1.6rem",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={eventupdates}
                  onChange={(event) => setEventupdates(event.target.checked)}
                />
              }
              label="Event updates"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "1.6rem",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={startupweekly}
                  onChange={(event) => setStartupweekly(event.target.checked)}
                />
              }
              label="Startup weekly"
              sx={{
                "& .MuiFormControlLabel-label": {
                  fontSize: "1.6rem",
                },
              }}
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={podcasts}
                  onChange={(event) => setPodcasts(event.target.checked)}
                />
              }
              label="Podcasts"
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

export default UpdateNewsLetterForm;
