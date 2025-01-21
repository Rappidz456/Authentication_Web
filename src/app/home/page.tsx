"use client";
import React, { JSX } from "react";
import "./styles.css";
import Image from "next/image";
import LogoItem from "../../../public/LogoItem.png";
import { useRouter } from "next/navigation";

const page: React.FC = (): JSX.Element => {
  const router = useRouter();
  React.useEffect(() => {
    router.push("/home");
    return () => window.location.reload();
  }, [router]);
  return (
    <div className="contaner">
      <div className="logo">
        <Image src={LogoItem} alt="Logo" width={400} height={400} />
      </div>
      <div className="contents">
        <h1 className="heading">Discover Delicious Vegan Snacks</h1>
        <p className="subheading">Nourish Your Body</p>
      </div>
    </div>
  );
};

export default page;
