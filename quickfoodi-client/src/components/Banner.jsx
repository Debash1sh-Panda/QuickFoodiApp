import React from 'react'
import '../App.css'

function Banner() {
  return (
    <div className='section-container bg-gradient-to-r from-[#164A41] from-0% via-[#4D774E] via-40% to-[#9DCBBD] to-100%'>
      <div className='py-24 flex flex-col md:flex-row justify-between items-center gap-8'>
        {/* Left - Texts*/}
        <div className='md:w-1/2 space-y-7 px-3 order-2 md:order-1'>
            <h2 className='md:text-5xl text-4xl font-bold md:leading-snug leading-snug'>Dive into Delights Of Delectable <span className='text-[#164A41] font-bold'>FOOD</span></h2>
            <p className='text-xl text-[#dfb166]'>Every Dish Tells a Tale of Culinary Expertise and Passionate Craftsmanship</p>
            <button className='btn bg-[#F1B24A] hover:bg-[#f0c684] hover:text-slate-800 py-3 mt-4 border-none font-semibold text-white rounded-full'>Order now :)</button>
        </div>

        {/* Right - Image*/}
        <div className='md:w-1/2 order-1 md:order-2'>
            <img src='/images/home/banner.png' alt='bannerimage'/>

          <div className='flex flex-col md:flex-row item-center justify-around -mt-14 gap-4'>
            <div className='flex bg-white py-4 px-3 rounded-2xl items-center gap-2 shadow-md w-64 hover:-translate-x-4 duration-300 transition-all'>
              <img src='/images/home/b-food1.png' alt='dishes' className='rounded-2xl w-20'/>
              <div className='space-y-1'>
                <h5 className='font-md font-medium text-slate-800'>Spicy noodles</h5>
                <div className='rating rating-sm'>
                  <input type='radio' name='rating-2' className='mask mask-star-2 bg-[#F1B24A]' readOnly/>
                  <input type='radio' name='rating-2' className='mask mask-star-2 bg-[#F1B24A]' readOnly/>
                  <input type='radio' name='rating-2' className='mask mask-star-2 bg-[#F1B24A]' readOnly/>
                  <input type='radio' name='rating-2' className='mask mask-star-2 bg-[#F1B24A]' checked readOnly/>
                  <input type='radio' name='rating-2' className='mask mask-star-2 bg-[#F1B24A]' readOnly/>
                </div>
                <p className='text-'>₹99.00</p>
              </div>
            </div>
            <div className='sm:flex hidden bg-white py-4 px-3 rounded-2xl items-center gap-2 shadow-md w-64 hover:translate-x-4 duration-300 transition-all'>
              <img src='/images/home/b-food2.png' alt='dishes' className='rounded-2xl w-20 bg-slate-500'/>
              <div className='space-y-1'>
                <h5 className='font-md font-medium text-slate-800'>Crispy burger</h5>
                <div className='rating rating-sm'>
                  <input type='radio' name='rating-2' className='mask mask-star-2 bg-[#F1B24A]' readOnly/>
                  <input type='radio' name='rating-2' className='mask mask-star-2 bg-[#F1B24A]' readOnly/>
                  <input type='radio' name='rating-2' className='mask mask-star-2 bg-[#F1B24A]' readOnly/>
                  <input type='radio' name='rating-2' className='mask mask-star-2 bg-[#F1B24A]' checked readOnly/>
                  <input type='radio' name='rating-2' className='mask mask-star-2 bg-[#F1B24A]' readOnly/>
                </div>
                <p className='text-'>₹129.00</p>
              </div>
            </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default Banner
