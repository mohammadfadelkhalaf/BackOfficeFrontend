import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TablePagination from "@mui/material/TablePagination";
import { useEffect, useState } from "react";
import { useOrders } from "@/ApiProviders/OrdersProvider";
import NewsletterTableRow from "./NewsletterTableRow";
import getNewsLetters, { INewsLetter } from "@/utils/getNewsletters";
import { useNewsLetters } from "@/ApiProviders/NewslettersProvider";

const NewsletterTable = () => {
  //   const { orders } = useOrders(); // this works
  // const { newsLetters, loading, error, setNewsLetters } = useNewsLetters(); // this does not work

  const [newsLetters, setNewsLetters] = useState<INewsLetter[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  // pagination options
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="max-w-screen-sm md:max-w-screen-xl mx-auto">
      <div className="w-full text-center my-20">
        <h1 className="text-3xl pb-10">All Subscribers</h1>
        <hr className=" h-1 w-4/5 mx-auto rounded-xl " />
      </div>
      <TableContainer component={Paper}>
        <Table aria-label="simple table">
          <TableHead sx={{ bgcolor: "#eef1f8" }}>
            <TableRow>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.6rem" }}>
                User email
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.6rem" }}>
                Daily newsletter
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.6rem" }}>
                Advertising updates
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.6rem" }}>
                Week in review
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.6rem" }}>
                Event updates
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.6rem" }}>
                Startup weekly
              </TableCell>
              <TableCell sx={{ fontWeight: "bold", fontSize: "1.6rem" }}>
                Podcasts
              </TableCell>
              <TableCell
                sx={{ fontWeight: "bold", fontSize: "1.6rem" }}
                align="right"
              >
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {newsLetters
              ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((newsLetter) => (
                <NewsletterTableRow
                  key={newsLetter.email}
                  newsLetter={newsLetter}
                  setNewsLetters={setNewsLetters}
                />
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={newsLetters.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{
            "& .MuiTablePagination-toolbar": {
              fontSize: "1.2rem",
            },
            "& .MuiTablePagination-selectLabel": {
              fontSize: "1.2rem",
            },
            "& .MuiTablePagination-input": {
              fontSize: "1.2rem",
            },
            "& .MuiTablePagination-displayedRows": {
              fontSize: "1.2rem",
            },
          }}
        />
      </TableContainer>
    </div>
  );
};

export default NewsletterTable;
