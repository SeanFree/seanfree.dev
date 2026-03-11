<script setup lang="ts">
interface SkillItem {
  icon: string
  title: string
  items: string[]
}

interface ExperienceItem {
  companyName: string
  position: string
  dateStart: string
  dateEnd: string
  url: string
  notes: string[]
}

const skills: SkillItem[] = [
  {
    icon: 'ph-brackets-curly',
    title: 'Languages',
    items: ['JavaScript', 'TypeScript', 'Golang', 'Java', 'Python', 'SQL'],
  },
  {
    icon: 'ph-package',
    title: 'Frameworks & Libraries',
    items: [
      'Vue',
      'Nuxt',
      'React',
      'Angular',
      'TailwindCSS',
      'PrimeVue',
      'SCSS',
    ],
  },
  {
    icon: 'ph-wrench',
    title: 'Tools & Platforms',
    items: [
      'Docker',
      'AWS',
      'Cloudflare',
      'GitHub Actions',
      'ArgoCD',
      'Datadog',
      'Jenkins',
    ],
  },
  {
    icon: 'ph-test-tube',
    title: 'Testing',
    items: ['Vitest', 'Jest', 'Mocha', 'Jasmine', 'Playwright', 'Cypress'],
  },
]

const items: ExperienceItem[] = [
  {
    companyName: 'Rialtic',
    position: 'Senior Software Engineer',
    dateStart: 'June 2025',
    dateEnd: 'Present',
    url: 'https://rialtic.io',
    notes: [
      'Maintained multiple apps in a pnpm monorepo built with Nuxt',
      'Implemented bot detection for admin login flow using Cloudflare Turnstile',
      'Managed weekly production deployments in coordination with cloud engineering',
      'Defined and maintained data contracts for proprietary claim schema',
    ],
  },
  {
    companyName: 'JumpCloud',
    position: 'Software Engineer III → Senior Software Engineer',
    dateStart: 'Sep 2021',
    dateEnd: 'May 2025',
    url: 'https://jumpcloud.com/',
    notes: [
      'Contributed to multiple UI projects built with Vue, React, and TypeScript',
      'Lead engineer for a new iteration of internal design system, collaborated closely with UX to ensure scalability and reusability across projects',
      'Planned and developed design token library using TailwindCSS and TypeScript',
      'Developed a design system documentation site using Storybook and TypeScript with automated deployments to GitHub Pages using custom GitHub Actions',
      'Developed python scripts to catalog legacy components and visualize project dependencies for platform-wide design system migration',
      'Mentored new engineers, developed growth plans, and participated in technical interviews',
      'Oversaw weekly production deployments using AWS (EKS/ECR) and ArgoCD, with monitoring managed by Datadog',
    ],
  },
  {
    companyName: 'Thrive',
    position: 'Microsoft Collaboration Consultant',
    dateStart: 'Jun 2021',
    dateEnd: 'Sep 2021',
    url: 'https://thrivenextgen.com/',
    notes: [
      'Built and maintained SharePoint tenants for clients',
      'Delivered custom UI solutions using SharePoint Framework, React, and TypeScript',
      'Managed service tickets in ServiceNow, meeting client needs in a fast-paced environment',
      'Actively gathered client feedback and delivered iterative feature updates',
      'Developed a custom OKR management app for Microsoft Teams, with real-time streaming updates using WebSockets',
    ],
  },
  {
    companyName: 'Unum',
    position: 'Software Engineer I → Software Engineer II',
    dateStart: 'Apr 2019',
    dateEnd: 'Jun 2021',
    url: 'https://unum.com/',
    notes: [
      'Developed an employer portal with Vue for managing insurance policies',
      'Lead engineer for new React portal application, planning deliverables to successfully meet deadlines',
      'Integrated unit test tooling (Mocha, Sinon, Chai) and maintained testing best practices documentation',
      'Advocated for and integrated ESLint and Prettier, improving code quality and maintainability',
      'Collaborated with the internal accessibility audit team to implement automated accessibility tests using Pa11y',
      'Architected a design token library to enable React and Vue applications to be design system compliant',
      'Contributed to REST services with .NET Framework',
    ],
  },
  {
    companyName: 'Sparq (formerly RSI)',
    position: 'Associate Consultant → Consultant',
    dateStart: 'Feb 2017',
    dateEnd: 'Apr 2019',
    url: 'https://teamsparq.com/',
    notes: [
      'Collaborated with multiple remote clients including:',
      'Enterprise Holdings: Internal UI built with AngularJS, Stylus, and Google Maps API',
      'Cars.com: Research and listings UI built with AngularJS, React, and custom UI frameworks',
      'Built and maintained design system libraries, contributing new components and improving existing ones',
      'Developed an ETL pipeline using Node.js to process .tsv data into PostgreSQL',
      'Contributed to Java microservices (Spring Boot, CouchDB) and Node.js API Gateway',
      'Led daily production deployments using Jenkins',
    ],
  },
  {
    companyName: 'OSLA (formerly Alison South Marketing)',
    position: 'Web Developer',
    dateStart: 'Nov 2016',
    dateEnd: 'Feb 2017',
    url: 'https://oslaagency.com/',
    notes: [
      'Maintained web presence for 30 local businesses',
      'Managed client engagement for new WordPress sites from design to development',
      'Developed custom WordPress themes to align with client branding',
    ],
  },
]
</script>

<template>
  <div class="flex flex-col gap-4">
    <p>
      Senior Software Engineer with 10 years of experience delivering scalable
      full-stack solutions. Proven expertise in UI architecture, design systems,
      and cross-functional collaboration. Strong track record of mentoring
      engineers, driving migration initiatives, and improving development
      workflows. Adept at building modern, accessible, user-centric applications
      with technologies like Vue, React, and Golang.
    </p>
    <section>
      <h2 class="heading-lg border-b border-b-neutral-soft py-4">Skills</h2>
      <section v-for="(skill, i) in skills" :key="i" class="p-2">
        <h3 class="heading-sm flex items-center gap-2 mb-2">
          <i class="ph text-secondary" :class="skill.icon"></i>{{ skill.title }}
        </h3>
        <ul class="flex flex-wrap gap-2">
          <li
            v-for="(item, j) in skill.items"
            :key="`${i}-${j}`"
            class="bg-neutral-softest border border-neutral-softer
              text-neutral-strong rounded-full px-2"
          >
            {{ item }}
          </li>
        </ul>
      </section>
    </section>

    <section>
      <h2 class="heading-lg border-b border-b-neutral-soft py-4">Experience</h2>
      <section
        v-for="(item, i) in items"
        :key="i"
        class="p-2 flex flex-col gap-2"
      >
        <header>
          <h3 class="heading-md">
            <a
              class="rounded"
              :href="item.url"
              rel="noopener noreferrer"
              target="_blank"
            >
              {{ item.companyName }}
              <i class="ph ph-arrow-square-out text-base"></i>
            </a>
          </h3>
          <p>
            {{ item.position }}
            <span class="text-neutral italic ml-2">
              ({{ item.dateStart }} - {{ item.dateEnd }})
            </span>
          </p>
        </header>
        <ul class="list-disc pl-6 text-sm py-2">
          <li v-for="(note, j) in item.notes" :key="`${i}-${j}`">
            {{ note }}
          </li>
        </ul>
      </section>
    </section>
  </div>
</template>
