ALTER TABLE INTERVENTORES_CONTRATO
 ADD (IDE  NUMBER);
  
COMMENT ON COLUMN INTERVENTORES_CONTRATO.IDE IS 'ID CONSECUTIVO';

DECLARE 
I NUMBER:=1;
BEGIN
    
   FOR RG IN (SELECT * FROM INTERVENTORES_CONTRATO ORDER BY FEC_REG)
   LOOP
       UPDATE INTERVENTORES_CONTRATO C SET IDE=I WHERE  C.IDE_INT = RG.IDE_INT AND C.COD_CON = RG.COD_CON;
       I:=I+1;
   END LOOP;
   COMMIT; 
END;

ALTER TABLE INTERVENTORES_CONTRATO
 DROP CONSTRAINT INTERVENTORES_CONTRATO_PK CASCADE;
 
DROP INDEX INTERVENTORES_CONTRATO_PK;

ALTER TABLE INTERVENTORES_CONTRATO
 ADD CONSTRAINT INTERVENTORES_CONTRATO_PK
 PRIMARY KEY (IDE);
