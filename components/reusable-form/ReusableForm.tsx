import {ReactNode} from "react";
import {z} from "zod";
import {
    FieldPath,
    FieldValues,
    UseFormProps,
    type UseFormReturn,
    DefaultValues,
} from "react-hook-form";

import {Form} from "./shadcn";
import {FieldConfig, FormComponents} from "./types";
import {FormFields} from "./FormFields";
import { useReusableForm} from "./hooks";

export type ReusableFormProps<TValues extends FieldValues> = {
    schema: z.ZodType<TValues>;
    fields: FieldConfig<TValues, FieldPath<TValues>>[];
    defaultValues?: DefaultValues<TValues>;
    mode?: UseFormProps<TValues>["mode"];
    onSubmit?: (data: TValues) => void;
    onError?: (errors: any) => void;
    components?: FormComponents<TValues>;
    /** Optional custom layout around the list of fields */
    children?: (ctx: {
        fields: ReactNode;
        form: UseFormReturn<TValues>;
    }) => ReactNode;
};

export function ReusableForm<TValues extends FieldValues>({
                                                              schema,
                                                              fields,
                                                              defaultValues,
                                                              onSubmit,
                                                              onError,
                                                              components,
                                                              children,
                                                          }: ReusableFormProps<TValues>) {

    const form = useReusableForm<TValues>({schema, defaultValues});

    const body = (
        <FormFields<TValues> fields={fields} components={components} form={form}/>
    );

    const formProps = onSubmit
        ? {onSubmit: form.handleSubmit(onSubmit, onError)}
        : onError
            ? {
                onSubmit: form.handleSubmit(() => {
                }, onError)
            }
            : {};

    return (
        <Form {...form}>
            <form {...formProps}>
                {children ? children({fields: body, form}) : body}
            </form>
        </Form>
    );
}
