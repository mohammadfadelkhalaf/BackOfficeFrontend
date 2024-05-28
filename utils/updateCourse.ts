"use client";

import { ICourse } from "./addCourse";
import { ICourseFromDB } from "./getCourses";

// export interface IUpdateCourse {
//   title?: string;
//   price?: number;
//   imageName?: string;
//   discountPrice?: number;
//   hours?: number;
//   likesInProcent?: number;
//   likesInNumbers?: number;
//   author?: string;
//   isBestSeller?: boolean;
//   creatorId?: string;
//   modifierId?: string;
//   // isFeatured?: boolean;
//   // isActive?: boolean;
//   // isDelete?: boolean;
// }

// const updateCourse = async (courseId: number, updatedFields: ICourse) => {
//   try {
//     const response = await fetch(
//       `https://localhost:7098/api/Courses/${courseId}`,
//       {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(updatedFields),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to update course");
//     }
//     console.log(response);
//     return await response.json();
//   } catch (error) {
//     throw new Error("Failed to update course");
//   }
// };

// export default updateCourse;
const updateCourse = async (courseId: number, updatedFields: ICourse) => {
  try {
    const response = await fetch(
      `https://localhost:7098/api/Courses/${courseId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      }
    );

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      let errorData = "Unknown error";

      if (contentType && contentType.includes("application/json")) {
        errorData = await response.json();
      } else {
        errorData = await response.text();
      }

      throw new Error(
        `Failed to update course: ${response.status} ${response.statusText} - ${errorData}`
      );
    }

    // If the response is plain text, return it as is
    return await response.text();
  } catch (error) {
    console.error("Error updating course:", error);
    throw new Error(`Failed to update course: ${error.message}`);
  }
};

export default updateCourse;
