"use client";

import { ControllerProps, FieldPath, FieldValues } from "react-hook-form";
import {
  AsyncSelectFieldSpecific,
  FieldComponent,
  FieldConfig,
  SelectFieldSpecific,
} from "../types";
import { FieldWrapper } from "../FieldWrapper";
import { FormControl, FormField, MultiSelect } from "../shadcn";
import { MultiSelectOption } from "@/components/ui/mutli-select";
import { AsyncSelect } from "@/components/ui/async-select";

export function createAsyncSelectAdapter<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(): FieldComponent<TFieldValues, TName> {
  return ({ control, name, field, label, description, help }) => {
    const isAsyncSelect = (
      f: FieldConfig<TFieldValues, TName>
    ): f is FieldConfig<TFieldValues, TName> & AsyncSelectFieldSpecific =>
      f.type === "async-select";

    // Properly type guard and extract options
    if (!isAsyncSelect(field)) {
      console.warn(`Field ${String(name)} is not an async-select field`);
      return null;
    }

    const { options } = field;

    // Ensure options and fetcher exist
    if (!options || !options.fetcher) {
      console.warn(
        `Field ${String(name)} is missing required options or fetcher`
      );
      return null;
    }

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
              <AsyncSelect<any>
                {...options}
                renderOption={(item) => (
                  <div>{item.name || item.label || String(item)}</div>
                )}
                getOptionValue={(item) => item.id || item.value || String(item)}
                getDisplayValue={(item) =>
                  item.name || item.label || String(item)
                }
                label={options.label || "Select"}
                value={rhfField.value || ""}
                onChange={rhfField.onChange}
                placeholder={options.placeholder || "Select..."}
              />
            </FormControl>
          </FieldWrapper>
        )}
      />
    );
  };
}
