import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import axios from "axios"
import { useState } from 'react';
import { Avatar, MenuItem, Select, TablePagination } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function UserPagination() {

	const [state, setState] = useState([])
	const [page, setPage] = React.useState(1);
	const [rowsPerPage, setRowsPerPage] = useState(2)

	useEffect(() => {
		axios.get(`https://reqres.in/api/users?page=${page}&per_page=${parseInt(rowsPerPage)}`)
			.then((response) => setState(response.data))
			.catch((err) => console.log(err))
	}, [page, rowsPerPage])

	const handleChangeRowsPerPage = (event, value) => {
		setRowsPerPage(parseInt(event.target.value));
		console.log("rows", rowsPerPage);
	};

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChange = (e) => {
		setPage(e.target.value)
	}
	console.log(state.data);
	return (
		<>
			{
				state.data?.map((el) => {
					return (
						<center>
							<Card sx={{ maxWidth: 300, backgroundColor: 'white', border: 'snow', borderRadius: 4, boxShadow: 6 }}>
								<Avatar src={el.avatar} sx={{ height: 90, width: 90 }} />
								<CardContent>
									<Typography fontSize={16} component="div">
										<h3>Id:{el.id}</h3>
										<h3>Email:{el.email}</h3>
										<h3>First Name:{el.first_name}</h3>
										<h3>Last Name:{el.last_name}</h3>
									</Typography>
								</CardContent>
							</Card >
							<br />
						</center>
					)
				})
			}

			<Stack spacing={2}>
				<Pagination count={Math.ceil(state.total / state.per_page)}
					color="primary"
					component="div"
					onChange={handleChangePage}
				/>
				{/* <TablePagination
					onPageChange={handleChangePage}
					rowsPerPage={rowsPerPage}
					rowsPerPageOptions={[2, 4, 6, 8, 10, 12]}
					onRowsPerPageChange={handleChangeRowsPerPage} /> */}
			</Stack>
			Per_Page:<Select
				value={rowsPerPage}
				onChange={handleChangeRowsPerPage}
			>
				<MenuItem value={1}>1</MenuItem>
				<MenuItem value={2}>2</MenuItem>
				<MenuItem value={4}>4</MenuItem>
				<MenuItem value={6}>6</MenuItem>
				<MenuItem value={8}>8</MenuItem>
				<MenuItem value={10}>10</MenuItem>
				<MenuItem value={12}>12</MenuItem>
			</Select>
			Jump to:<Select
				value={page}
				onChange={handleChange}>
				{
					state.total && new Array(Math.ceil(state.total / state.per_page)).fill(0).map((el,index) =>
						<MenuItem value={index + 1}>{index + 1}</MenuItem>)
				}
			</Select>
		</>
	);
}
