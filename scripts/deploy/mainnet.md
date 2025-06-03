Increase Allowances

```sh
secretcli tx compute execute secret13y8e73vfl40auct785zdmyygwesvxmutm7fjx4 '{"increase_allowance": {"spender": "secret1pgs6py3ydzruywa0wmf44wynst77zmrklfx22g", "amount": "1000000000000000000000"}}' --from dev -y
secretcli tx compute execute secret1yhxy7ne975jjp6y6vq6p7kus2pnwclpq0mshc9 '{"increase_allowance": {"spender": "secret1pgs6py3ydzruywa0wmf44wynst77zmrklfx22g", "amount": "1000000000000000000000"}}' --from dev -y

secretcli tx compute execute secret13y8e73vfl40auct785zdmyygwesvxmutm7fjx4 '{"increase_allowance": {"spender": "secret18gj7tjqv4n750ce2w9nnrgantrpj6ysrcexxd6", "amount": "1000000000000000000000"}}' --from dev -y
secretcli tx compute execute secret1jzefe65dxw5ypnj6sfwmr8wv3fg56l47veq74h '{"increase_allowance": {"spender": "secret18gj7tjqv4n750ce2w9nnrgantrpj6ysrcexxd6", "amount": "1000000000000000000000"}}' --from dev -y
```

Add Liquidity

```sh
secretcli tx compute execute secret1pgs6py3ydzruywa0wmf44wynst77zmrklfx22g '{"provide_liquidity": {"assets": [{"info": {"token": {"contract_addr":  "secret13y8e73vfl40auct785zdmyygwesvxmutm7fjx4", "token_code_hash":  "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e", "viewing_key": "SecretSwap"}}, "amount": "100000000"}, {"info": {"token": {"contract_addr":  "secret1yhxy7ne975jjp6y6vq6p7kus2pnwclpq0mshc9", "token_code_hash":  "9a00ca4ad505e9be7e6e6dddf8d939b7ec7e9ac8e109c8681f10db9cacb36d42", "viewing_key": "SecretSwap"}}, "amount": "1000000000000000000000"}]}}' --from dev -y --gas 1500000

secretcli tx compute execute secret18gj7tjqv4n750ce2w9nnrgantrpj6ysrcexxd6 '{"provide_liquidity": {"assets": [{"info": {"token": {"contract_addr":  "secret13y8e73vfl40auct785zdmyygwesvxmutm7fjx4", "token_code_hash":  "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e", "viewing_key": "SecretSwap"}}, "amount": "100000000"}, {"info": {"token": {"contract_addr":  "secret1jzefe65dxw5ypnj6sfwmr8wv3fg56l47veq74h", "token_code_hash":  "9a00ca4ad505e9be7e6e6dddf8d939b7ec7e9ac8e109c8681f10db9cacb36d42", "viewing_key": "SecretSwap"}}, "amount": "100000000"}]}}' --from dev -y --gas 1500000
```

Create reward token

```sh
secretcli tx compute instantiate 877 \
  '{"name":"bonded ADMT","admin":"secret16zvp2t86hdv5na3quygc9f2rnn9f9l4vszgtue","symbol":"bADMT","decimals":6,"initial_balances":[{"address":"secret16zvp2t86hdv5na3quygc9f2rnn9f9l4vszgtue","amount":"50000000000"}],"prng_seed":"YW1iZXIgcm9ja3M=","config":{"public_total_supply":true,"enable_deposit":false,"enable_redeem":false,"enable_mint":true,"enable_burn":true}}' \
  --admin secret1kh0x34l6z66zty6j0cafn0j3fgs20aytulew52 \
  --label bADMT \
  --from adamant \
  --gas 100000 \
  --gas-prices 0.1uscrt
```

Store lp-staking.wasm.gz

```sh
secretcli tx compute store "build/lp-staking.wasm.gz" \
  --from adamant \
  --gas 3000000 \
  --gas-prices 0.1uscrt
```

Instantiate LP Staking

```sh
secretcli tx compute instantiate 2276 \
  '{ "reward_token": { "address": "secret1cu5gvrvu24hm36fzyq46vca7u25llrymj6ntek", "contract_hash": "638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e" }, "inc_token": { "address": "secret18xd8j88jrwzagnv09cegv0fm3aca6d3qlfem6v", "contract_hash": "744c588ed4181b13a49a7c75a49f10b84b22b24a69b1e5f3cdff34b2c343e888" }, "reward_sources": [ ], "viewing_key": "SecretSwap", "token_info": { "name": "LP Token", "symbol": "LPT" }, "prng_seed": "cHJuZ19zZWVkX2J5dGVz", "subscribers": null }' \
  --admin secret1kh0x34l6z66zty6j0cafn0j3fgs20aytulew52 \
  --label "AdamantFi sscrt-usdc.nbl staking" \
  --from adamant \
  --gas 200000 \
  --gas-prices 0.1uscrt
```

