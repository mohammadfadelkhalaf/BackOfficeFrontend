"use client";
import { ReactNode, useState } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { OrdersProvider } from "./OrdersProvider";
import { CoursesProvider } from "./CourseProvider";
import { NewslettersProvider } from "./NewslettersProvider";

const Providers = ({ children }: { children: ReactNode }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      <CoursesProvider>
        <OrdersProvider>
          <NewslettersProvider>{children}</NewslettersProvider>
        </OrdersProvider>
      </CoursesProvider>
    </QueryClientProvider>
  );
};

export default Providers;
