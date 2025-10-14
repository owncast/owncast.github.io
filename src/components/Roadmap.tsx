import React from 'react';
import { usePluginData } from '@docusaurus/useGlobalData';
import styles from './Roadmap.module.css';

export interface IssueData {
  number: number;
  title: string;
  state: 'open' | 'closed';
  url: string;
  assignees: {
    login: string;
    avatar_url: string;
    url: string;
  }[];
  labels: {
    name: string;
    color: string;
  }[];
}

export interface MilestoneData {
  id: string | number;
  title: string;
  description?: string;
  state: 'open' | 'closed';
  url: string;
  dueOn?: string;
  openIssues: number;
  closedIssues: number;
  issues?: IssueData[];
}

export interface RoadmapProps {
  /** The milestone number to display as current */
  currentMilestone: number;
  /** Optional array of future milestone numbers */
  futureMilestones?: number[];
}

function calculateProgress(milestone: MilestoneData): number {
  const total = milestone.openIssues + milestone.closedIssues;
  if (total === 0) return 0;
  return Math.round((milestone.closedIssues / total) * 100);
}

function categorizeIssues(issues: IssueData[]) {
  const inProgress: IssueData[] = [];
  const todo: IssueData[] = [];
  const completed: IssueData[] = [];

  issues.forEach(issue => {
    if (issue.state === 'closed') {
      completed.push(issue);
    } else if (issue.assignees && issue.assignees.length > 0) {
      inProgress.push(issue);
    } else {
      todo.push(issue);
    }
  });

  return { inProgress, todo, completed };
}

function IssueItem({ issue }: { issue: IssueData }): JSX.Element {
  // Filter out copilot from assignees
  const humanAssignees = issue.assignees.filter(
    assignee => assignee.login.toLowerCase() !== 'copilot'
  );

  return (
    <li className={styles.issueItem}>
      <a href={issue.url} target="_blank" rel="noopener noreferrer" className={styles.issueLink}>
        <span className={styles.issueNumber}>#{issue.number}</span>
        <span className={styles.issueTitle}>{issue.title}</span>
      </a>
      {humanAssignees.length > 0 && (
        <div className={styles.assignees}>
          {humanAssignees.map(assignee => (
            <a
              key={assignee.login}
              href={assignee.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.assignee}
              title={assignee.login}
            >
              <img
                src={assignee.avatar_url}
                alt={assignee.login}
                className={styles.avatar}
              />
            </a>
          ))}
        </div>
      )}
    </li>
  );
}

function CurrentMilestone({ milestone }: { milestone: MilestoneData }): JSX.Element {
  const progress = calculateProgress(milestone);
  const { inProgress, todo, completed } = categorizeIssues(milestone.issues || []);
  const [completedExpanded, setCompletedExpanded] = React.useState(false);

  return (
    <div className={styles.currentMilestone}>
      <div className={styles.currentHeader}>
        <h2 className={styles.currentTitle}>
          <span className={styles.badge}>Current</span>
          {milestone.title}
        </h2>
        <a
          href={milestone.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.milestoneLink}
        >
          View on GitHub →
        </a>
      </div>

      {milestone.description && (
        <p className={styles.description}>{milestone.description}</p>
      )}

      <div className={styles.progressSection}>
        <div className={styles.progressHeader}>
          <span className={styles.progressLabel}>Progress</span>
          <span className={styles.progressPercent}>{progress}% complete</span>
        </div>
        <div className={styles.progressBar}>
          <div className={styles.progressFill} style={{ width: `${progress}%` }} />
        </div>
        <div className={styles.progressStats}>
          <span>{milestone.closedIssues} completed</span>
          <span>{milestone.openIssues} remaining</span>
        </div>
      </div>

      <div className={styles.issuesGrid}>
        {inProgress.length > 0 && (
          <div className={styles.issueSection}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.statusBadge} data-status="in-progress">In Progress</span>
              <span className={styles.count}>{inProgress.length}</span>
            </h3>
            <ul className={styles.issueList}>
              {inProgress.map(issue => (
                <IssueItem key={issue.number} issue={issue} />
              ))}
            </ul>
          </div>
        )}

        {todo.length > 0 && (
          <div className={styles.issueSection}>
            <h3 className={styles.sectionTitle}>
              <span className={styles.statusBadge} data-status="todo">To Do</span>
              <span className={styles.count}>{todo.length}</span>
            </h3>
            <ul className={styles.issueList}>
              {todo.map(issue => (
                <IssueItem key={issue.number} issue={issue} />
              ))}
            </ul>
          </div>
        )}

        {completed.length > 0 && (
          <div className={styles.issueSection}>
            <h3
              className={styles.sectionTitle}
              onClick={() => setCompletedExpanded(!completedExpanded)}
              style={{ cursor: 'pointer' }}
            >
              <span className={styles.statusBadge} data-status="completed">
                <span className={styles.collapseIcon}>{completedExpanded ? '−' : '+'}</span>
                Completed
              </span>
              <span className={styles.count}>{completed.length}</span>
            </h3>
            {completedExpanded && (
              <ul className={styles.issueList}>
                {completed.map(issue => (
                  <IssueItem key={issue.number} issue={issue} />
                ))}
              </ul>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function FutureMilestone({ milestone }: { milestone: MilestoneData }): JSX.Element {
  return (
    <div className={styles.futureMilestone}>
      <div className={styles.futureHeader}>
        <h3 className={styles.futureTitle}>{milestone.title}</h3>
        {milestone.dueOn && (
          <span className={styles.dueDate}>
            Due: {new Date(milestone.dueOn).toLocaleDateString()}
          </span>
        )}
      </div>
      {milestone.description && (
        <p className={styles.description}>{milestone.description}</p>
      )}
      <div className={styles.futureFooter}>
        <span className={styles.issueCount}>
          {milestone.openIssues + milestone.closedIssues} issue{milestone.openIssues + milestone.closedIssues !== 1 ? 's' : ''}
        </span>
        <a
          href={milestone.url}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.futureLink}
        >
          View milestone →
        </a>
      </div>
    </div>
  );
}

export default function Roadmap({ currentMilestone, futureMilestones = [] }: RoadmapProps): JSX.Element {
  // Get milestone data from the plugin
  const milestonesData = usePluginData('milestones-plugin') as Record<number, MilestoneData>;

  if (!milestonesData || Object.keys(milestonesData).length === 0) {
    return (
      <div className={styles.error}>
        <p>No milestone data available. Please check the plugin configuration.</p>
      </div>
    );
  }

  const currentMilestoneData = milestonesData[currentMilestone];

  if (!currentMilestoneData) {
    return (
      <div className={styles.error}>
        <p>Current milestone {currentMilestone} not found.</p>
        <p>Available milestones: {Object.keys(milestonesData).join(', ')}</p>
      </div>
    );
  }

  const futureMilestonesData = futureMilestones
    .map(num => milestonesData[num])
    .filter(Boolean);

  return (
    <div className={styles.roadmap}>
      <CurrentMilestone milestone={currentMilestoneData} />

      {futureMilestonesData.length > 0 && (
        <div className={styles.futureSection}>
          <h2 className={styles.futureSectionTitle}>Upcoming Milestones</h2>
          <div className={styles.futureTimeline}>
            {futureMilestonesData.map(milestone => (
              <FutureMilestone key={milestone.id} milestone={milestone} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
