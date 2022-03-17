import React from 'react';
import { Avatar, makeStyles } from '@material-ui/core';
import { useResource } from '../../../1_hooks';
import { Client } from '../../../common/league';

const useStyles = makeStyles(theme => ({
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight: theme.spacing(1),
    background:
      'linear-gradient(0deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09)), #0A0F19;', // I am not sure if this value is defined in the theme
  },
}));

interface AvatarPictureProps {
  hasChampion: boolean;
  championId: Client.ChampionId;
}

export const AvatarPicture: React.FC<AvatarPictureProps> = ({ hasChampion, championId }) => {
  const { getChampionName, getChampionImage } = useResource();

  const classes = useStyles();

  if (!hasChampion) {
    return (
      <Avatar variant='square' className={classes.avatar} alt='No champion'>
        <svg
          width='37'
          height='40'
          viewBox='0 0 37 40'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            d='M0.666656 30.6819C3.90191 36.3541 6.34748 38.3515 11.7318 40C10.2207 34.5415 9.54094 30.3167 11.7318 24.8582L8.23757 22.5287V16.1225C11.8569 15.2403 13.6094 15.8848 16.3909 18.452V33.0115H21.0499V18.452C23.6907 15.5224 25.7439 15.3802 29.7856 16.1225V22.5287L26.2913 24.8582C28.1802 30.5285 27.7145 34.7009 26.2913 40C31.5233 38.5128 33.912 36.649 36.7741 30.6819C35.292 29.8854 34.6761 29.0821 33.8622 26.0229V10.2987C29.5053 3.99436 25.9989 1.2976 21.6323 0.398296C19.1635 -0.13017 17.6204 -0.135465 14.6437 0.398296C8.82606 2.67191 6.44092 4.69187 3.57855 10.2987C3.79228 16.5415 3.78841 19.9881 3.57855 26.0229C3.00708 28.2275 2.21205 29.1405 0.666656 30.6819Z'
            fill='#9EA5C7'
            fillOpacity='0.48'
          />
        </svg>
      </Avatar>
    );
  }

  return (
    <Avatar
      variant='square'
      className={classes.avatar}
      src={getChampionImage(championId)}
      alt={getChampionName(championId)}
    />
  );
};
