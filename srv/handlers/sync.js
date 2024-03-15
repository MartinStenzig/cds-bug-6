const cds = require('@sap/cds')


module.exports = class SyncService extends cds.ApplicationService {

  async init() {

    const SAP_CONN = await cds.connect.to('SAP_S4V_MAINTORDER_V1')

    // Register custom handlers
    this.on('GET', 'sapWorkOrder', async (req) => {

      // Call to SAP
      const sapResult = await SAP_CONN.run(req.query)

      return sapResult

    })

    super.init(...arguments)
  }
}