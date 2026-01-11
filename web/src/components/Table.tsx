import { ReactNode } from "react";
import * as Chakra from "@chakra-ui/react";

interface ITableHeaderProps {
	children: ReactNode;
}

const TableHeader = (props: ITableHeaderProps) => {
	return (
		<Chakra.Table.Header>
			<Chakra.TableRow>{props.children}</Chakra.TableRow>
		</Chakra.Table.Header>
	)
}

interface ITableRowProps {
	data: string[];
}

const TableRow = (props: ITableRowProps) => {
	return (
		<Chakra.Table.Row>
			{props.data.map((index,cell) => {
				return <Chakra.Table.Cell key={index}>{cell}</Chakra.Table.Cell>
			})}
		</Chakra.Table.Row>
	);
}

interface ITableProps {
	fields: string[];
	data: string[][];
}

const Table = (props: ITableProps) => {
	return (
		<Chakra.Table.Root interactive>
			<TableHeader>
				{props.fields.map((index,field) => {
					return <Chakra.Table.ColumnHeader key={index}>{field}</Chakra.Table.ColumnHeader>
				})}
			</TableHeader>
			<Chakra.Table.Body>
				{props.data.map(data => {
					return <TableRow data={data}/>
				})}
			</Chakra.Table.Body>
		</Chakra.Table.Root>
	);
}

export default Table;
