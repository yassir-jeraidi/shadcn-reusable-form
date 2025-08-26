"use client";

import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
    FieldComponent,
    FieldConfig,
    RadioFieldSpecific,
} from "../types";
import { FieldWrapper } from "../FieldWrapper";
import { FormControl, FormField, RadioGroup, RadioGroupItem } from "../shadcn";

export function createRadioGroupAdapter<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>(): FieldComponent<TFieldValues, TName> {
    return ({ control, name, field, label, description, help }) => {
        const isRadio = (
            f: FieldConfig<TFieldValues, TName>
        ): f is FieldConfig<TFieldValues, TName> & RadioFieldSpecific =>
            f.kind === "radio";
        const options = isRadio(field) ? field.options : [];

        return (
            <FormField
                control={control as ControllerProps<TFieldValues, TName>["control"]}
                name={name}
                render={({ field: rhfField }) => (
                    <FieldWrapper
                        label={label}
                        description={description}
                        help={help}
                        requiredIndicator={field.requiredIndicator}
                    >
                        <FormControl>
                            <RadioGroup
                                value={(rhfField.value as string) ?? ""}
                                onValueChange={rhfField.onChange}
                                className="grid gap-2"
                                disabled={field.disabled}
                            >
                                {options.map((opt) => (
                                    <label key={opt.value} className="flex items-center gap-2">
                                        <RadioGroupItem value={opt.value} />
                                        <span>{opt.label}</span>
                                    </label>
                                ))}
                            </RadioGroup>
                        </FormControl>
                    </FieldWrapper>
                )}
            />
        );
    };
}
