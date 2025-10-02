---
id: core
title: Core Concepts
---

# Core concepts

To start building with Keycard, here are some core concepts that you need to understand:

* Keycard is a BIP-32 compatible hardware wallet. You can ask it to sign hashes using a key on any BIP-32 path.
* The seed or any other private key (with the exception of those under the subtree defined EIP-1581) cannot be exported from the card.
* Keycard has no concept of transaction. It can sign any hash using a supported signature scheme. In the current revision  ECDSA over secp256k1 is the only scheme supported. The hash can be any 256-bit (32 bytes) long hash.
* Keycard allows loading seeds as defined by BIP-32. You can also load an extended keypair (keypair + chaining code).
* You can use Keycard to generate entropy (in the form of BIP39 mnemonic) for a new keypair. The generated entropy will be returned but will not be persisted. You need to load the final seed/keypair yourself.
* You can ask Keycard to generate and persist a keypair internally. Doing this will however prevent any form of backup so it must be used with caution
* Any operation involving the wallet or modifying card state (except factory reset) requires user authentication through a PIN.
* Any communication, with the exception of a few commands, requires setting up a secure channel. The secure channel guarantees confidentiality, integrity and authenticity of the communication.
* All communication is initiated by the host, which sends a command and wait for the Keycard to respond. The card cannot initiate communication.
* The communication protocol is as per ISO7816-4, using either the NFC or the contacted interface.

## Lifecycle states

Keycard has a few well-defined lifecycle state. The card functionality depends on what state it is in. The states are

* UNINITALIZED: In this state the card holds no secret and no authentication credential. The only possible operation is initialization, which is done through a single command (INIT). Initialization only setups user credentials but not wallet keys.
* INITALIZED: In this state the card is able to setup secure communication with the host and is able to authenticate the user but is still missing a seed so it is not functional as a hardware wallet and as such this state is just an intermediate step. You can load the seed at this stage.
* OPERATIONAL: In this state the card is fully operational and all of its functionality (exporting public keys, signing transactions, etc) is available. You can replace the loaded seed at any time. You can also remove the current seed, reverting to the INITIALIZED state
* LOCKED: If user authentication fails for a specific number of times (3 by default) the card goes into the blocked state. In this state no operation requiring user authentication is available. From this state, you can either go back to OPERATIONAL by using a PUK (if setup by the user) or to UNINITALIZED by performing a factory reset
* FROZEN: This state is similar to LOCKED, but from this state you can only transition back to UNITIALIZED by performing a factory reset. You get into this state by failing PUK authentication for a specific number of times (5 by default)

## Credentials

Keycard uses several credentials as part of its security architecture. It is important to understand their role and usage.

* User PIN: A 6-digit code that authenticates the user. This is the most sensitive piece of authentication since it enables performing priviledged operations like loading keys, signing, etc. It is first setup during initialization and can be changed at any time by the authenticated user. After a number of consecutive failed authentication attempts, the PIN is blocked. The number of attempts can only be set during card initialization, with the default being 3 (recommended value)
* Duress PIN: Same as User PIN, but when the user authenticates using this PIN key derivation will be altered in order to generate different keys then when using the regular PIN. This is done deterministically and thus the generated keys can be used for transactions. This PIN needs to be set during card initialization and can only be changed by authenticating with it and following the regular PIN change procedure.
* PUK: A 12-digit code that can be used to reset a blocked user PIN. This is as sensitive as the PIN. It is first setup during initialization and can be changed at any time by the authenticated user. After a number of consecutive failed authentication attempts, the PUK is blocked permanently. The number of attempts can only be set during card initialization, with the default being 5 (recommended value). For UX purpose this value can be set to a random value during setup without showing it to the user or keeping any track of it. This effectively disables the PUK until the user explicitly sets it up (if they want).
* Pairing password: An alphanumeric string, processed with 50000 iterations of PBKDF2-HMAC-SHA256 with salt "Keycard Pairing Password Salt". Needed during the pairing process. This password is only relevant for the pairing process itself and is sensitive only if the channel used for pairing is potentially suspectible to active MITM attacks. This is only the case if APDUs were to be generated remotely and relayed to a card reader. Since this is a very specific use case, the default password "KeycardDefaultPairing" is recommended during card initialization (this value is used in all SDKs and compatible wallets so using this guarantees smooth interoperability). The password can be changed by the user at any time and does not influence already existing pairings.
* Pairing secret: 33 bytes, a 1 byte index and a 32-byte secret. This piece of confidential information is generated in order to establish a secure channel resistent to MITM attacks between the host and the card. This step needs to be done once by the host for every new card it sees and the value needs to be persisted since it will be used to establish subsequent secure channels with the card. The card has a limit number of pairing slots. Pairing with a card allows communicating with it, however it doesn't grant any other privilege to the host and thus it is not as sensitive as the PIN.

## Identifiers

There are two main identifiers that are returned by the card immediately upon selecting the Keycard applet.

* Instance UID: This identifies the current instance of the Keycard applet. It is assigned randomly after the initialization step and can be used to identify a card. Especially useful to keep track of paired cards.
* Key UID: This identifies the keypair loaded on Keycard. Multiple cards will share the same Key UID if the same seed is loaded. This ID is useful to check if the card has the expected keypair.
