import Image from "next/image";
import Link from "next/link";

export default function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} aria-label="placesubs — home">
      <Image
        src="/logo.svg"
        alt="placesubs"
        width={140}
        height={28}
        priority
        className="h-7 w-auto"
      />
    </Link>
  );
}