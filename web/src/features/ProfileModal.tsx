import { useState, useEffect } from "react";
import * as Chakra from "@chakra-ui/react";
import { Form, IFormField, ISelectOption } from "@components";
import { fetchChain } from "@fetchChain";
import { IUserRequest, IUserResponse } from "@http";
import { useToastStore, ToastIconType } from "@stores";
import Country from "@assets/country.json";

const options: ISelectOption[] = Country.map(item => ({ label: item.label, value: item.label.toLowerCase() }));

const ProfileModal = () => {
	const fetch = new fetchChain();
	const [formFields,setFormFields] = useState<IFormField[]>([
		{ name: "name", label: "Name", type: "text" },
		{ name: "surname", label: "Surname", type: "text" },
		{ name: "date_of_birth", label: "Date of Birth", type: "text" },
		{ name: "phone_number", label: "Phone number", type: "text" },
		{ name: "pesel", label: "Pesel", type: "text" },
		{ name: "nationality", label: "Nationality", type: "select", options: options }
	]);

	const { append } = useToastStore();

	useEffect(() => {
		fetch.fetchUserInfo()
			.then((data: IUserResponse) => {
				let newFormFields: IFormField[] = formFields.map(field => {
					for(let v in data) {
						if(field.options !== undefined && v === field.name)
							return { name: field.name, label: field.label, type: field.type, value: data[v], options: field.options };
						if(v === field.name)
							return { name: field.name, label: field.label, type: field.type, value: data[v] };
					}

					if(field.options !== undefined)
						return { name: field.name, label: field.label, type: field.type, options: field.options };
					return { name: field.name, label: field.label, type: field.type };
				});
				setFormFields(newFormFields);
			})
			.catch((err) => console.error(err));
	},[]);

	const submitHandler = (data: IUserRequest) => {
		fetch.updateUserInfo(data)
			.then(res => {
				if(res.status !== 200) {
					append({message:res.data.detail,type:ToastIconType.ERROR,fixed:false});
				} else {
					append({message:"Updated user info",type:ToastIconType.SUCCESS,fixed:false});
				}
			});
	};

	return (
		<Chakra.Box width="70%" marginLeft="auto" marginRight="auto">
			<Form fields={formFields} onSubmit={submitHandler}>
				{(handleSubmit) => <Chakra.Button onClick={handleSubmit} width="100%" fontWeight="semibold" bg="#0B84FF" color="white" _hover={{ bg: "#0A76E6" }}>
						Change
					</Chakra.Button>}
			</Form>
		</Chakra.Box>
	);
}

export default ProfileModal;
