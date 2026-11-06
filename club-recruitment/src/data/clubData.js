export const CLUB = {
  name: 'Orbit Club',
  tagline: 'The creative engineering & builder collective',
  meetDow: 6, // 0 = Sun ... 6 = Sat
  meetHour: 17, // 5:00 PM
  meetPlace: 'Innovation Hub, Lab 2',
  founded: '2023',
  activeMembers: 120,
  githubOrg: 'orbit-club',
  discordUrl: 'https://discord.gg/example',
};

export const ICONS = {
  calendar: 'calendar',
  code: 'code',
  users: 'users',
  image: 'image',
  book: 'book',
  spark: 'spark',
  terminal: 'terminal',
  rocket: 'rocket',
};

export const SECTIONS = [
  {
    id: 'events',
    label: 'Events',
    icon: 'calendar',
    color: '#3b82f6',
    sub: 'Workshops, hackathons, talks and weekly build nights.',
    taglines: [
      'Doors open at five. Bring a friend, bring a charger.',
      'Saturday is for building real things.',
      'From zero to deployed before pizza arrives.',
      'Live code demos only. No slides allowed.'
    ],
    items: [
      {
        id: 'ev-1',
        tag: 'Workshop',
        t: 'Git & GitHub from Zero to Hero',
        s: 'Sat · 5:00 PM · Lab 2',
        desc: 'Interactive hands-on session mastering branching, PR reviews, merge conflict resolution, and GitHub Actions workflows.',
        badge: 'Recommended for Freshers',
        speaker: 'Rohan Iyer (Tech Lead)',
        spots: '18 spots left',
        dateStr: 'This Saturday, 5:00 PM',
      },
      {
        id: 'ev-2',
        tag: 'Build Night',
        t: 'All-Night Hack sprint: AI Agents',
        s: 'Fri · 6:30 PM · Innovation Hall',
        desc: 'Collaborative overnight sprint building autonomous browser agents and tools. Free pizza, caffeine, and cloud credits provided.',
        badge: 'Free Food & Swag',
        speaker: 'Orbit Core Team',
        spots: 'Open Entry',
        dateStr: 'Next Friday, 6:30 PM',
      },
      {
        id: 'ev-3',
        tag: 'Keynote Talk',
        t: 'Silicon Valley to Campus: Building in Public',
        s: 'Nov 24 · 4:00 PM · Main Auditorium',
        desc: 'Exclusive guest talk by Orbit alumni who scaled a YC startup to 1M+ active users. Q&A and networking session following.',
        badge: 'Guest Speaker',
        speaker: 'Priya Sharma (Founder & Alum)',
        spots: 'Hall Seating',
        dateStr: 'Nov 24, 4:00 PM',
      },
      {
        id: 'ev-4',
        tag: 'Contest',
        t: 'Orbit CTF: Binary & Web Exploits',
        s: 'Dec 02 · 10:00 AM · Online & Lab 3',
        desc: 'Beginner-friendly Jeopardy-style cyber-security capture the flag competition. Cash prizes and hardware swag for top 3 teams.',
        badge: '$1,000 Prize Pool',
        speaker: 'CyberSec Wing',
        spots: 'Teams of 1-3',
        dateStr: 'Dec 02, 10:00 AM',
      }
    ]
  },
  {
    id: 'projects',
    label: 'Projects',
    icon: 'code',
    color: '#a855f7',
    sub: 'Open source apps, autonomous rovers, and tools shipped by members.',
    taglines: [
      'Ship early. Ship often. Merge conflicts build character.',
      'Works on my machine — and soon in production.',
      'Over 2,400 commits shipped this semester.',
      'Your portfolio starts with one good pull request.'
    ],
    items: [
      {
        id: 'pr-1',
        tag: 'Web & AI',
        t: 'Campus Pulse Engine',
        s: 'React · FastAPI · Milvus',
        desc: 'Smart campus search engine that indexes lecture notes, course materials, and room availability with vector search.',
        stats: '⭐ 184 stars · 32 contributors',
        status: 'Active · v1.4',
        github: 'https://github.com/orbit-club/campus-pulse',
      },
      {
        id: 'pr-2',
        tag: 'Mobile App',
        t: 'Orbit Companion',
        s: 'Flutter · Supabase',
        desc: 'Campus companion app providing live lab occupancy, food truck trackers, and peer study group matching.',
        stats: '📱 1,200+ active campus installs',
        status: 'Beta Testing',
        github: 'https://github.com/orbit-club/companion-app',
      },
      {
        id: 'pr-3',
        tag: 'Hardware / IoT',
        t: 'Autonomous Delivery Rover',
        s: 'ROS2 · LiDAR · Arduino',
        desc: 'Indoor SLAM delivery bot capable of navigating corridors and delivering equipment between engineering labs.',
        stats: '🤖 4.8km autonomous travel logged',
        status: 'Prototype v2',
        github: 'https://github.com/orbit-club/rover-core',
      },
      {
        id: 'pr-4',
        tag: 'Open Source',
        t: 'Markdown Notes Hub',
        s: 'TypeScript · Next.js · Tailwind',
        desc: 'Crowdsourced, searchable archive of handwritten & typed notes across all university departments.',
        stats: '📚 500+ lecture decks shared',
        status: 'Open for PRs',
        github: 'https://github.com/orbit-club/notes-hub',
      }
    ]
  },
  {
    id: 'members',
    label: 'Team',
    icon: 'users',
    color: '#22c55e',
    view: 'members',
    sub: 'The creators, organizers, and architects steering Orbit forward.',
    taglines: [
      'Meet the builders behind the commits and chaos.',
      'Everyone here started as a nervous freshman.',
      'Drop by Lab 2 anytime — we do not bite.',
      'Passionate about shipping things that people actually use.'
    ]
  },
  {
    id: 'gallery',
    label: 'Gallery',
    icon: 'image',
    color: '#ef4444',
    sub: 'Snapshots from late night hacks, demos, and campus wins.',
    taglines: [
      'Moments, not screenshots.',
      'Caught mid-compile, 3 AM with 9 cold pizzas.',
      'The best ideas were scribbled on dining hall napkins.',
      'High energy, zero sleep, unforgettable memories.'
    ],
    items: [
      {
        id: 'gl-1',
        tag: 'Hack Night',
        t: '36 Hours, 14 Teams, 9 Pizzas',
        s: 'Annual Fall Hackathon · 48 Photos',
        desc: 'From initial whiteboard ideation to the intense Sunday morning demo shootout in front of tech judges.',
        year: 'October 2026',
        highlight: 'Winner: Team NeuralNav'
      },
      {
        id: 'gl-2',
        tag: 'Workshops',
        t: 'Freshers Git & Linux Bootcamp',
        s: 'Hands-on Lab Session · 32 Photos',
        desc: 'Packed house with over 90 new students setting up their dev environments and committing their first code.',
        year: 'September 2026',
        highlight: '100% First PRs Merged'
      },
      {
        id: 'gl-3',
        tag: 'Hardware Lab',
        t: 'Robotics Rover Corridor Trial',
        s: 'Testing Night · 20 Photos',
        desc: 'Deploying the ROS2 autonomous delivery cart through the 3rd floor maze without knocking a single trash bin.',
        year: 'August 2026',
        highlight: 'Zero Collisions'
      },
      {
        id: 'gl-4',
        tag: 'Social',
        t: 'Welcome Freshers Mixer & LAN Game',
        s: 'Club Lounge · 54 Photos',
        desc: 'Icebreakers, retro arcade games, project showcases, and meeting the mentors over bubble tea.',
        year: 'August 2026',
        highlight: 'Record Freshers Turnout'
      }
    ]
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: 'book',
    color: '#f59e0b',
    sub: 'Curated roadmaps, cheat sheets, interview primers, and workshop slides.',
    taglines: [
      'Everything we wish someone handed us in week one.',
      'Read the docs. Then read our battle-tested summaries.',
      'Curated by seniors who passed the interviews.',
      '100% free and open-source forever.'
    ],
    items: [
      {
        id: 'res-1',
        tag: 'Curriculum Roadmap',
        t: 'Fullstack Web & Cloud Engineering 2026',
        s: 'Interactive Guide · 15 Modules',
        desc: 'Comprehensive step-by-step roadmap from HTML/CSS to Docker, Kubernetes, CI/CD, and system design patterns.',
        linkText: 'Read Roadmap',
        level: 'Beginner to Advanced'
      },
      {
        id: 'res-2',
        tag: 'Cheatsheet',
        t: 'Git, Vim, Docker & Linux Command Deck',
        s: 'Single-sheet PDF & Interactive Web CLI',
        desc: 'The essential keyboard shortcuts, rescue commands, and workflow tricks used daily by tech leads.',
        linkText: 'Download Sheet',
        level: 'All Levels'
      },
      {
        id: 'res-3',
        tag: 'Workshop Decks',
        t: 'Master Deck Archive: All Past Talks',
        s: 'Slide Decks & Video Recordings',
        desc: 'High-definition recordings and slide decks from every technical seminar, workshop, and guest speaker session.',
        linkText: 'Browse Vault',
        level: 'Archive'
      },
      {
        id: 'res-4',
        tag: 'Interview Prep',
        t: 'DSA & Systems Design Playbook',
        s: '120 Curated LeetCode Patterns + Real Campus Questions',
        desc: 'The exact question breakdown and whiteboard mock templates that helped club members land top tier internships.',
        linkText: 'Start Practicing',
        level: 'Intermediate'
      }
    ]
  },
  {
    id: 'join',
    label: 'Join Club',
    icon: 'spark',
    color: '#ec4899',
    sub: 'Recruitment is now live! Apply to join our wings or just show up to learn.',
    taglines: [
      'No previous experience needed. We teach everything.',
      'Curiosity and commitment matter 10x more than pedigree.',
      'Your seat in Lab 2 is waiting.',
      'Fill the 2-minute application to generate your official Club Pass.'
    ],
    items: [
      {
        id: 'jn-1',
        tag: 'Step 1: Explore Wings',
        t: 'Pick Your Specialty Domain',
        s: 'Dev · AI & Data · Design · Hardware · Outreach',
        desc: 'Choose between building web/mobile apps, training local models, designing interfaces, or orchestrating campus events.',
        action: 'select_wing'
      },
      {
        id: 'jn-2',
        tag: 'Step 2: Quick Application',
        t: 'Instant 2-Minute Form',
        s: 'Share your background & what you want to create',
        desc: 'Tell us what you are hyped about. You can apply as a complete beginner or an experienced developer.',
        action: 'open_form'
      },
      {
        id: 'jn-3',
        tag: 'Step 3: Get Your Member Pass',
        t: 'Holographic Access Card',
        s: 'Receive your custom badge & join the Discord',
        desc: 'Instant personalized Club ID card generator with digital QR, assigned ID, and discord invite link.',
        action: 'claim_pass'
      }
    ]
  }
];

