import Link from "next/link";
import { Github } from "lucide-react";
import { getNavItems } from "./navigation";

export function Footer() {
  const yl = "Yao Long";
  const rl = "Ryan Low";
  const jk = "Jing Kai";
  const navItems = getNavItems().filter(
    (item) => item.show && item.name !== "Sign out" && item.name !== "Login",
  );

  return (
    <footer className="border-t bg-background w-full">
      <div className="container flex flex-col items-center justify-between gap-4 py-10 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} CS464 Ecommerce. All rights
            reserved.
          </p>
        </div>
        <nav className="flex items-center gap-4 md:gap-6">
          {navItems.map((item, id) => (
            <Link
              key={id}
              href={item.link}
              className="text-sm font-bold hover:underline"
            >
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link
            href="https://github.com/ooijingkai10"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <Github className="h-5 w-5" />
            <span className="md:inline">{jk}</span>
            <span className="sr-only"></span>
          </Link>
          <Link
            href="https://github.com/RyanxLowz"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <Github className="h-5 w-5" />
            <span className="md:inline">{rl}</span>
            <span className="sr-only">GitHub Profile 2</span>
          </Link>
          <Link
            href="https://github.com/yaolongt"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <Github className="h-5 w-5" />
            <span className="md:inline">{yl}</span>
            <span className="sr-only">GitHub Profile 3</span>
          </Link>
        </div>
      </div>
    </footer>
  );
}
