import { ReactNode, useState } from "react";
import * as Chakra from "@chakra-ui/react";

const CHECKBOX_ALL = -1;

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

interface ITableCheckbox {
	checked: boolean;
	onCheckedChange?: (checked: Chakra.CheckboxCheckedChangeDetails) => void;
}

const TableCheckbox = (props: ITableCheckbox) => {
	return (
		<Chakra.Checkbox.Root checked={props.checked} onCheckedChange={props.onCheckedChange}>
			<Chakra.Checkbox.HiddenInput/>
			<Chakra.Checkbox.Control>
				<Chakra.Checkbox.Indicator/>
			</Chakra.Checkbox.Control>
			<Chakra.Checkbox.Label/>
		</Chakra.Checkbox.Root>
	);
}

interface ITableRowProps {
	data: string[];
	checkable: boolean;
	checked?: boolean;
	onCheckedChange?: (checked: Chakra.CheckboxCheckedChangeDetails) => void;
}

const TableRow = (props: ITableRowProps) => {
	return (
		<Chakra.Table.Row>
			{props.checkable ? <Chakra.Table.Cell><TableCheckbox checked={props.checked === true} onCheckedChange={props.onCheckedChange}/></Chakra.Table.Cell> : <></>}
			{props.data.map((cell,index) => {
				return <Chakra.Table.Cell key={index}>{cell}</Chakra.Table.Cell>
			})}
		</Chakra.Table.Row>
	);
}

interface ITableProps {
	fields: string[];
	data: string[][];
	checklist?: boolean[];
	checkedall?: boolean;
	checkable?: boolean;
	onCheckboxChange?: (index: number) => void;
}

const Table = (props: ITableProps) => {
	// const [checkedList,setChechedList] = useState<boolean[]>(new Array(props.fields.length+1).fill(false));
	// const [trigger,setTrigger] = useState<boolean>(false);

	// const onCheckboxChange = (index: number, checked: Chakra.CheckboxCheckedChangeDetails) => {
	// 	let currentCheckedList = checkedList;
	// 	currentCheckedList[index] = Boolean(checked.checked);
	// 	if(index === 0) {
	// 		for(let i = 1; i < currentCheckedList.length; i++)
	// 			currentCheckedList[i] = Boolean(checked.checked);
	// 	}
	// 	setChechedList(currentCheckedList);
	// 	setTrigger(!trigger);
	// }

	return (
		<Chakra.Table.Root interactive>
			<TableHeader>
			{props.checkable ? <Chakra.Table.ColumnHeader><TableCheckbox checked={props.checkedall === true} onCheckedChange={(checked) => props.onCheckboxChange!(CHECKBOX_ALL)}/></Chakra.Table.ColumnHeader> : <></>}
				{props.fields.map((field,index) => {
					return <Chakra.Table.ColumnHeader key={index}>{field}</Chakra.Table.ColumnHeader>
				})}
			</TableHeader>
			<Chakra.Table.Body>
				{props.data.map((data,index) => {
					return <TableRow key={index} checkable={props.checkable === true} checked={props.checklist![index]} onCheckedChange={(checked) => props.onCheckboxChange!(index)} data={data}/>
				})}
			</Chakra.Table.Body>
		</Chakra.Table.Root>
	);
}

export default Table;
