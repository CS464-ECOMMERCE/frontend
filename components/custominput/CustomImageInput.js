"use client";

import { IconButton, Typography } from "@mui/material";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useState } from "react";
import { Delete } from "@mui/icons-material";

export default function CustomImageInput({ item, form, initialValue }) {
  const [validFiles, setValidFiles] = useState(initialValue || []);

  const onValueChange = (e, field) => {
    const errors = [];
    const MAX_FILE_SIZE = 10 << 20; // 10MB

    // Filter valid files
    const files = Array.from(e.target.files || []).filter((file) => {
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        errors.push(`${file.name}: Only JPG and PNG files are allowed`);
        return false;
      }
      if (file.size > MAX_FILE_SIZE) {
        errors.push(`${file.name}: File size exceeds 10MB limit`);
        return false;
      }
      return true;
    });

    // check duplicate file names
    const newFiles = files.filter(
      (file) => !validFiles.some((existing) => existing.name === file.name)
    );

    // Handle errors
    if (errors.length > 0) {
      form.setError(item.name, {
        type: "manual",
        message: errors.join(", "),
      });
    } else {
      form.clearErrors(item.name);
    }

    // Update valid files
    const updatedFiles = [...validFiles, ...newFiles];
    setValidFiles(updatedFiles);
    field.onChange(updatedFiles);
    e.target.value = null;
  };

  const removeFile = (field, indexToRemove) => {
    const updatedFiles = validFiles.filter(
      (_, index) => index !== indexToRemove
    );
    setValidFiles(updatedFiles);
    field.onChange(updatedFiles);
  };

  return (
    <FormField
      control={form.control}
      name={item.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>
            <Typography variant="body2">{item.label}</Typography>
          </FormLabel>
          <FormControl>
            <>
              <label
                htmlFor={`file-input-${item.name}`}
                className="block w-full px-4 py-2 text-gray-500 border border-gray-300 rounded cursor-pointer hover:bg-gray-100"
              >
                {validFiles.length > 0
                  ? `${validFiles.length} file(s) selected`
                  : "Click to select files here"}
              </label>
              <Input
                id={`file-input-${item.name}`}
                type="file"
                accept=".jpg,.jpeg,.png"
                onChange={(e) => onValueChange(e, field)}
                className="hidden" // Hide the default file input
                multiple
              />
            </>
          </FormControl>

          {/* Display Valid Files */}
          {validFiles.length > 0 && (
            <div className="mt-2">
              <Typography variant="caption" className="text-gray-500">
                Selected Files:
              </Typography>
              <ul className="list-disc pl-4">
                {validFiles.map((file, index) => (
                  <li key={index} className="flex items-center">
                    <Typography variant="caption" className="mr-2">
                      {file.name}
                    </Typography>
                    <IconButton
                      variant="ghost"
                      onClick={() => removeFile(field, index)}
                      className="text-red-500 hover:underline"
                      size="small"
                    >
                      <Delete />
                    </IconButton>
                  </li>
                ))}
              </ul>

              {/* File Previews */}
              {item.showPreviews && (
                <div className="grid grid-cols-3 gap-2 mt-2">
                  {validFiles.map((file, index) => (
                    <div
                      key={index}
                      className="relative aspect-square rounded overflow-hidden border"
                    >
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index}`}
                        className="object-cover w-full h-full"
                        onLoad={(e) => URL.revokeObjectURL(e.target.src)}
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
