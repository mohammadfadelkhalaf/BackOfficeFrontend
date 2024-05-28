export async function uploadSingleFile(fileData: File): Promise<string> {
  const apiAddress = "https://localhost:7098" as string;
  // const apiAddress = process.env.REACT_APP_SECRET as string;
  const formData = new FormData();
  formData.append("file", fileData);

  try {
    const response = await fetch(`${apiAddress}/api/FileUploader`, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const data = await response.text();
    console.log(data);
    return data;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}
