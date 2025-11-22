// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0 ;


contract DataYypes {
    //states
    bool newBool = false;

    /*
        uint8 ranges from 0 to 2**8 - 1
        uint16 ranges from 0 to 2**16 - 1
        uint256 ranges from 0 to 2**256 - 1
    */
    uint8 u8 = 1;
    uint16 u16= 500;
    uint256 u256 = 243823942394;

    /*
        int8 ranges from -2**7 to 2**7 - 1
        int256 ranges from -2**255 to 2**255 - 1
    */

   int i8 = 128;
   int256 i256 = -423948239084;

   //string
   string newString = "Hello World";

   //address 20 byte or 160 bit => 40 hex characters
   address myAddress = 0x0003330024507031600200300000000000000000;

   //default
   bool defaultBool; // false
   int i ; // 0 int -> int256;
   uint u ; // 0 uint -> uint256;
   address deadAddress ; // -> 0x0000000000000000000000000000000000000000
}
