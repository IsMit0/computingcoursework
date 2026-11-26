TO DO LIST
-	Must be able to log in in under 30s
-	Must have a picture gallery on the home page -> DOING THIS NOW
-	Must have a history page which is modular and editable via a button only available for administrators
-	Must be able to log in via multitude of different platforms (Google, Discord, Microsoft, etc) as well as a generic log-in
-	Must be able to accept applications/sign ups within the site in under 30s
-	Must be able to edit the picture gallery contents via an administrative page
-	 Each page must take under 10s to load
-	Must be able to view any submitted orders via an admin page with all relevant non-confidential information displayed (Username, Email, Order ID, Order Contents, etc)


"use client";
import React, { useState, useRef, useEffect } from "react";
import { LayoutGrid } from "@/components/ui/layout-grid";

export function LayoutGridDemo() {
  return (
    <div className="h-screen py-20 w-full">
      <LayoutGrid cards={cards} />
    </div>
  );
}

const SkeletonOne = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        House in the woods
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A serene and tranquil retreat, this house in the woods offers a peaceful
        escape from the hustle and bustle of city life.
      </p>
    </div>
  );
};

const SkeletonTwo = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        House above the clouds
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        Perched high above the world, this house offers breathtaking views and a
        unique living experience. It&apos;s a place where the sky meets home,
        and tranquility is a way of life.
      </p>
    </div>
  );
};
const SkeletonThree = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Greens all over
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A house surrounded by greenery and nature&apos;s beauty. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};
const SkeletonFour = () => {
  return (
    <div>
      <p className="font-bold md:text-4xl text-xl text-white">
        Rivers are serene
      </p>
      <p className="font-normal text-base text-white"></p>
      <p className="font-normal text-base my-4 max-w-lg text-neutral-200">
        A house by the river is a place of peace and tranquility. It&apos;s the
        perfect place to relax, unwind, and enjoy life.
      </p>
    </div>
  );
};

const cards = [
  {
    id: 1,
    content: <SkeletonOne />,
    className: "md:col-span-2",
    thumbnail:
      "https://cdn.21st.dev/assets/mirror/5f/5fdbf559479c57d500e8f7342760bc16da5eae2465859d5d5d1883dbcf5732c1.jpg",
  },
  {
    id: 2,
    content: <SkeletonTwo />,
    className: "col-span-1",
    thumbnail:
      "https://cdn.21st.dev/assets/mirror/c8/c8a1abea674a7d46e7bda6baa37fa773fb5f65f153d6e56c73943df1f630ef09.jpg",
  },
  {
    id: 3,
    content: <SkeletonThree />,
    className: "col-span-1",
    thumbnail:
      "https://cdn.21st.dev/assets/mirror/cd/cd2781e54b9f47ec3efb0484ea8da963bbccf76f3c5818ceef4f3b0f621397a8.jpg",
  },
  {
    id: 4,
    content: <SkeletonFour />,
    className: "md:col-span-2",
    thumbnail:
      "https://cdn.21st.dev/assets/mirror/17/17ecf84b41fad56074865c0216363f50b2dc2d87b9ff3647ca6130c3a16e1300.jpg",
  },
];
