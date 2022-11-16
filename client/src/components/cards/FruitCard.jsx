import React, { Fragment } from 'react'

const FruitCard = ({ type, hum, pH }) => {
  return (
    <Fragment>
      <section className=' 2xl:bg-slate-300 2xl:w-[270px] 2xl:h-[270px] 2xl:rounded-md 2xl:shadow-md'>

        <div className='2xl:relative 2xl:box-border 2xl:p-[20px] 2xl:bg-purple-500 2xl:h-[45%] 2xl:rounded-b-md '>
          <h1>Suitable fruit</h1>
          <div className='2xl:mx-auto 2xl:items-center 2xl:text-lg  2xl:bg-purple-500 2xl:w-[140px] 2xl:h-[140px] 2xl:rounded-full 2xl:leading-[140px] 2xl:text-center'>
            <img className=' 2xl:block 2xl:mr-[35px] 2xl:mt-[10px] 2xl:w-[100px] 2xl:h-[100px]  2xl:absolute 2xl:right-[50px] 2xl:top-[50px]' src={type} alt="" />
          </div>

        </div>
        <div className='2xl:pt-[75px] 2xl:pl-[20px]'>
          <h2>Humidity :{hum}%</h2>
          <h3>Power Of Hydrogen :{pH}</h3>
        </div>

      </section>
    </Fragment>
  )
}

export default FruitCard