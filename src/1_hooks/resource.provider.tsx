import React, { createContext, useCallback, useContext, useMemo } from "react";
import {
  Client,
  getChampionName,
  getRoleName,
  getTierDivisionName,
} from "../common/league";
import { CDN_URL, CDN_CHAMPIONS_PATH } from "./constants";

interface ResourceContext {
  getChampionImage(championId: Client.ChampionId): string;
  getChampionName(championId: Client.ChampionId): string;
  getRoleName(role: Client.Role): string;
  getTierDivisionName(tier: Client.Tier, division: Client.Division): string;
}

const ResourceContext = createContext<ResourceContext>(undefined);

export const useResource = (): ResourceContext => {
  return useContext(ResourceContext);
};

export const ResourceProvider: React.FC = ({ children }) => {
  const getChampionImage = useCallback(
    (championId: Client.ChampionId): string => {
      // TODO: This function should return the champion image url based on the passed championId
      // e.g. for Annie it's the following: https://cdn.zargg.workers.dev/champion/1.png

      // Champion id is valid because the isChampionIdValid function is being called before this function
      // that's why that validation is not here.
      return `${CDN_URL}${CDN_CHAMPIONS_PATH}/${championId}.png`;
    },
    []
  );

  const context = useMemo<ResourceContext>(
    () => ({
      getChampionImage,
      getChampionName,
      getRoleName,
      getTierDivisionName,
    }),
    []
  );

  return (
    <ResourceContext.Provider value={context}>
      {children}
    </ResourceContext.Provider>
  );
};
