export interface IBatch {
  id: number;
  batchName: string;
  courseId: number;
  startDate: string;
  maxMemberCount: number;
  isActive: boolean;
  isExpire: boolean;
  course: any;
  userCourses: any[];
  orders: any[];
}

export interface ICourseFromDB {
  id: number;
  title: string;
  imageName: string;
  price: number;
  disCountPrice: number;
  totalHours: number;
  likesInNumbers: number;
  likesInProcent: number;
  author: string;
  isBestSeller: boolean;
  isFeatured: boolean;
  isActive: boolean;
  isDelete: boolean;
  creationDate: string;
  creatorId: string;
  modificationDate: string;
  modifierId: string;
  batches: IBatch[];
}

const getCourses = async (): Promise<ICourseFromDB[]> => {
  try {
    const response = await fetch("https://localhost:7098/api/Courses", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch courses");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch courses");
  }
};
export default getCourses;

// const getCourses = async (): Promise<ICourseFromDB[]> => {
//   let url = "https://localhost:7098/api/Courses";

//   const res = await fetch(url, {
//     cache: "no-cache",
//   });
//   return res.json();
// };

// export default getCourses;
