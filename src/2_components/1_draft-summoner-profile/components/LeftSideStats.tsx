import React from 'react';
import { makeStyles } from '@material-ui/core';
import { useResource } from '../../../1_hooks';
import { Typography } from '../../../common/core/components';
import { Division, Tier } from '../../../common/league/client';

const useStyles = makeStyles(theme => ({
  positiveWinrate: {
    color: theme.palette.primary.main,
  },
}));

interface LeftSideStatsProps {
  gamesPlayed: number;
  summonerName: string;
  hasData: boolean;
  winrate: number;
  tier: Tier;
  division: Division;
}

export const LeftSideStats: React.FC<LeftSideStatsProps> = ({
  gamesPlayed,
  summonerName,
  hasData,
  winrate,
  tier,
  division,
}) => {
  const { getTierDivisionName } = useResource();

  const classes = useStyles();

  return (
    <>
      <Typography
        variant='textSmall'
        color='textSecondary'
        mb={1}
        style={{
          fontWeight: 500,
        }}
      >
        {summonerName}
      </Typography>
      {hasData ? (
        <>
          <Typography
            variant='textSmall'
            className={winrate > 50 && classes.positiveWinrate}
            mb={1}
            style={{
              fontWeight: 500,
            }}
          >
            {winrate.toFixed(1)}%
          </Typography>
          <Typography variant='textExtraSmall' color='textPrimary' mb={1}>
            {getTierDivisionName(tier, division)}
          </Typography>
          <Typography variant='textExtraSmall' color='textTertiary'>
            {gamesPlayed} games
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
