import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Heading from "../../common/Heading";
import { team } from "../../data/Data";
import "./team.css";

const Card = ({ data, isActive, position }) => {
  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: isActive ? 1.05 : 0.9,
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
    }),
  };

  return (
    <motion.div
      className={`box ${isActive ? 'active' : 'inactive'}`}
      custom={position}
      variants={variants}
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: "spring", stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <button className='btn3'>{data.list} Listings</button>
      <span className="helper-text">No of Listings</span>
      <div className='details'>
        <div className='img'>
          <img src={data.cover} alt='' />
          <i className='fa-solid fa-circle-check'></i>
        </div>
        <i className='fa fa-location-dot'></i>
        <label>{data.address}</label>
        <h4>{data.name}</h4>
        <ul>
          {data.icon.map((icon, index) => (
            <li key={index}>{icon}</li>
          ))}
        </ul>
        <div className='button flex'>
          <button className="btn-s">
            <i className='fa fa-envelope'></i>
            <h6>Message</h6>
          </button>
          <button className='btn-s btn-hover' style={{ background: 'black' }}>
            <i className='fa fa-phone-alt'></i>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const Team = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % team.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const getVisibleCards = () => {
    const leftIndex = (activeIndex - 1 + team.length) % team.length;
    const rightIndex = (activeIndex + 1) % team.length;
    return [leftIndex, activeIndex, rightIndex];
  };

  const visibleCards = getVisibleCards();

  return (
    <>
      <section className='team background'>
        <div className='container'>
          <Heading title='Our Featured Agents' subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' />
          <div className='content mtop grid3'>
            <AnimatePresence initial={false} custom={activeIndex}>
              {visibleCards.map((cardIndex, index) => (
                <Card
                  key={team[cardIndex].id}
                  data={team[cardIndex]}
                  isActive={index === 1}
                  position={index - 1}
                />
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
};

export default Team;
