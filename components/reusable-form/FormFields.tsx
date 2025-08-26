"use client";

import { ReactNode } from "react";
import { FieldConfig, FormComponents } from "./types";
import { FieldPath, FieldValues, UseFormReturn } from "react-hook-form";
import { helpers } from "./helpers";

type FormFieldsProps<TValues extends FieldValues> = {
  fields: FieldConfig<TValues, FieldPath<TValues>>[];
  components?: FormComponents<TValues>;
  form: UseFormReturn<TValues>;
};

export function FormFields<TValues extends FieldValues>({
  fields,
  components,
  form,
}: FormFieldsProps<TValues>): ReactNode {
  return (
    <div className="grid gap-4">
      {fields.map((field) => {
        const Component = helpers<TValues, FieldPath<TValues>>(
          field as any,
          components as any
        );

        if (field.render) {
          return (
            <div key={String(field.name)}>
              {field.render({
                name: field.name as FieldPath<TValues>,
                control: form.control,
                label: field.label,
                description: field.description,
                help: field.help,
                disabled: field.disabled,
              })}
            </div>
          );
        }

        return (
          <div key={String(field.name)}>
            <Component
              name={field.name as FieldPath<TValues>}
              control={form.control}
              field={field as any}
              label={field.label}
              description={field.description}
              help={field.help}
            />
          </div>
        );
      })}
    </div>
  );
}
