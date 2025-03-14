import { Typography } from "@mui/material";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Switch } from "../ui/switch";

export default function CustomSwitch({ item, form }) {
  return (
    <FormField
      control={form.control}
      name={item.name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1">
          <FormLabel>
            <Typography variant="body2">{item.label}</Typography>
          </FormLabel>
          <FormControl>
            <Switch
              disabled={item.disabled}
              {...field}
              checked={field.value ?? false}
              onCheckedChange={(checked) => field.onChange(checked)}
            />
          </FormControl>
        </FormItem>
      )}
    />
  );
}
