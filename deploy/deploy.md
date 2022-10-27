
## 设置第一批名单

2022-10-24日 设置第一批名单。

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

## 设置第二批名单

2022-10-27日设置第二批白名单，多了两人。

```bash
npx hardhat root \
    --json ../data/no1.nodes.20221027.json \
    --token 1 > data/no1.proof.20221027.json
```

其中，过期时间没有改变。

```bash
npx hardhat whitelist \
    --contract 0x9d34D407D8586478b3e4c39BE633ED3D7be1c80C \
    --token 1 --root 0x7c26079375bb04ed5c29a83e7dad91eb29a1f577ec411cf2d391c1580c9e1a30 \
    --expiration 1666915200 --network mainnet
```