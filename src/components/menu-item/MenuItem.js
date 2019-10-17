import React from 'react';
import { withRouter } from 'react-router-dom';

import './menuitem.styles.scss';

const MenuItem = ({ title, imageUrl, size, linkUrl, history, match }) => {
  // console.log('match.url', match.url);
  // console.log('linkUrl: ', linkUrl);
  return (
    <div
      className={`${size} menu-item`}
      onClick={() => history.push(`${match.url}${linkUrl}`)}
      // match.url = url from parent
    >
      <div
        className='background-image'
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className='content'>
        <h1 className='title'>{title.toUpperCase()}</h1>
        <span className='subtitle'>SHOP NOW</span>
      </div>
    </div>
  );
};

// withRouter, can use history in this component
export default withRouter(MenuItem);
