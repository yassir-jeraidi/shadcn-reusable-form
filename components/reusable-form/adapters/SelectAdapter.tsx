"use client";

import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
  FieldComponent,
  FieldConfig,
  SelectFieldSpecific,
} from "../types";
import { FieldWrapper } from "../FieldWrapper";
import { FormControl, FormField } from "../shadcn";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../shadcn";

export function createSelectAdapter<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(): FieldComponent<TFieldValues, TName> {
  return ({ control, name, field, label, description, help }) => {
    const isSelect = (
      f: FieldConfig<TFieldValues, TName>
    ): f is FieldConfig<TFieldValues, TName> & SelectFieldSpecific =>
      f.type === "select";
    const options = isSelect(field) ? field.options : [];

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
              <Select
                value={(rhfField.value as string) ?? ""}
                onValueChange={rhfField.onChange}
                disabled={field.disabled}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder={field.placeholder} />
                </SelectTrigger>
                <SelectContent>
                  {options?.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormControl>
          </FieldWrapper>
        )}
      />
    );
  };
}