_Note: "inc_token" means "incentivized token" and is the LP token in this case_

```json
{
  "reward_token": {
    "address": "secret1cu5gvrvu24hm36fzyq46vca7u25llrymj6ntek",
    "contract_hash": "638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e"
  },
  "inc_token": {
    "address": "secret18xd8j88jrwzagnv09cegv0fm3aca6d3qlfem6v",
    "contract_hash": "744C588ED4181B13A49A7C75A49F10B84B22B24A69B1E5F3CDFF34B2C343E888"
  },
  "reward_sources": [],
  "viewing_key": "SecretSwap",
  "token_info": {
    "name": "LP Token",
    "symbol": "LPT"
  },
  "prng_seed": "cHJuZ19zZWVkX2J5dGVz",
  "subscribers": null
}
```

Store bulk-distributor.wasm.gz

```sh
secretcli tx compute store "build/bulk-distributor.wasm.gz" \
  --from adamant \
  --gas 3000000 \
  --gas-prices 0.1uscrt
```

Instantiate Bulk Distributor

```sh
secretcli tx compute instantiate 2277 '{ "reward_token": { "address": "secret1cu5gvrvu24hm36fzyq46vca7u25llrymj6ntek", "contract_hash": "638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e" }, "spy_to_reward": { "address": "secret15rlkcn54mjkwfl6s735zjx3v7zcry6g499t5ev", "contract_hash": "c644edd309de7fd865b4fbe22054bcbe85a6c0b8abf5f110053fe1b2d0e8a72a" } }' \
  --admin secret1kh0x34l6z66zty6j0cafn0j3fgs20aytulew52 \
  --label "AdamantFi sscrt-usdc.nbl bulk-distributor" \
  --from adamant \
  --gas 200000 \
  --gas-prices 0.1uscrt
```

```json
{
  "reward_token": {
    "address": "secret1cu5gvrvu24hm36fzyq46vca7u25llrymj6ntek",
    "contract_hash": "638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e"
  },
  "spy_to_reward": {
    "address": "secret15rlkcn54mjkwfl6s735zjx3v7zcry6g499t5ev",
    "contract_hash": "c644edd309de7fd865b4fbe22054bcbe85a6c0b8abf5f110053fe1b2d0e8a72a"
  }
}
```

# the rest is not done yet!

Add reward source

```sh
secretcli tx compute execute secret1yauz94h0ck2lh02u96yum67cswjdapes7y62k8 '{"add_reward_sources":{"contracts":[{"address":"secret1tpt0nzsru5s9gyzz8gvtcer229vw788z7jsg29","contract_hash": "89083455710f42520356d0fbaa2d3a6f8e1362e1b67040cd59d365d02378fad5" }]}}' --from dev --gas 300000 -y
```

To add reward tokens, send them to the bulk_distributor with the attached message encoded to base64:

```json
{
  "new_bulk_reward": { "distribute_over": 1000 }
}
```

_NOTE: `distribute_over` is expressed in blocks, not seconds_

```sh
echo -n '{"new_bulk_reward": { "distribute_over": 1000 }}' | base64
```

In this example, `"msg": "eyJuZXdfYnVsa19yZXdhcmQiOiB7ICJkaXN0cmlidXRlX292ZXIiOiAxMDAwIH19"`

The full `send` message (for the snip20 reward token):

```sh
secretcli tx compute execute secret1n34sgcepgdxmt8mcfgu8076uzjdrh5au6vqnzg '{"send":{"recipient":"secret1tpt0nzsru5s9gyzz8gvtcer229vw788z7jsg29","amount":"1000000","msg":"eyJuZXdfYnVsa19yZXdhcmQiOiB7ICJkaXN0cmlidXRlX292ZXIiOiAxMDAwIH19"}}' --from dev -y
```

### Reference

| code             | ID   | hash                                                             | address                                       |
| ---------------- | ---- | ---------------------------------------------------------------- | --------------------------------------------- |
| factory          | 30   | 16ea6dca596d2e5e6eef41df6dc26a1368adaa238aa93f07959841e7968c51bd | secret18reusruqrq7a0ug4vn6ue2pg59lm2dtsqxu6f3 |
| pair             | 31   | 0dfd06c7c3c482c14d36ba9826b83d164003f2b0bb302f222db72361e0927490 | _get from factory_                            |
| token            | 2005 | 744c588ed4181b13a49a7c75a49f10b84b22b24a69b1e5f3cdff34b2c343e888 | secret1n34sgcepgdxmt8mcfgu8076uzjdrh5au6vqnzg |
| lp_staking       | 2276 | c644edd309de7fd865b4fbe22054bcbe85a6c0b8abf5f110053fe1b2d0e8a72a | secret15rlkcn54mjkwfl6s735zjx3v7zcry6g499t5ev |
| bulk_distributor | 2277 | 89083455710f42520356d0fbaa2d3a6f8e1362e1b67040cd59d365d02378fad5 | --------------------------------------------- |

