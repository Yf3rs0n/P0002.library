import { getConnection } from "../database/connection.js";
export const getAuthors = async (req, res) => {
    const pool = await getConnection();
    const authorsResult = await pool.request().query('SELECT * FROM author');
    const authors = authorsResult.recordset;
    const booksResult = await pool.request().query('SELECT * FROM book');
    const books = booksResult.recordset;
    const result = authors.map(author => {
        return {
            author,
            books: books.filter(book => book.authors === author.id)
        };
    });

    res.json(result);
};
