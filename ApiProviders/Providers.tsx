"use client";
import { ReactNode, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { CoursesProvider } from "@/app/Providers/CourseProvider";
import { OrdersProvider } from "./OrdersProvider";
const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <CoursesProvider>
        <OrdersProvider>{children}</OrdersProvider>
      </CoursesProvider>
    </QueryClientProvider>
  );
};

export default Providers;
