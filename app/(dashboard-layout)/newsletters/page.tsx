"use client";
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb";
import NewsletterTable from "@/components/NewsletterTable/NewsletterTable";
import React from "react";

const NewslettersPage = () => {
  return (
    <>
      <CustomBreadcrumb pageName={"Newsletters"} />
      <NewsletterTable />
    </>
  );
};

export default NewslettersPage;
