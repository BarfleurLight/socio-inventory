import { Container, Main, Model, Pagination } from '../../components'
import { useModels } from '../../utils/index.js'
import { useEffect } from 'react'
import api from '../../api'
import styles from './style.module.css'


const Models = () => {
  const {
    models,
    setModels,
    modelPage,
    setModelPage,
    modelCount,
    setModelCount 
  } = useModels()

  const getModels = ({ page = 1 , limit = 8}) => {
    api.getModels({ page, limit })
      .then(res => {
        const { results, count } = res
        setModels(results);
        setModelCount(count); 
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  }

useEffect(_ => {
  getModels({ page: modelPage})
  }, [modelPage])

  return <Main>
    <Container className={styles.models}>
    {models.map(model => 
      <Model 
        key={model.id}
        {...model}/>
    )}
    </Container>
    <Pagination
        count={modelCount}
        limit={8}
        page={modelPage}
        onPageChange={page => setModelPage(page)}
    />
  </Main>
}

export default Models