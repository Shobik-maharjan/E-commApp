import React from "react";

const About = () => {
  return (
    <div className="my-10">
      <div className="container flex items-center gap-6">
        <div className="w-1/2 bg-white p-4 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold pb-5">About Us</h1>
          <p className="text-lg mb-4">
            Welcome to our gadgets website! We're passionate about technology
            and gadgets that make our lives easier, more fun, and more
            efficient.
          </p>
          <p className="text-lg mb-4">
            Our team of experts scours the market to bring you the latest and
            greatest gadgets, from smartphones and laptops to smart home devices
            and wearable tech.
          </p>
          <p className="text-lg mb-4">
            Whether you're a tech enthusiast, a casual user, or someone looking
            for the perfect gift, we've got something for everyone. Our mission
            is to provide you with in-depth reviews, helpful guides, and curated
            lists to help you make informed decisions about your tech purchases.
          </p>
          <p className="text-lg">
            Thank you for visiting our website and trusting us to be your go-to
            source for all things gadgets!
          </p>
        </div>
        <div className="w-1/2">
          <img src="about.webp" alt="" className="w-full" />
        </div>
      </div>
    </div>
  );
};

export default About;
