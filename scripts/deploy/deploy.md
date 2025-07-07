# Step by step log of new contract deployment

## Gather information about the original deployment

### Factory

Contract Metadata

```json
{
  "contract_address": "secret1fjqlk09wp7yflxx7y433mkeskqdtw3yqerkcgp",
  "code_id": 30,
  "creator": "secret13l72vhjngmg55ykajxdnlalktwglyqjqv9pkq4",
  "label": "secretswap-factory"
}
```

- code_hash: 16ea6dca596d2e5e6eef41df6dc26a1368adaa238aa93f07959841e7968c51bd

Config (`secretcli q compute query secret1fjqlk09wp7yflxx7y433mkeskqdtw3yqerkcgp '{"config":{}}'`)

```json
{
  "owner": "secret10vyzzsgrwxf22zsqrp58nddqzgxreq7td37a5s",
  "pair_code_id": 31,
  "pair_code_hash": "0DFD06C7C3C482C14D36BA9826B83D164003F2B0BB302F222DB72361E0927490",
  "token_code_id": 29,
  "token_code_hash": "EA3DF9D5E17246E4EF2F2E8071C91299852A07A84C4EB85007476338B7547CE8",
  "pair_settings": {
    "swap_fee": { "commission_rate_nom": "3", "commission_rate_denom": "1000" },
    "swap_data_endpoint": {
      "address": "secret1tgagwaea268dkz7255mcau28z8qs08lnllgecm",
      "code_hash": "f25723267d368f25f68db379af1a799d1ce2b9b4fb2e392df7dfe3322c941248"
    }
  }
}
```

### Router

Contract Metadata

```json
{
  "contract_address": "secret1xy5r5j4zp0v5fzza5r9yhmv7nux06rfp2yfuuv",
  "code_id": 55,
  "creator": "secret1e8fnfznmgm67nud2uf2lrcvuy40pcdhrerph7v",
  "label": "baba-ganush"
}
```

- code_hash: 63ba73f63ec43c4778c0a613398a7e95f500f67715dcd50bc1d5eca0ce3360ee

### Pair (sample)

Contract Metadata (note the unique label format)

```json
{
  "contract_address": "secret1g97kxc857asparfgdudzkzyq5akd74xmup52uj",
  "code_id": 31,
  "creator": "secret1fjqlk09wp7yflxx7y433mkeskqdtw3yqerkcgp",
  "label": "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-secret1vcm525c3gd9g5ggfqg7d20xcjnmcc8shh902un-pair-secret1fjqlk09wp7yflxx7y433mkeskqdtw3yqerkcgp-31"
}
```

- code_hash: 0dfd06c7c3c482c14d36ba9826b83d164003f2b0bb302f222db72361e0927490

### Token (sample)

Contract Metadata (note the unique label format)

```json
{
  "contract_address": "secret1kg8pd6ag4cx72302uflm5n8nau2m6k7q9efck3",
  "code_id": 29,
  "creator": "secret1fspv4fzc90g72r22djhhtf2jrxvcte3dsvp2dk",
  "label": "secret1xzlgeyuuyqje79ma6vllregprkmgwgavk8y798-secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek-SecretSwap-LP-Token-secret1fspv4fzc90g72r22djhhtf2jrxvcte3dsvp2dk"
}
```

- code_hash: ea3df9d5e17246e4ef2f2e8071c91299852a07a84c4eb85007476338b7547ce8

## New deployment plan

1. Reuse code IDs from original, but upgrade Token to latest standard:

- Factory: 30
- Pair: 31
- Token: 2005
- Router: 55

2. Instantiate Factory

```sh
INIT_MSG='{"pair_code_id":31,"token_code_id":2005,"token_code_hash":"744C588ED4181B13A49A7C75A49F10B84B22B24A69B1E5F3CDFF34B2C343E888","pair_code_hash":"0DFD06C7C3C482C14D36BA9826B83D164003F2B0BB302F222DB72361E0927490","prng_seed":"YWRhbWFudGZpIHJvY2tz"}'
secretcli tx compute instantiate 30 "$INIT_MSG" --label secretswap-factory-2 --from adamant --gas 100000 --gas-prices 0.1uscrt
```

