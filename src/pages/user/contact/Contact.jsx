import React from "react";
import Location from "components/user/contact/Location";
import Email from "components/user/contact/Email";
import Phone from "components/user/contact/Phone";

const Contact = () => {
  return (
    <div className="md:w-10/12 mx-auto">
      <div className="grid md:grid-cols-2  justify-center gap-4 md:p-4 py-4">
        <div className="flex flex-col justify-between py-4">
          <div className="flex flex-col gap-4">
            <h2 className="font-bold text-2xl">Have a Query in Mind?</h2>
            <p>You can reach out to me via email to discuss the query.</p>
          </div>
          <div className="flex flex-col gap-8">
            <Location font="text-xl" />
            <Email font="text-xl" />
            <Phone font="text-xl" />
          </div>
        </div>
        <div className="contact-form bg-green-800 p-4 rounded-md">
          <h2 className="font-semibold text-xl pb-2 text-white">
            Send Me Email
          </h2>
          <form className="form flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your Name"
              className="p-2 rounded-lg"
            />
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Your Email"
              className="p-2 rounded-lg"
            />
            <input
              type="text"
              placeholder="Headline"
              className="p-2 rounded-lg"
            />
            <textarea
              name="query"
              id="query"
              cols="30"
              rows="4"
              placeholder="Details about Query"
              className="p-2 rounded-lg"
            ></textarea>
            <button className="bg-green-600 text-white w-fit px-4 py-2 rounded-md mx-auto hover:bg-green-600/70">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
