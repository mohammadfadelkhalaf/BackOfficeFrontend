export interface IUpdatableOrder {
  userId: string;
  courseBatchId: number;
  paidAmount: number;
}

const updateOrder = async (
  orderId: number,
  updatedFields: IUpdatableOrder
): Promise<void> => {
  try {
    const response = await fetch(
      `https://localhost:7098/api/Orders/${orderId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedFields),
      }
    );

    if (!response.ok) {
      const contentType = response.headers.get("content-type");
      let errorData = "Unknown error";

      if (contentType && contentType.includes("application/json")) {
        errorData = await response.json();
      } else {
        errorData = await response.text();
      }

      throw new Error(
        `Failed to update order: ${response.status} ${response.statusText} - ${errorData}`
      );
    }
  } catch (error) {
    throw new Error("Failed to update order");
  }
};

export default updateOrder;
