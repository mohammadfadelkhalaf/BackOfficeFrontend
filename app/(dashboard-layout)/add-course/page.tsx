"use client";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
// import Link from "@mui/material/Link";
import AddCourseForm from "@/components/AddCourseForm/AddCourseForm";
import CoursesTable from "@/components/CoursesTable/CoursesTable";
import WithAuth from "@/components/WithAuth/WithAuth";
import getCourses from "@/utils/getCourses";
import Link from "next/link";
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb";

const AddCoursePage = () => {
  return (
    <>
      <CustomBreadcrumb pageName={"Courses"} />
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

export default WithAuth(AddCoursePage);
