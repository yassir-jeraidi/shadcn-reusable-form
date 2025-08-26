import { ControllerProps, FieldPath, FieldValues } from "react-hook-form"
import { ReactNode } from "react"

export type SupportedFieldKind =
    | "text"
    | "email"
    | "password"
    | "number"
    | "checkbox"
    | "radio"
    | "textarea"
    | "select"

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
    kind: "text" | "email" | "password" | "number" | "textarea"
    inputMode?: React.InputHTMLAttributes<HTMLInputElement>["inputMode"]
    autoComplete?: React.InputHTMLAttributes<HTMLInputElement>["autoComplete"]
}

export type CheckboxFieldSpecific = {
    kind: "checkbox"
}

export type RadioFieldSpecific = {
    kind: "radio"
    options: { value: string; label: ReactNode }[]
}

export type SelectFieldSpecific = {
    kind: "select"
    options: { value: string; label: ReactNode }[]
}

export type FieldConfig<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>
> = BaseFieldConfig<TFieldValues, TName> & (TextLikeFieldSpecific | CheckboxFieldSpecific | RadioFieldSpecific | SelectFieldSpecific)

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
> = Partial<Record<SupportedFieldKind, FieldComponent<TFieldValues, FieldPath<TFieldValues>>>>

export type FormComponents<
    TFieldValues extends FieldValues
> = ComponentOverrides<TFieldValues>


