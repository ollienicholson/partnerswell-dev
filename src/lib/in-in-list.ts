// list of influence indicators
export type InfluenceIndicator = {
  id: number;
  name: string;
};

// this does not have to be an array of objects
export const influenceIndicators = [
  {
    id: 1,
    name: "CommBank Palo Alto",
  },
  {
    id: 2,
    name: "Bank Australia",
  },
  {
    id: 3,
    name: "WestPac NZ - McKinsey",
  },
  {
    id: 4,
    name: "BNZ",
  },
  {
    id: 5,
    name: "Royal Childrens Hospital",
  },
  {
    id: 6,
    name: "National Australia Back",
  },
];

export type InfluenceIndicatorPhaseTypes = {
  id: number;
  phaseName: string;
};

export const influenceIndicatorPhaseList = [
  {
    id: 1,
    name: "Partner Lead Researching",
  },
  {
    id: 2,
    name: "Partner Lead Cultivating",
  },
  {
    id: 3,
    name: "Partner Opportunity Alignment",
  },
  {
    id: 4,
    name: "Prove Partner Value",
  },
  {
    id: 5,
    name: "Partner Opportunity Negotiation",
  },
  {
    id: 6,
    name: "Partner Opportunity Closed",
  },
];
