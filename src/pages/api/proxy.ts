import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { ip } = req.query;

  if (!ip) {
    return res.status(400).json({ error: 'IP address is required' });
  }

  try {
    const apiResponse = await fetch(`https://www.virustotal.com/api/v3/ip_addresses/${ip}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-apikey': process.env.VIRUSTOTAL_API_KEY!,
      },
    });

    const data = await apiResponse.json();

    return res.status(apiResponse.status).json(data);
  } catch (error) {
    console.error('Error fetching VirusTotal data:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

export default handler;
