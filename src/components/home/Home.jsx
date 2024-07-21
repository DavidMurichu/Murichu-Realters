import React from "react"
import Awards from "./awards/Awards"
import Featured from "./featured/Featured"
import Hero from "./hero/Hero"
import Location from "./location/Location"
import Price from "./price/Price"
import Recent from "./recent/Recent"
import Team from "./team/Team"
import LinkCard from "../Container/LinkCard"
import { Box } from "@mui/material"
import Featuredlink from "./FeatureLink"

const Home = () => {
  return (
    <>
      <Hero />
      <Recent />
      <Featuredlink />
      <Team />
      <Location />

    </>
  )
}

export default Home
