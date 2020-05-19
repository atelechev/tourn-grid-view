import { CategoryColumn } from 'components/columns/category-column';
import { ClubColumn } from 'components/columns/club-column';
import { Column } from 'components/columns/column';
import { CustomColumn } from 'components/columns/custom-column';
import { FederationColumn } from 'components/columns/federation-column';
import { NameColumn } from 'components/columns/name-column';
import { PointsColumn } from 'components/columns/points-column';
import { RankColumn } from 'components/columns/rank-column';
import { RatingColumn } from 'components/columns/rating-column';
import { RoundColumn } from 'components/columns/round-column';
import { Semantics } from 'components/columns/semantics';
import { TieBreakColumn } from 'components/columns/tiebreak-column';

const categoryColumnIdentifiers = new Set<string>(['category', 'cat', 'ctg']);

const federationColumnIdentifiers = new Set<string>(['federation', 'fed', 'fede', 'country', 'pays']);

const nameColumnIdentifiers = new Set<string>(['name', 'nom']);

const pointsColumnIdentifiers = new Set<string>(['points', 'pts']);

const rankColumnIdentifiers = new Set<string>(['rank', 'ranking', 'position', 'pos', 'place', 'pl']);

const ratingColumnIdentifiers = new Set<string>(['rating', 'rtg', 'elo', 'classement']);

const regexRound = /ro?u?n?d?e?\s*[0-9]+/g;

const isRoundColumn = (columnName: string): boolean => {
  const matchResult = columnName.match(regexRound);
  return !!matchResult && matchResult.length > 0;
};

const knownTiebreakCodes = new Set<string>(['bre', 'bu', 'sol', 'perf']);

const regextTiebreak = /tb\s*[0-9]+/g;

const isTieBreakColumn = (column: string): boolean => {
  const matchResult = column.match(regextTiebreak);
  const matchesByRegex = matchResult && matchResult.length > 0;
  const normalized = column.trim().toLowerCase();
  return matchesByRegex || knownTiebreakCodes.has(normalized);
};

const calculateSemantics = (name: string): Semantics => {
  if (pointsColumnIdentifiers.has(name)) {
    return 'points';
  }
  if (categoryColumnIdentifiers.has(name)) {
    return 'category';
  }
  if (name === 'club') {
    return 'club';
  }
  if (federationColumnIdentifiers.has(name)) {
    return 'federation';
  }
  if (nameColumnIdentifiers.has(name)) {
    return 'name';
  }
  if (ratingColumnIdentifiers.has(name)) {
    return 'rating';
  }
  if (rankColumnIdentifiers.has(name)) {
    return 'rank';
  }
  if (isRoundColumn(name)) {
    return 'round';
  }
  if (isTieBreakColumn(name)) {
    return 'tiebreak';
  }
  return 'custom';
}

const hasModifier = (value: string,
  checkedModifier: string): boolean => {
  return value.indexOf(checkedModifier) > -1;
};

const instantiateColumn = (semantics: Semantics,
  name: string,
  index: number,
  hidden: boolean,
  orderBy: boolean,
  filterable: boolean
): Column => {
  switch (semantics) {
    case 'category': return new CategoryColumn(name, index, hidden, orderBy, filterable);
    case 'club': return new ClubColumn(name, index, hidden, orderBy, filterable);
    case 'federation': return new FederationColumn(name, index, hidden, orderBy, filterable);
    case 'name': return new NameColumn(name, index, orderBy);
    case 'points': return new PointsColumn(name, index, hidden, orderBy, filterable);
    case 'rank': return new RankColumn(name, index);
    case 'rating': return new RatingColumn(name, index, hidden, orderBy, filterable);
    case 'round': return new RoundColumn(name, index, hidden, orderBy, filterable);
    case 'tiebreak': return new TieBreakColumn(name, index, hidden, orderBy, filterable);
    default: return new CustomColumn(name, index, hidden, orderBy, filterable);
  }
};

export const buildColumn = (rawHeader: string, index: number): Column => {
  if (!rawHeader || rawHeader.trim().length === 0) {
    throw Error('rawHeader arg must not be undefined or empty');
  }
  if (isNaN(index) || index < 0) {
    throw Error('index arg must not be undefined or negative');
  }
  const normalizedHeader = rawHeader.trim().toLowerCase();
  const separatorIndex = normalizedHeader.indexOf('|');
  if (separatorIndex === 0) {
    throw Error('the column name must not start with the separator character');
  }
  const name = separatorIndex === -1 ? normalizedHeader : normalizedHeader.substring(0, separatorIndex);
  const semantics = calculateSemantics(name);
  const modifiers = separatorIndex === -1 ? '' : normalizedHeader.substring(separatorIndex);
  const hidden = hasModifier(modifiers, 'h');
  const orderBy = hasModifier(modifiers, 'o');
  const filterable = hasModifier(modifiers, 'f');

  return instantiateColumn(semantics, name, index, hidden, orderBy, filterable);
};
