"use client";

import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { FieldComponent } from "../types";
import { FieldWrapper } from "../FieldWrapper";
import { FormControl, FormField } from "../shadcn";
import { Checkbox } from "../shadcn";

export function createCheckboxAdapter<
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
              <Checkbox
                checked={!!rhfField.value}
                onCheckedChange={(v) => rhfField.onChange(Boolean(v))}
                disabled={field.disabled}
              />
            </FormControl>
          </FieldWrapper>
        )}
      />
    );
  };
}
