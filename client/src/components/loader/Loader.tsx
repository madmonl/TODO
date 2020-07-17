import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import './Loader.css';

export default function Loading() {
  return (
    <div className="loader">
      <CircularProgress />
    </div>
  );
}
