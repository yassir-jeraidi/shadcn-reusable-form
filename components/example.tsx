"use client";

import { z } from "zod";
import { ReusableForm } from "@/components/reusable-form/ReusableForm";
import { Button } from "@/components/ui/button";
import {AgeNumberAdapter} from "@/components/reusable-form/override-adapters-example/AgeNumberAdapter";
import {FancyTextAdapter} from "@/components/reusable-form/override-adapters-example/FancyTextAdapter";

const schema = z.object({
  text: z.string().min(1, "Required"),
  email: z.email("Invalid email"),
  password: z.string().min(6, "Min 6 chars"),
  age: z.coerce.number().int().min(0, "Must be >= 0"),
  bio: z.string().optional(),
  agree: z.boolean().refine(Boolean, "You must agree"),
  country: z.string().min(1, "Select a country"),
  contact: z.enum(["email", "phone"]).default("email"),
});

export type Values = z.infer<typeof schema>;

export default function Example() {


  return (
    <div className="container mx-auto max-w-2xl py-10">
      <h1 className="mb-6 text-2xl font-semibold">Reusable Form Demo</h1>

      <ReusableForm<Values>
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
        }}
        fields={[
          {
            name: "text",
            kind: "text",
            label: "Text",
            placeholder: "Type here",
          },
          {
            name: "email",
            kind: "email",
            label: "Email",
            placeholder: "you@example.com",
          },
          { name: "password", kind: "password", label: "Password" },
          {
            name: "age",
            kind: "number",
            label: "Age",
            description: "Whole number",
            // Per-field override tied to the field name
            component: AgeNumberAdapter,
          },
          {
            name: "bio",
            kind: "textarea",
            label: "Bio",
            description: "Tell us about you",
          },
          { name: "agree", kind: "checkbox", label: "I agree to the terms" },
          {
            name: "contact",
            kind: "radio",
            label: "Preferred contact",
            options: [
              { value: "email", label: "Email" },
              { value: "phone", label: "Phone" },
            ],
          },
          {
            name: "country",
            kind: "select",
            label: "Country",
            description: "Choose your country",
            placeholder: "Select...",
            options: [
              { value: "us", label: "United States" },
              { value: "uk", label: "United Kingdom" },
              { value: "de", label: "Germany" },
            ],
          },
        ]}
        components={{
          text: FancyTextAdapter,
        }}
        onSubmit={(values) => {
          console.log(values);
        }}
      >
        {({ fields, form }) => (
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
