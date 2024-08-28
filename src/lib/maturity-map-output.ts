// •	Flattened Structure: The data is structured as an array of objects where each object represents a section (e.g., Partner Qualification), making it easier to map over in a single loop.
// •	Details as Array: details is an array of objects where each object contains a subTitle and a description. The description can be an array of strings if there are multiple lines of text.
// •	Readability: This format is simpler to read and manage, and it’s also easier to render in your component without needing to handle nested objects.

export type Description = string;

export type Detail = {
  subTitle: string;
  description: Description[];
};

export type MaturityMapOutput = {
  title: string;
  details: Detail[];
};

export const maturityMapOutput = [
  {
    title: "Partner Qualification",
    details: [
      {
        subTitle: "Elliott Background and Lohit Role",
        description: [
          "Elliott: Introduces his experience in managing global partnerships and explains the purpose of his platform, Partnerswell, aimed at simplifying partnership management for smaller companies.",
          "Lohit: Describes his role at Palo Alto Networks, emphasizing his strategic and tactical responsibilities in managing partner programs globally.",
        ],
      },
    ],
  },
  {
    title: "Joint Discovery",
    details: [
      {
        subTitle: "Understanding Lohit Role and Challenges",
        description: [
          "Elliott: Asks Lohit about his role and the specific challenges he faces in managing partner programs at Palo Alto Networks.",
          "Outcome: This discussion helps Elliott discover key insights into Lohit’s day-to-day responsibilities and the challenges associated with managing a large network of partners.",
        ],
      },
    ],
  },
  {
    title: "Build Go To Market",
    details: [
      {
        subTitle: "Partner Program Strategy",
        description: [
          "Lohit: Explains the strategic aspect of his role, which involves onboarding new partners, ensuring they have the necessary legal and operational frameworks in place, and aligning them with Palo Alto’s global go-to-market strategy. He also talks about creating and implementing go-to-market strategies for new products.",
        ],
      },
    ],
  },
  {
    title: "Sales Planning",
    details: [
      {
        subTitle: "Tracking Partner Contributions and Sales",
        description: [
          "Lohit: Discusses how Palo Alto tracks the contributions of partners to sales and differentiates between partners who bring in business versus those who simply receive it. This involves planning how to optimize partner sales efforts and ensure they contribute effectively to the overall sales strategy.",
        ],
      },
    ],
  },
  {
    title: "Delivery Readiness",
    details: [
      {
        subTitle: "Ensuring Partner Capability",
        description: [
          "Lohit: Mentions the importance of making sure that partners are equipped and trained to support and sell Palo Alto’s cloud-based products. This includes the need to customize training and certification programs to ensure partners are ready to deliver these services to customers.",
        ],
      },
    ],
  },
  {
    title: "Partnership Launch",
    details: [
      {
        subTitle: "Managing Partner Onboarding",
        description: [
          "Lohit: Talks about the entire partner management lifecycle, from onboarding new partners to ensuring they comply with Palo Alto’s requirements, such as certifications and sales targets, which are essential for a successful partnership launch.",
        ],
      },
    ],
  },
  {
    title: "Partnership Continuous Improvement",
    details: [
      {
        subTitle: "Maturity Map and Continuous Monitoring",
        description: [
          "Elliott: Introduces the concept of a maturity map in Partnerswell, which tracks the progress of partners and ensures continuous improvement throughout the partnership.",
          "Lohit: Discusses the ongoing evaluation of partners at Palo Alto, including their performance reviews and progression through different partnership tiers.",
        ],
      },
    ],
  },
];
