import {
  SecretNetworkClient,
  MsgInstantiateContract,
  MsgInstantiateContractResponse,
  MsgExecuteContract,
  Wallet,
} from "secretjs";
import dotenv from "dotenv";

dotenv.config();

const router_code_id = 55;

// const url = "https://pulsar.lcd.secretnodes.com";
// const chainId = "pulsar-3";
const url = "https://rpc.ankr.com/http/scrt_cosmos";
const chainId = "secret-4";
const wallet = new Wallet(process.env.MNEMONIC);
const walletAddress = wallet.address;

const secretjs = new SecretNetworkClient({
  url,
  chainId,
  wallet,
  walletAddress,
});

console.log(`Created new secretjs client with address ${wallet.address}.`);
console.log(`Connected to ${url}.`);

// Factory Instantiation

// const factory_code_id = 13563;
// const factory_code_hash =
//   "16ea6dca596d2e5e6eef41df6dc26a1368adaa238aa93f07959841e7968c51bd";
// const pair_code_id = 13564;
// const pair_code_hash =
//   "0DFD06C7C3C482C14D36BA9826B83D164003F2B0BB302F222DB72361E0927490";
// const token_code_id = 13565; // custom snip26 to allow long name and '-' in symbol
// const token_code_hash =
//   "744C588ED4181B13A49A7C75A49F10B84B22B24A69B1E5F3CDFF34B2C343E888";

const factory_code_id = 30;
const factory_code_hash =
  "16ea6dca596d2e5e6eef41df6dc26a1368adaa238aa93f07959841e7968c51bd";
const pair_code_id = 31;
const pair_code_hash =
  "0DFD06C7C3C482C14D36BA9826B83D164003F2B0BB302F222DB72361E0927490";
const token_code_id = 2005; // custom snip26 to allow long name and '-' in symbol
const token_code_hash =
  "744C588ED4181B13A49A7C75A49F10B84B22B24A69B1E5F3CDFF34B2C343E888";

const prng_seed = Buffer.from("adamantfi rocks").toString("base64");

// const init_factory_msg = new MsgInstantiateContract({
//   admin: wallet.address,
//   sender: wallet.address,
//   code_id: factory_code_id,
//   label: "adamantfi-factory-alpha3",
//   code_hash: factory_code_hash,
//   init_msg: {
//     pair_code_id,
//     token_code_id,
//     token_code_hash,
//     pair_code_hash,
//     prng_seed,
//   },
// });
//
// console.log("Broadcasting instantiate factory tx...");
// console.dir(init_factory_msg, { depth: null, color: true });
//
// const init_factory_tx = await secretjs.tx.broadcast([init_factory_msg], {
//   gasLimit: 100_000,
//   gasPriceInFeeDenom: 0.1,
//   feeDenom: "uscrt",
//   waitForCommit: true,
//   broadcastTimeoutMs: 300_000,
// });
//
// console.dir(init_factory_tx, { depth: null, color: true });
//
// const factory_address = MsgInstantiateContractResponse.decode(
//   init_factory_tx.data[0],
// ).address;
//
// console.log(`Factory Address: ${factory_address}`);
//
// // Sanity Check
//
// const factory_config_query = await secretjs.query.compute.queryContract({
//   contract_address: factory_address,
//   code_hash: factory_code_hash,
//   query: { config: {} },
// });
//
// console.dir(factory_config_query, { depth: null, color: true });

// Creating Pairs
console.log("Creating pairs...");

// Manually setting this since the factory is already created.
const factory_address = "secret18reusruqrq7a0ug4vn6ue2pg59lm2dtsqxu6f3";

// testnet
// const tokens = [
//   {
//     name: "sSCRT",
//     address: "secret13y8e73vfl40auct785zdmyygwesvxmutm7fjx4",
//     codeHash:
//       "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e",
//   },
//   {
//     name: "USDC.nbl",
//     address: "secret1yhxy7ne975jjp6y6vq6p7kus2pnwclpq0mshc9",
//     codeHash:
//       "9a00ca4ad505e9be7e6e6dddf8d939b7ec7e9ac8e109c8681f10db9cacb36d42",
//   },
//   {
//     name: "AMBER",
//     address: "secret1jzefe65dxw5ypnj6sfwmr8wv3fg56l47veq74h",
//     codeHash:
//       "9a00ca4ad505e9be7e6e6dddf8d939b7ec7e9ac8e109c8681f10db9cacb36d42",
//   },
// ];

// mainnet
const tokens = [
  {
    name: "sSCRT",
    address: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash:
      "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e",
  },
  {
    name: "sATOM",
    address: "secret19e75l25r6sa6nhdf4lggjmgpw0vmpfvsw5cnpe",
    codeHash:
      "638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e",
  },
  // {
  //   name: "SILK",
  //   address: "secret1fl449muk5yq8dlad7a22nje4p5d2pnsgymhjfd",
  //   codeHash:
  //     "638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e",
  // },
  // {
  //   name: "ETH.axl",
  //   address: "secret139qfh3nmuzfgwsx2npnmnjl4hrvj3xq5rmq8a0",
  //   codeHash:
  //     "638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e",
  // },
  // {
  //   name: "USDC.nbl",
  //   address: "secret1chsejpk9kfj4vt9ec6xvyguw539gsdtr775us2",
  //   codeHash:
  //     "5a085bd8ed89de92b35134ddd12505a602c7759ea25fb5c089ba03c8535b3042",
  // },
  // {
  //   name: "JKL",
  //   address: "secret1sgaz455pmtgld6dequqayrdseq8vy2fc48n8y3",
  //   codeHash:
  //     "638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e",
  // },
];

// Generate `create_pair` messages with sSCRT as the first asset in each pair
const messages = tokens.slice(1).map((token) => {
  const createPairMsg = {
    create_pair: {
      asset_infos: [
        {
          token: {
            contract_addr: tokens[0].address, // sSCRT address
            token_code_hash: tokens[0].codeHash, // sSCRT code hash
            viewing_key: "SecretSwap",
          },
        },
        {
          token: {
            contract_addr: token.address,
            token_code_hash: token.codeHash,
            viewing_key: "SecretSwap",
          },
        },
      ],
    },
  };

  return new MsgExecuteContract({
    sender: wallet.address,
    contract_address: factory_address,
    code_hash: factory_code_hash,
    msg: createPairMsg,
  });
});

console.log("Broadcasting multiple 'create_pair' tx...");

const create_pair_tx = await secretjs.tx.broadcast(messages, {
  gasLimit: 500_000,
  gasPriceInFeeDenom: 0.1,
  feeDenom: "uscrt",
  waitForCommit: true,
  broadcastTimeoutMs: 300_000,
});

console.dir(create_pair_tx, { depth: null, color: true });

// Sanity Check

const factory_pairs_query = await secretjs.query.compute.queryContract({
  contract_address: factory_address,
  code_hash: factory_code_hash,
  query: { pairs: { limit: 10 } },
});

console.dir(factory_pairs_query, { depth: null, color: true });
