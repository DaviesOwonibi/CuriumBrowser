
import React from 'react';

interface Props {
  name: string;
  active: boolean;
  place: number;
  onClick?: () => void; // onClick prop is optional and is a function with no parameters
}

const Tab = (props: Props) => {
  const handleTabClick = () => {
    if (props.onClick) {
      props.onClick()
    }
  };

  return (
    <div className={props.active === true ? 'activeTab' : 'tab'} onClick={handleTabClick}>
      {props.name}
    </div>
  );
};

export default Tab;
