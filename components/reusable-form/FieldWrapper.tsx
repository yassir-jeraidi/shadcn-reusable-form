"use client";

import {ReactNode} from "react";
import {FormItem, FormLabel, FormDescription, FormMessage} from "./shadcn";

type FieldWrapperProps = {
    label?: ReactNode;
    description?: ReactNode;
    requiredIndicator?: ReactNode;
    children: ReactNode;
    help?: ReactNode;
};

export function FieldWrapper({
                                 label,
                                 description,
                                 requiredIndicator,
                                 children,
                                 help,
                             }: FieldWrapperProps) {
    return (
        <FormItem>
            {label ? (
                <FormLabel>
                    {label}
                    {requiredIndicator ? (
                        <span aria-hidden="true"> {requiredIndicator}</span>
                    ) : null}
                </FormLabel>
            ) : null}
            {description ? <FormDescription>{description}</FormDescription> : null}
            {children}
            {help ? (
                <div className="text-muted-foreground text-sm">{help}</div>
            ) : null}
            <FormMessage/>
        </FormItem>
    );
}
