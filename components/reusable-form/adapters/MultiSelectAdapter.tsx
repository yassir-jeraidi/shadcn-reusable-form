"use client";

import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
  FieldComponent,
  FieldConfig,
  SelectFieldSpecific,
} from "../types";
import { FieldWrapper } from "../FieldWrapper";
import {FormControl, FormField, MultiSelect} from "../shadcn";
import {MultiSelectOption} from "@/components/ui/mutli-select";

export function createMultiSelectAdapter<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(): FieldComponent<TFieldValues, TName> {
  return ({ control, name, field, label, description, help }) => {
    const isSelect = (
      f: FieldConfig<TFieldValues, TName>
    ): f is FieldConfig<TFieldValues, TName> & SelectFieldSpecific =>
      f.type === "multi-select";
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
                <MultiSelect
                    options={options as MultiSelectOption[]}
                    value={rhfField.value}
                    onValueChange={rhfField.onChange}
                    placeholder="Choose frameworks..."
                />
            </FormControl>
          </FieldWrapper>
        )}
      />
    );
  };
}
