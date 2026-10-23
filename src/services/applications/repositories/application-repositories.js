import { Pool } from 'pg';
import { nanoid } from 'nanoid';

class ApplicationRepositories {
    constructor() {
        this.pool = new Pool();
    }

    async createApplication({ job_id, user_id, status}) {
        const id = nanoid(16);
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO applications VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
            values: [id, job_id, user_id, status, createdAt, updatedAt],
        };

        const result = await this.pool.query(query);
        return result.rows[0];
    }

    async getApplication() {
        const query = { text: 'SELECT * FROM applications' };
        const result = await this.pool.query(query);
        return result.rows;
    }

    async getApplicationById(id) {
        const query = {
            text: 'SELECT * FROM applications WHERE id = $1',
            values: [id],
        };
        const result = await this.pool.query(query);
        return result.rows[0];
    }

    async getApplicationByJob(job_id) {
        const query = {
            text: 'SELECT * FROM applications WHERE job_id = $1',
            values: [job_id],
        };
        const result = await this.pool.query(query);
        return result.rows; // return array, not just first
    }

    async getApplicationByUser(user_id) {
        const query = {
            text: 'SELECT * FROM applications WHERE user_id = $1',
            values: [user_id],
        };
        const result = await this.pool.query(query);
        return result.rows;
    }


    async deleteApplication(id) {
        const query = {
            text: 'DELETE FROM applications WHERE id = $1 RETURNING id',
            values: [id],
        };
        const result = await this.pool.query(query);
        return result.rows[0] || null; // return null if not found
    }

    async editApplication({ id, status }) {
        const updatedAt = new Date().toISOString();
        const query = {
            text: 'UPDATE applications SET status = $1, updated_at = $2 WHERE id = $3 RETURNING id',
            values: [status, updatedAt, id],
        };
        const result = await this.pool.query(query);
        return result.rows[0] || null;
    }

}
export default new ApplicationRepositories();