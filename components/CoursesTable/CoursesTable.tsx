import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import CourseTableRow from "./CourseTableRow";
import getCourses, { ICourseFromDB } from "@/utils/getCourses";
import { useEffect, useState } from "react";
import { useCourses } from "@/ApiProviders/CourseProvider";

const CoursesTable = () => {
  const { courses, error, loading, setCourses } = useCourses();
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      {/* <div className="w-full text-center my-20">
        <h1 className="text-3xl pb-10">All Course</h1>
        <hr className=" h-1 w-4/5 mx-auto rounded-xl " />
      </div> */}
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead sx={{ bgcolor: "#eef1f8" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Title
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Author
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Price
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                Hours
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "1.2rem" }}
                align="right"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {courses?.map((course) => (
              <CourseTableRow key={course.id} course={course} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default CoursesTable;
