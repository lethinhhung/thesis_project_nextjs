import Nav from "@/components/landing-page-nav";
import Image from "next/image";

export const metadata = {
  title: "Notebok",
  description: "Landing page",
};

export default function Landing() {
  return (
    <div className="w-full h-full">
      <Nav />
      <div className="flex flex-col items-center justify-center h-full p-4 gap-8">
        <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
          This project is currently in development
        </h4>
        <Image
          alt="image"
          src={"/placeholder.svg"}
          width={600}
          height={300}
          className="object-cover w-200 h-100 rounded-lg"
        />
      </div>
    </div>
  );
}
