# CDS $skiptoken/nextLink problem

## Prerequisites
- A SAP S/4 on-premise system (21XX) containing more than 1,000 work orders in the system. 
- A (proxy) [service](./srv/sync.cds) that all it does is expose the S/4 backend API (in my case Maintenance Order) as service (sapWorkOrder) 

## Problem description
- I run a first query with a $top=1100 and receive a nextLink of  "@odata.nextLink": "sapWorkOrder?$top=1100&$skiptoken=1000"
- When I run that next link I get the next 1000 even though I wanted "only" the initial 1100 

### Alternative Example (local repo)
- As an alternative I have create a more complex local scenario
- SAP data is mocked
- I run the query /sapWorkOrder?$select=MaintenanceOrder,MaintenanceOrderDesc&$top=150 (see [sync.http](sync.http))
- "@odata.nextLink": "sapWorkOrder?$select=MaintenanceOrder,MaintenanceOrderDesc&$top=150&$skiptoken=100"


## Problem reproduction
- Clone this repo
- `npm i`
- `cds w`
- run the request in [sync.http](sync.http)


## Expectation
I would assume that the next link has skiptoken set to 1000, but $top set to 100


While on the subject. It would be great if the next link or at least next link information could be exposed in either 
a) the .run result i.e const {runResult, {skip, top})= await SAP_CONN.run(req.query).
or b) and adjusted req.query object that contains the updated skip and top information. 

At the moment there is no easy way that I know of to loop through all (i.e. 10k records) in the SAP service as the SAP nextlink SAP provided is not accessible. 







