import { Dropdown } from 'antd';
import { createStyles } from 'antd-style';
import type { DropDownProps } from 'antd/es/dropdown';
import classNames from 'classnames';
import React from 'react'; 

// Define styles using createStyles utility
const useStyles = createStyles(({ token }) => {
  return {
    dropdown: {
      [`@media screen and (max-width: ${token.screenXS}px)`]: {  // Media query for responsive design
        width: '100%',
      },
    },
  };
});

// Define props for HeaderDropdown component
export type HeaderDropdownProps = {
  overlayClassName?: string;  
  placement?: 'bottomLeft' | 'bottomRight' | 'topLeft' | 'topCenter' | 'topRight' | 'bottomCenter';  
} & Omit<DropDownProps, 'overlay'>;

// Functional component for HeaderDropdown
const HeaderDropdown: React.FC<HeaderDropdownProps> = ({ overlayClassName: cls, ...restProps }) => {
  const { styles } = useStyles(); 

  // Prepare data for Dropdown component
  const data = {
    ...restProps,  
    name: restProps?.username  
  };

  // Log data for debugging
  console.log(data, "header---");

  // Render Dropdown component with classNames and data props
  return <Dropdown overlayClassName={classNames(styles.dropdown, cls)} {...data} />;
};

export default HeaderDropdown;  
