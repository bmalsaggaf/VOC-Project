import { createServerFn } from "@tanstack/react-start";
import { validateOrder, type OrderInput } from "./order";

// Sends the order to the n8n webhook (N8N_WEBHOOK_URL). Returns an order id
// used for the payment page and the /report/$id page.
export const submitOrder = createServerFn({ method: "POST" })
  .inputValidator((data: OrderInput) => {
    const errors = validateOrder(data);
    if (Object.keys(errors).length) throw new Error("invalid_input");
    return {
      mapsUrl: data.mapsUrl.trim(),
      email: data.email.trim(),
      reportLanguage: data.reportLanguage,
    };
  })
  .handler(async ({ data }) => {
    const url = process.env["N8N_WEBHOOK_URL"];
    if (!url) throw new Error("webhook_not_configured");
    const orderId = crypto.randomUUID();
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ orderId, ...data, createdAt: new Date().toISOString() }),
    });
    if (!res.ok) throw new Error(`webhook_failed_${res.status}`);
    return { orderId };
  });
