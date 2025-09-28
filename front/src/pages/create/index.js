import styles from './style.module.css'
// import api from '../../api'
import { Container, Main } from '../../components'
import React, { useState } from 'react';


const Create = () => {

  const [selectedOption, setSelectedOption] = useState(null);

  const handleCheckboxChange = (option) => {
    setSelectedOption(selectedOption === option ? null : option);
  };


  return <Main>
    <Container className={styles.main_form}>
       <div className={styles.body_form}>
        <label> 
          <input
            type='checkbox' 
            checked={selectedOption === 'inv'}
            onChange={() => handleCheckboxChange('inv')}
          />
          Оборудование
        </label> 
        <label> 
          <input
            type='checkbox' 
            checked={selectedOption === 'model'}
            onChange={() => handleCheckboxChange('model')}
          />
          Модель
        </label>
        <label> 
          <input
            type='checkbox' 
            checked={selectedOption === 'cons'}
            onChange={() => handleCheckboxChange('cons')}
          />
          Расходник
        </label>
        {selectedOption === 'inv' && <p>In development(Inventory Form)</p>}
        {selectedOption === 'model' && <p>In development(Modesl Form)</p>}
        {selectedOption === 'cons' && <p>In development(Consumable Form)</p>}
       </div>
    </Container>
  </Main>
}

export default Create