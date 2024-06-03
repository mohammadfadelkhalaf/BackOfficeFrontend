import { IOrder } from "./getOrders";

const fetchSingleOrderById = async (orderId: number): Promise<IOrder> => {
  try {
    const response = await fetch(
      `https://coursesmanagementsapi.azurewebsites.net/api/Orders/${orderId}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch order");
    }

    return await response.json();
  } catch (error) {
    throw new Error("Failed to fetch order");
  }
};

export default fetchSingleOrderById;
