import { ControllerProps, FieldPath, FieldValues } from "react-hook-form"
import { ReactNode } from "react"
import { AsyncSelectProps } from "@/components/ui/async-select";

export type SupportedFieldType =
    | "text"
    | "email"
    | "password"
    | "number"
    | "checkbox"
    | "radio"
    | "textarea"
    | "select"
    | "async-select"
    | "multi-select"
    | "array"

export type BaseFieldConfig<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = {
    name: TName
    label?: ReactNode
    description?: ReactNode
    placeholder?: string
    requiredIndicator?: ReactNode
    disabled?: boolean
    /** Optional helper content shown below the field, above errors */
    help?: ReactNode
    /** Optional render prop to fully control rendering for this field */
    render?: (ctx: FieldRenderContext<TFieldValues, TName>) => ReactNode
    /** Optional component override for this single field */
    component?: FieldComponent<TFieldValues, TName>,
}

export type TextLikeFieldSpecific = {
    type: "text" | "email" | "password" | "number" | "textarea"
    inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"]
    autoComplete?: React.InputHTMLAttributes<HTMLInputElement>["autoComplete"]
}

export type CheckboxFieldSpecific = {
    type: "checkbox"
}

export type RadioFieldSpecific = {
    type: "radio"
    options: { value: string; label: ReactNode }[]
}

export type SelectFieldSpecific = {
    type: "select"
    options: { value: string; label: ReactNode }[]
}

export type AsyncSelectFieldSpecific = {
    type: "async-select"
    options: Partial<AsyncSelectProps<any>> & {
        fetcher: (query?: string) => Promise<any[]>;
    }
}

export type MultiSelectFieldSpecific = {
    type: "multi-select"
    options: { value: string; label: ReactNode }[]
}

export type ArrayFieldConfig = {
    name: string;
    type: SupportedFieldType;
    label?: ReactNode;
    description?: ReactNode;
    placeholder?: string;
    requiredIndicator?: ReactNode;
    disabled?: boolean;
    help?: ReactNode;
    render?: (ctx: any) => ReactNode;
    component?: any;
    // Add specific field properties based on type
    options?: any;
    inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"];
    autoComplete?: React.InputHTMLAttributes<HTMLInputElement>["autoComplete"];
}

export type ArrayFieldSpecific<TFieldValues extends FieldValues> = {
    type: "array"
    arrayFields: ArrayFieldConfig[]
    minItems?: number
    maxItems?: number
    addButtonText?: string
    emptyMessage?: string
    itemClassName?: string
    className?: string
    sortable?: boolean
    showItemNumbers?: boolean
}

export type FieldConfig<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = BaseFieldConfig<TFieldValues, TName> & (TextLikeFieldSpecific | CheckboxFieldSpecific | RadioFieldSpecific | SelectFieldSpecific | AsyncSelectFieldSpecific | MultiSelectFieldSpecific | ArrayFieldSpecific<TFieldValues>)

export type FieldRenderContext<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = {
    name: TName
    control: ControllerProps<TFieldValues, TName>["control"]
    disabled?: boolean
    label?: ReactNode
    description?: ReactNode
    help?: ReactNode
}

export type FieldComponent<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = (props: FieldComponentProps<TFieldValues, TName>) => ReactNode

export type FieldComponentProps<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = FieldRenderContext<TFieldValues, TName> & {
    field: FieldConfig<TFieldValues, TName>
}

export type ComponentOverrides<
    TFieldValues extends FieldValues
> = Partial<Record<SupportedFieldType, FieldComponent<TFieldValues, FieldPath<TFieldValues>>>>

export type FormComponents<
    TFieldValues extends FieldValues
> = ComponentOverrides<TFieldValues>


