"use client";

import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import { FieldComponent } from "../types";
import { FieldWrapper } from "../FieldWrapper";
import { FormControl, FormField } from "../shadcn";
import { Input } from "../shadcn";

export function createInputAdapter<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(): FieldComponent<TFieldValues, TName> {
  return ({ control, name, field, label, description, help }) => {
    const type =
      field.type === "password"
        ? "password"
        : field.type === "email"
        ? "email"
        : field.type === "number"
        ? "number"
        : "text";

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
              <Input
                type={type}
                placeholder={field.placeholder}
                inputMode={
                  field.type === "text" ||
                  field.type === "email" ||
                  field.type === "password" ||
                  field.type === "number" ||
                  field.type === "textarea"
                    ? field.inputMode
                    : undefined
                }
                autoComplete={
                  field.type === "text" ||
                  field.type === "email" ||
                  field.type === "password" ||
                  field.type === "number" ||
                  field.type === "textarea"
                    ? field.autoComplete
                    : undefined
                }
                disabled={field.disabled}
                value={
                  typeof rhfField.value === "boolean"
                    ? String(rhfField.value)
                    : rhfField.value
                }
                onChange={rhfField.onChange}
                onBlur={rhfField.onBlur}
                name={rhfField.name}
                ref={rhfField.ref}
              />
            </FormControl>
          </FieldWrapper>
        )}
      />
    );
  };
}
