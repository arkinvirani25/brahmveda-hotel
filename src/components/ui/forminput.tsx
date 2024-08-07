import * as React from "react";
import { cn } from "@/lib/utils";
import { Control, FieldValues, useController } from "react-hook-form";
import { Label } from "./label";

export interface InputProps<IData extends FieldValues>
  extends React.InputHTMLAttributes<HTMLInputElement> {
  required?: boolean;
  control: Control<IData>;
}

const FormInput = React.forwardRef<HTMLInputElement, InputProps<any>>(
  ({ className, type, name, control, ...props }, ref) => {
    const { field, fieldState } = useController({
      name: name as string,
      control,
    });
    return (
      <div className="flex flex-col flex-wrap items-stretch w-full text-black text-sm font-medium max-w-full">
        <div className="flex max-w-full relative">
          <input
            type={type}
            className={cn(
              `flex-shrink flex-grow max-w-full leading-normalq flex-1 border h-10 border-grey-light rounded border-neutral-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-neutral-950 focus-visible:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-neutral-800  dark:bg-neutral-950 dark:ring-offset-neutral-950 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300`,
              className
            )}
            {...field}
            value={type === "file" ? field.value?.fileName || "" : field.value || ""}
            onChange={(e) => {
              props.onChange && props.onChange(e);
              type === "file" ? field.onChange(e.target.files) : field.onChange(e);
            }}
            ref={ref}
            {...props}
          />
        </div>
        {fieldState?.invalid && (
          <Label className="text-red-600 pt-1">{fieldState?.error?.message}</Label>
        )}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

export { FormInput };
