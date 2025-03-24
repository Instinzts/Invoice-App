
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/logo.png";
// import { buttonVariants } from "@/components/ui/button";
import { RainbowButton } from "@/components/magicui/rainbow-button";
// import { InteractiveHoverButton } from "@/components/magicui/interactive-hover-button"
export function Navbar() {
  return (
    <div className="flex items-center justify-between py-5">
      <Link href="/" className="flex items-center gap-2">
        <Image src={Logo} alt="Logo" className="size-10" />
        <h3 className="text-3xl font-semibold">
          Async<span className="text-blue-500">Dynamic Inc</span>
        </h3>
      </Link>
      <Link href="/login">
        <RainbowButton className="w-auto block">Get Started</RainbowButton>
      </Link>
    </div>
  );
}