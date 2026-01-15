import React, { useState, HTMLInputTypeAttribute } from "react";
import { Stack, Input, Field, NativeSelect } from "@chakra-ui/react";
import LoadingButton, { LoadingButtonState } from "./LoadingButton";

export interface SelectOption {
    value: string;
    label: string;
}

export interface FormFieldDef {
    name: string;
    label: string;
    type: HTMLInputTypeAttribute;
    placeholder?: string;
    options?: SelectOption[];
}

interface FormProps {
    fields: FormFieldDef[];
    submitLabel: string;
    onSubmit: (data: any) => void;
    isLoading?: boolean;
}

export const Form = ({ fields, submitLabel, onSubmit, isLoading = false }: FormProps) => {
    const [formData, setFormData] = useState<Record<string, any>>({});

    const handleChange = (name: string, value: string) => {
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleClick = () => {
        onSubmit(formData);
    };

    return (
        <Stack gap="4">
            {fields.map((field) => (
                <Field.Root key={field.name}>
                    <Field.Label fontSize="14px" fontWeight="600" mb={2}>
                        {field.label}
                    </Field.Label>

                    {field.type === "select" ? (
                        <NativeSelect.Root>
                            <NativeSelect.Field
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
                            </NativeSelect.Field>
                        </NativeSelect.Root>
                    ) : (
                        <Input
                            h="44px"
                            type={field.type}
                            placeholder={field.placeholder}
                            onChange={(e) => handleChange(field.name, e.target.value)}
                            value={formData[field.name] || ""}
                        />
                    )}
                </Field.Root>
            ))}

            <div style={{ marginTop: '10px' }}>
                <LoadingButton
                    color="#5B5BF7"
                    state={isLoading ? LoadingButtonState.LOADING : LoadingButtonState.INACTIVE}
                    click={handleClick}
                >
                    {submitLabel}
                </LoadingButton>
            </div>
        </Stack>
    );
};

export default Form;