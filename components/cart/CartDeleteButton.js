import { RemoveItemFromCart } from "@/api/cart";
import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function CartDeleteButton({ id }) {
  return (
    <div>
      <IconButton>
        <Delete />
      </IconButton>
    </div>
  );
}
