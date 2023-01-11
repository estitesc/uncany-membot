import React from "react";
import type { NextPage } from "next";
import HeadWithFonts from "../c/HeadWithFonts";
import MarkBar from "../c/landing/MarkBar";
import Tagline from "../c/landing/sections/Tagline";
import HowItWorks from "../c/landing/sections/HowItWorks";
import SoWhat from "../c/landing/sections/SoWhat";
import Examples from "../c/landing/sections/Examples";

const Home: NextPage = () => {
  return (
    <div>
      <HeadWithFonts />

      <div
        style={{
          width: "100%",
          backgroundColor: "#FAFAFA",
          color: "#1D160C",
        }}
      >
        <MarkBar />
        <Tagline />
        <HowItWorks />
        <SoWhat />
        <Examples />
      </div>
    </div>
  );
};

export default Home;
