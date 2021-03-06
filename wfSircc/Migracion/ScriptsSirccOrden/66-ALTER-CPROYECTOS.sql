ALTER TABLE CPROYECTOS
 ADD (ID  NUMBER);
  
COMMENT ON COLUMN CPROYECTOS.ID IS 'ID CONSECUTIVO';

DECLARE 
I NUMBER:=1;
BEGIN
    
   FOR RG IN (SELECT * FROM CPROYECTOS ORDER BY FEC_REG)
   LOOP
        IF RG.PROYECTO IS NULL THEN
            UPDATE CPROYECTOS C SET ID=I WHERE  C.COD_CON = RG.COD_CON AND C.PROYECTO IS NULL;
        ELSE
            UPDATE CPROYECTOS C SET ID=I WHERE  C.COD_CON = RG.COD_CON AND C.PROYECTO = RG.PROYECTO;
        END IF;
       I:=I+1;
   END LOOP;
   COMMIT; 
END;

ALTER TABLE CPROYECTOS
 ADD CONSTRAINT CPROYECTOS_PK
 PRIMARY KEY
 (ID);

ALTER TABLE CPROYECTOS ADD (
  CONSTRAINT CPROYECTOS_FK01 
 FOREIGN KEY (COD_CON) 
 REFERENCES CONTRATOS (COD_CON));