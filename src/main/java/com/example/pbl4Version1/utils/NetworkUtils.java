package com.example.pbl4Version1.utils;

import java.net.InetAddress;
import java.net.NetworkInterface;
import java.net.SocketException;
import java.util.Enumeration;

import lombok.extern.slf4j.Slf4j;

@Slf4j
public class NetworkUtils {
    public static String getLocalIPAddress() {
        try {
            InetAddress result = null;
            Enumeration<NetworkInterface> networkInterfaces = NetworkInterface.getNetworkInterfaces();

            while (networkInterfaces.hasMoreElements()) {
                NetworkInterface networkInterface = networkInterfaces.nextElement();

                String interfaceName = networkInterface.getDisplayName().toLowerCase();
                if (!interfaceName.contains("wi-fi") && !interfaceName.contains("wlan")) {
                    continue;
                }

                if (!networkInterface.isUp() || networkInterface.isLoopback()) {
                    continue;
                }

                Enumeration<InetAddress> inetAddresses = networkInterface.getInetAddresses();
                while (inetAddresses.hasMoreElements()) {
                    InetAddress inetAddress = inetAddresses.nextElement();

                    if (inetAddress.isLoopbackAddress()
                            || inetAddress.getHostAddress().contains(":")) {
                        continue;
                    }
                    result = inetAddress;
                }
            }
            return result.getHostAddress();
        } catch (SocketException e) {
            e.printStackTrace();
        }
        return null;
    }
}
