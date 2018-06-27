import React from 'react';
import { Link } from 'react-router-dom';

import { PHOTOGRAPH_VIEW, PHOTOGRAPH_EDIT } from '@app-constants/routes';

const PhotographCard = (props) => {
  const { thumb, name, desc, createdAt, profileId, userId, id } = props;

  const renderEditIcon = () => {
    if (!profileId) {
      return null;
    }

    if (userId !== profileId) {
      return null;
    }

    return <Link className="photograph-card__edit c-flex c-flex--ai_center c-flex--jc_center" to={`${PHOTOGRAPH_EDIT}/${id}`}>
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
          <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
          <path d="M0 0h24v24H0z" fill="none"/>
        </svg>
      </Link>;
  }

  return (
    <div className="photograph-card column col-mb-6 col-sm-4 col-lg-3">
      <div className="photograph-card__inner">
        <div className="photograph-card__image bg-image" style={{ backgroundImage: `url("${thumb}")` }}>
          <h3 className="photograph-card__title">{name}</h3>
          {renderEditIcon()}
        </div>
        <div className="photograph-card__content">
          <time className="photograph-card__date">{(new Date(createdAt)).toLocaleString('en')}</time>
          <div className="photograph-card__desc default-text">
            <p>{desc}</p>
          </div>
          <div className="photograph-card__explore">
            <Link className="button button--default button--full-width button--raised button--raised_indigo" to={`${PHOTOGRAPH_VIEW}/${id}`}>Explore</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotographCard;
