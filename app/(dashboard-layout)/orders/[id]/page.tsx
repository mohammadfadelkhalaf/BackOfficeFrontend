"use client";
import SingleOrder from "@/components/SingleOrder/SingleOrder";
import WithAuth from "@/components/WithAuth/WithAuth";
import fetchSingleOrderById from "@/utils/fetcSingleOrderById";
import React, { useEffect, useState } from "react";

const SingleOrderPage = ({ params }) => {
  const { id } = params;
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const orderData = await fetchSingleOrderById(id);
        setOrder(orderData);
      } catch (error) {
        console.error("Error fetching order:", error);
      }
    };

    if (id) {
      fetchOrder();
    }
  }, [id]);
  return (
    <div>{order && <SingleOrder order={order} setOrder={setOrder} />}</div>
  );
};

export default WithAuth(SingleOrderPage);
