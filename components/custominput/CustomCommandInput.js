"use client";
import { Typography } from "@mui/material";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { useState, useEffect, useRef } from "react";

export default function CustomCommandInput({
  item,
  form,
  options = [],
  isLoading = false,
  onTextChange,
}) {
  const [isFocused, setIsFocused] = useState(false);
  const commandRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (commandRef.current && !commandRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <FormField
      control={form.control}
      name={item.name}
      render={({ field }) => (
        <FormItem className="relative">
          <FormLabel>
            <Typography variant="body2">{item.label}</Typography>
          </FormLabel>
          <FormControl>
            <div className="relative" ref={commandRef}>
              <Command
                shouldFilter={false}
                className="rounded-lg border shadow-md"
              >
                <CommandInput
                  placeholder={item.placeholder ?? ""}
                  value={field.value ?? ""} // Use form field value
                  onValueChange={(value) => {
                    field.onChange(value); // Update form value
                    onTextChange?.(value); // Notify parent
                  }}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => {
                    setTimeout(() => setIsFocused(false), 200);
                  }}
                />
                {isFocused && (
                  <CommandList className="absolute top-full left-0 right-0 mt-1 bg-white z-10 border border-gray-200 shadow-lg rounded-b-md max-h-60 overflow-auto">
                    {isLoading ? (
                      <CommandEmpty>Loading...</CommandEmpty>
                    ) : options.length === 0 ? (
                      <CommandEmpty>No results found</CommandEmpty>
                    ) : (
                      <CommandGroup>
                        {options.map((option, i) => (
                          <CommandItem
                            key={i}
                            onSelect={() => {
                              const selectedValue = option.value;
                              field.onChange(selectedValue); // Update form value
                              setIsFocused(false);
                            }}
                            className="cursor-pointer hover:bg-gray-100 p-2 text-gray-900"
                          >
                            {option.value}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    )}
                  </CommandList>
                )}
              </Command>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
