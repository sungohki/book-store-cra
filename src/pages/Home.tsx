import MainReview from '@/components/main/MainReview';
import { useMain } from '@/hooks/useMain';
import styled from 'styled-components';

function Home() {
  const { reviews } = useMain();

  return (
    <HomeStyle>
      {/* Banner */}

      {/* BestSeller */}
      {/* New */}
      {/* Reviews */}
      <MainReview reviews={reviews} />
    </HomeStyle>
  );
}

const HomeStyle = styled.div``;

export default Home;
