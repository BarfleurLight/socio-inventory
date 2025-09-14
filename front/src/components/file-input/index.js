import { useRef } from 'react'
import styles from './style.module.css'
import cn from 'classnames'

const FileInput = ({ onChange, currentFile }) => {
  const fileInput = useRef(null)

  return (
    <div className={cn(styles.container)}>
      <input
        type='file'
        ref={fileInput}
        accept='.xlsx,.xls,.csv'
        onChange={(e) => {
          const file = e.target.files[0]
          if (file && onChange) {
            onChange(file)
          }
        }}
        style={{ display: 'none' }}
      />
      
      <button
        onClick={() => fileInput.current.click()}
        className={styles.button}
        type='button'
      >
        {currentFile ? currentFile.name : 'Выберите Excel файл'}
      </button>
    </div>
  )
}

export default FileInput