export type ContentSubjectId =
  | 'methods'
  | 'specialist'
  | 'biology'
  | 'chemistry'
  | 'english';

export type ContentResourceType =
  | 'Worksheet'
  | 'Quiz'
  | 'Exam Pack'
  | 'Revision';

export type ContentDifficulty = 'Easy' | 'Medium' | 'Hard' | 'Mixed';

export type ContentSortBy = 'newest' | 'mostUsed' | 'highestRated';

export type YearLevel = 10 | 11 | 12;

export type SelectOption<T extends string | number> = {
  value: T;
  label: string;
};

export type ContentResource = {
  id: string;
  title: string;
  subjectId: ContentSubjectId;
  subjectName: string;
  yearLevel: YearLevel;
  type: ContentResourceType;
  difficulty: ContentDifficulty;
  durationMins: number;
  marks: number;
  tags: string[];
  createdAt: string;
  usageCount: number;
  rating: number;
};

export type ContentLibraryFilters = {
  searchQuery: string;
  subjectId: ContentSubjectId | 'all';
  resourceType: ContentResourceType | 'all';
  yearLevel: YearLevel | 'all';
  sortBy: ContentSortBy;
};

export type SubjectCatalogItem = {
  id: ContentSubjectId;
  name: string;
};

/**
 * Mongo Shape (backend-ready, informational only)
 * ContentResource document:
 * - Suggested indexes:
 *   1) { subjectId: 1, yearLevel: 1, type: 1 }
 *   2) { createdAt: -1 }
 *   3) { usageCount: -1 }
 *   4) { rating: -1 }
 *   5) { tags: 1 }
 */
export type MongoContentResourceShape = {
  _id: string;
  title: string;
  subjectId: ContentSubjectId;
  subjectName: string;
  yearLevel: YearLevel;
  type: ContentResourceType;
  difficulty: ContentDifficulty;
  durationMins: number;
  marks: number;
  tags: string[];
  usageCount: number;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
};
