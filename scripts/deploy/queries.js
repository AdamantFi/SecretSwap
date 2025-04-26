import { SecretNetworkClient } from "secretjs";
import dotenv from "dotenv";

dotenv.config();

const url = "https://rpc.ankr.com/http/scrt_cosmos";
const chainId = "secret-4";

const secretjs = new SecretNetworkClient({
  url,
  chainId,
});

console.log(`Created new secretjs query client connected to ${url}.`);

// TODO: more queries, dynamic queries

const pair_code_hash =
  "0DFD06C7C3C482C14D36BA9826B83D164003F2B0BB302F222DB72361E0927490";

// Pair Data

const pair_addresses = [
  "secret1e5gcuqcs5mu98ytqfvnuxx06rlzlq72qmu0zvh",
  "secret1gfsga5p3d9fxdtkscrvkwg5guz35uvgeza66nh",
  "secret1x92a83kzxgnd6r44xhqu0tgw4eq9nu6pnudmdc",
  "secret1wl8qeru6xek3pf3gs7n06n79eafv7lekw3hh8d",
  "secret1v33eu03ghv39ju82crf5fyrcy5lmjq5wz5eyyk",
];

for (const pair_address of pair_addresses) {
  const query = await secretjs.query.compute.queryContract({
    contract_address: pair_address,
    code_hash: pair_code_hash,
    query: { pair: {} },
  });

  console.dir(query, { depth: null, color: true });
}
