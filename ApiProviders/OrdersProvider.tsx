import getOrders, { IOrder } from "@/utils/getOrders";
import React, { createContext, useContext, useEffect, useState } from "react";

interface OrdersContextType {
  orders: IOrder[];
  loading: boolean;
  error: string | null;
  setOrders: React.Dispatch<React.SetStateAction<IOrder[]>>;
}

const OrdersContext = createContext<OrdersContextType>({
  orders: [],
  loading: true,
  error: null,
  setOrders: () => {},
});

export const OrdersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const ordersData = await getOrders();
        setOrders(ordersData);
      } catch (error) {
        setError("Failed to fetch orders");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <OrdersContext.Provider value={{ orders, loading, error, setOrders }}>
      {children}
    </OrdersContext.Provider>
  );
};

export const useOrders = () => useContext(OrdersContext);
