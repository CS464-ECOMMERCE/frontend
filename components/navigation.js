import CartTrolleyButton from "./cart/CartTrolleyButton";
import {
  Login,
  StoreMallDirectory,
  Dashboard,
  Logout,
  Checklist,
} from "@mui/icons-material";
import { Button } from "@/components/ui/button";

export const getNavItems = (session, handleSignout) => [
  {
    name: "Shop",
    link: "/shop",
    icon: (
      <Button variant="ghost" color="black">
        <StoreMallDirectory sx={{ scale: 1.5 }} />
      </Button>
    ),
    show: !session,
  },
  {
    name: "Order Status",
    link: "/order",
    icon: (
      <Button variant="ghost" color="black">
        <Checklist sx={{ scale: 1.5 }} />
      </Button>
    ),
    show: !session,
  },
  {
    name: "View Cart",
    link: "/cart",
    icon: <CartTrolleyButton />,
    show: !session,
  },
  {
    name: "Login",
    link: "/login",
    icon: (
      <Button variant="ghost" color="black">
        <Login sx={{ scale: 1.5 }} />
      </Button>
    ),
    show: !session,
  },
  {
    name: "Dashboard",
    link: "/admin",
    icon: (
      <Button variant="ghost" color="black">
        <Dashboard sx={{ scale: 1.5 }} />
      </Button>
    ),
    show: session,
  },
  {
    name: "View Orders",
    link: "/admin/order",
    icon: (
      <Button variant="ghost" color="black">
        <Checklist sx={{ scale: 1.5 }} />
      </Button>
    ),
    show: session,
  },
  {
    name: "Sign out",
    link: "/login",
    icon: null,
    show: session,
    icon: (
      <Button variant="ghost" color="black">
        <Logout sx={{ scale: 1.5 }} />
      </Button>
    ),
    action: handleSignout,
  },
];
