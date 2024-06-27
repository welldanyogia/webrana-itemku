import { NextApiRequest, NextApiResponse } from 'next';
import os from 'os';
import {NextRequest, NextResponse} from "next/server";

const getServerIP = () => {
    const interfaces = os.networkInterfaces();
    for (const interfaceName in interfaces) {
        const networkInterface = interfaces[interfaceName];
        for (const interfaceInfo of networkInterface) {
            if (interfaceInfo.family === 'IPv4' && !interfaceInfo.internal) {
                return interfaceInfo.address;
            }
        }
    }
    return null;
};

export async function POST(req : NextRequest, res : NextApiResponse) {
    const serverIP = getServerIP();
    return NextResponse.json({ serverIP });
}