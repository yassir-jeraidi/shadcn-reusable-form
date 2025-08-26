"use client";

import {z} from "zod";
import {ReusableForm} from "@/components/reusable-form/ReusableForm";
import {Button} from "@/components/ui/button";
import {AgeNumberAdapter} from "@/components/reusable-form/override-adapters-example/AgeNumberAdapter";
import {FancyTextAdapter} from "@/components/reusable-form/override-adapters-example/FancyTextAdapter";
import {searchUsers} from "@/app/actions";
import {FieldConfig} from "@/components/reusable-form/types";
import {FieldPath} from "react-hook-form";

const schema = z.object({
    text: z.string().min(1, "Required"),
    email: z.email("Invalid email"),
    password: z.string().min(6, "Min 6 chars"),
    age: z.coerce.number().int().min(0, "Must be >= 0"),
    bio: z.string().optional(),
    agree: z.boolean().refine(Boolean, "You must agree"),
    country: z.string().min(1, "Select a country"),
    contact: z.enum(["email", "phone"]).default("email"),
    frameworks: z
        .array(z.string())
        .min(1, {message: "Please select at least one framework."}),
    user_id: z.string(),
    addresses: z
        .array(
            z.object({
                street: z.string().min(1, "Street is required"),
                city: z.string().min(1, "City is required"),
                zipCode: z.string().min(1, "ZIP code is required"),
                country: z.string().min(1, "Country is required"),
            })
        )
        .min(1, "At least one address is required")
        .max(5, "Maximum 5 addresses allowed"),
});

export type Values = z.infer<typeof schema>;

export default function Example() {

    const fields: FieldConfig<Values, FieldPath<Values>>[] = [
        {
            name: "text",
            type: "text",
            label: "Text",
            placeholder: "Type here",
        },
        {
            name: "email",
            type: "email",
            label: "Email",
            placeholder: "you@example.com",
        },
        {name: "password", type: "password", label: "Password"},
        {
            name: "age",
            type: "number",
            label: "Age",
            description: "Whole number",
            // Per-field override tied to the field name
            component: AgeNumberAdapter,
        },
        {
            name: "bio",
            type: "textarea",
            label: "Bio",
            description: "Tell us about you",
        },
        {name: "agree", type: "checkbox", label: "I agree to the terms"},
        {
            name: "contact",
            type: "radio",
            label: "Preferred contact",
            options: [
                {value: "email", label: "Email"},
                {value: "phone", label: "Phone"},
            ],
        },
        {
            name: "country",
            type: "select",
            label: "Country",
            description: "Choose your country",
            placeholder: "Select...",
            options: [
                {value: "us", label: "United States"},
                {value: "uk", label: "United Kingdom"},
                {value: "de", label: "Germany"},
            ],
        },
        {
            name: "frameworks",
            type: "multi-select",
            label: "Frameworks",
            description: "Select all that apply",
            options: [
                {value: "react", label: "React"},
                {value: "vue", label: "Vue"},
                {value: "angular", label: "Angular"},
                {value: "svelte", label: "Svelte"},
            ],
        },
        {
            name: "user_id",
            type: "async-select",
            label: "User",
            description: "Select a user",
            options: {
                fetcher: searchUsers,
                label: "User",
                placeholder: "Search users...",
                renderOption: (user) => <div>{user.name}</div>,
                getOptionValue: (user) => user.id,
                getDisplayValue: (user) => user.name,
                value: "",
                onChange: () => {
                },
            },
        },
        {
            name: "addresses",
            type: "array",
            label: "Addresses",
            description: "Add your addresses",
            minItems: 1,
            maxItems: 5,
            addButtonText: "Add Address",
            emptyMessage: "Start by adding your first address",
            itemClassName: "bg-blue-50",
            arrayFields: [
                {
                    name: "street",
                    type: "text",
                    label: "Street Address",
                    placeholder: "Enter street address",
                },
                {
                    name: "city",
                    type: "text",
                    label: "City",
                    placeholder: "Enter city",
                },
                {
                    name: "zipCode",
                    type: "text",
                    label: "ZIP Code",
                    placeholder: "Enter ZIP code",
                },
                {
                    name: "country",
                    type: "select",
                    label: "Country",
                    placeholder: "Select country",
                    options: [
                        {value: "us", label: "United States"},
                        {value: "uk", label: "United Kingdom"},
                        {value: "de", label: "Germany"},
                        {value: "ca", label: "Canada"},
                        {value: "au", label: "Australia"},
                    ],
                },
            ],
        },
    ]

    return (
        <div className="container mx-auto max-w-4xl py-10">
            <h1 className="mb-6 text-2xl font-semibold">Reusable Form Demo</h1>

            <ReusableForm<Values>
                fields={fields}
                schema={schema}
                mode="onChange"
                defaultValues={{
                    text: "das",
                    email: "ahmed@gmail.com",
                    password: "dsadasdadafsa",
                    age: 18,
                    bio: "fasfafsafasfsa",
                    agree: true,
                    country: "us",
                    contact: "email",
                    addresses: [
                        {
                            street: "123 Main St",
                            city: "New York",
                            zipCode: "10001",
                            country: "United States",
                        },
                    ],
                }}
                components={{
                    text: FancyTextAdapter,
                }}
                onSubmit={(values) => {
                    console.log(values);
                }}
            >
                {({fields, form}) => (
                    <div className="space-y-6">
                        {fields}
                        <div className="pt-2">
                            <Button type="submit" disabled={!form.formState.isValid}>
                                Submit
                            </Button>
                        </div>
                    </div>
                )}
            </ReusableForm>
        </div>
    );
}
