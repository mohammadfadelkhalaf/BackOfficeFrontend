import Card from "@/components/Card/Card";
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb";
import Link from "next/link";

import React from "react";

const page = () => {
  return (
    <>
      {/* <CustomBreadcrumb pageName={""} /> */}
      <section className="max-screen mx-auto card-section justify-center my-20">
        <Link href="/customer-management">
          <Card
            icon={"/Icons/customer.png"}
            title={"Customer management"}
            description={"Delete, Update, Manage customer here"}
            footer={"Update customer"}
          ></Card>
        </Link>
        <Link href={"/newsletters"}>
          <Card
            icon={"/Icons/newsletter.png"}
            title={"Newsletter"}
            description={"View, Edit, Update newsletter here"}
            footer={"Manage newsletter"}
          ></Card>
        </Link>
        <Link href={"/add-course"}>
          <Card
            icon={"/Icons/course.png"}
            title={"Course management"}
            description={"Add, Update, View, Delete courses here"}
            footer={"Manage courese"}
          ></Card>
        </Link>
        <Link href="/batch-setup">
          <Card
            icon={"/Icons/batch.png"}
            title={"Batch Setup"}
            description={"Add, Update, View, Delete batches here"}
            footer={"Manage batches"}
          ></Card>
        </Link>
        <Link href="/orders">
          <Card
            icon={"/Icons/order.png"}
            title={"Orders"}
            description={"Refund, Cancel, Manage order here"}
            footer={"Manage orders"}
          ></Card>
        </Link>

        <Link href="/chat" className="inline-block">
          <Card
            icon={"/Icons/chat.png"}
            title={"Chat"}
            description={"Chat with admin"}
            footer={"Your chats"}
          ></Card>
        </Link>
      </section>
    </>
  );
};

export default page;
