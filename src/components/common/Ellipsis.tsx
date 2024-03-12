import React, { useState } from 'react';
import styled from 'styled-components';
import Button from './Button';
import { FaAngleDown } from 'react-icons/fa';

interface Props {
  children: React.ReactNode;
  linelimit?: number;
}

function Ellipsis({ children, linelimit }: Props) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <EllipsisStyle linelimit={linelimit} $expanded={expanded}>
        <p>{children}</p>
        <div className="toggle">
          <Button
            size="small"
            scheme="normal"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? '접기' : '펼치기'} <FaAngleDown />
          </Button>
        </div>
      </EllipsisStyle>
    </>
  );
}

interface StyleProps {
  linelimit?: number;
  $expanded: boolean;
}

const EllipsisStyle = styled.div<StyleProps>`
  p {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${({ linelimit, $expanded }) =>
      $expanded ? 'none' : linelimit ? linelimit : 4};
    -webkit-box-orient: vertical;
    padding: 20px 0 0 0;
    margin: 0;
  }

  .toggle {
    display: flex;
    justify-content: end;
    svg {
      transform: ${({ $expanded }) =>
        $expanded ? 'rotate(180deg);' : 'rotate(0);'};
    }
  }
`;

export default Ellipsis;
