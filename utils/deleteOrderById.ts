const deleteOrderById = async (orderId: number): Promise<void> => {
  try {
    const response = await fetch(
      `https://localhost:7098/api/Orders/${orderId}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      throw new Error("Failed to delete order");
    }
  } catch (error) {
    throw new Error("Failed to delete order");
  }
};

export default deleteOrderById;
