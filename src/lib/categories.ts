/**
 * Provides typed data-access helpers for category records.
 * Queries use an injectable database client so they can run against the
 * production database or an in-memory test database.
 */

import { asc } from 'drizzle-orm';
import type { Database } from './db';
import { categories } from '../../db/schema';
import type { Category } from '../types/game';

/**
 * Retrieves all categories in alphabetical order by name.
 *
 * @param db - The database client used to execute the query.
 * @returns The categories ordered alphabetically by name.
 */
export async function getAllCategories(db: Database): Promise<Category[]> {
    const rows = await db
        .select({
            id: categories.id,
            name: categories.name,
        })
        .from(categories)
        .orderBy(asc(categories.name));

    return rows.map((row) => ({
        id: row.id,
        name: row.name,
    }));
}
