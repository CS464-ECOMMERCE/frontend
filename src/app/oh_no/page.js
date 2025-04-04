"use client";

import { Typography } from "@mui/material";
import dynamic from "next/dynamic";

const Lottie500 = dynamic(() => import("@/components/lotties/Lottie500"), {
  ssr: false,
});

export default function Page() {
  return (
    <div>
      <Typography variant="h4" align="center" gutterBottom>
        Oops! Something went wrong.
      </Typography>
      <Lottie500 />
    </div>
  );
}
