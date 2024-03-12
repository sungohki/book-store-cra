import styled from 'styled-components';
import { Pagination as IPagination } from '../../models/pagiantion.model';
import Button from '../common/Button';
import { LIMIT } from '../../constants/pagination';
import { useSearchParams } from 'react-router-dom';
import { QUERYSTRING } from '../../constants/querystring';

interface Props {
  pagination: IPagination;
}

function Pagination({ pagination }: Props) {
  const [searchParams, setSearchParams] = useSearchParams();
  const { total_count, current_page } = pagination;
  const pages: number = Math.ceil(total_count / LIMIT);

  const handleClickPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set(QUERYSTRING.PAGE, page.toString());
    setSearchParams(newSearchParams);
  };

  return (
    <>
      <PaginationStyle>
        {pages > 0 && (
          <ol>
            {Array(pages)
              .fill(0)
              .map((item, index) => (
                <li>
                  <Button
                    key={index}
                    size="small"
                    scheme={index + 1 === current_page ? 'primary' : 'normal'}
                    onClick={() => handleClickPage(index + 1)}
                  >
                    {index + 1}
                  </Button>
                </li>
              ))}
          </ol>
        )}
      </PaginationStyle>
    </>
  );
}
const PaginationStyle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 24px 0;

  ol {
    padding: 0;
    margin: 0;
    list-style: none;
    display: flex;
    gap: 8px;
  }
`;

export default Pagination;
