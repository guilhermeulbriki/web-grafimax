import React, {
  useEffect,
  useState,
  useCallback,
  ChangeEvent,
  FormEvent,
} from 'react';
import { FaCircle } from 'react-icons/fa';
import { FiArrowDown, FiArrowUp } from 'react-icons/fi';
import { trackPromise } from 'react-promise-tracker';
import { parseISO, format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import LoadingIndicator from '../../components/loadingIndicator';

import Header from '../../components/header';
import { Container, Content, Left, Table, Register, HeaderLeft } from './style';
import api from '../../services/api';

interface Toners {
  id: number;
  color: string;
  utilityCounter: number;
  copies: number;
  date: string;
  formattedDate: string;
}

interface filter {
  field: 'utilityCounter' | 'color' | 'date' | 'copies';
  order: 'asc' | 'desc';
}

const Toner: React.FC = () => {
  const [toners, setToners] = useState<Toners[]>([]);
  const [filteredToners, setFilteredToners] = useState<Toners[]>([]);
  const [average, setAverage] = useState(0);
  const [quantityToners, setQuantityToners] = useState(0);
  const [color, setColor] = useState('0');
  const [utilityCounter, setUtilityCounter] = useState('0');
  const [filter, setFilter] = useState<filter>({
    field: 'utilityCounter',
    order: 'desc',
  });
  const [filteredColors, setFilteredColors] = useState<string[]>([]);

  useEffect(() => {
    trackPromise(
      api
        .get<Toners[]>('toners/filter', {
          params: {
            field: filter.field,
            order: filter.order,
          },
        })
        .then(({ data }) => {
          const formattedData = data.map((toner) => {
            return {
              ...toner,
              formattedDate: format(parseISO(toner.date), 'dd-MMMM-y', {
                locale: ptBR,
              }),
            };
          });

          setToners(formattedData.reverse());
          setFilteredToners(formattedData.reverse());
        }),
    );
  }, [filter.field, filter.order, filteredColors]);

  useEffect(() => {
    const quantity = filteredToners.length;

    setQuantityToners(quantity);

    const averageCopies = filteredToners.reduce((acumulator, { copies }) => {
      // eslint-disable-next-line no-param-reassign
      acumulator += copies;

      return acumulator;
    }, 0);

    const averageResult = Math.round(averageCopies / quantity);

    setAverage(averageResult);
  }, [filteredToners]);

  useEffect(() => {
    if (filteredColors.length > 0) {
      const tonersByColors = [] as Toners[];

      filteredColors.forEach((cor) => {
        toners.map((toner) => {
          if (toner.color === cor) {
            tonersByColors.push(toner);
          }
        });
      });

      setFilteredToners(tonersByColors);
    } else {
      setFilteredToners(toners);
    }
  }, [filteredColors, toners]);

  const handleSelectColor = useCallback(
    (event: ChangeEvent<HTMLSelectElement>) => {
      setColor(event.target.value);
    },
    [],
  );

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      const changeToner = {
        color,
        utilityCounter: Number(utilityCounter),
      };

      const response = await api.post('toners', changeToner);

      const newToners = [response.data, ...toners];

      setToners(newToners);
      setUtilityCounter('');
    },
    [color, toners, utilityCounter],
  );

  const handleFilter = useCallback(
    (field) => {
      if (field === filter.field) {
        if (field === filter.field && filter.order === 'desc') {
          setFilter({ field, order: 'asc' });
        } else {
          setFilter({ field, order: 'desc' });
        }
      } else {
        setFilter({ field, order: 'asc' });
      }
    },
    [filter],
  );

  const handleFilterByColor = useCallback(
    (filterColor: string) => {
      const alreadySelected = filteredColors.findIndex(
        (cor) => cor === filterColor,
      );

      if (alreadySelected >= 0) {
        const filteredItems = filteredColors.filter(
          (cor) => cor !== filterColor,
        );

        setFilteredColors(filteredItems);
      } else {
        setFilteredColors([...filteredColors, filterColor]);
      }
    },
    [filteredColors],
  );

  return (
    <>
      <Header />
      <Container>
        <Content>
          <Left>
            <HeaderLeft>
              <span className="filterColors">
                <FaCircle
                  className={filteredColors.includes('preto') ? 'select' : ''}
                  color="#020202"
                  onClick={() => handleFilterByColor('preto')}
                />
                <FaCircle
                  className={filteredColors.includes('magenta') ? 'select' : ''}
                  color="#ee588c"
                  onClick={() => handleFilterByColor('magenta')}
                />
                <FaCircle
                  className={filteredColors.includes('amarelo') ? 'select' : ''}
                  color="#fde73a"
                  onClick={() => handleFilterByColor('amarelo')}
                />
                <FaCircle
                  className={filteredColors.includes('azul') ? 'select' : ''}
                  color="#08aeef"
                  onClick={() => handleFilterByColor('azul')}
                />
              </span>

              <section className="averages">
                <span className="total">
                  Total de trocas:
                  <strong>{quantityToners}</strong>
                </span>
                <span className="average">
                  Média de cópias:
                  <strong>{average}</strong>
                </span>
              </section>
            </HeaderLeft>

            <Table>
              <thead>
                <tr className="header">
                  <th>
                    <span>
                      <strong>Cor</strong>
                    </span>
                  </th>
                  <th>
                    <span>
                      {filter.field === 'utilityCounter' &&
                      filter.order === 'asc' ? (
                        <FiArrowDown
                          onClick={() => handleFilter('utilityCounter')}
                          className={
                            filter.field === 'utilityCounter'
                              ? 'used'
                              : 'not-used'
                          }
                        />
                      ) : (
                        <FiArrowUp
                          onClick={() => handleFilter('utilityCounter')}
                          className={
                            filter.field === 'utilityCounter'
                              ? 'used'
                              : 'not-used'
                          }
                        />
                      )}
                      <strong>Utility Counter</strong>
                    </span>
                  </th>
                  <th>
                    <span>
                      {filter.field === 'copies' && filter.order === 'asc' ? (
                        <FiArrowDown
                          onClick={() => handleFilter('copies')}
                          className={
                            filter.field === 'copies' ? 'used' : 'not-used'
                          }
                        />
                      ) : (
                        <FiArrowUp
                          onClick={() => handleFilter('copies')}
                          className={
                            filter.field === 'copies' ? 'used' : 'not-used'
                          }
                        />
                      )}
                      <strong>Cópias</strong>
                    </span>
                  </th>
                  <th>
                    <span>
                      {filter.field === 'date' && filter.order === 'asc' ? (
                        <FiArrowDown
                          onClick={() => handleFilter('date')}
                          className={
                            filter.field === 'date' ? 'used' : 'not-used'
                          }
                        />
                      ) : (
                        <FiArrowUp
                          onClick={() => handleFilter('date')}
                          className={
                            filter.field === 'date' ? 'used' : 'not-used'
                          }
                        />
                      )}
                      <strong>Data</strong>
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredToners.map((toner) => (
                  <tr key={toner.id}>
                    <th className={toner.color}>
                      <FaCircle />
                    </th>
                    <th>{toner.utilityCounter}</th>
                    <th>{toner.copies}</th>
                    <th>{toner.formattedDate}</th>
                  </tr>
                ))}
                <LoadingIndicator />
              </tbody>
            </Table>
          </Left>

          <Register onSubmit={handleSubmit}>
            <h2>Registrar troca de troner</h2>

            <select
              name="color"
              id="color"
              value={color}
              onChange={handleSelectColor}
            >
              <option value="0">Selecione a cor do toner</option>
              <option value="preto">Preto</option>
              <option value="magenta">Magenta</option>
              <option value="azul">Azul</option>
              <option value="amarelo">Amarelo</option>
            </select>

            <input
              type="number"
              name="utilityCounter"
              placeholder="0"
              value={utilityCounter}
              onChange={(e) => setUtilityCounter(e.target.value)}
            />

            <button type="submit">Registrar</button>
          </Register>
        </Content>
      </Container>
    </>
  );
};

export default Toner;
