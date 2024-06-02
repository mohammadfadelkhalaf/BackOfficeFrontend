"use client";
import React, { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../customerManagement.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WithAuth from "@/components/WithAuth/WithAuth";
import CustomBreadcrumb from "@/components/CustomBreadcrumb/CustomBreadcrumb";

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const headCells1: readonly HeadCell[] = [
  {
    id: "batchname",
    numeric: false,
    disablePadding: false,
    label: "Batch Name",
  },
  {
    id: "paidamount",
    numeric: false,
    disablePadding: false,
    label: "Paid Amount",
  },
  {
    id: "startingdate",
    numeric: false,
    disablePadding: false,
    label: "Start Date",
  },
  {
    id: "maximumstudent",
    numeric: false,
    disablePadding: false,
    label: "Maximum Student",
  },
  {
    id: "coursetitle",
    numeric: true,
    disablePadding: false,
    label: "Course Title",
  },
  {
    id: "courseprice",
    numeric: true,
    disablePadding: false,
    label: "Course Price",
  },
  {
    id: "author",
    numeric: true,
    disablePadding: false,
    label: "Author",
  },
];

const headCells2: readonly HeadCell[] = [
  {
    id: "couresetitle",
    numeric: false,
    disablePadding: false,
    label: "Course Title",
  },
  {
    id: "author",
    numeric: false,
    disablePadding: false,
    label: "Author",
  },
  {
    id: "courseprice",
    numeric: false,
    disablePadding: false,
    label: "Course Price",
  },
  {
    id: "batchname",
    numeric: false,
    disablePadding: false,
    label: "Batch Name",
  },
  {
    id: "startingdate",
    numeric: true,
    disablePadding: false,
    label: "Start Date",
  },
];

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

function EnhancedTableHeadOne(props: EnhancedTableProps) {
  return (
    <TableHead>
      <TableRow>
        {headCells1.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sx={{ fontSize: "1.6rem", fontWeight: "bold" }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableHeadTwo(props: EnhancedTableProps) {
  return (
    <TableHead>
      <TableRow>
        {headCells2.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sx={{ fontSize: "1.6rem", fontWeight: "bold" }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const ViewSingleUser = ({ params }) => {
  const id = params.id;

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [value, setValue] = useState(0);
  const [userPayment, setUserPayment] = useState([]);
  const [userCourse, setUserCourse] = useState([]);

  useEffect(() => {
    const getUserPayment = async () => {
      const response = await axios.get(
        `https://localhost:7098/api/Orders/GetOrderDetailsByUserId/${id}`
      );
      if (response.status !== 200) {
        return;
      }
      setUserPayment(response.data);
    };

    const getUserCourse = async () => {
      const response = await axios.get(
        `https://localhost:7098/api/UserCourses/GetCourseDetailsByUserId/${id}`
      );
      if (response.status !== 200) {
        return;
      }
      setUserCourse(response.data);
    };

    getUserPayment();
    getUserCourse();
  }, []);

  console.log(userPayment);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - 10) : 0; // rows.length

  return (
    <div className="shadow-xl max-w-screen-xl mx-auto mt-32 overflow-hidden mb-20">
      <Box sx={{ width: "100%", fontSize: "1.6rem" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab
              sx={{ fontSize: "1.6rem" }}
              label="Payment History"
              {...a11yProps(0)}
            />
            <Tab
              sx={{ fontSize: "1.6rem" }}
              label="Course History"
              {...a11yProps(1)}
            />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Box sx={{ width: "100%", maxHeight: "25em", overflowY: "auto" }}>
            <Paper sx={{ width: "100%" }}>
              <TableContainer>
                <Table
                  Nutrition={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                >
                  <EnhancedTableHeadOne rowCount={userPayment.length} />
                  <TableBody>
                    {userPayment?.map((row, key) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          sx={{ cursor: "pointer" }}
                          key={key}
                        >
                          <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                            {row?.batch?.batchName}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                            {row?.paidAmount}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                            {row?.batch?.startDate}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                            {row?.batch?.maxMemberCount}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                            {row?.batch?.course?.title}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                            {row?.batch?.course?.price}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                            {row?.batch?.course?.author}
                          </TableCell>
                          {/* <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                                                            <div className="flex justify-center items-center">
                                                                <button title="Edit" className="mx-4" onClick={() => handleEdit(row)}>
                                                                    <Image src="/Icons/edit.png" alt="edit" width={20} height={20} />
                                                                </button>

                                                                <Link href={`/customer-management/${row.id}`} title="View" className="mx-4">
                                                                    <Image src="/Icons/eye.png" alt="view" width={20} height={20} />
                                                                </Link>

                                                                <button title="Delete" className="mx-4" onClick={() => handleDelete(row.id)}>
                                                                    <Image src="/Icons/bin.png" alt="delete" width={20} height={20} />
                                                                </button>
                                                            </div>
                                                        </TableCell> */}
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </CustomTabPanel>

        <CustomTabPanel value={value} index={1}>
          <Box sx={{ width: "100%", maxHeight: "25em", overflowY: "auto" }}>
            <Paper sx={{ width: "100%" }}>
              <TableContainer>
                <Table
                  Nutrition={{ minWidth: 750 }}
                  aria-labelledby="tableTitle"
                >
                  <EnhancedTableHeadTwo rowCount={userCourse.length} />
                  <TableBody>
                    {userCourse?.map((row, key) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          sx={{ cursor: "pointer" }}
                          key={key}
                        >
                          <TableCell
                            component="th"
                            scope="row"
                            padding="none"
                            sx={{ fontSize: "1.6rem" }}
                            align="center"
                          >
                            {row?.batch?.course?.title}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                            {row?.batch?.course?.author}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                            {row?.batch?.course?.price}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                            {row?.batch?.batchName}
                          </TableCell>
                          <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                            {row?.batch?.startDate}
                          </TableCell>
                          {/* <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                                                            <div className="flex justify-center items-center">
                                                                <button title="Edit" className="mx-4" onClick={() => handleEdit(row)}>
                                                                    <Image src="/Icons/edit.png" alt="edit" width={20} height={20} />
                                                                </button>

                                                                <Link href={`/customer-management/${row.id}`} title="View" className="mx-4">
                                                                    <Image src="/Icons/eye.png" alt="view" width={20} height={20} />
                                                                </Link>

                                                                <button title="Delete" className="mx-4" onClick={() => handleDelete(row.id)}>
                                                                    <Image src="/Icons/bin.png" alt="delete" width={20} height={20} />
                                                                </button>
                                                            </div>
                                                        </TableCell> */}
                        </TableRow>
                      );
                    })}
                    {emptyRows > 0 && (
                      <TableRow>
                        <TableCell colSpan={6} />
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </Paper>
          </Box>
        </CustomTabPanel>
      </Box>
    </div>
  );
};

export default WithAuth(ViewSingleUser);
