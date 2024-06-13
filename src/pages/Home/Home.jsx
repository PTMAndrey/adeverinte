import React, { useEffect, useState } from 'react'
import useStateProvider from '../../hooks/useStateProvider'
import styles from './Home.module.scss';
import imagineNotFound from '../../assets/images/campus.jpg'
const Home = () => {


  return (
    <div className={styles.homeContainer}>
      <img src={imagineNotFound} alt='Campus USV - Harta 3d' className={styles.campus} />
      
    </div>
  )
}

export default Home
