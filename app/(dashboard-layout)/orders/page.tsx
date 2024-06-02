"use client";
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb";
import OrdersTable from "@/components/OrdersTable/OrdersTable";
import WithAuth from "@/components/WithAuth/WithAuth";
import getOrders from "@/utils/getOrders";
import React from "react";

const orders = () => {
  const orders = getOrders();
  console.log("orders");
  return (
    <div>
      <CustomBreadcrumb pageName={"orders"} />
      <OrdersTable />
    </div>
  );
};

export default WithAuth(orders);
