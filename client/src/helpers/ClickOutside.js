import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

const useOnClickOutside = (ref, onClick) => {
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClick();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, onClick]);
};

const ClickOutside = ({ children, onClick }) => {
  const wrapperRef = useRef(null);
  useOnClickOutside(wrapperRef, onClick);
  return <div ref={wrapperRef}>{children}</div>;
};

ClickOutside.propTypes = {
  children: PropTypes.element.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default ClickOutside;
