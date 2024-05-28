// import axios from "axios";
// import { useQuery } from "@tanstack/react-query";
// export const useGetAllCourses = () => {
//   const courseInfo = useQuery({
//     queryKey: ["courses"],
//     queryFn: async () => {
//       let url = "https://localhost:7098/api/Courses";
//       const { data } = await axios.get(url);
//       return data;
//     },
//   });
//   return courseInfo;
// };

// // Add Course

// export const useAddCourse = () => {
//   const addCourse = async (newCourse) => {
//     let url = "https://localhost:7098/api/Courses";
//     const { data } = await axios.post(url, newCourse);
//     return data;
//   };
//   return { addCourse };
// };

// // Update employee
// export const useUpdateCourse = () => {
//   const updateEmployee = async (updatableCourseId, updatableCourseData) => {
//     const url = `/api/Employees/${updatableCourseId}`;
//     console.log("url: ", url);
//     const { data } = await axios.patch(url, updatableCourseData);
//     return data;
//   };
//   return { updateEmployee };
// };
