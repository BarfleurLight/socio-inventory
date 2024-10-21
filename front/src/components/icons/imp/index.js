import styles from './style.module.css'
import cn from 'classnames'


const ImportDetailsButtonIcon = ({ open = false, size = 16 }) => {
    return <svg className={cn(styles.icon, {[styles.select]: open})} 
                // viewBox="0 0 16 16"
                viewBox={`0 0 ${size} ${size}`}
                width={size} 
                height={size}
                fill="none" 
            >
        <path d="M2.29289 4.79289C2.68342 4.40237 3.31658 4.40237 3.70711 4.79289L8 9.08579L12.2929 4.79289C12.6834 4.40237 13.3166 4.40237 13.7071 4.79289C14.0976 5.18342 14.0976 5.81658 13.7071 6.20711L8 11.9142L2.29289 6.20711C1.90237 5.81658 1.90237 5.18342 2.29289 4.79289Z" fill="currentColor" ></path>
    </svg>
    };

export default ImportDetailsButtonIcon