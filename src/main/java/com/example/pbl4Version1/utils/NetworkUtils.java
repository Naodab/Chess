package com.example.pbl4Version1.utils;

import java.net.InetAddress;
import java.net.UnknownHostException;

public class NetworkUtils {
    public static String getLocalIPAddress() {
        try {
            InetAddress inetAddress = InetAddress.getLocalHost();
            return inetAddress.getHostAddress();
        } catch (UnknownHostException e) {
            return "Unable to get IP Address";
        }
    }
}
