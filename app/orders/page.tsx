"use client";
import OrdersTable from "@/components/OrdersTable/OrdersTable";
import getOrders from "@/utils/getOrders";
import React from "react";

const orders = () => {
  const orders = getOrders();
  console.log("orders");
  return (
    <div>
      <OrdersTable />
    </div>
  );
};

export default orders;
