import Nav from "@/components/landing-page-nav";
import Image from "next/image";

export default function Landing() {
  return (
    <div className="w-full h-full">
      <Nav />
      <div className="flex flex-col items-center justify-center h-full p-4 gap-8">
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
