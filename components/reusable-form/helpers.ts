import { FieldComponent, FieldConfig, FormComponents } from "./types"
import { FieldPath, FieldValues } from "react-hook-form"
import { createInputAdapter } from "./adapters/InputAdapter"
import { createCheckboxAdapter } from "./adapters/CheckboxAdapter"
import { createTextareaAdapter } from "./adapters/TextareaAdapter"
import { createRadioGroupAdapter } from "./adapters/RadioGroupAdapter";
import { createSelectAdapter } from "./adapters/SelectAdapter"

export function helpers<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
>(
    field: FieldConfig<TFieldValues, TName>,
    components?: FormComponents<TFieldValues>
): FieldComponent<TFieldValues, TName> {
    if (field.component) return field.component
    const override = components?.[field.kind as keyof typeof components]
    if (override) return override as FieldComponent<TFieldValues, TName>

    switch (field.kind) {
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
        default:
            return createInputAdapter()
    }
}


