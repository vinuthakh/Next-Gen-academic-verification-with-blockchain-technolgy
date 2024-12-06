const getCertificateEmailTemplate = (certificate) => {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; }
                .certificate { padding: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .details { margin: 20px 0; }
                .blockchain-info { background: #f5f5f5; padding: 15px; margin: 20px 0; }
                .subjects-table { width: 100%; border-collapse: collapse; }
                .subjects-table th, .subjects-table td { 
                    padding: 8px;
                    border: 1px solid #ddd;
                }
            </style>
        </head>
        <body>
            <div class="certificate">
                <div class="header">
                    <h1>Academic Certificate</h1>
                </div>
                <p>Dear ${certificate.studentName},</p>
                <div class="details">
                    <p><strong>USN:</strong> ${certificate.usn}</p>
                    <p><strong>Semester:</strong> ${certificate.semester}</p>
                    <p><strong>Academic Year:</strong> ${certificate.academicYear}</p>
                    <p><strong>SGPA:</strong> ${certificate.sgpa}</p>
                    <p><strong>Result:</strong> ${certificate.result}</p>
                </div>
                <div class="blockchain-info">
                    <h3>Blockchain Verification Details</h3>
                    <p><strong>Transaction Hash:</strong> ${certificate.txHash}</p>
                    <p><strong>Certificate Hash:</strong> ${certificate.certificateHash}</p>
                </div>
                <table class="subjects-table">
                    <tr>
                        <th>Subject Name</th>
                        <th>Grade</th>
                        <th>Credits</th>
                    </tr>
                    ${certificate.subjects.map(sub => `
                        <tr>
                            <td>${sub.name}</td>
                            <td>${sub.grade}</td>
                            <td>${sub.credits}</td>
                        </tr>
                    `).join('')}
                </table>
            </div>
        </body>
        </html>
    `;
};

module.exports = getCertificateEmailTemplate;
