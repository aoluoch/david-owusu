import type { SiteContent } from "../types/content";

/**
 * Default site content — used when Contentful is not configured,
 * or as a fallback while content is being fetched.
 */
export const defaultSiteContent: SiteContent = {
  brand: {
    name: "David Owusu",
    tagline:
      "Raising leaders, transforming nations, and inspiring purpose across the globe.",
  },

  nav: [
    { label: "Home", to: "/" },
    { label: "About", to: "/about" },
    { label: "Leadership", to: "/leadership" },
    { label: "Corporate", to: "/corporate" },
    { label: "Events", to: "/events" },
    { label: "Blog", to: "/blog" },
    { label: "Gallery", to: "/gallery" },
    { label: "Contact", to: "/contact" },
  ],

  ctaButtons: {
    primary: { label: "Invite David", to: "/invite" },
    secondary: { label: "Partner With Us", to: "/partner" },
  },

  pageHeaders: {
    about: {
      eyebrow: "About David Owusu",
      title: "A Life Dedicated to Purpose, Leadership & Global Impact",
      description:
        "Christian leader, apostolic voice, corporate executive, author, mentor, and humanitarian shaping leaders across five continents.",
    },
    leadership: {
      eyebrow: "Leadership",
      title: "Raising Leaders Worthy of Trust",
      description:
        "Frameworks, programs, and resources for leaders who want to grow in character, competence, and calling.",
    },
    corporate: {
      eyebrow: "Corporate",
      title: "Executive Advisory, Coaching & Strategic Consulting",
      description:
        "A trusted counsel to boards, CEOs, and executive teams navigating growth, transition, and transformation.",
    },
  },

  hero: {
    headline: "Raising Leaders. Transforming Nations. Inspiring Purpose.",
    subheadline:
      "A globally respected Christian leader, entrepreneur, mentor, and conference speaker dedicated to equipping individuals, organizations, and communities for lasting impact.",
    primaryCta: { label: "Invite to Speak", to: "/contact" },
    secondaryCta: { label: "Explore Leadership", to: "/leadership" },
    portraitUrl:
      "https://images.pexels.com/photos/2216607/pexels-photo-2216607.jpeg?auto=compress&cs=tinysrgb&w=800",
    portraitAlt: "Dr. David Owusu professional portrait in dark suit",
  },

  stats: [
    { value: 45, label: "Countries Reached", icon: "globe", suffix: "+" },
    { value: 200, label: "Leadership Conferences", icon: "mic", suffix: "+" },
    {
      value: 500,
      label: "Thousands of Lives Impacted",
      icon: "users",
      suffix: "+",
    },
    { value: 25, label: "Years of Leadership", icon: "award", suffix: "+" },
  ],

  aboutPreview: {
    eyebrow: "About David Owusu",
    heading:
      "A Life Dedicated to Purpose, Leadership & Global Impact",
    body: "Dr. David Owusu is an internationally recognized Christian leader, apostolic voice, corporate executive, author, and humanitarian. With over two decades of transformative leadership across continents, he has equipped thousands of leaders, built thriving organizations, and championed community development initiatives that continue to shape nations.",
    imageUrl:
      "https://images.pexels.com/photos/12311549/pexels-photo-12311549.jpeg?auto=compress&cs=tinysrgb&w=800",
    imageAlt: "Dr. David Owusu formal portrait in business attire",
    ctaLabel: "Read Full Biography",
    ctaTo: "/about",
  },

  influenceAreas: [
    {
      title: "Ministry",
      description:
        "Apostolic leadership and spiritual covering across nations, building communities of faith and purpose.",
      icon: "book-open",
    },
    {
      title: "Leadership",
      description:
        "Developing next-generation leaders through mentorship, training, and transformative frameworks.",
      icon: "compass",
    },
    {
      title: "Corporate Consulting",
      description:
        "Strategic advisory for organizations seeking excellence in governance, culture, and performance.",
      icon: "briefcase",
    },
    {
      title: "Business",
      description:
        "Building sustainable enterprises that create value, employment, and economic transformation.",
      icon: "trending-up",
    },
    {
      title: "Mentorship",
      description:
        "One-on-one and group mentorship empowering emerging leaders to fulfill their God-given potential.",
      icon: "heart-handshake",
    },
    {
      title: "Community Development",
      description:
        "Humanitarian initiatives advancing education, healthcare, and empowerment in underserved communities.",
      icon: "building",
    },
  ],

  visionMission: {
    vision: {
      title: "Vision",
      body: "To raise a generation of purpose-driven leaders whose lives reflect excellence, integrity, and Kingdom impact across every sphere of society.",
    },
    mission: {
      title: "Mission",
      body: "To equip individuals, organizations, and communities with the wisdom, tools, and inspiration required to fulfill their God-given potential and transform their nations.",
    },
  },

  organizations: [
    {
      name: "Kingdom Leadership Institute",
      description:
        "A global academy training emerging leaders in character, competence, and Kingdom impact.",
      logoUrl:
        "https://images.pexels.com/photos/7433822/pexels-photo-7433822.jpeg?auto=compress&cs=tinysrgb&w=400",
      websiteUrl: "#",
    },
    {
      name: "Owusu Advisory Group",
      description:
        "Executive coaching and strategic advisory for boards, executives, and high-growth organizations.",
      logoUrl:
        "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=400",
      websiteUrl: "#",
    },
    {
      name: "Nations Transformation Trust",
      description:
        "Humanitarian foundation advancing education, healthcare, and empowerment in underserved communities.",
      logoUrl:
        "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=400",
      websiteUrl: "#",
    },
  ],

  events: [
    {
      title: "Global Leadership Summit 2026",
      date: "August 15–17, 2026",
      location: "Johannesburg, South Africa",
      imageUrl:
        "https://images.pexels.com/photos/22669860/pexels-photo-22669860.jpeg?auto=compress&cs=tinysrgb&w=800",
      imageAlt:
        "Large auditorium with dynamic stage lighting during a conference",
      ctaLabel: "Register Now",
      ctaTo: "#",
      featured: true,
      description:
        "Three days of world-class teaching, mentorship, and connection for leaders who want to shape nations.",
    },
    {
      title: "Kingdom Business Forum",
      date: "October 3–5, 2026",
      location: "Accra, Ghana",
      imageUrl:
        "https://images.pexels.com/photos/20733081/pexels-photo-20733081.jpeg?auto=compress&cs=tinysrgb&w=800",
      imageAlt: "Large audience attending a speaker at a conference",
      ctaLabel: "Register Now",
      ctaTo: "#",
      description:
        "A gathering of marketplace leaders exploring Kingdom principles for building enduring enterprises.",
    },
  ],

  testimonials: [
    {
      quote:
        "Dr. Owusu's mentorship transformed my approach to leadership. His wisdom is unparalleled and his integrity is evident in everything he does.",
      name: "Dr. Abena Mensah",
      role: "CEO, Apex Consulting Group",
      photoUrl:
        "https://images.pexels.com/photos/37118089/pexels-photo-37118089.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
    },
    {
      quote:
        "His conferences are life-changing. I left with a clearer vision and practical tools to lead my organization with greater purpose and impact.",
      name: "Pastor James Adeyemi",
      role: "Senior Pastor, Grace Cathedral",
      photoUrl:
        "https://images.pexels.com/photos/37148308/pexels-photo-37148308.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
    },
    {
      quote:
        "David is a rare combination of spiritual depth and corporate excellence. His executive coaching elevated our entire leadership team.",
      name: "Sarah Nkrumah",
      role: "Managing Director, Horizon Capital",
      photoUrl:
        "https://images.pexels.com/photos/27086922/pexels-photo-27086922.jpeg?auto=compress&cs=tinysrgb&w=400",
      rating: 5,
    },
  ],

  galleryPreview: [
    {
      url: "https://images.pexels.com/photos/14303316/pexels-photo-14303316.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Speaker captivating a large crowd on stage during a motivational event",
      category: "Conferences",
    },
    {
      url: "https://images.pexels.com/photos/7433840/pexels-photo-7433840.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Business professionals discussing documents in a modern meeting room",
      category: "Corporate",
    },
    {
      url: "https://images.pexels.com/photos/8761349/pexels-photo-8761349.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Diverse group of adults engaged in a business seminar",
      category: "Leadership",
    },
    {
      url: "https://images.pexels.com/photos/31922550/pexels-photo-31922550.jpeg?auto=compress&cs=tinysrgb&w=800",
      alt: "Volunteers gathered outdoors for a community meeting",
      category: "Community",
    },
  ],

  finalCta: {
    heading: "Partner in Transforming Lives and Building Future Leaders",
    subtext:
      "Join a global movement of leaders, organizations, and communities committed to excellence, purpose, and lasting impact.",
    primaryCta: { label: "Invite David", to: "/contact" },
    secondaryCta: { label: "Contact Office", to: "/contact" },
  },

  footer: {
    brand: "David Owusu",
    tagline:
      "Raising leaders, transforming nations, and inspiring purpose across the globe.",
    columns: [
      {
        title: "Quick Links",
        links: [
          { label: "Home", to: "/" },
          { label: "About", to: "/about" },
          { label: "Leadership", to: "/leadership" },
          { label: "Events", to: "/events" },
          { label: "Blog", to: "/blog" },
          { label: "Gallery", to: "/gallery" },
          { label: "Contact", to: "/contact" },
        ],
      },
      {
        title: "Resources",
        links: [
          { label: "Books", to: "/leadership#books" },
          { label: "Articles", to: "#" },
          { label: "Podcast", to: "#" },
          { label: "Media Kit", to: "#" },
          { label: "Speaking Topics", to: "/leadership#speaking" },
        ],
      },
    ],
    contact: {
      email: "info@davidowusu.com",
      phone: "+27 11 000 0000",
      address: "Johannesburg, South Africa",
    },
    copyright: "© 2026 David Owusu. All rights reserved.",
  },

  about: {
    heroImage:
      "https://images.pexels.com/photos/12311549/pexels-photo-12311549.jpeg?auto=compress&cs=tinysrgb&w=1200",
    biography: [
      "Dr. David Owusu is an internationally recognized Christian leader, apostolic voice, corporate executive, author, and humanitarian whose ministry and marketplace influence span more than four decades.",
      "Through visionary leadership, strategic teaching, and personal mentorship, he has equipped thousands of leaders across ministry, business, government, and community development to fulfill their God-given assignments.",
      "His work is anchored in three convictions: excellence honours God, leaders determine outcomes, and every person carries a unique assignment for their generation.",
    ],
    timeline: [
      {
        year: "1998",
        title: "Called into Ministry",
        description:
          "Answered the call to full-time ministry after graduating with honours in business.",
      },
      {
        year: "2005",
        title: "First International Conference",
        description:
          "Convened his first international leadership summit, drawing leaders from over 20 nations.",
      },
      {
        year: "2012",
        title: "Founded Kingdom Leadership Institute",
        description:
          "Established a global academy training emerging leaders in character and competence.",
      },
      {
        year: "2018",
        title: "Doctorate in Strategic Leadership",
        description:
          "Awarded a doctorate for research on faith-based frameworks for organizational transformation.",
      },
      {
        year: "2024",
        title: "Nations Transformation Trust",
        description:
          "Launched a humanitarian foundation focused on education, healthcare, and youth empowerment.",
      },
    ],
    values: [
      {
        title: "Excellence",
        description:
          "Pursuing the highest standard in every assignment as an act of worship.",
        icon: "sparkles",
      },
      {
        title: "Integrity",
        description:
          "Aligning private conduct with public leadership without compromise.",
        icon: "shield",
      },
      {
        title: "Wisdom",
        description:
          "Applying revelation, insight, and discernment to complex realities.",
        icon: "eye",
      },
      {
        title: "Service",
        description:
          "Leading by lifting others, honouring people, and empowering communities.",
        icon: "heart-handshake",
      },
    ],
    awards: [
      "Global Leadership Excellence Award — 2023",
      "Distinguished Alumni, Faculty of Leadership Studies — 2021",
      "Humanitarian of the Year, African Impact Foundation — 2020",
      "Marketplace Leader of the Decade — 2019",
    ],
    quote:
      "Leadership is stewardship. Every gift, platform, and season is entrusted to us for the good of others and the glory of God.",
  },

  leadership: {
    philosophy:
      "Great leaders are not born — they are formed. They are shaped by conviction, refined by adversity, and released through mentorship. Our work is to raise leaders who can be trusted with influence.",
    principles: [
      {
        title: "Character Before Competence",
        description:
          "Skills open doors, but character keeps you in the room. We invest in who leaders are, not just what they do.",
      },
      {
        title: "Vision Directs Execution",
        description:
          "Clarity of vision multiplies the impact of daily work. We help leaders see the future and lead people toward it.",
      },
      {
        title: "People Over Programs",
        description:
          "Systems serve people; people do not serve systems. Great cultures value the person as much as the outcome.",
      },
      {
        title: "Sustainable Growth",
        description:
          "Real impact is measured in decades, not seasons. We build leaders and organizations designed to last.",
      },
    ],
    programs: [
      {
        title: "Executive Coaching",
        description:
          "One-on-one coaching for senior leaders navigating strategic transitions and personal growth.",
        icon: "briefcase",
      },
      {
        title: "Emerging Leaders Cohort",
        description:
          "A 9-month intensive for high-potential leaders shaping their character, calling, and craft.",
        icon: "graduation-cap",
      },
      {
        title: "Women in Leadership",
        description:
          "A dedicated pathway equipping women to lead with confidence in ministry, marketplace, and community.",
        icon: "heart-handshake",
      },
      {
        title: "Kingdom Marketplace Forum",
        description:
          "A network of business leaders integrating Kingdom values into enterprise strategy and culture.",
        icon: "handshake",
      },
    ],
    books: [
      {
        title: "The Purpose-Driven Leader",
        description:
          "A framework for leading from conviction, character, and clarity of calling.",
        coverUrl:
          "https://images.pexels.com/photos/1006293/pexels-photo-1006293.jpeg?auto=compress&cs=tinysrgb&w=600",
        purchaseUrl: "#",
      },
      {
        title: "Kingdom & Enterprise",
        description:
          "How marketplace leaders can build enterprises that honour God and transform nations.",
        coverUrl:
          "https://images.pexels.com/photos/159866/books-book-pages-read-literature-159866.jpeg?auto=compress&cs=tinysrgb&w=600",
        purchaseUrl: "#",
      },
      {
        title: "The Making of a Mentor",
        description:
          "The heart, habits, and disciplines of leaders who consistently raise other leaders.",
        coverUrl:
          "https://images.pexels.com/photos/2041540/pexels-photo-2041540.jpeg?auto=compress&cs=tinysrgb&w=600",
        purchaseUrl: "#",
      },
    ],
    speakingTopics: [
      "Purpose-Driven Leadership",
      "Kingdom Principles in the Marketplace",
      "Building Enduring Organizations",
      "Executive Character & Integrity",
      "Mentorship as a Multiplier",
      "Vision, Strategy, and Execution",
    ],
  },

  corporate: {
    bio: "Beyond ministry, Dr. Owusu serves as a strategic advisor, board member, and executive coach to organizations across Africa, Europe, and North America — helping leaders align vision, culture, and execution.",
    services: [
      {
        title: "Executive Coaching",
        description:
          "Confidential 1:1 coaching for CEOs and senior executives navigating growth, transition, and legacy.",
        icon: "briefcase",
      },
      {
        title: "Leadership Training",
        description:
          "Customized programs to elevate the leadership capacity of teams and the wider organization.",
        icon: "graduation-cap",
      },
      {
        title: "Corporate Workshops",
        description:
          "High-impact workshops on culture, communication, and change — designed for real behaviour change.",
        icon: "megaphone",
      },
      {
        title: "Business Strategy",
        description:
          "Facilitated strategic planning, board advisory, and clarity on long-range priorities.",
        icon: "compass",
      },
      {
        title: "Governance",
        description:
          "Board effectiveness reviews, governance frameworks, and executive alignment.",
        icon: "shield",
      },
      {
        title: "Innovation & Transformation",
        description:
          "Guiding leadership teams through cultural, digital, and organizational transformation.",
        icon: "sparkles",
      },
    ],
    industries: [
      "Financial Services",
      "Faith-Based Organizations",
      "Education",
      "Healthcare",
      "Energy & Infrastructure",
      "Technology",
      "Non-Profit & Philanthropy",
      "Public Sector",
    ],
    caseStudies: [
      {
        title: "Leadership Turnaround",
        client: "Continental Financial Services Group",
        outcome:
          "Reset executive culture and rebuilt trust across six countries, driving 34% growth in two years.",
        imageUrl:
          "https://images.pexels.com/photos/7433822/pexels-photo-7433822.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        title: "Board Transformation",
        client: "Pan-African Healthcare Network",
        outcome:
          "Restructured board governance and long-range strategy, unlocking three new international partnerships.",
        imageUrl:
          "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
      {
        title: "Cultural Renewal",
        client: "Global Faith-Based Enterprise",
        outcome:
          "Facilitated a 12-month culture renewal that increased engagement scores from 61% to 89%.",
        imageUrl:
          "https://images.pexels.com/photos/6646918/pexels-photo-6646918.jpeg?auto=compress&cs=tinysrgb&w=800",
      },
    ],
  },

  contact: {
    email: "info@davidowusu.com",
    phone: "+27 11 000 0000",
    address: "Johannesburg, South Africa",
    faqs: [
      {
        q: "How do I invite Dr. Owusu to speak?",
        a: "Use the Speaking Invitation form and share your event details, audience, and preferred dates. Our team will respond within 3 business days.",
      },
      {
        q: "Does Dr. Owusu offer 1:1 executive coaching?",
        a: "Yes, on a limited basis. Please submit a Business Inquiry outlining your context, goals, and desired engagement length.",
      },
      {
        q: "How can my organization partner with the ministry?",
        a: "Reach out via the Partnership form — we welcome ministry, marketplace, and philanthropic partnerships aligned with our mission.",
      },
      {
        q: "Where is the office based?",
        a: "Our head office is in Johannesburg, South Africa, with representation in Accra, London, and Dallas.",
      },
    ],
  },
};
