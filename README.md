# SeeDAO Node contracts

## 部署地址

- `Goerli`: `0xB7b7A119246166e2A9360b693730476F0A5e0d37`
- `Mainnet`: `0x9d34D407D8586478b3e4c39BE633ED3D7be1c80C`


## 操作

### 设置白名单

先组装好白单并打印出`root`和`proof`。
```bash
npx hardhat root \
    --json ../data/no1.nodes.20221024.1.json \
    --token 1 > data/proof.json
```

```bash
npx hardhat whitelist \
    --contract 0x9d34D407D8586478b3e4c39BE633ED3D7be1c80C \
    --token 1 --root 0x61b960bf48f479edb5e6ee2634c2ce1c073275d4e3a72ddea58e0d8747ae5fce \
    --expiration 1666915200 --network mainnet
```