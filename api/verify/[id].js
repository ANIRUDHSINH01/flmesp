import fs from 'fs';
import path from 'path';

export default async function handler(req, res) {
    const { id } = req.query;

    try {
        const filePath = path.join(process.cwd(), 'data', 'certificates.json');
        const jsonData = fs.readFileSync(filePath, 'utf8');
        const certificates = JSON.parse(jsonData);

        const certificate = certificates.find(cert => cert.id === id);

        if (certificate) {
            return res.status(200).json({ valid: true, certificate });
        } else {
            return res.status(404).json({ valid: false });
        }
    } catch (error) {
        return res.status(500).json({ valid: false });
    }
}
