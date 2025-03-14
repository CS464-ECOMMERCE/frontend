import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";

export default function CustomTextField({ item, form }) {
  const onValueChange = (e, field) => {
    const value =
      item.type === "number" ? parseFloat(e.target?.value ?? 0) : e.target.value;
    field.onChange({ target: { value } });
  };

  return (
    <FormField
      control={form.control}
      name={item.name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{item.label}</FormLabel>
          <FormControl>
            <Input
              type={item.type ?? "text"}
              disabled={item.disabled}
              placeholder={item.placeholder ?? ""}
              value={item.value ?? ""}
              {...field}
              onChange={(e) => onValueChange(e, field)}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
