import { Avatar, Fade } from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import React, { useMemo } from "react";
import { useResource } from "../../1_hooks/resource.provider";
import { Card, Typography } from "../../common/core/components";
import { Client, isChampionIdValid, isRoleValid } from "../../common/league";

// https://v4.mui.com/styles/api/#examples-2
const useStyles = makeStyles((theme) => ({
  root: {},
  avatar: {
    width: theme.spacing(8),
    height: theme.spacing(8),
    marginRight: theme.spacing(1),
    background:
      "linear-gradient(0deg, rgba(255, 255, 255, 0.09), rgba(255, 255, 255, 0.09)), #0A0F19;", // I am not sure if this value is defined in the theme
  },
  typographyContainer: {
    height: "100%",
    flex: "1",
    marginTop: theme.spacing(0.25),
  },
  positiveWinrate: {
    color: theme.palette.primary.main,
  },
}));

export interface Profile {
  gamesPlayed: number;
  winrate: number;
  kda: number;
}

export interface DraftSummonerProfile {
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
  profile: DraftSummonerProfile;
  isLoading?: Boolean;
}

// TODO: Implement this component based on the Figma design. You should use the provided components: Card and Typography.
//       https://www.figma.com/file/0OzXZgcefj9s8aTHnACJld/Junior-React-Takehome?node-id=42%3A43
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

  const {
    getChampionName,
    getChampionImage,
    getRoleName,
    getTierDivisionName,
  } = useResource();

  const hasRole = isRoleValid(role);
  const hasChampion = isChampionIdValid(championId);

  const hasData = gamesPlayed > 0;

  const avatarComponent = useMemo(() => {
    if (!hasChampion) {
      return (
        <Avatar variant="square" className={classes.avatar} alt="No champion">
          <svg
            width="37"
            height="40"
            viewBox="0 0 37 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.666656 30.6819C3.90191 36.3541 6.34748 38.3515 11.7318 40C10.2207 34.5415 9.54094 30.3167 11.7318 24.8582L8.23757 22.5287V16.1225C11.8569 15.2403 13.6094 15.8848 16.3909 18.452V33.0115H21.0499V18.452C23.6907 15.5224 25.7439 15.3802 29.7856 16.1225V22.5287L26.2913 24.8582C28.1802 30.5285 27.7145 34.7009 26.2913 40C31.5233 38.5128 33.912 36.649 36.7741 30.6819C35.292 29.8854 34.6761 29.0821 33.8622 26.0229V10.2987C29.5053 3.99436 25.9989 1.2976 21.6323 0.398296C19.1635 -0.13017 17.6204 -0.135465 14.6437 0.398296C8.82606 2.67191 6.44092 4.69187 3.57855 10.2987C3.79228 16.5415 3.78841 19.9881 3.57855 26.0229C3.00708 28.2275 2.21205 29.1405 0.666656 30.6819Z"
              fill="#9EA5C7"
              fill-opacity="0.48"
            />
          </svg>
        </Avatar>
      );
    }

    return (
      <Avatar
        variant="square"
        className={classes.avatar}
        src={getChampionImage(championId)}
        alt={getChampionName(championId)}
      />
    );
  }, [hasData, championId]);

  const typograpyLeftComponent = useMemo(() => {
    const dataComponent = () => {
      if (!hasData) {
        return (
          <Typography variant="textSmall" color="textSecondary">
            no data
          </Typography>
        );
      }

      return (
        <>
          <Typography
            variant="textSmall"
            className={winrate > 50 && classes.positiveWinrate}
            mb={1}
            style={{ fontWeight: 500 }} // I could not find a variant that has the properties of textSmall and a fontweight of 500
          >
            {winrate.toFixed(2)}%
          </Typography>
          <Typography variant="textExtraSmall" color="textPrimary" mb={1}>
            {getTierDivisionName(tier, division)}
          </Typography>
          <Typography variant="textExtraSmall" color="textTertiary">
            {gamesPlayed} games
          </Typography>
        </>
      );
    };

    return (
      <>
        <Typography
          variant="textSmall"
          color="textSecondary"
          mb={1}
          style={{ fontWeight: 500 }} // I could not find a variant that has the properties of textSmall and a fontweight of 500
        >
          {summonerName}
        </Typography>
        {dataComponent()}
      </>
    );
  }, [summonerName, hasData, winrate, tier, division, summonerName]);

  const typographyRightComponent = useMemo(() => {
    if (!hasData && !role) {
      return null;
    }

    const topSide = () => {
      if (!hasChampion && !role) {
        return null;
      }

      return (
        <Typography variant="textSmall" color="textSecondary" mb={1}>
          {hasChampion
            ? `on ${getChampionName(championId)}`
            : `as ${getRoleName(role)}r`}
        </Typography>
      );
    };

    const bottomSide = () => {
      if (!hasChampion && !role) {
        return null;
      }

      if (!hasData) {
        return (
          <Typography variant="textSmall" color="textSecondary">
            no data
          </Typography>
        );
      }

      const {
        winrate: roleWinrate,
        gamesPlayed: roleGamesPlayed,
        kda,
      } = roleProfile;

      return (
        <>
          <Typography
            variant="textSmall"
            className={roleWinrate > 50 && classes.positiveWinrate}
            mb={1}
            style={{ fontWeight: 500 }} // I could not find a variant that has the properties of textSmall and a fontweight of 500
          >
            {roleWinrate.toFixed(2)}%
          </Typography>
          <Typography variant="textExtraSmall" color="textPrimary" mb={1}>
            {kda.toFixed(2)} kda
          </Typography>
          <Typography variant="textExtraSmall" color="textTertiary">
            {roleGamesPlayed} games
          </Typography>
        </>
      );
    };

    return (
      <>
        {topSide()}
        {bottomSide()}
      </>
    );
  }, [
    hasData,
    role,
    championId,
    roleProfile?.winrate,
    roleProfile?.kda,
    roleProfile?.kda,
  ]);

  if (isLoading) {
    return (
      <Fade in>
        <Card elevation="1" p={1} style={{ display: "flex", height: "80px" }}>
          Loading...
        </Card>
      </Fade>
    );
  }

  return (
    // I tried to use className={styles.root} here but it seems that the custom Card
    // component does not accept className as a prop thats why I am using inline styling
    <Card elevation="1" p={1} style={{ display: "flex" }}>
      {avatarComponent}
      <Typography className={classes.typographyContainer}>
        {typograpyLeftComponent}
      </Typography>
      <Typography className={classes.typographyContainer}>
        {typographyRightComponent}
      </Typography>
    </Card>
  );
};
