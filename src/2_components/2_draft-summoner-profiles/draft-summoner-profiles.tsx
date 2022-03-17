import React from 'react';
import { Card } from '../../common/core/components';
import { DraftSummonerProfileInterface, DraftSummonerProfile } from '../1_draft-summoner-profile';

export interface DraftSummonerProfilesProps {
  profiles?: DraftSummonerProfileInterface[];
  isLoading?: boolean;
}

// TODO: Use <DraftSummonerProfile> to render the passed profiles. Based on Figma:
// https://www.figma.com/file/0OzXZgcefj9s8aTHnACJld/Junior-React-Takehome?node-id=9%3A5887
// Bonus points: Without using flex styles.
export const DraftSummonerProfiles: React.FC<DraftSummonerProfilesProps> = ({
  profiles,
  isLoading,
}) => (
  // I needed to improvise to add padding between children because I could not find an easy
  // to inherit children styles using MUI
  <Card
    elevation='0'
    p={1}
    style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      gap: '8px',
    }}
  >
    {profiles.map(playerData => (
      <DraftSummonerProfile profile={playerData} isLoading={isLoading} />
    ))}
  </Card>
);
