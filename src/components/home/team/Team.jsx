import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Heading from "../../common/Heading";
import "./team.css";
import { FetchData } from '../../appService/Delay';
import { useHistory } from 'react-router-dom';
import { useMediaQuery, useTheme } from '@mui/material';

const Card = ({ data, isActive, position }) => {
  const navigate = useHistory();
  const handleCardClick = (agentdata) => {
    console.log('agent', agentdata);
    navigate.push({
      pathname: `/agent-details`,
      state: { data: agentdata },
    });
  };

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
      onClick={() => handleCardClick(data)}
      className={`box ${isActive ? 'active' : 'inactive'}`}
      custom={position}
      variants={variants}
      cursor='pointer'
      initial="enter"
      animate="center"
      exit="exit"
      transition={{
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.2 },
      }}
    >
      <button className='btn3'>{data.properties_count || 0} Listings</button>
      <span className="helper-text">No of Listings</span>
      <div className='details'>
        <div className='img'>
          <img src={data.profile_image || 'default-image.png'} alt='' />
          <i className='fa-solid fa-circle-check'></i>
        </div>
        <i className='fa fa-location-dot'></i>
        <label>{data.city_name || 'Unknown City'}</label>
        <h4>{data.name || 'No Name'}</h4>
        <ul>
          {(data.icon || []).map((icon, index) => (
            <li key={index}>{icon}</li>
          ))}
        </ul>
        <div className='button flex'>
          <a
            href={`https://wa.me/${data.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <button className="btn-s">
              <i className='fa fa-envelope'></i>
              <h6>Message</h6>
            </button>
          </a>
          <a
            href={`tel:${data.phone}`}
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <button className='btn-s btn-hover' style={{ background: 'black' }}>
              <i className='fa fa-phone-alt'></i>
            </button>
          </a>
        </div>
      </div>
    </motion.div>
  );
};

const Team = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [team, setTeam] = useState([]);
  const [loading, setLoading] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const fetch = async () => {
    try {
      await FetchData('get-agents', setTeam, setLoading);
    } catch (error) {
      console.error("Error fetching data", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (team.length > 0) {
      const interval = setInterval(() => {
        setActiveIndex(prevIndex => (prevIndex + 1) % team.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [team.length]);

  const getVisibleCards = useCallback(() => {
    if (team.length === 0) return [];

    if (isSmallScreen) {
      return [activeIndex];
    }

    const visibleCount = Math.min(3, team.length);
    const indices = [];
    for (let i = 0; i < visibleCount; i++) {
      indices.push((activeIndex + i - 1 + team.length) % team.length);
    }
    return indices;
  }, [team.length, activeIndex, isSmallScreen]);

  const visibleCards = getVisibleCards();

  return (
    <section className='team background'>
      <div className='container'>
        <Heading title='Our Featured Agents' subtitle='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.' />
        <div className='content mtop'>
          {team.length === 0 ? (
            <p>No agents available</p>
          ) : (
            <AnimatePresence initial={false} custom={activeIndex}>
              {visibleCards.map((cardIndex, index) => (
                <Card
                  key={team[cardIndex]?.id || index}
                  data={team[cardIndex] || {}}
                  isActive={index === 0}
                  position={index - 1}
                />
              ))}
            </AnimatePresence>
          )}
        </div>
      </div>
    </section>
  );
};

export default Team;
