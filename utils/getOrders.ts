import { ICourseFromDB } from "./getCourses";

export interface IBatchFromDB {
  id: number;
  batchName: string;
  courseId: number;
  startDate: string;
  maxMemberCount: number;
  isActive: boolean;
  isExpire: boolean;
  course: ICourseFromDB;
  userCourses: any[];
  orders: any[];
}

export interface IOrder {
  id: number;
  userId: string;
  courseBatchId: number;
  paidAmount: number;
  userName: string;
  email: string;
  batch: IBatchFromDB;
}

const getOrders = async (): Promise<IOrder[]> => {
  try {
    const response = await fetch("https://localhost:7098/api/Orders");

    if (!response.ok) {
      throw new Error("Failed to fetch orders");
    }
    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch orders");
  }
};

export default getOrders;

// export const getOrders = async () => {
//   let url = "https://localhost:7098/api/Orders";

//   const res = await fetch(url, {
//     cache: "no-cache",
//   });
//   console.log(res);
//   return res.json();
// };

// export default getOrders;
