"use client";

import AddCourseForm from "@/components/AddCourseForm/AddCourseForm";
import CoursesTable from "@/components/CoursesTable/CoursesTable";
import getCourses from "@/utils/getCourses";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";

function handleClick(event) {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
}
const AddCoursePage = () => {
  // const courses = await getCourses();
  // console.log(courses);
  return (
    <>
      <div role="presentation" onClick={handleClick}>
        <Breadcrumbs aria-label="breadcrumb" sx={{ fontSize: "1.5rem" }}>
          <Link underline="hover" color="inherit" href="/dashboard">
            Dashboard
          </Link>
          <Typography color="text.primary" sx={{ fontSize: "1.5rem" }}>
            Courses
          </Typography>
        </Breadcrumbs>
      </div>
      <div className="flex flex-col md:flex-row justify-between space-x-4 mt-3">
        <div className="w-full md:w-1/2">
          <AddCourseForm />
        </div>
        <div className="w-full md:w-1/2 mt-10 md:mt-0">
          <CoursesTable />
        </div>
      </div>
    </>
  );
};

export default AddCoursePage;
