import React from 'react'

const serviceLists = 
[
    {id: 1, title: "Catering", des: "Delight your guests with our flavour and presentation", Image: "/images/home/services/icon1.png"},
    {id: 2, title: "Fast Delivery", des: "We deliver your order promptly to your door", Image: "/images/home/services/icon2.png"},
    {id: 3, title: "Online Ordering", des: "Explore menu & order with ease using our Onile Ordering", Image: "/images/home/services/icon3.png"},
    {id: 4, title: "Gift Cards", des: "Give the gift of exceptional dining with QuickFoodi Gift Cards :)", Image: "/images/home/services/icon4.png"},
]

function OurServices() {
  return (
      <div className="section-container my-20 py-10 bg-gradient-to-r from-[#164A41] from-0% via-[#4D774E] via-40% to-[#9DCBBD] to-100%">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">

        {/* text */}
        <div className="md:w-1/2">
          <div className="text-left">
            <p className="subtitle">our story and services</p>
            <h2 className="title md:w-[526px]">
            Our Culinary <span className="text-[#164A41] font-bold">Journey</span> And
              <span className="text-[#164A41] font-bold"> Services</span>
            </h2>
            <blockquote className="my-5 text-[#ecb152] leading-[30px]">
              "Rooted in passion, we curate unforgettabble dining experiences and offer experiences and offer excepyional services, blending culinary artistry with warm hospitality"
            </blockquote>

            <button className="btn bg-[#F1B24A] hover:bg-[#f0c684] hover:text-slate-800 rounded-full px-8 py-3 text-white flex items-center hover:scale-105 transition-all duration-200">Explore :)</button>

          </div>
        </div>

        {/* images */}
        <div className="md:w-1/2">
          <div className='grid sm:grid-cols-2 grid-cols-1 gap-8 items-center'>
            {
                serviceLists.map((item) => (
                    <div key={item.id} className='shadow-md rounded-sm py-5 px-4 text-center space-y2 cursor-pointer hover:border-[#f0c684] transition-all duration-200 hover:border'>
                        <img src={item.Image} className='mx-auto hover:scale-110 transition-all duration-200'/>
                        <h5 className='pt-3 font-semibold text-[#F1B24A]'>{item.title}</h5>
                        <p className='text-slate-900'>{item.des}</p>
                    </div> 
                ))
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default OurServices
