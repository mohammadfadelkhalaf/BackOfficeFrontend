export interface INewsLetter {
  email: string;
  dailynewsletter: boolean;
  advertisingupdates: boolean;
  weekinreview: boolean;
  eventupdates: boolean;
  startupweekly: boolean;
  podcasts: boolean;
}

const getNewsLetters = async (): Promise<INewsLetter[]> => {
  try {
    const response = await fetch("https://localhost:7098/api/Subscribers", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch newsletters");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching newsletters:", error);
    throw new Error("Failed to fetch newsletters");
  }
};

export default getNewsLetters;
