"use client";

import { get, useFormContext, type Path } from "react-hook-form";
import { useId, type HTMLInputTypeAttribute, type InputHTMLAttributes } from "react";
import type { BiodataData } from "@/types/biodata";
import { cn } from "@/lib/utils";

type FieldName = Path<BiodataData>;

interface BaseProps {
  name: FieldName;
  label: string;
  hint?: string;
  className?: string;
}

const inputClass =
  "block w-full rounded-xl border border-ink/15 bg-white px-3.5 text-base text-ink placeholder:text-ink/35 " +
  "transition-colors focus:border-brand focus:outline-2 focus:outline-offset-0 focus:outline-brand/30 " +
  "aria-[invalid=true]:border-red-500 aria-[invalid=true]:focus:outline-red-300";

function useFieldError(name: FieldName) {
  const {
    formState: { errors },
  } = useFormContext<BiodataData>();
  const error = get(errors, name) as { message?: string } | undefined;
  return error?.message;
}

function FieldShell({ id, label, hint, error, className, children }: { id: string; label: string; hint?: string; error?: string; className?: string; children: React.ReactNode }) {
  return (
    <div className={cn("min-w-0", className)}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink/80">
        {label}
      </label>
      {children}
      {hint && !error ? (
        <p id={`${id}-hint`} className="mt-1 text-xs text-ink/55">
          {hint}
        </p>
      ) : null}
      {error ? (
        <p id={`${id}-error`} role="alert" className="mt-1 text-xs font-medium text-red-700">
          {error}
        </p>
      ) : null}
    </div>
  );
}

interface TextFieldProps extends BaseProps {
  type?: HTMLInputTypeAttribute;
  placeholder?: string;
  inputMode?: InputHTMLAttributes<HTMLInputElement>["inputMode"];
  autoComplete?: string;
  /** Suggestions. The user can still type any value. */
  options?: string[];
  maxLength?: number;
}

export function TextField({ name, label, hint, className, type = "text", placeholder, inputMode, autoComplete = "off", options, maxLength = 200 }: TextFieldProps) {
  const { register } = useFormContext<BiodataData>();
  const id = useId();
  const error = useFieldError(name);
  const listId = options ? `${id}-list` : undefined;
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} className={className}>
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        inputMode={inputMode}
        autoComplete={autoComplete}
        list={listId}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(inputClass, "h-11")}
        {...register(name)}
      />
      {options ? (
        <datalist id={listId}>
          {options.map((o) => (
            <option key={o} value={o} />
          ))}
        </datalist>
      ) : null}
    </FieldShell>
  );
}

interface TextAreaProps extends BaseProps {
  placeholder?: string;
  rows?: number;
  maxLength?: number;
}

export function TextAreaField({ name, label, hint, className, placeholder, rows = 4, maxLength = 1200 }: TextAreaProps) {
  const { register, watch } = useFormContext<BiodataData>();
  const id = useId();
  const error = useFieldError(name);
  const current = (watch(name) as string | undefined) ?? "";
  return (
    <FieldShell id={id} label={label} hint={hint} error={error} className={className}>
      <textarea
        id={id}
        rows={rows}
        placeholder={placeholder}
        maxLength={maxLength}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${id}-error` : hint ? `${id}-hint` : undefined}
        className={cn(inputClass, "resize-y py-2.5 leading-relaxed")}
        {...register(name)}
      />
      <p className="mt-1 text-right text-xs text-ink/45" aria-hidden="true">
        {current.length}/{maxLength}
      </p>
    </FieldShell>
  );
}

export function FieldGrid({ children, cols = 2 }: { children: React.ReactNode; cols?: 1 | 2 }) {
  return <div className={cn("grid gap-x-4 gap-y-4", cols === 2 ? "sm:grid-cols-2" : "grid-cols-1")}>{children}</div>;
}
