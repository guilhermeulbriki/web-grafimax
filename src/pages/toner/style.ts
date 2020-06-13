import styled, { keyframes } from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  min-height: 90vh;

  display: flex;
  align-items: center;
  flex-direction: column;
`;

export const Content = styled.main`
  width: 100%;
  max-width: 1200px;
  margin-top: 30px;

  display: flex;
  justify-content: space-between;
`;

export const Left = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const HeaderLeft = styled.header`
  width: 100%;
  padding: 0 16px;
  margin-bottom: 24px;

  display: flex;
  align-items: center;
  justify-content: space-between;

  span {
    display: flex;
    align-items: center;

    svg {
      width: 24px;
      height: 24px;
      cursor: pointer;
      transition: transform 0.2s;
      border: 2px solid #2d2e2e;
      border-radius: 50%;

      &.select {
        border: 2px solid #7c7c7c;
        border-radius: 50%;
      }

      & + svg {
        margin-left: 8px;
      }

      &:hover {
        transform: scale(1.2);
      }
    }
  }

  section {
    display: flex;
    span {
      color: #bbb;
      margin-left: 16px;
      font-size: 18px;

      strong {
        color: #fff;
        margin-left: 4px;
      }
    }
  }
`;

export const Table = styled.table`
  background: #2d2d2a;
  border: 1px solid #585858;
  border-radius: 10px;
  flex: 1;

  thead {
    th {
      font-size: 17px;
      font-weight: 600;
      padding-top: 8px;
      padding-bottom: 16px;

      span {
        display: flex;
        align-items: center;
        justify-content: center;

        svg {
          margin-right: 8px;
          cursor: pointer;
        }

        svg.used {
          color: #08aeef;
        }

        svg.not-used {
          color: #585858;
        }
      }
    }
  }

  tbody {
    th {
      font-size: 15px;
      font-weight: 400;
      padding: 4px 8px;
    }

    th svg {
      width: 20px;
      height: 20px;
      border: 1px solid #585858;
      border-radius: 50%;
    }

    th.preto svg {
      color: #020202;
    }

    th.magenta svg {
      color: #ee588c;
    }

    th.amarelo svg {
      color: #fde73a;
    }

    th.azul svg {
      color: #08aeef;
    }
  }
`;

const showRegister = keyframes`
  from {
    opacity: 0;
    transform: translateX(+100px);
  } to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

export const Register = styled.form`
  width: 500px;
  margin-left: 30px;
  margin-top: 64px;

  display: flex;
  flex-direction: column;
  align-items: center;

  animation: ${showRegister} 0.8s;

  h2 {
    font-size: 24px;
    text-align: center;
    margin-bottom: 64px;
  }

  select {
    width: 250px;
    height: 50px;
    border-radius: 8px;
    font-size: 16px;
    padding: 4px;
    background: #e7e5df;
    color: #303030;
  }

  input {
    margin-top: 32px;
    width: 250px;
    height: 50px;
    border: 0px;
    border-radius: 8px;
    font-size: 16px;
    padding: 4px;
    background: #e7e5df;
    color: #303030;
  }

  button {
    margin-top: 64px;
    width: 250px;
    height: 50px;
    border: 0px;
    border-radius: 8px;
    font-size: 16px;
    padding: 4px;
    background: #005271;
    color: #e7e5df;
    transition: background-color 0.2s;

    &:hover {
      background: ${shade(0.2, '#005271')};
    }
  }
`;
