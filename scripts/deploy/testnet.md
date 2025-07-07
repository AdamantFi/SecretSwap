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
secretcli tx compute instantiate 13565 '{"name":"bonded AdamantFi","admin":"secret1rv6lwg8xllpmtgeyt5csa4gvzal28tph6acnlj","symbol":"bADMT","decimals":6,"initial_balances":[{"address":"secret1rv6lwg8xllpmtgeyt5csa4gvzal28tph6acnlj","amount":"50000000000"}],"prng_seed":"YW1iZXIgcm9ja3M=","config":{"public_total_supply":true,"enable_deposit":false,"enable_redeem":false,"enable_mint":true,"enable_burn":true}}' --label bonded-adamantfi-0 --from dev --gas 200000 -y
```

Instantiate LP Staking

```sh
secretcli tx compute instantiate 13567 '{ "reward_token": { "address": "secret1n34sgcepgdxmt8mcfgu8076uzjdrh5au6vqnzg", "contract_hash": "744c588ed4181b13a49a7c75a49f10b84b22b24a69b1e5f3cdff34b2c343e888" }, "inc_token": { "address": "secret188cl047kqr740y27xlud7xrcgsqkervsz29x8t", "contract_hash": "744C588ED4181B13A49A7C75A49F10B84B22B24A69B1E5F3CDFF34B2C343E888" }, "reward_sources": [ ], "viewing_key": "SecretSwap", "token_info": { "name": "LP Token", "symbol": "LPT" }, "prng_seed": "cHJuZ19zZWVkX2J5dGVz", "subscribers": null }' --label AdamantFi-sscrt-usdc --from dev --gas 200000 -y
```

_Note: "inc_token" means "incentivized token" and is supposed to be the LP token, I think_

```json
{
  "reward_token": {
    "address": "secret1n34sgcepgdxmt8mcfgu8076uzjdrh5au6vqnzg",
    "contract_hash": "744c588ed4181b13a49a7c75a49f10b84b22b24a69b1e5f3cdff34b2c343e888"
  },
  "inc_token": {
    "address": "secret188cl047kqr740y27xlud7xrcgsqkervsz29x8t",
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

Instantiate Bulk Distributor

```sh
secretcli tx compute instantiate 13568 '{ "reward_token": { "address": "secret1n34sgcepgdxmt8mcfgu8076uzjdrh5au6vqnzg", "contract_hash": "744c588ed4181b13a49a7c75a49f10b84b22b24a69b1e5f3cdff34b2c343e888" }, "spy_to_reward": { "address": "secret1yauz94h0ck2lh02u96yum67cswjdapes7y62k8", "contract_hash": "c644edd309de7fd865b4fbe22054bcbe85a6c0b8abf5f110053fe1b2d0e8a72a" } }' --label AdamantFi-bulk-distributor-0 --from dev --gas 200000 -y
```

```json
{
  "reward_token": {
    "address": "secret1n34sgcepgdxmt8mcfgu8076uzjdrh5au6vqnzg",
    "contract_hash": "744c588ed4181b13a49a7c75a49f10b84b22b24a69b1e5f3cdff34b2c343e888"
  },
  "spy_to_reward": {
    "address": "secret1yauz94h0ck2lh02u96yum67cswjdapes7y62k8",
    "contract_hash": "c644edd309de7fd865b4fbe22054bcbe85a6c0b8abf5f110053fe1b2d0e8a72a"
  }
}
```

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

Manually update the allocation of rewards from the bulk distributor contract to the lp staking contract (updates users' pending rewards).

```sh
secretcli tx compute execute secret1tpt0nzsru5s9gyzz8gvtcer229vw788z7jsg29 '{"update_allocation":{"spy_addr":"secret1yauz94h0ck2lh02u96yum67cswjdapes7y62k8","spy_hash":"c644edd309de7fd865b4fbe22054bcbe85a6c0b8abf5f110053fe1b2d0e8a72a"}}' --from dev -y
```

### Reference

| code             | ID    | hash                                                             | address                                       |
| ---------------- | ----- | ---------------------------------------------------------------- | --------------------------------------------- |
| factory          | 13563 | 16ea6dca596d2e5e6eef41df6dc26a1368adaa238aa93f07959841e7968c51bd | secret1j7k7ev47rrwnzy4d2j7auu0fxww7ghtxzr686a |
| pair             | 13564 | 0dfd06c7c3c482c14d36ba9826b83d164003f2b0bb302f222db72361e0927490 | _get from factory_                            |
| token            | 13565 | 744c588ed4181b13a49a7c75a49f10b84b22b24a69b1e5f3cdff34b2c343e888 | secret1n34sgcepgdxmt8mcfgu8076uzjdrh5au6vqnzg |
| lp_staking       | 13567 | c644edd309de7fd865b4fbe22054bcbe85a6c0b8abf5f110053fe1b2d0e8a72a | secret1yauz94h0ck2lh02u96yum67cswjdapes7y62k8 |
| bulk_distributor | 13568 | 89083455710f42520356d0fbaa2d3a6f8e1362e1b67040cd59d365d02378fad5 | secret1tpt0nzsru5s9gyzz8gvtcer229vw788z7jsg29 |

Pair Info

```json
{
  "pairs": [
    {
      "asset_infos": [
        {
          "token": {
            "contract_addr": "secret13y8e73vfl40auct785zdmyygwesvxmutm7fjx4",
            "token_code_hash": "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e",
            "viewing_key": "SecretSwap"
          }
        },
        {
          "token": {
            "contract_addr": "secret1yhxy7ne975jjp6y6vq6p7kus2pnwclpq0mshc9",
            "token_code_hash": "9a00ca4ad505e9be7e6e6dddf8d939b7ec7e9ac8e109c8681f10db9cacb36d42",
            "viewing_key": "SecretSwap"
          }
        }
      ],
      "contract_addr": "secret1pgs6py3ydzruywa0wmf44wynst77zmrklfx22g",
      "liquidity_token": "secret188cl047kqr740y27xlud7xrcgsqkervsz29x8t",
      "token_code_hash": "0DFD06C7C3C482C14D36BA9826B83D164003F2B0BB302F222DB72361E0927490",
      "asset0_volume": "0",
      "asset1_volume": "0",
      "factory": {
        "address": "secret1j7k7ev47rrwnzy4d2j7auu0fxww7ghtxzr686a",
        "code_hash": "16ea6dca596d2e5e6eef41df6dc26a1368adaa238aa93f07959841e7968c51bd"
      }
    },
    {
      "asset_infos": [
        {
          "token": {
            "contract_addr": "secret13y8e73vfl40auct785zdmyygwesvxmutm7fjx4",
            "token_code_hash": "af74387e276be8874f07bec3a87023ee49b0e7ebe08178c49d0a49c3c98ed60e",
            "viewing_key": "SecretSwap"
          }
        },
        {
          "token": {
            "contract_addr": "secret1jzefe65dxw5ypnj6sfwmr8wv3fg56l47veq74h",
            "token_code_hash": "9a00ca4ad505e9be7e6e6dddf8d939b7ec7e9ac8e109c8681f10db9cacb36d42",
            "viewing_key": "SecretSwap"
          }
        }
      ],
      "contract_addr": "secret18gj7tjqv4n750ce2w9nnrgantrpj6ysrcexxd6",
      "liquidity_token": "secret1ylphg4xcqsn9xea05mwh2g220e6urpa93st70k",
      "token_code_hash": "0DFD06C7C3C482C14D36BA9826B83D164003F2B0BB302F222DB72361E0927490",
      "asset0_volume": "0",
      "asset1_volume": "0",
      "factory": {
        "address": "secret1j7k7ev47rrwnzy4d2j7auu0fxww7ghtxzr686a",
        "code_hash": "16ea6dca596d2e5e6eef41df6dc26a1368adaa238aa93f07959841e7968c51bd"
      }
    }
  ]
}
```
