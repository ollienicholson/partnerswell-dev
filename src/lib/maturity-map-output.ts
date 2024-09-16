// •	Flattened Structure: The data is structured as an array of objects where each object represents a section (e.g., Partner Qualification), making it easier to map over in a single loop.
// •	Details as Array: details is an array of objects where each object contains a subTitle and a description. The description can be an array of strings if there are multiple lines of text.
// •	Readability: This format is simpler to read and manage, and it’s also easier to render in your component without needing to handle nested objects.

export type TMaMaOutput = {
  phase_name: string;
  description: string;
};

export const maMaOutput = [
  {
    phase_name: "Partner Qualification",
    description:
      "Discussion around assessing the maturity of partnerships, understanding metrics for partner influence beyond just sourced revenue, and identifying where in the deal cycle the partnership contributes. This aligns with the goal of qualifying and evaluating partners to ensure they are a fit.",
  },
  {
    phase_name: "Joint Discovery",
    description:
      "Cam Tickell's inquiry about Reca's day-to-day responsibilities at Cisco and their involvement with GSI and CSP, indicating an early stage of mutual understanding and discovery of partnership opportunities. Additionally, the conversation about Cisco's use of various tools and approaches to track partner contributions suggests efforts to better understand each other’s capabilities.",
  },
  {
    phase_name: "Build Go-To-Market",
    description:
      "Reca Saedi Mikaili describes her role in strategizing different routes to market for Cisco’s observability products. The conversation about developing tools that align with new market strategies reflects efforts to refine go-to-market approaches.",
  },
  {
    phase_name: "Sales Planning",
    description:
      "Discussions on how Cisco partners, such as Accenture, influence the sales process at different stages, including partner involvement in RFPs and procurement. Insights into how sales plans might integrate partner contributions were highlighted, showing a focus on planning and resource allocation with partners.",
  },
  {
    phase_name: "Delivery Readiness",
    description:
      "Reca talks about Cisco's use of Workspan and challenges with tracking partner influence during delivery stages. This reflects Cisco’s efforts to ensure readiness in leveraging partners effectively throughout delivery processes.",
  },
  {
    phase_name: "Partnership Launch",
    description:
      "While the transcript does not directly discuss launching a new partnership, Cam's intention to demonstrate their platform to Cisco and explore potential collaboration signifies an effort to initiate or formalize a new phase in their partnership.",
  },
  {
    phase_name: "Partnership Continuous Improvement",
    description:
      "Reca mentions the challenges Cisco faces with partner performance tracking and improvement, as well as her interest in how the platform could streamline these processes. This shows ongoing efforts to refine partnership management, performance evaluation, and continuous improvement strategies.",
  },
];
