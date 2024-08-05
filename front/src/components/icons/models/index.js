const ModelsIcon = ({ type = 'default', size = 35 }) => {
    const icons = {
        computer: (
            <svg width={size} height={size} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">

            <rect x="5" y="10" width="40" height="25" rx="3" ry="3" fill="none" stroke="black" strokeWidth="2"/>

            <rect x="20" y="35" width="10" height="5" fill="none" stroke="black" strokeWidth="2"/>

            <rect x="15" y="40" width="20" height="3" fill="none" stroke="black" strokeWidth="2"/>
            <line x1="10" y1="15" x2="40" y2="15" stroke="black" strokeWidth="1"/>
            <line x1="10" y1="20" x2="40" y2="20" stroke="black" strokeWidth="1"/>
          </svg>
        ),
        printer: (
          <svg width={size} height={size} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">
            <rect x="12" y="20" width="26" height="15" rx="3" ry="3" fill="none" stroke="black" strokeWidth="2"/>
            <rect x="16" y="10" width="18" height="10" rx="2" ry="2" fill="none" stroke="black" strokeWidth="2"/>
            <rect x="14" y="35" width="22" height="3" rx="1.5" ry="1.5" fill="none" stroke="black" strokeWidth="2"/>
          </svg>
        ),
        default: (
            <svg width={size} height={size} viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg">

              <rect x="5" y="5" width="18" height="12" rx="2" ry="2" fill="none" stroke="black" strokeWidth="2"/>
              <rect x="9" y="17" width="10" height="2" fill="none" stroke="black" strokeWidth="2"/>


              <rect x="28" y="5" width="8" height="15" rx="2" ry="2" fill="none" stroke="black" strokeWidth="2"/>

              <rect x="5" y="25" width="18" height="10" rx="2" ry="2" fill="none" stroke="black" strokeWidth="2"/>
              <rect x="8" y="35" width="12" height="3" rx="1.5" ry="1.5" fill="none" stroke="black" strokeWidth="2"/>


              <path d="M28 35 Q34 29 40 35" fill="none" stroke="black" strokeWidth="2"/>
              <path d="M31 38 Q34 35 37 38" fill="none" stroke="black" strokeWidth="2"/>
            </svg>
        )
      };
    
      return icons[type] || icons['default'];
    };
  
  export default ModelsIcon