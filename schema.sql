-- King Office · tablas de la base de datos D1
-- No es obligatorio ejecutarlo: worker.js crea estas tablas solo la primera vez que se usa.
CREATE TABLE IF NOT EXISTS session(code TEXT PRIMARY KEY,host_key TEXT,event TEXT,phase TEXT,round INTEGER,plan TEXT,dur INTEGER,dur_mode TEXT,mode TEXT,rounds INTEGER,cfg TEXT,locked INTEGER,auto INTEGER,intro_end INTEGER,play_end INTEGER,results_end INTEGER,close_at INTEGER,ended_at INTEGER,ver INTEGER,created INTEGER);
CREATE TABLE IF NOT EXISTS player(id TEXT PRIMARY KEY,code TEXT,name TEXT,name_lc TEXT,av INTEGER,token TEXT,jr INTEGER,bot INTEGER,kicked INTEGER,created INTEGER);
CREATE INDEX IF NOT EXISTS player_code ON player(code);
CREATE TABLE IF NOT EXISTS result(pid TEXT,code TEXT,round INTEGER,game TEXT,raw INTEGER,acc REAL,combo INTEGER,dur REAL,actions INTEGER,at INTEGER,PRIMARY KEY(pid,round));
CREATE INDEX IF NOT EXISTS result_code ON result(code,round);
CREATE TABLE IF NOT EXISTS ticket(pid TEXT,round INTEGER,issued INTEGER,PRIMARY KEY(pid,round));
CREATE TABLE IF NOT EXISTS ready(pid TEXT,code TEXT,round INTEGER,PRIMARY KEY(pid,round));
