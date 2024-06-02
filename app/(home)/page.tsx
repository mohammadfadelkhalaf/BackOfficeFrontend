import Card from "@/components/Card/Card";
import LoginFrom from "@/components/LoginForm/LoginFrom";
import Link from "next/link";

export default function Home() {

  return (
    <section className="max-w-[34rem] mx-auto">
      <LoginFrom></LoginFrom>
    </section>
  );
}