export const MEMBERS = [
  {
    name: 'Ishita Rao',
    role: 'Head of Design & UX',
    wing: 'Design Wing',
    color: '#f472b6',
    style: 'bun',
    x: 12,
    h: 62,
    z: 1,
    bio: 'Crafting spatial interfaces, micro-interactions, and visual branding. Loves Figma plugins and brutalist typography.',
    skills: ['Figma', 'Design Systems', '3D Spline', 'Motion'],
    github: 'ishita-ux',
    twitter: '@ishitadesigns',
    quote: 'If it does not feel magical in 3 seconds, redesign it.'
  },
  {
    name: 'Rohan Iyer',
    role: 'Tech Lead & Systems',
    wing: 'Core Dev Wing',
    color: '#38bdf8',
    style: 'glasses',
    x: 27,
    h: 74,
    z: 2,
    bio: 'Distributed systems nerd. Lives in Neovim, manages the club server rack, and hates slow build times.',
    skills: ['Rust', 'Go', 'Docker', 'React / TypeScript'],
    github: 'rohaniyer-dev',
    twitter: '@rohan_builds',
    quote: 'Keep the mental model simple, automate the rest.'
  },
  {
    name: 'Aarav Mehta',
    role: 'President',
    wing: 'Leadership & Strategy',
    color: '#fbbf24',
    style: 'hair',
    x: 43,
    h: 86,
    z: 3,
    bio: 'Building the best builder community on campus. Former hackathon addict, now focused on mentorship and sponsor partnerships.',
    skills: ['Product', 'FastAPI', 'Public Speaking', 'Community'],
    github: 'aaravmehta',
    twitter: '@aarav_codes',
    quote: 'The best way to predict your campus culture is to invent it.'
  },
  {
    name: 'Meera Nair',
    role: 'Vice President & AI Lead',
    wing: 'AI & Research Wing',
    color: '#a78bfa',
    style: 'long',
    x: 58,
    h: 90,
    z: 4,
    bio: 'Exploring LLM reasoning, fine-tuning small models, and autonomous code agents. Researcher at heart.',
    skills: ['PyTorch', 'LangChain', 'CUDA', 'Python'],
    github: 'meera-ai',
    twitter: '@meera_ml',
    quote: 'Hardware is cheap, good datasets and curious minds are rare.'
  },
  {
    name: 'Kabir Shah',
    role: 'Head of Events & Ops',
    wing: 'Operations Wing',
    color: '#34d399',
    style: 'cap',
    x: 74,
    h: 78,
    z: 3,
    bio: 'Orchestrating hack nights, game tournaments, and food logistics. The person who makes sure the wifi never drops during demos.',
    skills: ['Logistics', 'Budgeting', 'Host & MC', 'Sponsorships'],
    github: 'kabir-events',
    twitter: '@kabir_speaks',
    quote: 'A hackathon without hot pizza is just overtime work.'
  },
  {
    name: 'Anaya Das',
    role: 'Community & Outreach',
    wing: 'Outreach & Growth',
    color: '#fb7185',
    style: 'beanie',
    x: 88,
    h: 65,
    z: 2,
    bio: 'Connecting Orbit with tech founders, other college clubs, and running our dev podcast & social broadcasts.',
    skills: ['Marketing', 'Copywriting', 'DevRel', 'Community Growth'],
    github: 'anaya-das',
    twitter: '@anaya_growth',
    quote: 'Every great software engineer was once an inspired freshman.'
  }
];

export const WINGS = [
  { id: 'web', name: 'Web & Cloud', icon: '🌐', desc: 'React, Next.js, Cloudflare, Node & GraphQL' },
  { id: 'ai', name: 'AI & Research', icon: '🧠', desc: 'LLM agents, PyTorch, Computer Vision & NLP' },
  { id: 'mobile', name: 'Mobile Apps', icon: '📱', desc: 'Flutter, React Native & Swift' },
  { id: 'hardware', name: 'Hardware & IoT', icon: '⚡', desc: 'Robotics, ESP32, ROS2 & Embedded Systems' },
  { id: 'design', name: 'UI / UX & Motion', icon: '🎨', desc: 'Figma, 3D graphics, typography & visual storytelling' },
  { id: 'ops', name: 'Events & Outreach', icon: '🚀', desc: 'Hackathons, sponsorships, podcast & operations' },
];
