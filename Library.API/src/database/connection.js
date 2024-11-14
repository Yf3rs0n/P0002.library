import sql from "mssql";

const dbSettings = {
    user: "sa",
    password: "AutodeskVault@26200",
    server: "localhost",
    database: "DB_LIBRARY",
    options: {
        encrypt: false,
        trustServerCertificate: true,
    },
};
export const getConnection = async () => {
    try{
        const pool = await sql.connect(dbSettings);
        return pool;
    }catch(error){
        console.log(error);
    }
};