import getNewsLetters, { INewsLetter } from "@/utils/getNewsletters";
import React, { createContext, useContext, useEffect, useState } from "react";

interface NewslettersContextType {
  newsLetters: INewsLetter[];
  loading: boolean;
  error: string | null;
  setNewsLetters: React.Dispatch<React.SetStateAction<INewsLetter[]>>;
}

const NewsletterContext = createContext<NewslettersContextType>({
  newsLetters: [],
  loading: true,
  error: null,
  setNewsLetters: () => {},
});

export const NewslettersProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [newsLetters, setNewsLetters] = useState<INewsLetter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  console.log("from newsletter context");

  useEffect(() => {
    const fetchNewsLetters = async () => {
      try {
        const newsLettersData = await getNewsLetters();
        setNewsLetters(newsLettersData);
      } catch (error) {
        setError("Failed to fetch newsLetters");
      } finally {
        setLoading(false);
      }
    };

    fetchNewsLetters();
  }, []);

  return (
    <NewsletterContext.Provider
      value={{ newsLetters, loading, error, setNewsLetters }}
    >
      {children}
    </NewsletterContext.Provider>
  );
};

export const useNewsLetters = () => useContext(NewsletterContext);
