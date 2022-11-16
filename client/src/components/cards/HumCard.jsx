import React, { Fragment } from 'react'


const HumCard = ({ clock, date, hum, icon }) => {
  return (
    <Fragment>
      <section className='2xl:box-border 2xl:bg-slate-300 2xl:w-[270px] 2xl:h-[270px] 2xl:rounded-md 2xl:shadow-md '>
        <div className=' 2xl:relative 2xl:box-border 2xl:p-[20px] 2xl:bg-purple-500 2xl:h-[45%] 2xl:rounded-b-md '>
          <h1>Humidity</h1>
          <div className='2xl:mx-auto 2xl:bg-purple-500 2xl:w-[140px] 2xl:h-[140px] 2xl:rounded-full 2xl:leading-[140px] '>
            <p className='2xl:text-center 2xl:text-2xl 2xl:w-[140px] 2xl:h-[140px] 2xl:leading-[140px]'>{hum}%</p>
          </div>
          <img className='2xl:w-[50px] 2xl:h-[50px] 2xl:absolute 2xl:right-[50px] 2xl:top-[50px]' src={icon} alt="" />
        </div>
        <div className='2xl:pt-[80px] 2xl:pl-[20px]'>
          <h2>{date}</h2>
          <h3>{clock}</h3>
        </div>

      </section>
    </Fragment>
  )
}

export default HumCard