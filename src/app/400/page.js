import Custom400 from "@/components/Custom400";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Custom400 />
    </Suspense>
  );
}
