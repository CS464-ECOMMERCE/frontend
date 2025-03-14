import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { Switch } from "../ui/switch";

export default function CustomSwitch({ item, form }) {
  return (
    <FormField
      control={form.control}
      name={item.name}
      render={({ field }) => (
        <FormItem className="flex flex-col gap-1">
          <FormLabel>{item.label}</FormLabel>
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
