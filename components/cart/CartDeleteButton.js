import { Delete } from "@mui/icons-material";
import { IconButton } from "@mui/material";

export default function CartDeleteButton({ handleOnClick }) {
  return (
    <div>
      <IconButton onClick={handleOnClick}>
        <Delete />
      </IconButton>
    </div>
  );
}
