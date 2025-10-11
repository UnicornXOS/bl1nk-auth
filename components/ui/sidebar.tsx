import type { JSX } from 'react';
import styles from './sidebar.module.css';

export interface SidebarSection {
  heading: string;
  items: string[];
}

export interface SidebarProps {
  title?: string;
  description?: string;
  sections?: SidebarSection[];
}

const defaultTitle = 'Docs';
const defaultDescription = 'บริหาร OAuth, webhook และ SSE chat';
const defaultSections: SidebarSection[] = [
  {
    heading: 'Overview',
    items: ['Authentication', 'Webhook Relay', 'Chat Streaming']
  }
];

export default function Sidebar({
  title = defaultTitle,
  description = defaultDescription,
  sections = defaultSections
}: SidebarProps = {}): JSX.Element {
  return (
    <div className={styles.container}>
      <div>
        <p className={styles.heading}>{title}</p>
        <p className={styles.description}>{description}</p>
      </div>
      {sections.map((section) => (
        <div key={section.heading} className={styles.section}>
          <p className={styles.sectionHeading}>{section.heading}</p>
          <ul className={styles.list}>
            {section.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
