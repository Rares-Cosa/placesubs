import { mockSubscriptions } from "@/data/mock-subscriptions";
import DashboardContent from "./components/DashboardContent";

export default function DashboardPage() {
  return (
    <div className="px-12 py-8">
      <h1 className="text-5xl font-bold text-text-primary text-center">
        Optimize Your Subscriptions
      </h1>
      <DashboardContent subscriptions={mockSubscriptions} />
    </div>
  );
}