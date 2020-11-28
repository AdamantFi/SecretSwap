function wait_for_tx() {
    until (secretcli q tx "$1"); do
        sleep 5
    done
}


secretcli config output json
secretcli config chain-id enigma-pub-testnet-3
secretcli config keyring-backend test
secretcli config indent true
secretcli config trust-node true
secretcli config node tcp://localhost:26657

export SGX_MODE=SW

docker_name=secretdev
deployer_name=t1

deployer_address=$(secretcli keys show -a $deployer_name)
echo "Deployer address: '$deployer_address'"
genesis_address=$(docker exec $docker_name secretcli keys show -a a)
echo "Genesis address: '$genesis_address'"

docker exec $docker_name secretcli tx send $genesis_address $deployer_address 10000000000uscrt --from a -b block -y

docker exec -it $docker_name secretcli tx compute store "/root/code/build/secretswap_token.wasm" --from a --gas 2000000 -b block -y
token_code_id=$(secretcli query compute list-code | jq '.[-1]."id"')
token_code_hash=$(secretcli query compute list-code | jq '.[-1]."data_hash"')
echo "Stored token: '$token_code_id', '$token_code_hash'"

docker exec -it $docker_name secretcli tx compute store "/root/code/build/secretswap_factory.wasm" --from a --gas 2000000 -b block -y
factory_code_id=$(secretcli query compute list-code | jq '.[-1]."id"')
echo "Stored factory: '$factory_code_id'"

docker exec -it $docker_name secretcli tx compute store "/root/code/build/secretswap_pair.wasm" --from a --gas 2000000 -b block -y
pair_code_id=$(secretcli query compute list-code | jq '.[-1]."id"')
pair_code_hash=$(secretcli query compute list-code | jq '.[-1]."data_hash"')
echo "Stored pair: '$pair_code_id', '$pair_code_hash'"

echo "Deploying token..."
label=$(date +"%T")

export STORE_TX_HASH=$(
  secretcli tx compute instantiate $token_code_id '{"admin": "'$deployer_address'", "symbol": "TST", "decimals": 6, "initial_balances": [{"address": "'$deployer_address'", "amount": "1000000000"}], "prng_seed": "YWE", "name": "test"}' --from $deployer_name --gas 1500000 --label $label -b block -y |
  jq -r .txhash
)
wait_for_tx "$STORE_TX_HASH" "Waiting for instantiate to finish on-chain..."

token_addr=$(docker exec -it $docker_name secretcli query compute list-contract-by-code $token_code_id | jq '.[-1].address')
echo "Token address: '$token_addr'"

label=$(date +"%T")
export STORE_TX_HASH=$(
  secretcli tx compute instantiate $factory_code_id '{"pair_code_id": '$pair_code_id', "pair_code_hash": '$pair_code_hash', "token_code_id": '$token_code_id', "token_code_hash": '$token_code_hash', "prng_seed": "YWE"}' --label $label --from $deployer_name -y |
  jq -r .txhash
)
wait_for_tx "$STORE_TX_HASH" "Waiting for instantiate to finish on-chain..."

secretcli tx compute execute --label $label '{"create_pair": {"asset_infos": [{"native_token": {"denom": "uscrt"}},{"token": {"contract_addr": '$token_addr', "token_code_hash": '$token_code_hash', "viewing_key": ""}}]}}' --from $deployer_name -y --gas 1500000 -b block

pair_contract=$(docker exec -it $docker_name secretcli query compute list-contract-by-code $pair_code_id | jq '.[-1].address')
echo "Pair contract address: '$pair_contract'"

lptoken=$(docker exec -it $docker_name secretcli query compute list-contract-by-code $token_code_id | jq '.[-1].address')
echo "LP Token address: '$lptoken'"

secretcli tx compute execute $(echo "$token_addr" | tr -d '"') '{"increase_allowance": {"spender": '$pair_contract', "amount": "1000000"}}' -b block -y --from $deployer_name
secretcli tx compute execute $(echo "$pair_contract" | tr -d '"') '{"provide_liquidity": {"assets": [{"info": {"native_token": {"denom": "uscrt"}}, "amount": "1000000"}, {"info": {"token": {"contract_addr": '$token_addr', "token_code_hash": '$token_code_hash', "viewing_key": ""}}, "amount": "1000000"}]}}' --amount 1000000uscrt --from $deployer_name -y --gas 1500000 -b block

secretcli tx compute execute $(echo "$lptoken" | tr -d '"') '{"set_viewing_key": {"key": "yo"}}' -b block -y --from $deployer_name

lpbalance=$(secretcli q compute query $(echo "$lptoken" | tr -d '"') '{"balance": {"address": '$deployer_address', "key": "yo"}}' -b block -y --from $deployer_name | jq '.balance.amount')
echo "LP Token balance: '$lpbalance'"

echo $(secretcli q compute query $(echo "$pair_contract" | tr -d '"') '{"simulation": {"offer_asset": {"info": {"native_token": {"denom": "uscrt"}}, "amount": "1000"}}}')