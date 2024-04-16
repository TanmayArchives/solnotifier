import { MigrationInterface, QueryRunner } from 'typeorm'

export class Script1702311247028 implements MigrationInterface {
  name = 'Script1702311247028'

  public async up(queryRunner: QueryRunner): Promise<void> {
    try {
      await queryRunner.query(
        `
        INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('e964ae79-ec87-4a98-acec-3168d6e72d0b', '1Blake28@gmail.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=3', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('d0561aa0-f1ea-4831-93d7-e1db78a13620', '7Harmony.Shanahan@hotmail.com', 'Dana Lee', 'https://i.imgur.com/YfJQV5z.png?id=9', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('b2c20bf9-51fe-423d-8e23-fc84bb6b33b0', '13Jenifer80@hotmail.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=15', 'active', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('c0daf43d-0b93-4b6e-8531-1f9080c0776a', '19Richmond_Reilly@gmail.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=21', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('b362472f-c514-4f91-bcb0-e6ecc0548581', '25Donnell_Gottlieb@gmail.com', 'Bob Johnson', 'https://i.imgur.com/YfJQV5z.png?id=27', 'suspended', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('56fa50c2-5870-4237-8f69-2bbbc485a504', '31Caterina.Heller@hotmail.com', 'Charlie Davis', 'https://i.imgur.com/YfJQV5z.png?id=33', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('0ec7ffbd-aa45-4d97-a4bc-1a125b6f3cec', '43Kelley_Daniel29@gmail.com', 'Alice Smith', 'https://i.imgur.com/YfJQV5z.png?id=45', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('9d0d715c-1e31-475f-9743-0740af619d42', '49Raleigh.Beahan@gmail.com', 'Bob Johnson', 'https://i.imgur.com/YfJQV5z.png?id=51', 'inactive', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');
INSERT INTO "user" ("id", "email", "name", "pictureUrl", "status", "password") VALUES ('bb34ba18-c84c-4c44-a522-19fa40c3d329', '55Ebony6@gmail.com', 'Bob Johnson', 'https://i.imgur.com/YfJQV5z.png?id=57', 'pending', '$2b$10$ppubsZypHzkqW9dkhMB97ul2.wSsvaCoDE2CzqIHygddRMKXvpYUC');

INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId", "type") VALUES ('54b25999-49a5-4f7f-b8dd-9cbba61caccf', 'Security Alert', 'Your portfolio value has increased by 5 in the last 24 hours.', 'MarketWatch', '64Helmer91@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=65', 'https://i.imgur.com/YfJQV5z.png?id=66', '0ec7ffbd-aa45-4d97-a4bc-1a125b6f3cec', 'Market');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId", "type") VALUES ('9b000b78-8ecc-406c-8793-a590df347f5e', 'NFT Acquisition', 'Bitcoin has reached a new alltime high.', 'TransactionBot', '72Obie35@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=73', 'https://i.imgur.com/YfJQV5z.png?id=74', 'b362472f-c514-4f91-bcb0-e6ecc0548581', 'Transaction');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId", "type") VALUES ('e2b85b2f-967c-4361-a30a-85372625f974', 'Security Alert', 'Your transaction for 2 ETH has been confirmed.', 'SecureGuard', '80Logan_Brown@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=81', 'https://i.imgur.com/YfJQV5z.png?id=82', 'b2c20bf9-51fe-423d-8e23-fc84bb6b33b0', 'Market');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId", "type") VALUES ('79ec100c-662f-43e6-b906-1019cc9cdadf', 'Security Alert', 'Bitcoin has reached a new alltime high.', 'TransactionBot', '88Stephen96@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=89', 'https://i.imgur.com/YfJQV5z.png?id=90', '56fa50c2-5870-4237-8f69-2bbbc485a504', 'Security');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId", "type") VALUES ('0d3e4645-d290-4e32-a233-118801ee0a05', 'Security Alert', 'Bitcoin has reached a new alltime high.', 'CryptoTracker', '96Howell_Hickle@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=97', 'https://i.imgur.com/YfJQV5z.png?id=98', 'e964ae79-ec87-4a98-acec-3168d6e72d0b', 'Security');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId", "type") VALUES ('3976fbd4-9cca-4aea-b4ac-da767f0fd384', 'Portfolio Update', 'Bitcoin has reached a new alltime high.', 'MarketWatch', '104Malinda.Steuber@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=105', 'https://i.imgur.com/YfJQV5z.png?id=106', '56fa50c2-5870-4237-8f69-2bbbc485a504', 'NFT');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId", "type") VALUES ('8019bc2b-6bfb-4d82-9eae-2bef1e3f313d', 'Price Alert', 'You have successfully acquired a new NFT.', 'CryptoTracker', '112Duane_Kassulke59@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=113', 'https://i.imgur.com/YfJQV5z.png?id=114', '0ec7ffbd-aa45-4d97-a4bc-1a125b6f3cec', 'Portfolio');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId", "type") VALUES ('163e577e-e9b6-4824-828e-7f92c98d59ea', 'Price Alert', 'Bitcoin has reached a new alltime high.', 'TransactionBot', '120Garland_Roberts7@gmail.com', 'https://i.imgur.com/YfJQV5z.png?id=121', 'https://i.imgur.com/YfJQV5z.png?id=122', 'e964ae79-ec87-4a98-acec-3168d6e72d0b', 'Transaction');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId", "type") VALUES ('c3c58ab5-355e-42f6-a467-8e87db8aaa13', 'Portfolio Update', 'Suspicious activity detected in your account.', 'TransactionBot', '128Carolanne33@hotmail.com', 'https://i.imgur.com/YfJQV5z.png?id=129', 'https://i.imgur.com/YfJQV5z.png?id=130', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'NFT');
INSERT INTO "notification" ("id", "title", "message", "senderName", "senderEmail", "senderPictureUrl", "redirectUrl", "userId", "type") VALUES ('65959a8b-e562-4257-8ea4-c6f4cbf265bc', 'Transaction Confirmation', 'Bitcoin has reached a new alltime high.', 'SecureGuard', '136Gertrude12@yahoo.com', 'https://i.imgur.com/YfJQV5z.png?id=137', 'https://i.imgur.com/YfJQV5z.png?id=138', 'd0561aa0-f1ea-4831-93d7-e1db78a13620', 'Portfolio');

INSERT INTO "blockchain" ("id", "name") VALUES ('196c90d9-5d0d-4d0f-8ccd-d7238b478893', 'Solana');
INSERT INTO "blockchain" ("id", "name") VALUES ('6ef5d389-10bd-403e-9a20-2bf314fca8f2', 'Ethereum');
INSERT INTO "blockchain" ("id", "name") VALUES ('7cedc074-6abe-437d-8803-1766a52a94b2', 'Cardano');
INSERT INTO "blockchain" ("id", "name") VALUES ('8c228197-b851-4c1e-a071-334a12e0c835', 'Solana');
INSERT INTO "blockchain" ("id", "name") VALUES ('5328c5b6-a9cf-4747-aec8-1a2cd3f9b7bf', 'Polkadot');
INSERT INTO "blockchain" ("id", "name") VALUES ('7727823b-ff79-4496-beef-c07e7875c227', 'Ethereum');
INSERT INTO "blockchain" ("id", "name") VALUES ('f26fa041-fa70-4c5a-b887-b1307dffe288', 'Bitcoin');
INSERT INTO "blockchain" ("id", "name") VALUES ('5d6543ed-22e4-4c74-aa4a-9d04d7a4825b', 'Polkadot');
INSERT INTO "blockchain" ("id", "name") VALUES ('c315c888-c011-4424-8a75-010f764ac6b9', 'Ethereum');
INSERT INTO "blockchain" ("id", "name") VALUES ('4ead8ef5-4ffb-410d-bc9c-9c42e1d4c6b6', 'Bitcoin');

INSERT INTO "public_key" ("id", "publicKey", "userId", "blockchainId") VALUES ('d197dca2-2168-408a-81b2-574fcb806dc1', '0x9f8e7d6c5b4a392837263545678909876543210f', 'e964ae79-ec87-4a98-acec-3168d6e72d0b', '6ef5d389-10bd-403e-9a20-2bf314fca8f2');
INSERT INTO "public_key" ("id", "publicKey", "userId", "blockchainId") VALUES ('12bd1515-abf6-4560-bf93-02ee1ae23995', '0x9f8e7d6c5b4a392837263545678909876543210f', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', 'f26fa041-fa70-4c5a-b887-b1307dffe288');
INSERT INTO "public_key" ("id", "publicKey", "userId", "blockchainId") VALUES ('31019261-8fb0-4630-ad35-b34c80d73150', '0x4e3f23f45c3542c0a2a45b6c7d3e2f1b2a3b4c5d', '9d0d715c-1e31-475f-9743-0740af619d42', '5328c5b6-a9cf-4747-aec8-1a2cd3f9b7bf');
INSERT INTO "public_key" ("id", "publicKey", "userId", "blockchainId") VALUES ('096feb4a-6965-4ba7-a052-6ece2e3195d1', '0x9f8e7d6c5b4a392837263545678909876543210f', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '5d6543ed-22e4-4c74-aa4a-9d04d7a4825b');
INSERT INTO "public_key" ("id", "publicKey", "userId", "blockchainId") VALUES ('136b3af1-3516-4f49-92f3-9861d689e3ef', '0x7e4d5c6b7a8f9e0a1b2c3d4e5f6a7b8c9d0e1f2a', '0ec7ffbd-aa45-4d97-a4bc-1a125b6f3cec', '196c90d9-5d0d-4d0f-8ccd-d7238b478893');
INSERT INTO "public_key" ("id", "publicKey", "userId", "blockchainId") VALUES ('4c13ad0a-ad84-453c-840f-58048ec652a1', '0x9f8e7d6c5b4a392837263545678909876543210f', 'd0561aa0-f1ea-4831-93d7-e1db78a13620', '196c90d9-5d0d-4d0f-8ccd-d7238b478893');
INSERT INTO "public_key" ("id", "publicKey", "userId", "blockchainId") VALUES ('2fa32698-a167-4ae5-ae9e-c3cee7c5f22f', '0x7e4d5c6b7a8f9e0a1b2c3d4e5f6a7b8c9d0e1f2a', '0ec7ffbd-aa45-4d97-a4bc-1a125b6f3cec', '8c228197-b851-4c1e-a071-334a12e0c835');
INSERT INTO "public_key" ("id", "publicKey", "userId", "blockchainId") VALUES ('daa3acf8-71e0-4802-8a20-952bd591bd0e', '0x9f8e7d6c5b4a392837263545678909876543210f', 'b2c20bf9-51fe-423d-8e23-fc84bb6b33b0', '5d6543ed-22e4-4c74-aa4a-9d04d7a4825b');
INSERT INTO "public_key" ("id", "publicKey", "userId", "blockchainId") VALUES ('f1adac6e-f567-4d65-9460-e2ddc02451fa', '0x7e4d5c6b7a8f9e0a1b2c3d4e5f6a7b8c9d0e1f2a', '21a857f1-ba5f-4435-bcf6-f910ec07c0dc', '4ead8ef5-4ffb-410d-bc9c-9c42e1d4c6b6');
INSERT INTO "public_key" ("id", "publicKey", "userId", "blockchainId") VALUES ('e6cc64e1-23ac-4939-8e4b-a850384fea87', '0xa4b8c2d33f3240c8985e4a83d6b251a4e9d9b1f3', '9d0d715c-1e31-475f-9743-0740af619d42', '4ead8ef5-4ffb-410d-bc9c-9c42e1d4c6b6');

INSERT INTO "cryptocurrency" ("id", "symbol", "name") VALUES ('829c0ace-1a61-4038-97df-c20084c77b2f', 'ETH', 'Ethereum');
INSERT INTO "cryptocurrency" ("id", "symbol", "name") VALUES ('bbd8b6a5-fa20-432f-a30f-a3222227d0d8', 'BTC', 'Cardano');
INSERT INTO "cryptocurrency" ("id", "symbol", "name") VALUES ('b8edac20-9e0d-424b-9e3d-35bfd098d352', 'LTC', 'Ripple');
INSERT INTO "cryptocurrency" ("id", "symbol", "name") VALUES ('14fc6c84-856e-4994-b073-fed44f7ae25c', 'ADA', 'Litecoin');
INSERT INTO "cryptocurrency" ("id", "symbol", "name") VALUES ('42f6e757-1cdd-46a8-8854-5763a52c3e30', 'XRP', 'Ripple');
INSERT INTO "cryptocurrency" ("id", "symbol", "name") VALUES ('e78a66d1-995c-4723-af98-ac088efcce64', 'ETH', 'Bitcoin');
INSERT INTO "cryptocurrency" ("id", "symbol", "name") VALUES ('955a176c-5303-4647-8854-4484eac1812e', 'XRP', 'Ethereum');
INSERT INTO "cryptocurrency" ("id", "symbol", "name") VALUES ('d1efb03d-88dd-41af-86bc-bee2f0bcaa8f', 'XRP', 'Ripple');
INSERT INTO "cryptocurrency" ("id", "symbol", "name") VALUES ('0770e1e5-8bd8-4347-931a-d1f0584751f1', 'XRP', 'Ethereum');
INSERT INTO "cryptocurrency" ("id", "symbol", "name") VALUES ('28c6e30b-887a-4009-9438-a7c08130aaae', 'LTC', 'Litecoin');

INSERT INTO "nft" ("id", "name", "tokenId", "blockchainId") VALUES ('5491fa36-ab3b-446f-8b23-d7e0d1dc80dd', 'Decentraland Estate', '1a2b3c4d5e', '6ef5d389-10bd-403e-9a20-2bf314fca8f2');
INSERT INTO "nft" ("id", "name", "tokenId", "blockchainId") VALUES ('d0a0812c-658f-4158-94e5-8b280bef8dbf', 'Bored Ape 4562', '1a2b3c4d5e', 'f26fa041-fa70-4c5a-b887-b1307dffe288');
INSERT INTO "nft" ("id", "name", "tokenId", "blockchainId") VALUES ('8f418170-ecbe-4ba2-9e8d-f602d363df25', 'Mystic Axie 1294', 'k1l2m3n4o5', '4ead8ef5-4ffb-410d-bc9c-9c42e1d4c6b6');
INSERT INTO "nft" ("id", "name", "tokenId", "blockchainId") VALUES ('4a24a065-5941-420d-af0c-41149af21aba', 'CryptoPunk 3100', '1a2b3c4d5e', '7cedc074-6abe-437d-8803-1766a52a94b2');
INSERT INTO "nft" ("id", "name", "tokenId", "blockchainId") VALUES ('d2099b68-f825-4def-b84f-bc467a8bf918', 'Mystic Axie 1294', '6f7g8h9i0j', '196c90d9-5d0d-4d0f-8ccd-d7238b478893');
INSERT INTO "nft" ("id", "name", "tokenId", "blockchainId") VALUES ('5f2e98db-ca15-44b7-a054-e0dc6d0a250d', 'Bored Ape 4562', 'u1v2w3x4y5', '5d6543ed-22e4-4c74-aa4a-9d04d7a4825b');
INSERT INTO "nft" ("id", "name", "tokenId", "blockchainId") VALUES ('885bd5fa-d364-46c4-bc90-4eabf55f56f1', 'Ethereal Visions', '6f7g8h9i0j', '196c90d9-5d0d-4d0f-8ccd-d7238b478893');
INSERT INTO "nft" ("id", "name", "tokenId", "blockchainId") VALUES ('f3e376ce-40bc-41e7-a9a5-4ed8ff0b1d8e', 'CryptoPunk 3100', '1a2b3c4d5e', '8c228197-b851-4c1e-a071-334a12e0c835');
INSERT INTO "nft" ("id", "name", "tokenId", "blockchainId") VALUES ('74eb7d03-2181-4f8f-b72f-2954704704a1', 'Mystic Axie 1294', 'k1l2m3n4o5', '196c90d9-5d0d-4d0f-8ccd-d7238b478893');
INSERT INTO "nft" ("id", "name", "tokenId", "blockchainId") VALUES ('14041378-47cc-48c5-8a03-77cf4cb7b437', 'Mystic Axie 1294', 'k1l2m3n4o5', '196c90d9-5d0d-4d0f-8ccd-d7238b478893');

INSERT INTO "portfolio" ("id", "netWorth", "userId") VALUES ('c10fdc57-e650-432a-b661-a2b9c5228216', 96, 'd0561aa0-f1ea-4831-93d7-e1db78a13620');
INSERT INTO "portfolio" ("id", "netWorth", "userId") VALUES ('624ee73f-2918-41a4-8d21-2354610417c5', 252, '9d0d715c-1e31-475f-9743-0740af619d42');
INSERT INTO "portfolio" ("id", "netWorth", "userId") VALUES ('7b2e218b-c4d9-4a2e-b151-e61dcd95e86d', 372, '21a857f1-ba5f-4435-bcf6-f910ec07c0dc');
INSERT INTO "portfolio" ("id", "netWorth", "userId") VALUES ('064b72fd-bd5a-4489-bfa5-603b36de9316', 25, 'c0daf43d-0b93-4b6e-8531-1f9080c0776a');
INSERT INTO "portfolio" ("id", "netWorth", "userId") VALUES ('9a6f6ec0-bb61-4253-9a26-4ea8d6e74eb8', 753, '9d0d715c-1e31-475f-9743-0740af619d42');
INSERT INTO "portfolio" ("id", "netWorth", "userId") VALUES ('e99196ac-6292-4e33-b610-ca83e801ac4e', 293, 'b362472f-c514-4f91-bcb0-e6ecc0548581');
INSERT INTO "portfolio" ("id", "netWorth", "userId") VALUES ('3aacbf68-e350-4c52-bb3f-1fc2fcba4c47', 924, 'b362472f-c514-4f91-bcb0-e6ecc0548581');
INSERT INTO "portfolio" ("id", "netWorth", "userId") VALUES ('0fa87d72-ec52-4ecb-b085-d463f5d20c93', 776, 'd0561aa0-f1ea-4831-93d7-e1db78a13620');
INSERT INTO "portfolio" ("id", "netWorth", "userId") VALUES ('b4289cf3-e84f-4db7-819e-0bea568fb67a', 485, '9d0d715c-1e31-475f-9743-0740af619d42');
INSERT INTO "portfolio" ("id", "netWorth", "userId") VALUES ('88b056b3-01df-4c49-980f-7667f3c6d970', 230, '56fa50c2-5870-4237-8f69-2bbbc485a504');

INSERT INTO "portfolio_item" ("id", "quantity", "portfolioId", "cryptocurrencyId", "nftId") VALUES ('46e9fe18-2a5b-443d-bc65-f1a14cac1610', 272, 'b4289cf3-e84f-4db7-819e-0bea568fb67a', '829c0ace-1a61-4038-97df-c20084c77b2f', 'f3e376ce-40bc-41e7-a9a5-4ed8ff0b1d8e');
INSERT INTO "portfolio_item" ("id", "quantity", "portfolioId", "cryptocurrencyId", "nftId") VALUES ('82db9061-9a1f-41e3-beb2-2d91483657d5', 126, '9a6f6ec0-bb61-4253-9a26-4ea8d6e74eb8', '28c6e30b-887a-4009-9438-a7c08130aaae', 'd0a0812c-658f-4158-94e5-8b280bef8dbf');
INSERT INTO "portfolio_item" ("id", "quantity", "portfolioId", "cryptocurrencyId", "nftId") VALUES ('42574769-b43a-468e-bd77-5b79bcf495c4', 984, '624ee73f-2918-41a4-8d21-2354610417c5', '955a176c-5303-4647-8854-4484eac1812e', 'd2099b68-f825-4def-b84f-bc467a8bf918');
INSERT INTO "portfolio_item" ("id", "quantity", "portfolioId", "cryptocurrencyId", "nftId") VALUES ('c8173c3a-bbdc-4b2a-b251-1f4487df6a66', 354, 'c10fdc57-e650-432a-b661-a2b9c5228216', '28c6e30b-887a-4009-9438-a7c08130aaae', '8f418170-ecbe-4ba2-9e8d-f602d363df25');
INSERT INTO "portfolio_item" ("id", "quantity", "portfolioId", "cryptocurrencyId", "nftId") VALUES ('e33b7e47-4e72-4fa5-90c0-701c54e2dac3', 595, 'c10fdc57-e650-432a-b661-a2b9c5228216', 'b8edac20-9e0d-424b-9e3d-35bfd098d352', '4a24a065-5941-420d-af0c-41149af21aba');
INSERT INTO "portfolio_item" ("id", "quantity", "portfolioId", "cryptocurrencyId", "nftId") VALUES ('8a4f8d4f-a09a-448b-9c2a-040377a66481', 362, '624ee73f-2918-41a4-8d21-2354610417c5', '955a176c-5303-4647-8854-4484eac1812e', '885bd5fa-d364-46c4-bc90-4eabf55f56f1');
INSERT INTO "portfolio_item" ("id", "quantity", "portfolioId", "cryptocurrencyId", "nftId") VALUES ('f74a5740-306b-4296-9a2d-a4d62618e7e1', 319, '3aacbf68-e350-4c52-bb3f-1fc2fcba4c47', '28c6e30b-887a-4009-9438-a7c08130aaae', '5491fa36-ab3b-446f-8b23-d7e0d1dc80dd');
INSERT INTO "portfolio_item" ("id", "quantity", "portfolioId", "cryptocurrencyId", "nftId") VALUES ('64b53ca6-59f9-41ce-82ef-c76c37cb53a6', 395, '7b2e218b-c4d9-4a2e-b151-e61dcd95e86d', '28c6e30b-887a-4009-9438-a7c08130aaae', '885bd5fa-d364-46c4-bc90-4eabf55f56f1');
INSERT INTO "portfolio_item" ("id", "quantity", "portfolioId", "cryptocurrencyId", "nftId") VALUES ('213e207d-fe06-4a84-9581-d2108b1e180b', 454, '0fa87d72-ec52-4ecb-b085-d463f5d20c93', '42f6e757-1cdd-46a8-8854-5763a52c3e30', '5f2e98db-ca15-44b7-a054-e0dc6d0a250d');
INSERT INTO "portfolio_item" ("id", "quantity", "portfolioId", "cryptocurrencyId", "nftId") VALUES ('4ec6816e-6091-45a9-8b1c-b0fc95a8a622', 317, '7b2e218b-c4d9-4a2e-b151-e61dcd95e86d', '42f6e757-1cdd-46a8-8854-5763a52c3e30', '8f418170-ecbe-4ba2-9e8d-f602d363df25');
    `,
      )
    } catch (error) {
      // ignore
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
