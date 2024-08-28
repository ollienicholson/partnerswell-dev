// •	Flattened Structure: The data is structured as an array of objects where each object represents a section (e.g., Partner Qualification), making it easier to map over in a single loop.
// •	Details as Array: details is an array of objects where each object contains a subTitle and a description. The description can be an array of strings if there are multiple lines of text.
// •	Readability: This format is simpler to read and manage, and it’s also easier to render in your component without needing to handle nested objects.

export type Description = string;

export type Detail = {
  subTitle: string;
  description: Description[];
};

export type InfluenceIndicatorOutput = {
  title: string;
  details: Detail[];
};

export const influenceIndicatorOutput = [
  {
    title: "Partner Lead Researching",
    details: [
      {
        subTitle: "Discovery of Potential Partners",
        description: [
          "Elliott: Describes his process of reaching out to potential partners, like Lohit, to understand their work and challenges better. This helps in researching and identifying potential leads that might benefit from his platform.",
        ],
      },
    ],
  },
  {
    title: "Partner Lead Cultivating",
    details: [
      {
        subTitle: "Building Relationships with Potential Partners",
        description: [
          "Elliott: Cultivates a relationship with a potential partner by understanding their needs, explaining the benefits of Partnerswell, and seeking feedback.",
        ],
      },
    ],
  },
  {
    title: "Partner Opportunity Alignment",
    details: [
      {
        subTitle: "Aligning Partners with Sales Opportunities",
        description: [
          "Lohit: Discusses how Palo Alto aligns partners with sales opportunities, ensuring that partners who contribute to bringing in business are recognized and incentivized.",
          "Elliott: Touches on how Partnerswell aims to help companies manage these alignments within their CRM.",
        ],
      },
    ],
  },
  {
    title: "Prove Partner Value",
    details: [
      {
        subTitle: "Proving the Value of Partners",
        description: [
          "Lohit: Explains the importance of proving the value of partners by tracking their contributions to sales and ensuring they meet certain criteria to qualify for rebates and incentives.",
        ],
      },
    ],
  },
  {
    title: "Partner Opportunity Negotiation",
    details: [
      {
        subTitle: "Not Explicitly Discussed",
        description: [
          "There is no explicit discussion around the negotiation phase of partner opportunities in the provided transcription.",
        ],
      },
    ],
  },
  {
    title: "Partner Opportunity Closed",
    details: [
      {
        subTitle: "Tracking and Closing Partner Opportunities",
        description: [
          "Lohit: Talks about how Palo Alto tracks deals closed by partners using customized Salesforce tools, ensuring that all aspects of the partner’s contributions are recorded and rewarded appropriately.",
        ],
      },
    ],
  },
];
