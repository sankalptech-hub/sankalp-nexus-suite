
import React from 'react';

const About = () => {
  return (
    <section id="about" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
        <div className="space-y-3">
          <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">About Sankalp Tech</h2>
          <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            Founded with a passion for innovation, Sankalp Tech is dedicated to providing top-tier technology solutions that drive success and growth for our clients worldwide. Our team of experts is committed to excellence and building long-lasting partnerships.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
