import {FieldComponent} from "@/components/reusable-form/types";
import {FieldPath} from "react-hook-form";
import {FormControl, FormField} from "@/components/ui/form";
import {FieldWrapper} from "@/components/reusable-form/FieldWrapper";
import {Input} from "@/components/ui/input";
import {Values} from "@/components/example";

// Global override: customize how all "text" fields render
export const FancyTextAdapter: FieldComponent<Values, FieldPath<Values>> = ({
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
                            <span className="text-muted-foreground text-sm">TXT</span>
                            <Input
                                type="text"
                                placeholder={(field as any).placeholder}
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
                        </div>
                    </FormControl>
                </FieldWrapper>
            )}
        />
    );
};