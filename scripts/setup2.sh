#!/bin/bash

set -xe


function secretcli() {
  export docker_name=secretdev
  docker exec "$docker_name" secretcli "$@";
}

function wait_for_tx() {
  until (secretcli q tx "$1"); do
      sleep 5
  done
}

export SGX_MODE=SW
export deployer_name=a
export wasm_path=/root/code/build

export deployer_address=$(secretcli keys show -a $deployer_name)
echo "Deployer address: '$deployer_address'"

secretcli tx compute store "${wasm_path}/secretswap_token.wasm" --from "$deployer_name" --gas 3000000 -b block -y
token_code_id=$(secretcli query compute list-code | jq '.[-1]."id"')
token_code_hash=$(secretcli query compute list-code | jq '.[-1]."data_hash"')
echo "Stored token: '$token_code_id', '$token_code_hash'"

secretcli tx compute store "${wasm_path}/secretswap_factory.wasm" --from "$deployer_name" --gas 3000000 -b block -y
factory_code_id=$(secretcli query compute list-code | jq '.[-1]."id"')
echo "Stored factory: '$factory_code_id'"

secretcli tx compute store "${wasm_path}/secretswap_pair.wasm" --from "$deployer_name" --gas 3000000 -b block -y
pair_code_id=$(secretcli query compute list-code | jq '.[-1]."id"')
pair_code_hash=$(secretcli query compute list-code | jq '.[-1]."data_hash"')
echo "Stored pair: '$pair_code_id', '$pair_code_hash'"

echo "Deploying ETH..."

export TX_HASH=$(
  secretcli tx compute instantiate $token_code_id '{"admin": "'$deployer_address'", "symbol": "SETH", "decimals": 18, "initial_balances": [{"address": "'$deployer_address'", "amount": "100000000000000000000000"}], "prng_seed": "YWE", "name": "test"}' --from $deployer_name --gas 1500000 --label ETH -b block -y |
  jq -r .txhash
)
wait_for_tx "$TX_HASH" "Waiting for tx to finish on-chain..."
secretcli q compute tx $TX_HASH

eth_addr=$(secretcli query compute list-contract-by-code $token_code_id | jq '.[-1].address')
echo "ETH address: '$eth_addr'"

echo "Deploying DAI..."

export TX_HASH=$(
  secretcli tx compute instantiate $token_code_id '{"admin": "'$deployer_address'", "symbol": "SDAI", "decimals": 18, "initial_balances": [{"address": "'$deployer_address'", "amount": "100000000000000000000000"}], "prng_seed": "YWE", "name": "test"}' --from $deployer_name --gas 1500000 --label DAI -b block -y |
  jq -r .txhash
)
wait_for_tx "$TX_HASH" "Waiting for tx to finish on-chain..."
secretcli q compute tx $TX_HASH

dai_addr=$(secretcli query compute list-contract-by-code $token_code_id | jq '.[-1].address')
echo "DAI address: '$dai_addr'"

echo "Deploying AMM factory..."

label=amm
export TX_HASH=$(
  secretcli tx compute instantiate $factory_code_id '{"pair_code_id": '$pair_code_id', "pair_code_hash": '$pair_code_hash', "token_code_id": '$token_code_id', "token_code_hash": '$token_code_hash', "prng_seed": "YWE"}' --label $label --from $deployer_name -y |
  jq -r .txhash
)
wait_for_tx "$TX_HASH" "Waiting for tx to finish on-chain..."
secretcli q compute tx $TX_HASH

factory_contract=$(secretcli query compute list-contract-by-code $factory_code_id | jq '.[-1].address')
echo "Factory address: '$factory_contract'"

echo "Creating sETH/SCRT pair..."

secretcli tx compute execute --label $label '{"create_pair": {"asset_infos": [{"token": {"contract_addr": '$eth_addr', "token_code_hash": '$token_code_hash', "viewing_key": ""}},{"native_token": {"denom": "uscrt"}}]}}' --from $deployer_name -y --gas 1500000 -b block

pair_contract=$(secretcli query compute list-contract-by-code $pair_code_id | jq '.[-1].address')
echo "sETH/SCRT Pair contract address: '$pair_contract'"

secretcli tx compute execute $(echo "$eth_addr" | tr -d '"') '{"increase_allowance": {"spender": '$pair_contract', "amount": "1000000000000000000000"}}' -b block -y --from $deployer_name
secretcli tx compute execute $(echo "$pair_contract" | tr -d '"') '{"provide_liquidity": {"assets": [{"info": {"native_token": {"denom": "uscrt"}}, "amount": "100000000"}, {"info": {"token": {"contract_addr": '$eth_addr', "token_code_hash": '$token_code_hash', "viewing_key": ""}}, "amount": "1000000000000000000000"}]}}' --amount 100000000uscrt --from $deployer_name -y --gas 1500000 -b block

echo "Creating sETH/sDAI pair..."

secretcli tx compute execute --label $label '{"create_pair": {"asset_infos": [{"token": {"contract_addr": '$eth_addr', "token_code_hash": '$token_code_hash', "viewing_key": ""}},{"token": {"contract_addr": '$dai_addr', "token_code_hash": '$token_code_hash', "viewing_key": ""}}]}}' --from $deployer_name -y --gas 1500000 -b block

pair_contract_eth_dai=$(secretcli query compute list-contract-by-code $pair_code_id | jq '.[-1].address')
echo "sETH/sDAI Pair contract address: '$pair_contract_eth_dai'"

secretcli tx compute execute $(echo "$eth_addr" | tr -d '"') '{"increase_allowance": {"spender": '$pair_contract_eth_dai', "amount": "1000000000000000000000"}}' -b block -y --from $deployer_name
secretcli tx compute execute $(echo "$dai_addr" | tr -d '"') '{"increase_allowance": {"spender": '$pair_contract_eth_dai', "amount": "1000000000000000000000"}}' -b block -y --from $deployer_name
secretcli tx compute execute $(echo "$pair_contract_eth_dai" | tr -d '"') '{"provide_liquidity": {"assets": [{"info": {"token": {"contract_addr": '$dai_addr', "token_code_hash": '$token_code_hash', "viewing_key": ""}}, "amount": "1000000000000000000000"}, {"info": {"token": {"contract_addr": '$eth_addr', "token_code_hash": '$token_code_hash', "viewing_key": ""}}, "amount": "1000000000000000000000"}]}}' --from $deployer_name -y --gas 1500000 -b block

secretcli tx send a secret1x6my6xxxkladvsupcka7k092m50rdw8pk8dpq9 100000000uscrt -y -b block
secretcli tx compute execute $(echo "$eth_addr" | tr -d '"') '{"transfer":{"recipient":"secret1x6my6xxxkladvsupcka7k092m50rdw8pk8dpq9","amount":"1000000000000000000000"}}' --from a -y -b block
secretcli tx compute execute $(echo "$dai_addr" | tr -d '"') '{"transfer":{"recipient":"secret1x6my6xxxkladvsupcka7k092m50rdw8pk8dpq9","amount":"1000000000000000000000"}}' --from a -y -b block

echo Factory: "$factory_contract" | tr -d '"'
echo ETH: "$eth_addr" | tr -d '"'
echo DAI: "$dai_addr" | tr -d '"'
