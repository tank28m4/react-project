import React, { useEffect } from 'react';
import styled from 'styled-components';
import trustpilotLogo from '../assets/icons/truspilot.svg';
import mainImage from '../assets/images/main.png';

const HeaderSection = styled.div`
  id: "Header";
  class-name: "header";
`;

const ContainerFlex = styled.div`
  class-name: "container-flex";
`;

const HeroContent = styled.div`
  class-name: "hero-content";
`;

const HeroH1 = styled.h1`
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  opacity: 1;
  transform-style: preserve-3d;
  class-name: "hero-h1";
  font-weight: normal;
`;

const BrandSpan = styled.span`
  class-name: "brand-span";
`;

const HeroParagraph = styled.p`
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  opacity: 1;
  transform-style: preserve-3d;
  class-name: "hero-paragraph";
`;

const ButtonWrapper = styled.div`
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  opacity: 1;
  transform-style: preserve-3d;
  class-name: "button-wrapper";
`;

const Button = styled.button`
  class-name: "button w-button";
  cursor: default;
  opacity: 0.8;
`;

const ReviewWrap = styled.div`
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  opacity: 1;
  transform-style: preserve-3d;
  class-name: "review-wrap";
`;

const ReviewLogo = styled.img`
  class-name: "review-logo";
`;

const ReviewText = styled.div`
  class-name: "review-text";
`;

const HeroImageWrap = styled.div`
  class-name: "hero-image-wrap";
`;

const HeroImage = styled.img`
  opacity: 1;
  transform: translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg);
  transform-style: preserve-3d;
  class-name: "hero-image";
`;

const Home = () => {
  useEffect(() => {
    document.title = "Delivery";
  }, []);

  return (
    <>
      <HeaderSection id="Header" className="header">
        <ContainerFlex className="container-flex">
          <HeroContent className="hero-content">
            <HeroH1 className="hero-h1">
              Beautiful food &amp; takeaway, <BrandSpan className="brand-span">delivered</BrandSpan> to your door.
            </HeroH1>
            <HeroParagraph className="hero-paragraph">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500.
            </HeroParagraph>
            <ButtonWrapper className="button-wrapper">
              <Button className="button w-button">Place an Order</Button>
            </ButtonWrapper>
            <ReviewWrap className="review-wrap">
              <ReviewLogo 
                src={trustpilotLogo}
                alt="Trustpilot" 
                className="review-logo" 
              />
              <ReviewText className="review-text">
                <BrandSpan className="brand-span">4.8 out of 5</BrandSpan> based on 2000+ reviews
              </ReviewText>
            </ReviewWrap>
          </HeroContent>
          <HeroImageWrap className="hero-image-wrap">
            <HeroImage 
              src={mainImage} 
              alt="Food Delivery" 
              className="hero-image"
            />
          </HeroImageWrap>
        </ContainerFlex>
      </HeaderSection>
    </>
  );
};

export default Home; 