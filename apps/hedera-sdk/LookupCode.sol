// SPDX-License-Identifier: Apache-2.0
pragma solidity ^0.8.11;
pragma experimental ABIEncoderV2;

import "./hip-206/HederaTokenService.sol";
import "./hip-206/HederaResponseCodes.sol";

contract MintAssoTransHTS is HederaTokenService {
    address tokenAddress;

    constructor(address _tokenAddress) {
        tokenAddress = _tokenAddress;
    }

    function tokenTransfer(
        address _tokenAddress,
        address _sender,
        address _receiver,
        int64 _amount
    ) external {
        int256 response = HederaTokenService.transferToken(
            _tokenAddress,
            _sender,
            _receiver,
            _amount
        );

        if (response != HederaResponseCodes.SUCCESS) {
            // revert("Transfer Failed");
        }
    }
}
