import React from "react";
import { GoShieldCheck } from "react-icons/go";
import { MdOutlineSupportAgent } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";

const Delivery = () => {
  const data = [
    {
      logo: <TbTruckDelivery />,
      heading: "Free and fast delivery",
      text: "Free delivery for all orders over $140",
    },
    {
      logo: <MdOutlineSupportAgent />,
      heading: "24/7 Customer service",
      text: "Frendly 24/7 customer support",
    },
    {
      logo: <GoShieldCheck />,
      heading: "Money Back Guarantee",
      text: "We return money within 30 days",
    },
  ];
  return (
    <>
      <div className="mx-auto flex justify-between my-10">
        <div className="delivery flex flex-col md:flex-row gap-20">
          {data.map((item, i) => (
            <div className="flex flex-col gap-8 text-center" key={i}>
              <div className="bg-slate-300 w-fit p-3 rounded-full  mx-auto">
                <div className="bg-black w-fit rounded-full p-2 text-white text-5xl">
                  {item.logo}
                </div>
              </div>
              <div className="text flex flex-col gap-4">
                <h3 className="font-bold text-2xl uppercase">{item.heading}</h3>
                <p>{item.text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Delivery;
