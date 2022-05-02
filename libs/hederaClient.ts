import { AccountId, Client, PrivateKey } from "@hashgraph/sdk";

const client = Client.forTestnet();

const operatorId = AccountId.fromString("0.0.34319544");
const operatorKey = PrivateKey.fromString(
  "302e020100300506032b657004220420b5d9ed1c1034e9c24e6a9f0afc91b2633a8b1392871a1ea722c7b046813845c3"
);

client.setOperator(operatorId, operatorKey);

export default client;
