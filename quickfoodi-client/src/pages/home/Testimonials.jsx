import React from "react";
import { FaStar } from "react-icons/fa";

function Testimonials() {
  return (
    <div className="section-container">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <img src="/images/home/testimonials/testimonials.png" className="hover:scale-105 transition-all duration-200"></img>
        </div>
        <div className="md:w-1/2">
          <div className="text-left">
            <p className="subtitle">Testimonials</p>
            <h2 className="title md:w-[526px]">
              What Our{" "}
              <span className="text-[#164A41] font-bold">Customers</span> Say
              About Us
            </h2>
            <blockquote className="my-5 text-[#ecb152] leading-[30px]">
              "I had the pleasure dining at QuickFoodi last night, nd I'm still
              raving about the experience! the attention to details in
              presentation and services was impeccable"
            </blockquote>

            {/* Avtart */}
            <div className="flex items-center gap-4 flex-wrap">
              <div className="avatar-group -space-x-6 rtl:space-x-reverse">
                <div className="avatar">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial1.png" className="hover:scale-125 transition-all duration-200"/>
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial2.png"  className="hover:scale-125 transition-all duration-200"/>
                  </div>
                </div>
                <div className="avatar">
                  <div className="w-12">
                    <img src="/images/home/testimonials/testimonial3.png" className="hover:scale-125 transition-all duration-200"/>
                  </div>
                </div>
                <div className="avatar placeholder">
                  <div className="bg-neutral text-neutral-content w-12">
                    <span>+99</span>
                  </div>
                </div>
              </div>
              <div className="space-y-1">
                <h5 className="text-lg font-semibold ">Customer Feedback</h5>
                <div className="flex items-center gap-2">
                  <FaStar className="text-[#ecb152]" />
                  <span className="font-medium">4.6</span>
                  <span className="text-[#3cebe8]">(27.3k Reviews)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
