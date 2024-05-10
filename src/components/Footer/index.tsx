/**
 * @name Footer
 * @description The links and copyright at the bottom of every page
 */

import { GithubOutlined } from '@ant-design/icons';
import { DefaultFooter } from '@ant-design/pro-components';
import React from 'react';

const Footer: React.FC = () => {
  return (
    <DefaultFooter
      style={{
        background: 'none',
      }}
      copyright="Powered by Dyson"
      links={[
        {
          key: 'Warehouse X',
          title: 'Warehouse X',
          href: 'https://github.com/gcaselton/WarehouseX-web',
          blankTarget: true,
        },
        {
          key: 'github',
          title: <GithubOutlined />,
          href: 'https://github.com/gcaselton/WarehouseX-web',
          blankTarget: true,
        },
        {
          key: 'Warehouse X',
          title: 'Warehouse X',
          href: 'https://github.com/gcaselton/WarehouseX-web',
          blankTarget: true,
        },
      ]}
    />
  );
};

export default Footer;
