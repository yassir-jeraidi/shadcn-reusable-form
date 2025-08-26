import { FieldComponent, FieldConfig, FormComponents } from "./types"
import { FieldPath, FieldValues } from "react-hook-form"
import { createInputAdapter } from "./adapters/InputAdapter"
import { createCheckboxAdapter } from "./adapters/CheckboxAdapter"
import { createTextareaAdapter } from "./adapters/TextareaAdapter"
import { createRadioGroupAdapter } from "./adapters/RadioGroupAdapter";
import { createSelectAdapter } from "./adapters/SelectAdapter"
import {createMultiSelectAdapter} from "@/components/reusable-form/adapters/MultiSelectAdapter";
import {createAsyncSelectAdapter} from "@/components/reusable-form/adapters/AsyncSelectAdapter";
import {createArrayAdapter} from "@/components/reusable-form/adapters/ArrayAdapter";

export function helpers<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>(
    field: FieldConfig<TFieldValues, TName>,
    components?: FormComponents<TFieldValues>
): FieldComponent<TFieldValues, TName> {
    if (field.component) return field.component
    const override = components?.[field.type as keyof typeof components]
    if (override) return override as FieldComponent<TFieldValues, TName>

    switch (field.type) {
        case "text":
        case "email":
        case "password":
        case "number":
            return createInputAdapter()
        case "checkbox":
            return createCheckboxAdapter()
        case "radio":
            return createRadioGroupAdapter()
        case "textarea":
            return createTextareaAdapter()
        case "select":
            return createSelectAdapter()
        case "async-select" :
            return createAsyncSelectAdapter()
        case "multi-select":
            return createMultiSelectAdapter()
        case "array":
            return createArrayAdapter()
        default:
            return createInputAdapter()
    }
}


