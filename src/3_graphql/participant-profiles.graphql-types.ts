import { Client } from '../common/league';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Scalars = {
    ID: string;
    String: string;
    Boolean: boolean;
    Int: number;
    Float: number;
};

export type ParticipantInput = {
    summonerName: Scalars['String'];
    role?: InputMaybe<Client.Role>;
    championId?: InputMaybe<Scalars['Int']>;
};

export type GetParticipantProfilesInput = {
    platformId: Scalars['String'];
    queueId: Scalars['String'];
    participants: Array<InputMaybe<ParticipantInput>>;
};

export type Rank = {
    __typename?: 'Rank';
    tier: Client.Tier;
    division: Client.Division;
};

export type Profile = {
    __typename?: 'Profile';
    kda?: Maybe<Scalars['Float']>;
    gamesPlayed: Scalars['Int'];
    winrate: Scalars['Float'];
    rank?: Maybe<Rank>;
};

export type ParticipantProfile = {
    __typename?: 'ParticipantProfile';
    summonerName: Scalars['String'];
    queueProfile?: Maybe<Profile>;
    championProfile?: Maybe<Profile>;
    roleProfile?: Maybe<Profile>;
};
