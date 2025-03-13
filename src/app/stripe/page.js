"use client";
import { Button } from "@mui/material";
import {
  EmbeddedCheckout,
  EmbeddedCheckoutProvider,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useRouter } from "next/navigation";
import { useCallback } from "react";

const stripePromise = loadStripe(
  "pk_test_51R1Q0O2fahqAQuSFUsFDGd6oDoMciNliTt3PDFNlXfx1svLl0BjL3PkVKSaOOc3VNfnQ5rkVeJg2e4A22RcwVmkm00GtSkSrFp"
);

const Return = () => {
  const [status, setStatus] = useState(null);
  const [customerEmail, setCustomerEmail] = useState("");

  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    fetch(`/session-status?session_id=${sessionId}`)
      .then((res) => res.json())
      .then((data) => {
        setStatus(data.status);
        setCustomerEmail(data.customer_email);
      });
  }, []);

  if (status === "open") {
    return <Navigate to="/checkout" />;
  }

  if (status === "complete") {
    return (
      <section id="success">
        <p>
          We appreciate your business! A confirmation email will be sent to{" "}
          {customerEmail}. If you have any questions, please email{" "}
          <a href="mailto:orders@example.com">orders@example.com</a>.
        </p>
      </section>
    );
  }

  return null;
};

export default function StripePage() {
  const router = useRouter();
  return (
    <div>
      <Button variant="contained" color="primary" onClick={() => router.push("/stripe/checkout")}>
        Checkout
      </Button>
    </div>
  );
}
