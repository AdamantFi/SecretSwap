# Creating pairs

| Token    | Address                                       | Code Hash                                                        |
| -------- | --------------------------------------------- | ---------------------------------------------------------------- |
| sSCRT    | secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek | af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e |
| sATOM    | secret14mzwd0ps5q277l20ly2q3aetqe3ev4m4260gf4 | ad91060456344fc8d8e93c0600a3957b8158605c044b3bef7048510b3157b807 |
| SILK     | secret1fl449muk5yq8dlad7a22nje4p5d2pnsgymhjfd | 638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e |
| ETH.axl  | secret139qfh3nmuzfgwsx2npnmnjl4hrvj3xq5rmq8a0 | 638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e |
| USDC.nbl | secret1chsejpk9kfj4vt9ec6xvyguw539gsdtr775us2 | 5a085bd8ed89de92b35134ddd12505a602c7759ea25fb5c089ba03c8535b3042 |
| JKL      | secret1sgaz455pmtgld6dequqayrdseq8vy2fc48n8y3 | 638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e |

sSCRT-sATOM

```json
{
  "create_pair": {
    "asset_infos": [
      {
        "token": {
          "contract_addr": "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
          "token_code_hash": "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e",
          "viewing_key": "SecretSwap"
        }
      },
      {
        "token": {
          "contract_addr": "secret14mzwd0ps5q277l20ly2q3aetqe3ev4m4260gf4",
          "token_code_hash": "ad91060456344fc8d8e93c0600a3957b8158605c044b3bef7048510b3157b807",
          "viewing_key": "SecretSwap"
        }
      }
    ]
  }
}
```

```sh
MSG_CREATE_PAIR='{"create_pair":{"asset_infos":[{"token":{"contract_addr":"secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek","token_code_hash":"af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e","viewing_key":"AdamantFi"}},{"token":{"contract_addr":"secret15l9cqgz5uezgydrglaak5ahfac69kmx2qpd6xt","token_code_hash":"c7fe67b243dfedc625a28ada303434d6f5a46a3086e7d2b5063a814e9f9a379d","viewing_key":"AdamantFi"}}]}}'
secretcli tx compute execute secret1kq9d7uzx77kntr5pl4k53rgzv0wk97ul8pvlwm "$MSG_CREATE_PAIR" --from adamant --gas 400000 --gas-prices 0.1uscrt
```

sSCRT-FATS

```json
{
  "create_pair": {
    "asset_infos": [
      {
        "token": {
          "contract_addr": "secret1xzlgeyuuyqje79ma6vllregprkmgwgavk8y798",
          "token_code_hash": "15361339b59f2753fc365283d4a144dd3a4838e237022ac0249992d8d9f3b88e",
          "viewing_key": "SecretSwap"
        }
      },
      {
        "token": {
          "contract_addr": "secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek",
          "token_code_hash": "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e",
          "viewing_key": "SecretSwap"
        }
      }
    ]
  }
}
```

```sh
MSG_CREATE_PAIR='{"create_pair":{"asset_infos":[{"token":{"contract_addr":"secret1xzlgeyuuyqje79ma6vllregprkmgwgavk8y798","token_code_hash":"15361339b59f2753fc365283d4a144dd3a4838e237022ac0249992d8d9f3b88e","viewing_key":"AdamantFi"}},{"token":{"contract_addr":"secret1k0jntykt7e4g3y88ltc60czgjuqdy4c9e8fzek","token_code_hash":"af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e","viewing_key":"AdamantFi"}}]}}'
secretcli tx compute execute secret1kq9d7uzx77kntr5pl4k53rgzv0wk97ul8pvlwm "$MSG_CREATE_PAIR" --from adamant --gas 400000 --gas-prices 0.1uscrt
```
