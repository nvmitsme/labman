import { Table } from "antd";
import { useActionHistoryContext } from "../../Context";
import { useEffect } from "react";

const ActionHistoryTable = () => {
	const {data, fetchData, loading, tableParams, setTableParams, tableSelection} = useActionHistoryContext();

	const columns = [
		{
			title: "Equipment Name",
			dataIndex: "type_name",
		},
		{
			title: "Student ID",
			dataIndex: "student_id",
		},
		{
			title: "Action",
			dataIndex: "log_type",
			render: (text) => {
				return getStatus(text);
			}
		},
		{
			title: "Time",
			dataIndex: "log_time",
			render: (text) => {
				const date = new Date(text);
				const year = date.getFullYear();
				const month = date.getMonth() + 1;
				const day = date.getDate();

				return `${year}-${month}-${day}`;
			}
		},
	];

	const getStatus = (status) => {
		if(tableSelection === "request"){
			if (status === "0") {
				return "Generated Request";
			}else if (status === "1") {
				return "Collected";
			}else if (status === "2") {
				return "Edit Request";
			}else if (status === "3") {
				return "Cancelled";
			}
		}else if(tableSelection === "equipment"){
			if (status === "0") {
				return "Borrowed Equipment";
			}else if (status === "1") {		
				return "Returned Equipment";
			}else if (status === "2") {
				return "Cancel Return";
			}
		}
	};

	const handleTableChange = (pagination) => {
		setTableParams({
			...tableParams,
			pagination: {
				...tableParams.pagination,
				current: pagination.current,
				pageSize: pagination.pageSize,
			},
		});
	};

	useEffect(() => {
		fetchData();
	}, []);

	useEffect(() => {
		fetchData();
	}, [tableSelection]);

	return (
		<Table
			columns={columns}
			dataSource={data}
			pagination={tableParams.pagination}
			onChange={handleTableChange}
			loading={loading}
			rowKey={(record) => record.log_id}
		/>
	);
};

export default ActionHistoryTable;