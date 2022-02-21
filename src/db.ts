import  {Pool} from 'pg';

const connectionString = 'postgres://fooxrzxp:o7p2LF6mWbjHkqJiPK_9EmtCxm8C_2Ui@jelani.db.elephantsql.com/fooxrzxp';

const db = new Pool({connectionString});

export default db;
