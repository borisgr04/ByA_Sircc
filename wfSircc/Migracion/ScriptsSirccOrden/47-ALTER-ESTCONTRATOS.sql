ALTER TABLE estcontratos
ADD (
  fec_fin          DATE,
  fec_pini         DATE,
  nvis_per         NUMBER(10),
  por_eje_fis_per  NUMBER(17,2),
  saldo_per        NUMBER(17,2),
  fec_act          DATE,
  sal_ant          NUMBER(17,2),
  cla_doc          VARCHAR2(2 BYTE),
  est_doc          VARCHAR2(2 BYTE),
  id_ctrdoc        NUMBER
);

COMMENT ON COLUMN estcontratos.fec_fin IS 'FECHA FINALIZACION';

COMMENT ON COLUMN estcontratos.sal_ant IS 'Saldo Anticipo';

COMMENT ON COLUMN estcontratos.cla_doc IS 'Clase Documento';

COMMENT ON COLUMN estcontratos.est_doc IS 'Estado Documento';

COMMENT ON COLUMN estcontratos.id_ctrdoc IS 'id del control del documento a pagos o archivo';



ALTER TABLE estcontratos ADD (
  CONSTRAINT estcont_fk
 FOREIGN KEY (id_ctrdoc)
 REFERENCES int_control_doc (ID));

ALTER TRIGGER TG_UPD_ESTCONTRATOS DISABLE;

ALTER TRIGGER TG_UPD_ESTCONTRATOS_AUD DISABLE;

ALTER TRIGGER ESTCONTRATOS_T1 DISABLE;