Pair Info

```json
{
  "pairs": [
    {
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
      ],
      "contract_addr": "secret1nu0l5pnszp0np349ka0hdmtjctrgd2f5v69ypq",
      "liquidity_token": "secret1nuz5f9mqk5dp9hsjqxyhxax86jr466rzs5sh0s",
      "token_code_hash": "0DFD06C7C3C482C14D36BA9826B83D164003F2B0BB302F222DB72361E0927490",
      "asset0_volume": "0",
      "asset1_volume": "0",
      "factory": {
        "address": "secret18reusruqrq7a0ug4vn6ue2pg59lm2dtsqxu6f3",
        "code_hash": "16ea6dca596d2e5e6eef41df6dc26a1368adaa238aa93f07959841e7968c51bd"
      }
    },
    {
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
            "contract_addr": "secret1fl449muk5yq8dlad7a22nje4p5d2pnsgymhjfd",
            "token_code_hash": "638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e",
            "viewing_key": "SecretSwap"
          }
        }
      ],
      "contract_addr": "secret13v4slrjs086lm46ltpl494awfhaq9kzal5vusu",
      "liquidity_token": "secret106cdj82hhh8uupew9qegsugzk2tsefhw5qrkkk",
      "token_code_hash": "0DFD06C7C3C482C14D36BA9826B83D164003F2B0BB302F222DB72361E0927490",
      "asset0_volume": "0",
      "asset1_volume": "0",
      "factory": {
        "address": "secret18reusruqrq7a0ug4vn6ue2pg59lm2dtsqxu6f3",
        "code_hash": "16ea6dca596d2e5e6eef41df6dc26a1368adaa238aa93f07959841e7968c51bd"
      }
    },
    {
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
            "contract_addr": "secret139qfh3nmuzfgwsx2npnmnjl4hrvj3xq5rmq8a0",
            "token_code_hash": "638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e",
            "viewing_key": "SecretSwap"
          }
        }
      ],
      "contract_addr": "secret10jlqxf3zjcyrxlvxfq4v9znzd3g098f39t8rjy",
      "liquidity_token": "secret10rs5z2x92axlccxdq5pdr0nnnexg09al4tcnct",
      "token_code_hash": "0DFD06C7C3C482C14D36BA9826B83D164003F2B0BB302F222DB72361E0927490",
      "asset0_volume": "0",
      "asset1_volume": "0",
      "factory": {
        "address": "secret18reusruqrq7a0ug4vn6ue2pg59lm2dtsqxu6f3",
        "code_hash": "16ea6dca596d2e5e6eef41df6dc26a1368adaa238aa93f07959841e7968c51bd"
      }
    },
    {
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
            "contract_addr": "secret1chsejpk9kfj4vt9ec6xvyguw539gsdtr775us2",
            "token_code_hash": "5a085bd8ed89de92b35134ddd12505a602c7759ea25fb5c089ba03c8535b3042",
            "viewing_key": "SecretSwap"
          }
        }
      ],
      "contract_addr": "secret1avsx6cnmqqjcnnuu858ak8zkttug7v097jxvzq",
      "liquidity_token": "secret18xd8j88jrwzagnv09cegv0fm3aca6d3qlfem6v",
      "token_code_hash": "0DFD06C7C3C482C14D36BA9826B83D164003F2B0BB302F222DB72361E0927490",
      "asset0_volume": "0",
      "asset1_volume": "0",
      "factory": {
        "address": "secret18reusruqrq7a0ug4vn6ue2pg59lm2dtsqxu6f3",
        "code_hash": "16ea6dca596d2e5e6eef41df6dc26a1368adaa238aa93f07959841e7968c51bd"
      }
    },
    {
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
            "contract_addr": "secret1sgaz455pmtgld6dequqayrdseq8vy2fc48n8y3",
            "token_code_hash": "638a3e1d50175fbcb8373cf801565283e3eb23d88a9b7b7f99fcc5eb1e6b561e",
            "viewing_key": "SecretSwap"
          }
        }
      ],
      "contract_addr": "secret1cku7xy9655clz08qcg94g5j3sm644aa94twt0z",
      "liquidity_token": "secret1ex9cm7l8w0xxchptykqsc2vdr79pk3nrm0sxj3",
      "token_code_hash": "0DFD06C7C3C482C14D36BA9826B83D164003F2B0BB302F222DB72361E0927490",
      "asset0_volume": "0",
      "asset1_volume": "0",
      "factory": {
        "address": "secret18reusruqrq7a0ug4vn6ue2pg59lm2dtsqxu6f3",
        "code_hash": "16ea6dca596d2e5e6eef41df6dc26a1368adaa238aa93f07959841e7968c51bd"
      }
    }
  ]
}
```
