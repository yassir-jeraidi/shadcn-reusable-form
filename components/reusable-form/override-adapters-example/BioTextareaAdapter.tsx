import {FieldComponent} from "@/components/reusable-form/types";
import {FieldPath} from "react-hook-form";
import {FormControl, FormField} from "@/components/ui/form";
import {FieldWrapper} from "@/components/reusable-form/FieldWrapper";
import {Textarea} from "@/components/ui/textarea";
import {Values} from "@/components/example";

// Per-field override: customize a single field (e.g., bio)
export const BioTextareaAdapter: FieldComponent<Values, FieldPath<Values>> = ({
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
            render={({ field: rhfField, fieldState }) => (
                <FieldWrapper
                    label={label}
                    description={description}
                    help={help}
                    requiredIndicator={field.requiredIndicator}
                >
                    <FormControl>
                        <div className="space-y-1">
                            <Textarea
                                placeholder={(field as any).placeholder}
                                className="min-h-24 resize-y"
                                disabled={field.disabled}
                                value={
                                    typeof rhfField.value === "string"
                                        ? rhfField.value
                                        : String(rhfField.value ?? "")
                                }
                                onChange={rhfField.onChange}
                                onBlur={rhfField.onBlur}
                                name={rhfField.name}
                                ref={rhfField.ref}
                            />
                            <div className="text-xs text-muted-foreground flex justify-between">
                  <span>
                    {typeof rhfField.value === "string"
                        ? rhfField.value.length
                        : 0}{" "}
                      chars
                  </span>
                                {fieldState.error ? <span>—</span> : null}
                            </div>
                        </div>
                    </FormControl>
                </FieldWrapper>
            )}
        />
    );
};
