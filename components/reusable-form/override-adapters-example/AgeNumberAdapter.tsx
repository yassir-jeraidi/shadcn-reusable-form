import {FieldComponent} from "@/components/reusable-form/types";
import {FieldPath} from "react-hook-form";
import {FormControl, FormField} from "@/components/ui/form";
import {FieldWrapper} from "@/components/reusable-form/FieldWrapper";
import {Input} from "@/components/ui/input";
import {Values} from "@/components/example";

// Per-field override by field name: customize the "age" field only
export const AgeNumberAdapter: FieldComponent<Values, FieldPath<Values>> = ({
                                                                         control,
                                                                         name,
                                                                         field,
                                                                         label,
                                                                         description,
                                                                         help,
                                                                     }) => {
    return (
        <FormField
            control={control}
            name={name}
            render={({ field: rhfField }) => (
                <FieldWrapper
                    label={label}
                    description={description}
                    help={help}
                    requiredIndicator={field.requiredIndicator}
                >
                    <FormControl>
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Age</span>
                            <Input
                                type="number"
                                placeholder={(field as any).placeholder}
                                disabled={field.disabled}
                                value={
                                    typeof rhfField.value === "number"
                                        ? rhfField.value
                                        : rhfField.value == null
                                            ? undefined
                                            : Number(rhfField.value)
                                }
                                onChange={rhfField.onChange}
                                onBlur={rhfField.onBlur}
                                name={rhfField.name}
                                ref={rhfField.ref}
                            />
                            <span className="text-xs text-muted-foreground">years</span>
                        </div>
                    </FormControl>
                </FieldWrapper>
            )}
        />
    );
};