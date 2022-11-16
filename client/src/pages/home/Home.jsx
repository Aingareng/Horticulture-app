/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { Fragment, useEffect, useState } from 'react'
import axios from "axios";
import { Helmet } from "react-helmet";
import { HumCard, PHcard, FruitCard } from '../../components';
import { humIcon, tempIcon, reactLogo, watermelonImg, melonImg, questionImg } from "../../assets/index";

const Home = () => {
  const [sensor, setSensor] = useState({
    clock: null,
    date: null,
    humadity: null,
    pH: null
  })
  const [fruit, setFruit] = useState('')

  useEffect(() => {
    fetchData()
    handleFruits()
  }, [sensor])

  const fetchData = async () => {
    const result = await axios.get('http://localhost:8000/')
    // console.log(result.data)
    const { data } = result
    data.forEach(element => {
      const { Humidity, pH } = element.sensor
      setSensor({
        ...sensor,
        clock: sensor.clock = element.clock,
        date: sensor.date = element.date,
        humadity: sensor.humadity = Humidity,
        pH: sensor.pH = pH.toFixed(2),
      })

    });
  }
  const handleFruits = () => {
    if ((sensor.humadity > 50 && sensor.humadity <= 70) && (sensor.pH > 6 && sensor.pH <= 6.7)) {
      setFruit(watermelonImg)
    } else if ((sensor.humadity && sensor.humadity <= 70) && (sensor.pH > 5.8 && sensor.pH <= 7.2)) {
      setFruit(melonImg)
    } else {
      setFruit(questionImg)
    }
  }
  return (
    <Fragment>
      <Helmet>
        <title>Horticulture Apps</title>
      </Helmet>
      <header className='2xl:bg-purple-500'>
        <section className='2xl:mx-auto 2xl:flex 2xl:items-center 2xl:justify-center 2xl:w-[500px]'>
          <img className='animate-[spin_3s_linear_infinite] 2xl:w-[100px] 2xl:h-[100px]' src={reactLogo} alt="" />
          <h1 className='2xl:text-xl'>Horticulture Apps</h1>
        </section>
      </header>
      <main>
        <ul className='2xl:flex 2xl:justify-center 2xl:mt-[100px]'>
          <li className='2xl:mr-[30px]' >
            <HumCard clock={sensor.clock} date={sensor.date} hum={sensor.humadity} icon={humIcon} />
          </li>
          <li className='2xl:mr-[30px]'>
            <PHcard clock={sensor.clock} date={sensor.date} pH={sensor.pH} icon={tempIcon} />
          </li>
          <li>
            <FruitCard type={fruit} hum={sensor.humadity} pH={sensor.pH} />
          </li>
        </ul>
      </main>
      <footer></footer>


    </Fragment>
  )
}

export default Home