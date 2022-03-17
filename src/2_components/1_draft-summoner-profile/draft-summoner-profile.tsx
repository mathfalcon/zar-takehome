import { Fade } from '@material-ui/core';
import makeStyles from '@material-ui/core/styles/makeStyles';
import React from 'react';
import { Card, Typography } from '../../common/core/components';
import { Client, isChampionIdValid, isRoleValid } from '../../common/league';
import { AvatarPicture, LeftSideStats, RightSideStats } from './components';

// https://v4.mui.com/styles/api/#examples-2
const useStyles = makeStyles(theme => ({
  root: {},
  typographyContainer: {
    height: '100%',
    flex: '1',
    marginTop: theme.spacing(0.25),
  },
}));

export interface Profile {
  gamesPlayed: number;
  winrate: number;
  kda?: number;
}

export interface DraftSummonerProfileInterface {
  summonerName: string;
  gamesPlayed?: number;
  winrate?: number;

  tier?: Client.Tier;
  division?: Client.Division;

  role?: Client.Role;
  roleProfile?: Profile;

  championId?: Client.ChampionId;
  championProfile?: Profile;
}

export interface DraftSummonerProfileProps {
  profile: DraftSummonerProfileInterface;
  isLoading?: boolean;
}

// TODO: Implement this component based on the Figma design.
// You should use the provided components: Card and Typography.
// https://www.figma.com/file/0OzXZgcefj9s8aTHnACJld/Junior-React-Takehome?node-id=42%3A43
// Notes:
// - It has multiple states, each are represented as separate story in storybook
// - If winrate is >= 50, it's positive and displayed in our primary color
// - If gamesPlayed is > 0, the profile contains data

export const DraftSummonerProfile: React.FC<DraftSummonerProfileProps> = ({
  profile: {
    summonerName,
    winrate,
    gamesPlayed,

    tier,
    division,

    role,
    roleProfile,

    championId,
    championProfile,
  },
  isLoading,
}) => {
  const classes = useStyles();

  const hasRole = isRoleValid(role);
  const hasChampion = isChampionIdValid(championId);

  const hasData = gamesPlayed > 0;

  if (isLoading) {
    return (
      <Fade in>
        <Card elevation='1' p={1} style={{ display: 'flex', height: '80px' }}>
          Loading...
        </Card>
      </Fade>
    );
  }

  const leftSideProps = {
    gamesPlayed,
    summonerName,
    hasData,
    winrate,
    tier,
    division,
  };

  const rightSideProps = {
    hasData,
    hasRole,
    hasChampion,
    championId,
    championProfile,
    roleProfile,
    role,
  };

  return (
    // I tried to use className={styles.root} here but it seems that the custom Card
    // component does not accept className as a prop thats why I am using inline styling
    <Card elevation='1' p={1} style={{ display: 'flex' }}>
      <AvatarPicture championId={championId} hasChampion={hasChampion} />
      <Typography className={classes.typographyContainer}>
        <LeftSideStats {...leftSideProps} />
      </Typography>
      <Typography className={classes.typographyContainer}>
        <RightSideStats {...rightSideProps} />
      </Typography>
    </Card>
  );
};
