import  {Pool} from 'pg';

const connectionString = 'link';

const db = new Pool({connectionString});

export default db;
