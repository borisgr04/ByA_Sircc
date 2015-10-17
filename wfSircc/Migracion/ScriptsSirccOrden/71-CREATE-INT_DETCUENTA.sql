CREATE TABLE INT_DETCUENTA
(
  ID         NUMBER,
  IDACTA     NUMBER(10)                         NOT NULL,
  NRO_RP     VARCHAR2(10 BYTE),
  NRO_OP     VARCHAR2(10 BYTE),
  VAL_OP     NUMBER,
  FEC_OP     DATE,
  FEC_CAU    DATE,
  NRO_EGR    VARCHAR2(10 BYTE),
  FEC_EGR    DATE,
  EST_EGR    VARCHAR2(1 BYTE),
  VIG_RP     NUMBER(4),
  ID_CTRDOC  NUMBER,
  FEC_REG    DATE,
  FEC_MOD    DATE,
  USAP       VARCHAR2(20 BYTE),
  USAPM      VARCHAR2(20 BYTE)
);

COMMENT ON TABLE INT_DETCUENTA IS 'registro de tramite de pago de contrato por acta de autorizaci�n de pagos.';

COMMENT ON COLUMN INT_DETCUENTA.ID IS 'id consecutivo';

COMMENT ON COLUMN INT_DETCUENTA.IDACTA IS 'id del acta - estado del contrato';

COMMENT ON COLUMN INT_DETCUENTA.NRO_RP IS 'nro del registro pptal';

COMMENT ON COLUMN INT_DETCUENTA.NRO_OP IS 'numeo de orden de pago';

COMMENT ON COLUMN INT_DETCUENTA.VAL_OP IS 'valor de orden de pago';

COMMENT ON COLUMN INT_DETCUENTA.FEC_OP IS 'fecha de orden de apgo';

COMMENT ON COLUMN INT_DETCUENTA.FEC_CAU IS 'fecha de causaci�n';

COMMENT ON COLUMN INT_DETCUENTA.NRO_EGR IS 'nro del egreso';

COMMENT ON COLUMN INT_DETCUENTA.FEC_EGR IS 'fec del egreso';

COMMENT ON COLUMN INT_DETCUENTA.EST_EGR IS 'estado del egreso';

COMMENT ON COLUMN INT_DETCUENTA.VIG_RP IS 'vigencia del rp';

COMMENT ON COLUMN INT_DETCUENTA.ID_CTRDOC IS 'ide control del documento padre';

COMMENT ON COLUMN INT_DETCUENTA.FEC_REG IS 'fecha de registro';

COMMENT ON COLUMN INT_DETCUENTA.FEC_MOD IS 'fecha de modificacion';

COMMENT ON COLUMN INT_DETCUENTA.USAP IS 'usuario de registro';

COMMENT ON COLUMN INT_DETCUENTA.USAPM IS 'usuario modificacion';


CREATE UNIQUE INDEX INT_DETCUENTA_PK ON INT_DETCUENTA
(ID);


ALTER TABLE INT_DETCUENTA ADD (
  CONSTRAINT INT_DETCUENTA_PK
 PRIMARY KEY
 (ID));

ALTER TABLE INT_DETCUENTA ADD (
  CONSTRAINT INT_DETCUENTA_EC 
 FOREIGN KEY (IDACTA) 
 REFERENCES ESTCONTRATOS (ID),
  CONSTRAINT INT_DT_CD_FK 
 FOREIGN KEY (ID_CTRDOC) 
 REFERENCES INT_CONTROL_DOC (ID),
  CONSTRAINT INT_DETCUENTA_RP 
 FOREIGN KEY (NRO_RP, VIG_RP) 
 REFERENCES RP_CONTRATOS (NRO_RP,VIGENCIA));