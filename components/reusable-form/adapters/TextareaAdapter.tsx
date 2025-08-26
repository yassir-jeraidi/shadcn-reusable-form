"use client";

import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { FieldComponent } from "../types";
import { FieldWrapper } from "../FieldWrapper";
import { FormControl, FormField } from "../shadcn";
import { Textarea } from "../shadcn";

export function createTextareaAdapter<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(): FieldComponent<TFieldValues, TName> {
  return ({ control, name, field, label, description, help }) => {
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
              <Textarea
                placeholder={field.placeholder}
                disabled={field.disabled}
                {...rhfField}
              />
            </FormControl>
          </FieldWrapper>
        )}
      />
    );
  };
}
