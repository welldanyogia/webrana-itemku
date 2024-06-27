import { NextRequest, NextResponse } from 'next/server';
import os from 'os';

const getServerIP = () => {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        const networkInterface = interfaces[interfaceName];
        if (networkInterface) { // Ensure networkInterface is defined
            for (const interfaceInfo of networkInterface) {
                if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
                    return interfaceInfo.address;
                }
            }
        }
    }
    return null;
};

export async function POST(req: NextRequest, res: NextResponse) {
    const serverIP = getServerIP();
    return NextResponse.json({ serverIP });
}
