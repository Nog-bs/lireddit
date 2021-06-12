import {
    FormControl,
    FormLabel,
    Input,
    FormErrorMessage,
} from "@chakra-ui/react";
import { useField } from "formik";
import React from "react";

type InputFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    name: string;
};

export const InputField: React.FC<InputFieldProps> = ({
    label,
    // gets rid of redundant prop
    size: _,
    ...props
}) => {
    const [field, { error }] = useField(props);
    return (
        // CONVERTS TO BOOLEAN !!
        <FormControl isInvalid={!!error}>
            <FormLabel htmlFor={field.name}>{label}</FormLabel>
            <Input {...field} {...props} id={field.name} />
            {error ? <FormErrorMessage>{error}</FormErrorMessage> : null}
        </FormControl>
    );
};