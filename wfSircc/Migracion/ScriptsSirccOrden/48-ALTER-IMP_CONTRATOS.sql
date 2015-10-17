ALTER TABLE IMP_CONTRATOS ADD
(
    ID  NUMBER(17,2)
);

ALTER TABLE IMP_CONTRATOS DROP CONSTRAINT IMP_CONTRATOS_PK;

DROP INDEX IMP_CONTRATOS_PK;

DECLARE 
    I NUMBER := 1;
    
BEGIN
    FOR RG IN(SELECT * FROM IMP_CONTRATOS ORDER BY FEC_REG)
    LOOP
        UPDATE IMP_CONTRATOS SET ID = I WHERE COD_CON = RG.COD_CON AND NRO_IMP=RG.NRO_IMP AND COD_SOP=RG.COD_SOP;
        I := I + 1;
    END LOOP;
    COMMIT;
END;

ALTER TABLE IMP_CONTRATOS ADD CONSTRAINT IMP_CONTRATOS_PK PRIMARY KEY (ID);