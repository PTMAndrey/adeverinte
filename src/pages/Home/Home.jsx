import React, { useEffect, useState } from 'react'
import useStateProvider from '../../hooks/useStateProvider'

const Home = () => {

  const {cereriAdeverinte} = useStateProvider();


  return (
    <div>
      
      <p>Home</p>

      {cereriAdeverinte?.length > 0 && (
        <table>
          <thead>
            <tr>
              {cereriAdeverinte[0]?.map((heading, index) => (
                <th key={index}>{heading}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {cereriAdeverinte?.slice(1).map((row, index) => (
              <tr key={index}>
                {row.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

export default Home