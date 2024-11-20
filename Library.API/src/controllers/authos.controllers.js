import { getConnection } from "../database/connection.js";
import sql from "mssql";
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
export const getAuthorsId = async (req, res) => {
    const { id } = req.params;
    const pool = await getConnection();
    const authorsResult = await pool.request().query(`SELECT * FROM author WHERE id = ${id}`);
    const authors = authorsResult.recordset;
    const booksResult = await pool.request().query(`SELECT * FROM book WHERE authors = ${id}`);
    const books = booksResult.recordset;
    const result = authors.map(author => {
        return {
            author,
            books
        };
    });
    res.json(result);
};
export const postAuthor = async (req, res) => {
    const pool = await getConnection();
    const result = await pool
    .request()
    .input("name", sql.VarChar, req.body.name)
    .input("bio", sql.VarChar, req.body.bio)
    .query("INSERT INTO author (name, bio) VALUES (@name, @bio); SELECT SCOPE_IDENTITY() AS id");
    res.json({ 
        name: req.body.name,
        bio: req.body.bio,
    });
}
export const deleteAuthor = async (req, res) => {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool.request().query(`UPDATE book SET authors = NULL WHERE authors = ${id}; DELETE FROM author WHERE id = ${id}`);
    if (result.affectedRows[0] === 0) {
        return res.status(404).json({ message: "author not found" });
    }
    res.json({ message: "author deleted and updated to null authors" });
};
export const updateAuthor = async (req, res) => {
    const { id } = req.params;
    const pool = await getConnection();
    const result = await pool
    .request()
    .input("id", sql.Int, id)
    .input("name", sql.VarChar, req.body.name)
    .input("bio", sql.VarChar, req.body.bio)
    .query("UPDATE author SET name = @name, bio = @bio WHERE id = @id");
    if (result.affectedRows[0] === 0) {
        return res.status(404).json({ message: "author not found" });
    }
    res.json({ message: "author updated" });
}