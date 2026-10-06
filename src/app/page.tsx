import { test } from "next/experimental/testmode/playwright";
import Image from "next/image";


export default function Home() {
  return (
    <div className="px-4 py-2 bg-secondary text-secondary-foreground border-b border-foreground/20 rounded-xl">
      <h1>test</h1>
    </div>
  );
}
