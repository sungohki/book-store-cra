import { Banner as IBanner } from '@/models/banner.model';
import styled from 'styled-components';
import BannerItem from './BannerItem';
import { useMemo, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

interface Props {
  banners: IBanner[];
}

function Banner({ banners }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    if (currentIndex === 0) {
      setCurrentIndex(banners.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };
  const handleNext = () => {
    if (currentIndex === banners.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const transformValue = useMemo(() => {
    return currentIndex * -100;
  }, [currentIndex]);

  return (
    <BannerStyle>
      {/* Banner Group */}
      <BannerContainerStyle $transformValue={transformValue}>
        {banners.map((banner) => (
          <BannerItem key={banner.id} banner={banner} />
        ))}
      </BannerContainerStyle>

      {/* Banner Button */}
      <BannerButtonStyle>
        <button onClick={handlePrev} className="prev">
          <FaAngleLeft />
        </button>
        <button onClick={handleNext} className="next">
          <FaAngleRight />
        </button>
      </BannerButtonStyle>

      {/* Banner Indicator */}
      <BannerIndicatorStyle>
        {banners.map((banner, index) => (
          <span
            onClick={() => {
              setCurrentIndex(index);
            }}
            className={currentIndex === index ? 'active' : ''}
          ></span>
        ))}
      </BannerIndicatorStyle>
    </BannerStyle>
  );
}

const BannerStyle = styled.div`
  overflow: hidden;
  position: relative;
`;

interface BannerContainerStyleProps {
  $transformValue: number;
}
const BannerContainerStyle = styled.div<BannerContainerStyleProps>`
  display: flex;
  transform: translate(${(prop) => prop.$transformValue}%);
  transition: transform 0.5s ease-in-out;
`;

const BannerButtonStyle = styled.div`
  button {
    border: 0;
    width: 40px;
    height: 40px;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 500px;
    font-size: 2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(50%);

    svg {
      fill: #fff;
    }

    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }
  }
`;

const BannerIndicatorStyle = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);

  span {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 100px;
    background: #fff;
    margin: 0 4px;
    cursor: pointer;

    &.active {
      background: ${({ theme }) => theme.color.primary};
    }
  }
`;

export default Banner;
