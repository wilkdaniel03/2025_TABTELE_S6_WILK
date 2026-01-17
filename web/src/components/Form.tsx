import { useState, useEffect, HTMLInputTypeAttribute, ReactNode } from "react";
import * as Chakra from "@chakra-ui/react";

export interface ISelectOption {
    value: string;
    label: string;
}

export interface IFormField {
    name: string;
    label: string;
    type: HTMLInputTypeAttribute | "select";
    placeholder?: string;
    options?: ISelectOption[];
	value?: string | number;
}

interface IFormProps {
    fields: IFormField[];
    // submitLabel: string;
    onSubmit: (data: any) => void;
    errors?: Record<string, string>;
    children: (triggerSubmit: () => void) => ReactNode;
}

const Form = ({ fields, onSubmit, errors = {}, children }: IFormProps) => {
    const [formData, setFormData] = useState<Record<string, any>>({});
	const [trigger,setTrigger] = useState<boolean>(false);

	useEffect(() => {
		let currentFormData = formData;
		for(let val of fields) {
			if(val.value !== undefined)
				currentFormData[val.name] = `${val.value}`;
			else
				currentFormData[val.name] = "";
		}
		setFormData(currentFormData);
		setTrigger(!trigger);
	},[fields]);

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const triggerSubmit = () => {
        onSubmit(formData);
    };

    return (
        <Chakra.Stack gap="4">
            {fields.map((field) => (
                <Chakra.Field.Root key={field.name} invalid={!!errors[field.name]}>
                    <Chakra.Field.Label fontSize="14px" fontWeight="600" mb={2}>
                        {field.label}
                    </Chakra.Field.Label>

                    {field.type === "select" ? (
                        <Chakra.NativeSelect.Root>
                            <Chakra.NativeSelect.Field
                                h="44px"
                                placeholder={field.placeholder}
                                onChange={(e) => handleChange(field.name, e.target.value)}
                                value={formData[field.name] || ""}
                            >
                                {field.options?.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </Chakra.NativeSelect.Field>
                        </Chakra.NativeSelect.Root>
                    ) : (
                        <Chakra.Input
                            h="44px"
                            type={field.type}
                            placeholder={field.placeholder}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            value={formData[field.name]}
                        />
                    )}

                    {errors[field.name] && (
                        <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                            {errors[field.name]}
                        </div>
                    )}
                </Chakra.Field.Root>
            ))}

            <div style={{ marginTop: "10px" }}>
                {children(triggerSubmit)}
            </div>
        </Chakra.Stack>
    );
};

export default Form;
