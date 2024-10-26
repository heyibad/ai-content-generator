"use client"; // Ensure the component renders on the client side


import { useSubscription } from "@/app/(context)/SubscriptionContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Loader2 } from "lucide-react";

export default function BillingPage() {
  const { subscription, isLoading } = useSubscription();

  if (isLoading) {
    return <Loader2 className="animate-spin m-auto mt-48" size={42}/>
  }

  const plans = [
    { name: "Basic", price: "Free", limit: "1000 words/month" },
    { name: "Gold", price: "$10/month", limit: "Unlimited usage" },
    { name: "Platinum", price: "$50/month", limit: "Premium support +",extra:" Unlimited usage" },
  ];

  const currentPlan = subscription ? subscription.plan : "basic";

  function handleUpgrade(plan: string) {
    fetch("/api/subscription", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan }),
    })
      .then((res) => res.json())
      .then(({ checkoutUrl }) => {
        if (checkoutUrl) window.location.href = checkoutUrl;
      })
      .catch((error) => console.error("Upgrade failed", error));
  }
  

  return (
    <div className=" mx-auto">
 <p className="flex flex-col items-center justify-center mt-8 text-sm text-gray-400 dark:opacity-25">Disclaimer: its in a beta version <span>
  {"(avoid to use any payment/sensitive info)"} 🫢
  </span> </p>
 <div className="grid grid-cols-1 md:grid-cols-3 gap-4 px-4 py-8">
         
      {plans.map((plan) => (
        <Card key={plan.name} className="px-6 py-12 relative md:h-[60vh]">
          <CardHeader>
            <CardTitle className="mx-auto text-3xl">{plan.name}</CardTitle>
          </CardHeader>
          <CardContent className="w-full flex flex-col items-center justify-end gap-4 text-xl text-wrap overflow-hidden">
            <p>{plan.limit}</p>
            {plan.extra && <p>{plan.extra}</p>}
            <p>{plan.price}</p>
            <div className="absolute bottom-0 w-full pb-4 flex justify-center"> {/* Added justify-center for centered alignment */}
              {plan.name.toLowerCase() === currentPlan ? (
                <Button className="w-full mx-4 my-2" disabled>Current Plan</Button>
              ) : (
                <Button className="w-full mx-4 my-2" onClick={() => handleUpgrade(plan.name)}>
                  {plan.name === "Basic" ? "Free Plan" : "Upgrade"}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
    </div>
   
  );


}