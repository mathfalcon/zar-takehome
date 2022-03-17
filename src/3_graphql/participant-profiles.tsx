import { useQuery } from '@apollo/client';
import { IconButton } from '@material-ui/core';
import { Maybe } from 'graphql/jsutils/Maybe';
import React, { useMemo } from 'react';
import { DraftSummonerProfiles } from '../2_components/2_draft-summoner-profiles';
import { Card, Typography } from '../common/core/components';
import { Client } from '../common/league';
import {
  ParticipantProfilesQueryData,
  PARTICIPANT_PROFILES_QUERY,
} from './participant-profiles.graphql-queries';
import {
  GetParticipantProfilesInput,
  ParticipantProfile,
} from './participant-profiles.graphql-types';
import RestartIcon from './RestartIcon';

export interface Participant {
  summonerName: string;
  role?: Client.Role;
  championId?: Client.ChampionId;
}

export interface ParticipantProfilesProps {
  platformId: string;
  queueId: string;
  participants: Participant[];
}

export const ParticipantProfiles: React.FC<ParticipantProfilesProps> = ({
  platformId,
  queueId,
  participants,
}) => {
  const input: GetParticipantProfilesInput = useMemo(
    () => ({
      platformId,
      queueId,
      participants,
    }),
    [platformId, queueId, participants],
  );

  // TODO: Finish the GraphQL query PARTICIPANT_PROFILES_QUERY, based on the schema at `participant-profiles.graphql`
  // Bonus points:
  //  - Handle the loading state
  //  - Handle the error state
  // We don't provide a design nor guidelines about how to handle those two states.
  // You are free to handle and implement them based on what you believe works best for those state.
  const { loading, error, data, refetch } = useQuery<ParticipantProfilesQueryData>(
    PARTICIPANT_PROFILES_QUERY,
    {
      variables: {
        input,
      },
    },
  );

  const profiles = useMemo(
    () =>
      participants.map(participant => {
        if (!data) {
          return {
            summonerName: participant.summonerName,
          };
        }

        // TODO: Match the participant with one of the profiles from the response
        const playerAPIData: ParticipantProfile = data?.getParticipantProfiles.find(
          ({ summonerName }) => summonerName === participant?.summonerName,
        );

        return {
          summonerName: participant.summonerName,
          role: participant.role,
          championId: participant.championId,
          championProfile: playerAPIData.championProfile,
          division: playerAPIData.queueProfile.rank.division,
          gamesPlayed: playerAPIData.queueProfile.gamesPlayed,
          roleProfile: playerAPIData.roleProfile,
          tier: playerAPIData.queueProfile.rank.tier,
          winrate: playerAPIData.queueProfile.winrate,
        };
      }),
    [participants, data],
  );

  if (error) {
    return (
      <Card
        elevation='1'
        p={1}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '448px',
          textAlign: 'center',
        }}
      >
        <Typography variant='textMain' color='textSecondary' lineHeight={1.5}>
          Something went wrong, please press the button below to try again.
        </Typography>
        <IconButton aria-label='Refetch profiles' onClick={refetch}>
          <RestartIcon />
        </IconButton>
      </Card>
    );
  }

  return (
    <DraftSummonerProfiles
      profiles={profiles}
      // I am passing isLoading as a prop in order to render a loading component for each player
      // regardless of the array length
      isLoading={loading}
    />
  );
};
