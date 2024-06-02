import getCourses, { ICourseFromDB } from "@/utils/getCourses";
import React, { createContext, useContext, useEffect, useState } from "react";

interface CoursesContextType {
  courses: ICourseFromDB[];
  loading: boolean;
  error: string | null;
  setCourses: React.Dispatch<React.SetStateAction<ICourseFromDB[]>>;
}

const CoursesContext = createContext<CoursesContextType>({
  courses: [],
  loading: true,
  error: null,
  setCourses: () => {},
});

export const CoursesProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [courses, setCourses] = useState<ICourseFromDB[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const coursesData = await getCourses();
        setCourses(coursesData);
      } catch (error) {
        setError("Failed to fetch courses");
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, []);

  return (
    <CoursesContext.Provider value={{ courses, loading, error, setCourses }}>
      {children}
    </CoursesContext.Provider>
  );
};

export const useCourses = () => useContext(CoursesContext);
