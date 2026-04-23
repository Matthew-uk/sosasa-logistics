import Image from "next/image";

export default function Logo({ size = "default" }: { size?: "small" | "default" | "large" }) {
  const w = size === "small" ? 70 : size === "large" ? 120 : 90;
  return <Image src="/img/logo/sosasa.png" alt="SOSASA Logistics" width={w} height={w} />;
}
