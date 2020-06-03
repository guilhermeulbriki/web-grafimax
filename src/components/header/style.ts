import styled, { keyframes } from 'styled-components';

const downAfter = keyframes`
  from {
    opacity: 0;
    transform: translateY(-25px);
  } to {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const Container = styled.header`
  background: #dfdfdf;
  display: flex;
  align-items: center;
  justify-content: center;

  div {
    width: 100%;
    max-width: 1000px;
    height: 70px;
    padding: 0 10px;

    display: flex;
    align-items: center;
    justify-content: space-between;

    img {
      height: 55px;
    }

    nav {
      height: 70px;
      display: flex;
      align-items: center;

      a {
        color: #707070;
        text-decoration: none;
        position: relative;
        transition: color 0.2s;
        font-size: 18px;

        & + a {
          margin-left: 24px;
        }

        &:hover {
          color: #909090;
        }
      }

      a.here {
        color: #2d2e2e;
        font-weight: 500;

        &::after {
          content: '';
          position: absolute;
          width: 100%;
          height: 3px;
          bottom: -25px;
          left: 0px;
          background: #0081b2;
          animation: ${downAfter} 0.4s;
        }
      }
    }
  }
`;
