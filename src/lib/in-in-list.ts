// list of influence indicators
export type InfluenceIndicator = {
  id: number;
  name: string;
  description: string;
  icon: string;
};

export const influenceIndicators = [
  {
    id: 1,
    name: "Partner Lead Researching",
    description: "A partner who is actively researching the partnership.",
    icon: "🔍",
  },
  {
    id: 2,
    name: "Partner Lead Cultivating",
    description: "A partner who is actively cultivating the partnership.",
    icon: "🌱",
  },
  {
    id: 3,
    name: "Partner Opportunity Alignment",
    description: "A partner who is actively aligning the partnership.",
    icon: "🔀",
  },
  {
    id: 4,
    name: "Prove Partner Value",
    description: "A partner who is actively proving the partnership.",
    icon: "🔮",
  },
  {
    id: 5,
    name: "Partner Opportunity Negotiation",
    description: "A partner who is actively negotiating the partnership.",
    icon: "🔁",
  },
  {
    id: 6,
    name: "Partner Opportunity Closed",
    description: "A partner has closed the partnership opportunity.",
    icon: "🔚",
  },
];
