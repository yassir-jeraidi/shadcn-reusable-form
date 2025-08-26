"use client";

import {z} from "zod";
import {DefaultValues, FieldValues, useForm, UseFormProps, UseFormReturn,} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

export function useReusableForm<TValues extends FieldValues>(params: {
    schema: z.ZodType<TValues>;
    defaultValues?: DefaultValues<TValues>;
    mode?: UseFormProps<TValues>["mode"];
}): UseFormReturn<TValues> {
    const { schema, defaultValues, mode } = params;

    return useForm<TValues>({
        resolver: zodResolver(schema as z.ZodType<TValues, any>),
        defaultValues,
        mode,
    });
}


