"use client";

function Dashboard() {
  return (
    <div className="flex flex-col items-center mx-auto h-full w-full rounded-xl bg-muted/50">
      <div className="w-full h-full grid grid-cols-12 gap-2">
        <div className="space-y-2 col-span-12 h-full sm:col-span-6 lg:col-span-4 bg-black"></div>
        <div className="space-y-2 col-span-12 h-full sm:col-span-12 lg:col-span-8 bg-black"></div>
        <div className="space-y-2 col-span-12 h-full sm:col-span-6 lg:col-span-4 bg-black"></div>
        <div className="space-y-2 col-span-12 h-full sm:col-span-6 lg:col-span-4 bg-black"></div>
        <div className="space-y-2 col-span-12 h-full sm:col-span-6 lg:col-span-4 bg-black"></div>
        <div className="space-y-2 col-span-12 h-full sm:col-span-6 lg:col-span-4 bg-black"></div>
        <div className="space-y-2 col-span-12 h-full sm:col-span-6 lg:col-span-4 bg-black"></div>
        <div className="space-y-2 col-span-12 h-full sm:col-span-6 lg:col-span-4 bg-black"></div>
      </div>
    </div>
  );
}

export default Dashboard;
