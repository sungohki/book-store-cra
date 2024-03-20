import styled from 'styled-components';
import Button from '../common/Button';
import { FaList, FaTh } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import { QUERYSTRING } from '@/constants/querystring';
import { useEffect } from 'react';

const viewOptions = [
  { value: 'list', icon: <FaList /> },
  { value: 'grid', icon: <FaTh /> },
];

export type ViewMode = 'list' | 'grid';

function BooksViewSwitcher() {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSwitch = (value: ViewMode) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(QUERYSTRING.VIEW, value);
    setSearchParams(newSearchParams);
  };

  useEffect(() => {
    if (!searchParams.get(QUERYSTRING.VIEW)) handleSwitch('grid');
  }, []);

  return (
    <>
      <BooksViewSwitcherStyle>
        {viewOptions.map((item) => (
          <Button
            key={item.value}
            size="medium"
            scheme={
              item.value === searchParams.get(QUERYSTRING.VIEW)
                ? 'primary'
                : 'normal'
            }
            onClick={() => handleSwitch(item.value as ViewMode)}
          >
            {item.icon}
          </Button>
        ))}
      </BooksViewSwitcherStyle>
    </>
  );
}
const BooksViewSwitcherStyle = styled.div`
  display: flex;
  gap: 8px;
  svg {
    fill: #fff;
  }
`;

export default BooksViewSwitcher;
