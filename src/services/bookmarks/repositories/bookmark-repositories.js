import { Pool } from 'pg';
import { nanoid } from 'nanoid';

class BookmarkRepositories {
    constructor() {
        this.pool = new Pool();
    }

    async createBookmark({ job_id, user_id }) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO bookmarks(id, job_id, user_id, created_at, updated_at) VALUES($1, $2, $3, $4, $5) RETURNING id',
            values: [id, job_id, user_id, createdAt, updatedAt],
        };

        const result = await this.pool.query(query);
        return result.rows[0];
    }

    async getBookmarkById(id) {
        const query = {
            text: 'SELECT * FROM bookmarks WHERE id = $1',
            values: [id],
        };
        const result = await this.pool.query(query);
        return result.rows[0];
    }

    async deleteBookmarkByJob({ job_id, user_id }) {
        const query = {
            text: 'DELETE FROM bookmarks WHERE job_id = $1 AND user_id = $2 RETURNING id',
            values: [job_id, user_id],
        };
        const result = await this.pool.query(query);
        return result.rows[0] ?? null;
    }

    async getBookmarksByUser(user_id) {
        const query = {
            text: 'SELECT * FROM bookmarks WHERE user_id = $1',
            values: [user_id],
        };
        const result = await this.pool.query(query);
        return result.rows;
    }
}

export default new BookmarkRepositories();