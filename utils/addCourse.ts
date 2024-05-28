export interface ICourse {
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

const addCourse = async (course: ICourse) => {
  try {
    const response = await fetch("https://localhost:7098/api/Courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(course),
    });

    if (!response.ok) {
      throw new Error("Failed to add course");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Failed to add course");
  }
};

export default addCourse;
