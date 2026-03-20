import { rawUserData } from './user-data';
import { mapPortfolio } from '../domain/mappers/portfolio-mapper';

// Mapped domain entity — the only export UI components should consume
export const portfolio = mapPortfolio(rawUserData as unknown as Record<string, unknown>);
