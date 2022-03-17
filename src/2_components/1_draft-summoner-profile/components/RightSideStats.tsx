import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useResource } from '../../../1_hooks';
import { Typography } from '../../../common/core/components';
import { Profile } from '../draft-summoner-profile';
import { Client } from '../../../common/league';

const useStyles = makeStyles(theme => ({
  positiveWinrate: {
    color: theme.palette.primary.main,
  },
}));

interface RightSideStatsProps {
  hasData: boolean;
  hasRole: boolean;
  hasChampion: boolean;
  championId: number;
  roleProfile: Profile;
  championProfile: Profile;
  role: Client.Role;
}

export const RightSideStats: React.FC<RightSideStatsProps> = ({
  hasData,
  hasRole,
  hasChampion,
  championId,
  championProfile,
  roleProfile,
  role,
}) => {
  const { getChampionName, getRoleName } = useResource();

  const classes = useStyles();

  if ((!hasData && !hasRole) || !(hasChampion || hasRole)) {
    return null;
  }

  const isPositiveWinreate = (): boolean => {
    if (championProfile) {
      return championProfile.winrate > 50;
    }

    return roleProfile.winrate > 50;
  };

  return (
    <>
      <Typography variant='textSmall' color='textSecondary' mb={1}>
        {hasChampion ? `on ${getChampionName(championId)}` : `as ${getRoleName(role)}`}
      </Typography>
      {hasData ? (
        <>
          <Typography
            variant='textSmall'
            className={isPositiveWinreate() && classes.positiveWinrate}
            mb={1}
            style={{ fontWeight: 500 }} // I could not find a variant that has the properties of textSmall and a fontweight of 500
          >
            {championProfile?.winrate.toFixed(1) || roleProfile?.winrate.toFixed(1)}%
          </Typography>
          <Typography variant='textExtraSmall' color='textPrimary' mb={1}>
            {championProfile?.kda.toFixed(1) || roleProfile?.kda.toFixed(1)} kda
          </Typography>
          <Typography variant='textExtraSmall' color='textTertiary'>
            {championProfile?.gamesPlayed || roleProfile?.gamesPlayed} games
          </Typography>
        </>
      ) : (
        <Typography variant='textSmall' color='textSecondary'>
          no data
        </Typography>
      )}
    </>
  );
};
