// Presentation layer types for cover header components
// Aligns with 4-layer architecture - separates data from actions

export interface CoverHeaderData {
  name: string;
  type?: string;
  coverImage: string;
  avatarCode: string;
  verified?: boolean;
  location?: string;
  isFavorite: boolean;
}

export interface CoverHeaderActions {
  onBack: () => void;
  onContact: () => void;
  onProposal?: () => void;
  onToggleFavorite: () => void;
}

export type CoverHeaderProps = CoverHeaderData & CoverHeaderActions;

