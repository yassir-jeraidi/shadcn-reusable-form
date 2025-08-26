"use client";

import React from "react";
import {
    ControllerProps,
    FieldPath,
    FieldValues,
    useFieldArray,
    Control, ArrayPath,
} from "react-hook-form";
import { Plus, Trash2, GripVertical, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {ArrayFieldConfig, ArrayFieldSpecific, FieldComponent, FieldConfig} from "../types";
import { helpers } from "../helpers";

interface FieldArrayWithId {
  id: string;
  [key: string]: unknown;
}

export function createArrayAdapter<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>
>(): FieldComponent<TFieldValues, TName> {
  return function ArrayAdapter({ control, name, field, label, description }) {

    const { fields, append, remove } = useFieldArray({
      control: control as Control<TFieldValues>,
      name: name as ArrayPath<TFieldValues>,
    });

    const isArrayField = (
      f: FieldConfig<TFieldValues, TName>
    ): f is FieldConfig<TFieldValues, TName> &
      ArrayFieldSpecific<TFieldValues> => f.type === "array";

    if (!isArrayField(field)) {
      console.warn(`Field ${String(name)} is not an array field`);
      return null;
    }

    const {
      arrayFields,
      minItems = 0,
      maxItems,
      addButtonText,
      emptyMessage,
      itemClassName,
      className,
      sortable,
      showItemNumbers,
    } = field;

    const arrayItems = fields as FieldArrayWithId[];

    const addItem = () => {
      const newItem: Record<string, unknown> = {};
      // Initialize with default values for each array field
      arrayFields.forEach((arrayField) => {
        if (arrayField.name) {
          const fieldName = arrayField.name as string;
          newItem[fieldName] = "";
        }
      });
      append(newItem as never);
    };

    const removeItem = (index: number) => {
      remove(index);
    };

    const canAdd = maxItems === undefined || arrayItems.length < maxItems;

    // Generate warnings
    const warnings: string[] = [];
    if (minItems > 0 && arrayItems.length < minItems) {
      warnings.push(`Minimum ${minItems} items required`);
    }
    if (maxItems && arrayItems.length > maxItems) {
      warnings.push(`Maximum ${maxItems} items allowed`);
    }

    return (
      <Card className={`w-full ${className ?? ""}`}>
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-lg font-medium flex items-center gap-2">
                {label}
                {field.requiredIndicator && (
                  <span className="text-red-500">*</span>
                )}
                <Badge variant="outline" className="text-xs">
                  {arrayItems.length} items
                </Badge>
              </CardTitle>
              {description && (
                <p className="text-sm text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addItem}
              disabled={!canAdd}
              className="shrink-0"
            >
              <Plus className="h-4 w-4 mr-1" />
              {addButtonText ?? "Add Item"}
            </Button>
          </div>

          {warnings.length > 0 && (
            <Alert variant="destructive" className="mt-2">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{warnings.join(". ")}</AlertDescription>
            </Alert>
          )}
        </CardHeader>

        <CardContent className="pt-0">
          {arrayItems.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <div className="mb-4">
                <div className="w-16 h-16 mx-auto bg-muted rounded-full flex items-center justify-center">
                  <Plus className="h-8 w-8" />
                </div>
              </div>
              <h3 className="font-medium mb-1">No items yet</h3>
              <p className="text-sm mb-4">
                {emptyMessage ?? "Start by adding your first item"}
              </p>
              {canAdd && (
                <Button type="button" variant="outline" onClick={addItem}>
                  <Plus className="h-4 w-4 mr-2" />
                  {addButtonText ?? "Add First Item"}
                </Button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {arrayItems.map((item: FieldArrayWithId, index: number) => (
                <Card
                  key={item.id}
                  className={`border-dashed ${itemClassName ?? ""}`}
                >
                  <CardHeader className="pb-3 py-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {sortable && (
                          <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                        )}
                        {showItemNumbers !== false && (
                          <Badge variant="secondary" className="text-xs">
                            #{index + 1}
                          </Badge>
                        )}
                        <h4 className="text-sm font-medium">
                          Item {index + 1}
                        </h4>
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeItem(index)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      {arrayFields.map(
                        (
                          arrayField: ArrayFieldConfig
                        ) => {
                          // name for FormField must be a string path like "items.0.foo"
                          const namePath =
                            `${name}.${index}.${arrayField.name}` as FieldPath<TFieldValues>;

                          // Get the appropriate component for this array field
                          const ArrayFieldComponent = helpers<
                            TFieldValues,
                            FieldPath<TFieldValues>
                          >(
                            arrayField as FieldConfig<
                              TFieldValues,
                              FieldPath<TFieldValues>
                            >,
                            undefined // No component overrides for array fields
                          );

                          return (
                            <ArrayFieldComponent
                              key={`${item.id}-${arrayField.name}`}
                              name={namePath}
                              control={
                                control as ControllerProps<
                                  TFieldValues,
                                  FieldPath<TFieldValues>
                                >["control"]
                              }
                              field={
                                arrayField as FieldConfig<
                                  TFieldValues,
                                  FieldPath<TFieldValues>
                                >
                              }
                              label={arrayField.label}
                              description={arrayField.description}
                              help={arrayField.help}
                            />
                          );
                        }
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    );
  };
}
