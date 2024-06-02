const deleteNewsletter = async (subscriberEmail: string) => {
  try {
    const response = await fetch(
      `https://localhost:7098/api/Subscribers/${subscriberEmail}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
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
        `Failed to delete course: ${response.status} ${response.statusText} - ${errorData}`
      );
    }

    // If the response is plain text
    return await response.text();
  } catch (error) {
    console.error("Error deleting course:", error);
    throw new Error(`Failed to delete course: ${error.message}`);
  }
};

export default deleteNewsletter;
