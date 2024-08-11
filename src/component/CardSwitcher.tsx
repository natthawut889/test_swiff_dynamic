import React, { useState } from 'react';
import { Card, Typography } from 'antd';

export interface CardSwitcherProps
{
    children?: React.ReactNode;
}

const CardSwitcher = (props: CardSwitcherProps) => {
    const { children } = props;
    
  const [isCardVisible, setIsCardVisible] = useState(true);

  const handleCardClick = () => {
    setIsCardVisible(false);
  };

  return (
    <div>
      {isCardVisible ? (
        <Card
          className="box"
          style={{ marginRight: '10px' }}
          hoverable
          onClick={handleCardClick}
        >
            {children}
        </Card>
      ) : (
        <Card
          className="box"
          style={{ marginRight: '10px' }}
          hoverable
        >
          <Typography style={{ marginBottom: '40px', fontSize: '18px' }}>
            คอมโพเนนต์ใหม่
          </Typography>
          <Typography>ข้อความใหม่</Typography>
        </Card>
      )}
    </div>
  );
};

export default CardSwitcher;
