import * as SQLite from "expo-sqlite";
const db = SQLite.openDatabaseAsync("creatina.db");

//Criar tabelas
const startDB = async () => {
  const database = await db;

  try {
    await database.execAsync(`
    CREATE TABLE IF NOT EXISTS creatina (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      date STRING UNIQUE,
      took BOOLEAN
    );
  `);
  } catch (error) {
    console.log(error);
  }
};

// Salvar
const marcarDia = async (took: boolean) => {
  try {
    const db = await SQLite.openDatabaseAsync("creatina.db");
    const date = new Date().toISOString().split("T")[0];
    await db.execAsync(
      `
    INSERT OR REPLACE INTO creatina (date, took) VALUES ("${date}", ${took});
  `
    );

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const checkDay = async (date: string): Promise<boolean> => {
  try {
    const db = await SQLite.openDatabaseAsync("creatina.db");
    const day: any = await db.getAllSync(
      `SELECT * FROM creatina WHERE date = ?`,
      [date]
    );

    if (day.length === 0) {
      return false;
    }

    return day[0].took;
  } catch (error) {
    console.log(error);
    return false;
  }
};

const loadCalendar = async () => {
  const db = await SQLite.openDatabaseAsync("creatina.db");
  const calendar = await db.getAllSync(`SELECT * FROM creatina`);
  return calendar;
};

const calculateCreatineDaysTaken = async (): Promise<number> => {
  try {
    const db = await SQLite.openDatabaseAsync("creatina.db");
    const result: any = await db.getAllSync(
      `SELECT COUNT(*) as count FROM creatina WHERE took = true`
    );
    return result[0].count;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

const calculateCurrentStreak = async (): Promise<number> => {
  try {
    const db = await SQLite.openDatabaseAsync("creatina.db");
    const today = new Date().toISOString().split("T")[0];
    const results: any = await db.getAllSync(
      `WITH RECURSIVE dates AS (
          SELECT date, took
          FROM creatina 
          WHERE date = ? AND took = true
          UNION ALL
          SELECT c.date, c.took
          FROM creatina c, dates d
          WHERE c.date = date(d.date, '-1 day')
          AND c.took = true
        )
        SELECT COUNT(*) as streak FROM dates`,
      [today]
    );
    return results[0].streak;
  } catch (error) {
    console.log(error);
    return 0;
  }
};

export default {
  marcarDia,
  startDB,
  checkDay,
  loadCalendar,
  calculateCreatineDaysTaken,
  calculateCurrentStreak,
};