```json
{
  "contract_address": "secret1kq9d7uzx77kntr5pl4k53rgzv0wk97ul8pvlwm",
  "code_id": 30,
  "creator": "secret16zvp2t86hdv5na3quygc9f2rnn9f9l4vszgtue",
  "label": "testing-factory-1234",
  "created": {
    "block_height": 16738404
  }
}
```

Sanity Check

```sh
secretcli query compute query secret1kq9d7uzx77kntr5pl4k53rgzv0wk97ul8pvlwm '{"config":{}}'
```

3. Create some pairs (see [pairs.md](./pairs.md))

Sanity Check

```sh
secretcli query compute query secret1kq9d7uzx77kntr5pl4k53rgzv0wk97ul8pvlwm '{"pairs":{}}'
```

4. Instantiate Router

Registering sSCRT, sATOM, SILK, ETH.axl, USDC.nbl, JKL

```json
{
  "register_tokens": [
    {
      "address": "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
      "code_hash": "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e"
    },
    {
      "address": "secret19e75l25r6sa6nhdf4lggjmgpw0vmpfvsw5cnpe",
      "code_hash": "638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e"
    },
    {
      "address": "secret1fl449muk5yq8dlad7a22nje4p5d2pnsgymhjfd",
      "code_hash": "638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e"
    },
    {
      "address": "secret139qfh3nmuzfgwsx2npnmnjl4hrvj3xq5rmq8a0",
      "code_hash": "638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e"
    },
    {
      "address": "secret1chsejpk9kfj4vt9ec6xvyguw539gsdtr775us2",
      "code_hash": "5a085bd8ed89de92b35134ddd12505a602c7759ea25fb5c089ba03c8535b3042"
    },
    {
      "address": "secret1sgaz455pmtgld6dequqayrdseq8vy2fc48n8y3",
      "code_hash": "638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e"
    }
  ],
  "owner": "secret16zvp2t86hdv5na3quygc9f2rnn9f9l4vszgtue"
}
```

```sh
INIT_MSG='{"register_tokens":[{"address":"secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek","code_hash":"af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e"},{"address":"secret19e75l25r6sa6nhdf4lggjmgpw0vmpfvsw5cnpe","code_hash":"638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e"},{"address":"secret1fl449muk5yq8dlad7a22nje4p5d2pnsgymhjfd","code_hash":"638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e"},{"address":"secret139qfh3nmuzfgwsx2npnmnjl4hrvj3xq5rmq8a0","code_hash":"638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e"},{"address":"secret1chsejpk9kfj4vt9ec6xvyguw539gsdtr775us2","code_hash":"5a085bd8ed89de92b35134ddd12505a602c7759ea25fb5c089ba03c8535b3042"},{"address":"secret1sgaz455pmtgld6dequqayrdseq8vy2fc48n8y3","code_hash":"638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e"}],"owner":"secret16zvp2t86hdv5na3quygc9f2rnn9f9l4vszgtue"}'
secretcli tx compute instantiate 55 "$INIT_MSG" \
  --admin secret1kh0x34l6z66zty6j0cafn0j3fgs20aytulew52 \
  --label adamantfi-router \
  --from adamant \
  --gas 400000 \
  --gas-prices 0.1uscrt
```

Contract Metadata

```json
{
  "contract_address": "secret1ysgg7h8x6ukax0phkqmeaq2t8kljg2cuymjuc4",
  "contract_info": {
    "code_id": "55",
    "creator": "secret16zvp2t86hdv5na3quygc9f2rnn9f9l4vszgtue",
    "label": "adamantfi-router",
    "created": { "block_height": "20482074", "tx_index": "0" },
    "ibc_port_id": "",
    "admin": "secret1kh0x34l6z66zty6j0cafn0j3fgs20aytulew52",
    "admin_proof": null
  }
}
```

Sanity Check

```sh
secretcli query compute query secret1ysgg7h8x6ukax0phkqmeaq2t8kljg2cuymjuc4 '{"supported_tokens":{}}'
```

### Tips

Get info about a contract:

```sh
secretcli q compute contract secret1...
```

Get the code hash for a contract:

```sh
secretcli q compute contract-hash secret1...
```

Get info about a recent tx:

```sh
secretcli q tx TXHASH
```

Decrypt the response of a recent contract tx:

```sh
secretcli q compute tx TXHASH
```
