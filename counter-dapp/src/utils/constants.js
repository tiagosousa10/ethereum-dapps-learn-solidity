export const constants = {
  counterAddress: "0xbCF26943C0197d2eE0E5D05c716Be60cc2761508",
  counterABI: {
    abi: [
      {
        type: "function",
        name: "dec",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable",
      },
      {
        type: "function",
        name: "get",
        inputs: [],
        outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
        stateMutability: "view",
      },
      {
        type: "function",
        name: "inc",
        inputs: [],
        outputs: [],
        stateMutability: "nonpayable",
      },
    ],
    bytecode: {
      object:
        "0x6080604052348015600e575f5ffd5b506101ab8061001c5f395ff3fe608060405234801561000f575f5ffd5b506004361061003f575f3560e01c8063371303c0146100435780636d4ce63c1461004d578063b3bcfa821461006b575b5f5ffd5b61004b610075565b005b61005561008f565b60405161006291906100c9565b60405180910390f35b610073610097565b005b60015f5f828254610086919061010f565b92505081905550565b5f5f54905090565b60015f5f8282546100a89190610142565b92505081905550565b5f819050919050565b6100c3816100b1565b82525050565b5f6020820190506100dc5f8301846100ba565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610119826100b1565b9150610124836100b1565b925082820190508082111561013c5761013b6100e2565b5b92915050565b5f61014c826100b1565b9150610157836100b1565b925082820390508181111561016f5761016e6100e2565b5b9291505056fea264697066735822122034d382ca90744e70bbbb67db920a39566d756fdcaac0ee2897bbbfa28ca4019c64736f6c634300081e0033",
      sourceMap: "58:226:0:-:0;;;;;;;;;;;;;;;;;;;",
      linkReferences: {},
    },
    deployedBytecode: {
      object:
        "0x608060405234801561000f575f5ffd5b506004361061003f575f3560e01c8063371303c0146100435780636d4ce63c1461004d578063b3bcfa821461006b575b5f5ffd5b61004b610075565b005b61005561008f565b60405161006291906100c9565b60405180910390f35b610073610097565b005b60015f5f828254610086919061010f565b92505081905550565b5f5f54905090565b60015f5f8282546100a89190610142565b92505081905550565b5f819050919050565b6100c3816100b1565b82525050565b5f6020820190506100dc5f8301846100ba565b92915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52601160045260245ffd5b5f610119826100b1565b9150610124836100b1565b925082820190508082111561013c5761013b6100e2565b5b92915050565b5f61014c826100b1565b9150610157836100b1565b925082820390508181111561016f5761016e6100e2565b5b9291505056fea264697066735822122034d382ca90744e70bbbb67db920a39566d756fdcaac0ee2897bbbfa28ca4019c64736f6c634300081e0033",
      sourceMap:
        "58:226:0:-:0;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;180:48;;;:::i;:::-;;101:73;;;:::i;:::-;;;;;;;:::i;:::-;;;;;;;;234:48;;;:::i;:::-;;180;220:1;212:5;;:9;;;;;;;:::i;:::-;;;;;;;;180:48::o;101:73::-;136:7;162:5;;155:12;;101:73;:::o;234:48::-;274:1;266:5;;:9;;;;;;;:::i;:::-;;;;;;;;234:48::o;7:77:1:-;44:7;73:5;62:16;;7:77;;;:::o;90:118::-;177:24;195:5;177:24;:::i;:::-;172:3;165:37;90:118;;:::o;214:222::-;307:4;345:2;334:9;330:18;322:26;;358:71;426:1;415:9;411:17;402:6;358:71;:::i;:::-;214:222;;;;:::o;442:180::-;490:77;487:1;480:88;587:4;584:1;577:15;611:4;608:1;601:15;628:191;668:3;687:20;705:1;687:20;:::i;:::-;682:25;;721:20;739:1;721:20;:::i;:::-;716:25;;764:1;761;757:9;750:16;;785:3;782:1;779:10;776:36;;;792:18;;:::i;:::-;776:36;628:191;;;;:::o;825:194::-;865:4;885:20;903:1;885:20;:::i;:::-;880:25;;919:20;937:1;919:20;:::i;:::-;914:25;;963:1;960;956:9;948:17;;987:1;981:4;978:11;975:37;;;992:18;;:::i;:::-;975:37;825:194;;;;:::o",
      linkReferences: {},
    },
    methodIdentifiers: {
      "dec()": "b3bcfa82",
      "get()": "6d4ce63c",
      "inc()": "371303c0",
    },
    rawMetadata:
      '{"compiler":{"version":"0.8.30+commit.73712a01"},"language":"Solidity","output":{"abi":[{"inputs":[],"name":"dec","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"get","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"inc","outputs":[],"stateMutability":"nonpayable","type":"function"}],"devdoc":{"kind":"dev","methods":{},"version":1},"userdoc":{"kind":"user","methods":{},"version":1}},"settings":{"compilationTarget":{"src/Counter.sol":"Counter"},"evmVersion":"prague","libraries":{},"metadata":{"bytecodeHash":"ipfs"},"optimizer":{"enabled":false,"runs":200},"remappings":[":forge-std/=lib/forge-std/src/"]},"sources":{"src/Counter.sol":{"keccak256":"0x697f6a6c9f523b545d86c633999afa2067868340f9b6657de0b5e551c94d0d00","license":"MIT","urls":["bzz-raw://dcf31dd5e504fc0a57b6e1a154a2ce26dc9a90353543a146e771fb429a2ef8eb","dweb:/ipfs/QmQgCwHJQ52Q5yyj2XpkGK8bQEbQiVRSVLsgxqzoUXXoCL"]}},"version":1}',
    metadata: {
      compiler: { version: "0.8.30+commit.73712a01" },
      language: "Solidity",
      output: {
        abi: [
          {
            inputs: [],
            stateMutability: "nonpayable",
            type: "function",
            name: "dec",
          },
          {
            inputs: [],
            stateMutability: "view",
            type: "function",
            name: "get",
            outputs: [{ internalType: "uint256", name: "", type: "uint256" }],
          },
          {
            inputs: [],
            stateMutability: "nonpayable",
            type: "function",
            name: "inc",
          },
        ],
        devdoc: { kind: "dev", methods: {}, version: 1 },
        userdoc: { kind: "user", methods: {}, version: 1 },
      },
      settings: {
        remappings: ["forge-std/=lib/forge-std/src/"],
        optimizer: { enabled: false, runs: 200 },
        metadata: { bytecodeHash: "ipfs" },
        compilationTarget: { "src/Counter.sol": "Counter" },
        evmVersion: "prague",
        libraries: {},
      },
      sources: {
        "src/Counter.sol": {
          keccak256:
            "0x697f6a6c9f523b545d86c633999afa2067868340f9b6657de0b5e551c94d0d00",
          urls: [
            "bzz-raw://dcf31dd5e504fc0a57b6e1a154a2ce26dc9a90353543a146e771fb429a2ef8eb",
            "dweb:/ipfs/QmQgCwHJQ52Q5yyj2XpkGK8bQEbQiVRSVLsgxqzoUXXoCL",
          ],
          license: "MIT",
        },
      },
      version: 1,
    },
    id: 0,
  },
};
