import styled from 'styled-components';
import { shade } from 'polished';

export const Container = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  flex-direction: column;
  align-items: center;

  .content {
    height: 100%;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    img {
      height: 140px;
      margin-bottom: 10vh;
    }

    form {
      padding: 20px;

      display: flex;
      flex-direction: column;
      align-items: center;

      h1 {
        margin-bottom: 32px;
        font-size: 30px;
      }

      input {
        width: 300px;
        height: 45px;
        padding: 5px 10px;
        border-radius: 5px;
        background: #e7e5df;
        border: 2px solid #e7e5df;

        & + input {
          margin-top: 8px;
        }
      }

      button {
        width: 300px;
        height: 45px;
        padding: 5px 10px;
        margin-top: 24px;
        border-radius: 5px;
        background: #005271;
        border: 0px;
        color: #f5f5f5;
        font-size: 20px;

        &:hover {
          background: ${shade(0.2, '#005271')};
        }
      }
    }
  }
`;
