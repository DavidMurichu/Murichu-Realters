import React from "react";
import styled from 'styled-components';

const HeadingContainer = styled.div`
  text-align: center;
  margin: 20px 0;
  padding: 10px;

  @media (min-width: 576px) {
    padding: 20px;
  }

  @media (min-width: 768px) {
    padding: 30px;
  }

  @media (min-width: 992px) {
    padding: 40px;
  }
`;

const HeadingTitle = styled.h5`
  font-size: 1.5rem;
  margin: 0;

  @media (min-width: 576px) {
    font-size: 2rem;
  }

  @media (min-width: 768px) {
    font-size: 2.5rem;
  }

  @media (min-width: 992px) {
    font-size: 3rem;
  }
`;

const HeadingSubtitle = styled.p`
  font-size: 1rem;
  margin: 0;

  @media (min-width: 576px) {
    font-size: 1.2rem;
  }

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }

  @media (min-width: 992px) {
    font-size: 1.8rem;
  }
`;

const Heading = ({ title, subtitle }) => {
  return (
    <HeadingContainer>
      <HeadingTitle>{title}</HeadingTitle>
      <HeadingSubtitle>{subtitle}</HeadingSubtitle>
    </HeadingContainer>
  );
}

export default Heading;
