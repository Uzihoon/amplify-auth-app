import { Button as AntdButton } from 'antd';
import React from 'react';

function Button({ onClick, title }) {
  return (
    <AntdButton onClick={onClick} type='primary'>
      {title}
    </AntdButton>
  );
}

export default Button;
