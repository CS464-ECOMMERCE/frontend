"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ArrowBack } from "@mui/icons-material";

export default function BackButton() {
  const router = useRouter();
  const pathname = usePathname();

  function goBack() {
    if (window.history.length > 1) {
      router.back();
    } else {
      const prevPath = pathname.split("/").slice(0, -1).join("/");
      router.push(prevPath);
    }
  }
  return (
    <Button variant="outline" onClick={() => goBack()}>
      <ArrowBack />
      Back
    </Button>
  );
}
