import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import './directory.styles.scss';
import MenuItem from '../menu-item/MenuItem';
import { selectDirectorySestions } from '../../redux/directory/directory.selectors';

const Directory = ({ sections }) => {
  return (
    <div className='directory-menu'>
      {sections.map(({ id, ...otherSectionProps }) => (
        <MenuItem key={id} {...otherSectionProps} />
      ))}
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySestions
});

export default connect(mapStateToProps)(Directory);
