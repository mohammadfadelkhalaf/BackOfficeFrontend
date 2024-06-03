"use client";
import "./DataTable.css";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Image from "next/image";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';

interface HeadCell {
    disablePadding: boolean;
    id: string;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        id: 'course',
        numeric: false,
        disablePadding: false,
        label: 'Course Title',
    },
    {
        id: 'author',
        numeric: false,
        disablePadding: false,
        label: 'Author',
    },
    {
        id: 'price',
        numeric: true,
        disablePadding: false,
        label: 'Price',
    },
    {
        id: 'batch',
        numeric: false,
        disablePadding: false,
        label: 'Batch Name',
    },
    {
        id: 'start',
        numeric: false,
        disablePadding: false,
        label: 'Start Date',
    },
    {
        id: 'maximumNumber',
        numeric: true,
        disablePadding: false,
        label: 'Maximum Student',
    },
    {
        id: 'action',
        numeric: true,
        disablePadding: false,
        label: 'Actions',
    }
];

interface EnhancedTableProps {
    numSelected: number;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align="center"
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sx={{ fontSize: "1.6rem", fontWeight: "bold" }}
                    >
                        {headCell.label}
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const DataTable = ({
    rows,
    handleDelete,
    handleEdit,
    handleClose,
    scroll,
    open,
    descriptionElementRef,
    courses,
    batch,
    initialDate,
    handleDateChange,
    handleUpdate
}) => {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    console.log(batch);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // Avoid a layout jump when reaching the last page with empty rows.
    const emptyRows =
        page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    const isExpireValue = batch.isExpire ? 'true' : 'false';
    const isActiveValue = batch.isActive ? 'true' : 'false';


    return (
        <div className="shadow-xl max-w-screen-lg mx-auto mt-32 overflow-hidden mb-20">
            <Box sx={{ width: '100%', maxHeight: "25em", overflowY: "auto" }}>
                <Paper sx={{ width: '100%' }}>
                    <TableContainer>
                        <Table
                            Nutrition={{ minWidth: 750 }}
                            aria-labelledby="tableTitle"
                        >
                            <EnhancedTableHead
                                rowCount={rows.length}
                            />
                            <TableBody>
                                {rows?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.id}
                                            sx={{ cursor: 'pointer' }}
                                        >
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                padding="none" sx={{ fontSize: "1.6rem" }}
                                                align="center"
                                            >
                                                {row.course.title}
                                            </TableCell>
                                            <TableCell align="center" sx={{ fontSize: "1.6rem" }}>{row.course.author}</TableCell>
                                            <TableCell align="center" sx={{ fontSize: "1.6rem" }}>{row.course.price}</TableCell>
                                            <TableCell align="center" sx={{ fontSize: "1.6rem" }}>{row.batchName}</TableCell>
                                            <TableCell align="center" sx={{ fontSize: "1.6rem" }}>{row.startDate}</TableCell>
                                            <TableCell align="center" sx={{ fontSize: "1.6rem" }}>{row.maxMemberCount}</TableCell>
                                            <TableCell align="center" sx={{ fontSize: "1.6rem" }}>
                                                <button title="Edit" className="mx-4" onClick={() => handleEdit(row)}>
                                                    <Image src="/Icons/edit.png" alt="edit" width={20} height={20} />
                                                </button>

                                                <button title="Delete" className="mx-4" onClick={() => handleDelete(row.id)}>
                                                    <Image src="/Icons/bin.png" alt="delete" width={20} height={20} />
                                                </button>

                                            </TableCell>
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
                    <TablePagination
                        rowsPerPageOptions={[5, 10, 25]}
                        component="div"
                        count={rows.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                        sx={{ fontSize: "1.6rem" }}
                    />
                </Paper>
            </Box>

            <Dialog
                open={open}
                onClose={handleClose}
                scroll={scroll}
                aria-labelledby="scroll-dialog-title"
                aria-describedby="scroll-dialog-description"
            >
                <DialogTitle id="scroll-dialog-title" className="!text-[2rem] !font-semibold">Edit Batch</DialogTitle>
                <DialogContent dividers={scroll === 'paper'}>
                    <DialogContentText
                        id="scroll-dialog-description"
                        ref={descriptionElementRef}
                        tabIndex={-1}
                        className="!text-[1.6rem]"
                    >
                        <form className="batch-form w-full p-5 mx-auto" onSubmit={(e) => handleUpdate(e)}>
                            <div className="flex">
                                <div className="flex flex-col w-full my-3 mx-4">
                                    <label>Batch Name</label>
                                    <input required type="text" name="batchName" defaultValue={batch.batchName} placeholder="Batch Name" />
                                </div>

                                <div className="flex flex-col w-full my-3 mx-4">
                                    <label>Select a Course</label>
                                    <select name="course" required>
                                        <option value="" selected disabled hidden>Select a Course</option>
                                        {
                                            courses?.map((course) => <option key={course.id} value={course.id} selected={course.title === batch?.course?.title}>{course.title}</option>)
                                        }
                                    </select>
                                </div>
                            </div>

                            <div className="flex">
                                <div className="flex flex-col w-full my-3 mx-4">
                                    <label>Select Starting Date</label>
                                    <input required type="date" name="date" value={initialDate} onChange={(e) => handleDateChange(e)} />
                                </div>

                                <div className="flex flex-col w-full my-3 mx-4">
                                    <label>Maximum Students</label>
                                    <input type="number" defaultValue={batch.maxMemberCount} required placeholder="Add Maximum number of student" name="maxMember" />
                                </div>

                                <input type="hidden" name="batchId" readOnly value={batch.id} />
                            </div>

                            <div className="flex">
                                <div className="flex flex-col w-full my-3 mx-4">
                                    <FormLabel id="demo-row-radio-buttons-group-label" className="!text-3xl !text-black">Is Active</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="active"
                                        value={isActiveValue}
                                    >
                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="false" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </div>

                                <div className="flex flex-col w-full my-3 mx-4">
                                    <FormLabel id="demo-row-radio-buttons-group-label" className="!text-3xl !text-black">Is Expired</FormLabel>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="expire"
                                        value={isExpireValue}
                                    >
                                        <FormControlLabel value="true" control={<Radio />} label="Yes" />
                                        <FormControlLabel value="false" control={<Radio />} label="No" />
                                    </RadioGroup>
                                </div>
                            </div>

                            <div className="submit-btn">
                                <input type="submit" className="cursor-pointer" value="Update Batch" />
                            </div>
                        </form>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button className="!text-[1.6rem]" onClick={handleClose}>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
};

export default DataTable;