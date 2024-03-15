using {SAP_S4V_MAINTORDER_V1 as external} from './external/SAP_S4V_MAINTORDER_V1';

service SyncService {
     @(readonly, cds.query.limit.max: 100)
    entity sapWorkOrder as projection on external.MaintenanceOrder;
}
