"use client";
import * as React from "react";
import { Input as BaseInput } from "@base-ui/react/input";
import { Select as SelectPrimitive } from "@base-ui/react/select";
import { ChevronDown, Check } from "lucide-react";
import { C } from "@/app/_lib/tokens";

// ─── Shared style helpers ───────────────────────────────────────────────────

export const fieldBase: React.CSSProperties = {
  width: "100%",
  padding: "13px 16px",
  background: C.navy900,
  borderWidth: "1.5px",
  borderStyle: "solid",
  borderColor: C.navy600,
  borderRadius: 12,
  color: C.white,
  fontSize: 14,
  fontFamily: "'Lexend', sans-serif",
  transition: "border-color .2s, box-shadow .2s",
  outline: "none",
};

export const labelStyle: React.CSSProperties = {
  fontSize: 11,
  color: C.gray400,
  marginBottom: 7,
  display: "block",
  fontWeight: 700,
  letterSpacing: ".07em",
  textTransform: "uppercase",
};

export const errorStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#ef4444",
  marginTop: 5,
  display: "block",
};

// ─── FormInput ───────────────────────────────────────────────────────────────

export interface FormInputProps extends React.ComponentProps<"input"> {
  label?: string;
  error?: string;
  containerStyle?: React.CSSProperties;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

export const FormInput = React.forwardRef<HTMLInputElement, FormInputProps>(
  ({ label, error, containerStyle, leftIcon, rightIcon, style, onFocus, onBlur, ...props }, ref) => {
    const [focused, setFocused] = React.useState(false);
    return (
      <div style={containerStyle}>
        {label && <label style={labelStyle}>{label}</label>}
        <div style={{ position: "relative" }}>
          {leftIcon && (
            <span style={{ position: "absolute", left: 15, top: "50%", transform: "translateY(-50%)", pointerEvents: "none", display: "flex" }}>
              {leftIcon}
            </span>
          )}
          <BaseInput
            ref={ref}
            onFocus={(e) => { setFocused(true); onFocus?.(e); }}
            onBlur={(e) => { setFocused(false); onBlur?.(e); }}
            style={{
              ...fieldBase,
              ...(leftIcon ? { paddingLeft: 44 } : {}),
              ...(rightIcon ? { paddingRight: 44 } : {}),
              ...(focused && !error ? { borderColor: C.orange500, boxShadow: `0 0 0 3px ${C.orange500}18` } : {}),
              ...(error ? { borderColor: "#ef4444", boxShadow: "0 0 0 3px #ef444418" } : {}),
              ...style,
            }}
            {...props}
          />
          {rightIcon && (
            <span style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", display: "flex" }}>
              {rightIcon}
            </span>
          )}
        </div>
        {error && <span style={errorStyle}>{error}</span>}
      </div>
    );
  }
);
FormInput.displayName = "FormInput";

// ─── FormSelect ──────────────────────────────────────────────────────────────

export interface SelectOption {
  value: string;
  label: string;
}

export interface FormSelectProps {
  label?: string;
  error?: string;
  placeholder?: string;
  options: SelectOption[];
  value?: string;
  onChange?: (value: string) => void;
  containerStyle?: React.CSSProperties;
  disabled?: boolean;
}

export function FormSelect({
  label,
  error,
  placeholder,
  options,
  value,
  onChange,
  containerStyle,
  disabled,
}: FormSelectProps) {
  const [open, setOpen] = React.useState(false);

  return (
    <div style={containerStyle}>
      {label && <label style={labelStyle}>{label}</label>}
      <SelectPrimitive.Root
        value={value ?? ""}
        onValueChange={(v) => onChange?.(v ?? "")}
        disabled={disabled}
        open={open}
        onOpenChange={setOpen}
      >
        <SelectPrimitive.Trigger
          style={{
            ...fieldBase,
            cursor: disabled ? "not-allowed" : "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            ...(open && !error ? { borderColor: C.orange500, boxShadow: `0 0 0 3px ${C.orange500}18` } : {}),
            ...(error ? { borderColor: "#ef4444", boxShadow: "0 0 0 3px #ef444418" } : {}),
            ...(disabled ? { opacity: 0.5 } : {}),
          }}
        >
          <SelectPrimitive.Value
            placeholder={
              <span style={{ color: C.gray500 }}>{placeholder ?? "Select…"}</span>
            }
          />
          <ChevronDown
            size={16}
            color={C.gray500}
            style={{ flexShrink: 0, transition: "transform .2s", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
          />
        </SelectPrimitive.Trigger>

        <SelectPrimitive.Portal>
          <SelectPrimitive.Positioner sideOffset={6} style={{ zIndex: 9999 }}>
            <SelectPrimitive.Popup
              style={{
                background: C.navy800,
                border: `1px solid ${C.navy600}`,
                borderRadius: 12,
                overflow: "hidden",
                boxShadow: "0 16px 48px rgba(0,0,0,0.5)",
                minWidth: "var(--anchor-width)",
              }}
            >
              <SelectPrimitive.List style={{ padding: 6 }}>
                {options.map((opt) => (
                  <SelectPrimitive.Item
                    key={opt.value}
                    value={opt.value}
                    style={(state) => ({
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "10px 14px",
                      borderRadius: 8,
                      fontSize: 14,
                      fontFamily: "'Lexend', sans-serif",
                      color: state.selected ? C.orange300 : C.white,
                      background: state.highlighted ? C.navy700 : "transparent",
                      cursor: "pointer",
                      transition: "background .15s",
                      outline: "none",
                    })}
                  >
                    <SelectPrimitive.ItemText>{opt.label}</SelectPrimitive.ItemText>
                    <SelectPrimitive.ItemIndicator>
                      <Check size={14} color={C.orange400} style={{ flexShrink: 0 }} />
                    </SelectPrimitive.ItemIndicator>
                  </SelectPrimitive.Item>
                ))}
              </SelectPrimitive.List>
            </SelectPrimitive.Popup>
          </SelectPrimitive.Positioner>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
      {error && <span style={errorStyle}>{error}</span>}
    </div>
  );
}
