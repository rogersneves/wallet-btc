// dependencias
const bip32 = require('bip32')
const bip39 = require('bip39')
const bitcoin = require('bitcoinjs-lib')

// rede
//const network = bitcoin.network.bitcoin
const network = bitcoin.networks.testnet

// derivação de endereços de carteiras HD
const path = `m/49'/1'/0'/0`

// criando o menemonic para a seed (palavras de senha)
let mnemonic = bip39.generateMnemonic()
const seed = bip39.mnemonicToSeedSync(mnemonic)

// criando a raiz da carteira HD
let root = bip32.fromSeed(seed, network)

// criando uma conta (par PVT PUB keys)
let account = root.derivePath(path)
let node = account.derive(0).derive(0)

// criando endereço da conta
let btcAddress = bitcoin.payments.p2pkh({
	pubkey: node.publicKey,
	network: network,
}).address

// log
console.log("Carteira gerada")
console.log("Endereço: ", btcAddress)
console.log("Chave privada: ", node.toWIF())
console.log("Seed: ", mnemonic)


