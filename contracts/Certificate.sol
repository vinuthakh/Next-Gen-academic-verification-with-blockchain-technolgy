// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Certificate {
    mapping(string => bytes32) public certificates;
    
    event CertificateIssued(string certificateId, bytes32 certificateHash);

    function issueCertificate(string calldata certificateId, bytes32 certificateHash) external {
        require(certificates[certificateId] == 0, "Certificate already exists");
        certificates[certificateId] = certificateHash;
        emit CertificateIssued(certificateId, certificateHash);
    }

    function verifyCertificate(string calldata certificateId, bytes32 certificateHash) external view returns (bool) {
        return certificates[certificateId] == certificateHash;
    }
}
