"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import CartTrolleyButton from "./cart/CartTrolleyButton";
import { signOut, useSession } from "next-auth/react";
import {
  Login,
  StoreMallDirectory,
  Dashboard,
  Logout,
  Checklist,
} from "@mui/icons-material";

const drawerWidth = 240;

export default function Navbar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleSignout = async () => {
    const data = await signOut({ redirect: false, callbackUrl: "/login" });
    if (data) {
      router.push("/login");
    }
  };

  const navItems = [
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

  const drawer = (
    <Box onClick={handleDrawerToggle}>
      <Typography variant="h6" sx={{ my: 2, textAlign: "center" }}>
        CS464
      </Typography>
      <Divider />
      <List>
        {navItems.map(
          (item, index) =>
            item.show && (
              <ListItem key={index} disablePadding>
                <ListItemButton
                  sx={{ textAlign: "center" }}
                  onClick={
                    item.action ? item.action : () => router.push(item.link)
                  }
                >
                  {item.icon}
                  <ListItemText primary={item.name} />
                </ListItemButton>
              </ListItem>
            ),
        )}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            CS464
          </Typography>
          <Box
            sx={{ display: { xs: "none", sm: "flex" }, alignItems: "center" }}
          >
            {navItems.map(
              (item, index) =>
                item.show && (
                  <div key={index}>
                    {item.name !== "View Cart" ? (
                      <Button
                        variant="ghost"
                        color="white"
                        onClick={
                          item.action
                            ? item.action
                            : () => router.push(item.link)
                        }
                      >
                        {item.name}
                      </Button>
                    ) : (
                      item.icon
                    )}
                  </div>
                ),
            )}
          </Box>
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      <Toolbar />
    </>
  );
}
