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

const factory_code_id = 30;
const factory_code_hash =
  "16ea6dca596d2e5e6eef41df6dc26a1368adaa238aa93f07959841e7968c51bd";
const pair_code_id = 31;
const pair_code_hash =
  "0DFD06C7C3C482C14D36BA9826B83D164003F2B0BB302F222DB72361E0927490";
const token_code_id = 2002; // custom snip26 to allow long name and '-' in symbol
const token_code_hash =
  "FFB0FDDE923856649E4394140F0210C43F744FB1D684BC46FD59C873EF0A79EC";

const prng_seed = Buffer.from("adamantfi rocks").toString("base64");

const init_factory_msg = new MsgInstantiateContract({
  admin: wallet.address,
  sender: wallet.address,
  code_id: factory_code_id,
  label: "adamantfi-factory-alpha0",
  code_hash: factory_code_hash,
  init_msg: {
    pair_code_id,
    token_code_id,
    token_code_hash,
    pair_code_hash,
    prng_seed,
  },
});

console.log("Broadcasting instantiate factory tx...");
console.dir(init_factory_msg, { depth: null, color: true });

const init_factory_tx = await secretjs.tx.broadcast([init_factory_msg], {
  gasLimit: 50_000,
  gasPriceInFeeDenom: 0.1,
  feeDenom: "uscrt",
  waitForCommit: true,
  broadcastTimeoutMs: 300_000,
});

console.dir(init_factory_tx, { depth: null, color: true });

const factory_address = MsgInstantiateContractResponse.decode(
  init_factory_tx.data[0],
).address;

console.log(`Factory Address: ${factory_address}`);

// Sanity Check

const factory_config_query = await secretjs.query.compute.queryContract({
  contract_address: factory_address,
  code_hash: factory_code_hash,
  query: { config: {} },
});

console.dir(factory_config_query, { depth: null, color: true });

// Creating Pairs

const tokens = [
  {
    name: "sSCRT",
    address: "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
    codeHash:
      "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e",
  },
  {
    name: "sATOM",
    address: "secret14mzwd0ps5q277l20ly2q3aetqe3ev4m4260gf4",
    codeHash:
      "ad91060456344fc8d8e93c0600a3957b8158605c044b3bef7048510b3157b807",
  },
  {
    name: "SILK",
    address: "secret1fl449muk5yq8dlad7a22nje4p5d2pnsgymhjfd",
    codeHash:
      "638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e",
  },
  {
    name: "ETH.axl",
    address: "secret139qfh3nmuzfgwsx2npnmnjl4hrvj3xq5rmq8a0",
    codeHash:
      "638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e",
  },
  {
    name: "USDC.nbl",
    address: "secret1chsejpk9kfj4vt9ec6xvyguw539gsdtr775us2",
    codeHash:
      "5a085bd8ed89de92b35134ddd12505a602c7759ea25fb5c089ba03c8535b3042",
  },
  {
    name: "JKL",
    address: "secret1sgaz455pmtgld6dequqayrdseq8vy2fc48n8y3",
    codeHash:
      "638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e",
  },
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
  gasLimit: 2_000_000,
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
  query: { pairs: { limit: 5 } },
});

console.dir(factory_pairs_query, { depth: null, color: true });
