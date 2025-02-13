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
          <lable className={styles.ch_lb}
                onClick={(e) => {
                  handleCheckboxChange('inv');
                  }}> 
            <input
              type='checkbox' 
              className={styles.ch_in}
              checked={selectedOption === 'inv'}
              onChange={() => handleCheckboxChange('inv')}
            />
            <span className={styles.ch_sp}></span>
            Оборудование
          </lable>
          <lable> 
            <input
              type='checkbox' 
              checked={selectedOption === 'model'}
              onChange={() => handleCheckboxChange('model')}
            />
            Модель
          </lable>
          <lable> 
            <input
              type='checkbox' 
              checked={selectedOption === 'cons'}
              onChange={() => handleCheckboxChange('cons')}
            />
            Расходник
          </lable>
        {selectedOption === 'inv' && <p>test1</p>}
        {selectedOption === 'model' && <p>test2</p>}
        {selectedOption === 'cons' && <p>tes31</p>}
       </div>
       <table className={styles.test}>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
        </tr>
       </table>
    </Container>
  </Main>
}

export default Create