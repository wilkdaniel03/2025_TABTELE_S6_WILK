import React, { useState, HTMLInputTypeAttribute, ReactNode } from "react";
import { Stack, Input, Field, NativeSelect } from "@chakra-ui/react";

export interface SelectOption {
    value: string;
    label: string;
}

export interface FormFieldDef {
    name: string;
    label: string;
    type: HTMLInputTypeAttribute | "select";
    placeholder?: string;
    options?: SelectOption[];
}

interface FormProps {
    fields: FormFieldDef[];
    onSubmit: (data: any) => void;
    errors?: Record<string, string>;
    children: (triggerSubmit: () => void) => ReactNode;
}

export const Form = ({ fields, onSubmit, errors = {}, children }: FormProps) => {
    const [formData, setFormData] = useState<Record<string, any>>({});

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
        <Stack gap="4">
            {fields.map((field) => (
                <Field.Root key={field.name} invalid={!!errors[field.name]}>
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

                    {errors[field.name] && (
                        <div style={{ color: "red", fontSize: "12px", marginTop: "4px" }}>
                            {errors[field.name]}
                        </div>
                    )}
                </Field.Root>
            ))}

            <div style={{ marginTop: "10px" }}>
                {children(triggerSubmit)}
            </div>
        </Stack>
    );
};

export default Form;