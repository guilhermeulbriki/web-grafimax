import React, { useState, useEffect, useCallback, FormEvent } from 'react';
import { trackPromise } from 'react-promise-tracker';
import { parseISO, format } from 'date-fns';
import LoadingIndicator from '../../components/loadingIndicator';

import { Container, Content, Table, Register } from './style';
import Header from '../../components/header';
import api from '../../services/api';

interface Maintenance {
  id: number;
  description: string;
  date: string;
  formattedDate: string;
  utilityCounter: number;
}

const Maintenance: React.FC = () => {
  const [maintenances, setMaintenances] = useState<Maintenance[]>([]);
  const [utilityCounter, setUtilityCounter] = useState('0');
  const [description, setDescription] = useState('');

  useEffect(() => {
    trackPromise(
      api.get<Maintenance[]>('maintenances').then((response) => {
        const formattedData = response.data.map((maintenance) => {
          return {
            ...maintenance,
            formattedDate: format(parseISO(maintenance.date), 'd/MMM/y'),
          };
        });

        setMaintenances(formattedData.reverse());
      }),
    );
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const maintenance = {
        description,
        utilityCounter: Number(utilityCounter),
      };

      const response = await api.post('maintenances', maintenance);

      const newMaintenances = [response.data, ...maintenances];

      setMaintenances(newMaintenances);
      setUtilityCounter('');
    },
    [description, maintenances, utilityCounter],
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
                    <strong>Utility Counter</strong>
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
              {maintenances.map((maintenance) => (
                <tr key={maintenance.id}>
                  <th>{maintenance.utilityCounter}</th>
                  <th>{maintenance.description}</th>
                  <th>{maintenance.formattedDate}</th>
                </tr>
              ))}
              <LoadingIndicator />
            </tbody>
          </Table>

          <Register onSubmit={handleSubmit}>
            <h2>Registrar manutenção</h2>

            <input
              type="number"
              name="utilityCounter"
              placeholder="0"
              value={utilityCounter}
              onChange={(e) => setUtilityCounter(e.target.value)}
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

export default Maintenance;
