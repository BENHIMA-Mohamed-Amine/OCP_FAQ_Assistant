import React from "react";
import { Button } from "./Button";

export const About = () => {
  return (
    <section className="flex flex-col justify-items-start justify-between md:flex-row my-5 md:my-10">
      <div className="flex flex-col justify-between items-start gap-6">
        <h1 className="text-base md:text-2xl">About Us</h1>
        <p className="pt-[-20px] w-5/6 leading-8 text-justify text-sm md:text-base">
          Founded in 1920, OCP Groupe began with phosphate mining in Morocco.
          Today, we encompass the full cycle of plant nutrition, including
          mining, processing, and distributing a diverse range of fertilizers,
          aiming to boost agricultural productivity and sustainability.
        </p>
        <Button content="Discover More" />
      </div>
      <img
        src="./src/assets/ocp_about 1.png"
        alt="ocp about image"
        className="w-[237px] h-[160px] lg:w-[372px] md:h-[251px] mt-[10px]"
      />
    </section>
  );
};
