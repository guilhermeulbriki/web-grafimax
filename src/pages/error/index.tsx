import React, { useState, useEffect, useCallback, FormEvent } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { parseISO, format } from 'date-fns';
import LoadingIndicator from '../../components/loadingIndicator';

import { Container, Content, Table, Register } from './style';
import Header from '../../components/header';
import api from '../../services/api';

interface Error {
  id: number;
  description: string;
  date: string;
  formattedDate: string;
  code: string;
}

const Erro: React.FC = () => {
  const [errors, setErrors] = useState<Error[]>([]);
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    trackPromise(
      api.get<Error[]>('errors').then((response) => {
        const formattedData = response.data.map((error) => {
          return {
            ...error,
            formattedDate: format(parseISO(error.date), 'd/MMM/y'),
          };
        });

        setErrors(formattedData.reverse());
      }),
    );
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const maintenance = {
        description,
        code,
      };

      const response = await api.post('errors', maintenance);

      const newErrors = [response.data, ...errors];

      setErrors(newErrors);
      setCode('');
      setDescription('');
    },
    [code, description, errors],
  );

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Table>
            <thead>
              <tr className="header">
                <th>
                  <span>
                    <strong>Code</strong>
                  </span>
                </th>
                <th>
                  <span>
                    <strong>Descrição</strong>
                  </span>
                </th>
                <th>
                  <span>
                    <strong>Data</strong>
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {errors.map((error) => (
                <tr key={error.id}>
                  <th>{error.code}</th>
                  <th>{error.description}</th>
                  <th>{error.formattedDate}</th>
                </tr>
              ))}
              <LoadingIndicator />
            </tbody>
          </Table>

          <Register onSubmit={handleSubmit}>
            <h2>Registrar erro</h2>

            <input
              type="string"
              name="code"
              placeholder="Código"
              value={code}
              onChange={(e) => setCode(e.target.value)}
            />

            <input
              type="text"
              name="description"
              placeholder="Descrição"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <button type="submit">Registrar</button>
          </Register>
        </Content>
      </Container>
    </>
  );
};

export default Erro;
