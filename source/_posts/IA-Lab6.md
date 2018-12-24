---
title: 互联网应用 Lab6
date: 2017-04-28 12:00:00
categories:
  - Code
tags:
  - C
  - 互联网应用
---

{% codeblock l6-EchoClient.c lang:c https://github.com/real-neo/InternetApplications Github %}
#include <stdio.h> /* for printf() and fprintf() */
#include <sys/socket.h> /* for socket(), sendto() and recvfrom() */
#include <arpa/inet.h> /* for sockaddr_in and inet_addr() */
#include <stdlib.h> /* for atoi() and exit() */
#include <string.h> /* for memset() */
#include <unistd.h> /* for close() */

#define ECHOMAX 255 /* Longest string to echo */

int main(int argc, char *argv[]) {
	int sock; /* Socket descriptor */
	struct sockaddr_in echoServAddr; /* Echo server address */
//	struct sockaddr_in fromAddr; /* Source address of echo */
	unsigned short echoServPort; /* Echo server port */
//	unsigned int fromSize; /* In-out of address size for recvfrom() */
	char *servIP; /* IP address of server */
	char *echoString; /* String to send to echo server */
//	char echoBuffer[ECHOMAX + 1]; /* Buffer for receiving echoed string */
	size_t echoStringLen; /* Length of string to echo */
//	int respStringLen; /* Length of received response */

	if (argc < 3) { /* Test for correct number of arguments */
		printf("Usage: %s <Server IP> <Echo Word>\n", argv[0]);
		exit(1);
	}

	servIP = argv[1]; /* First arg: server IP address (dotted quad) */
	echoServPort = 56325;

	/* Create a datagram/UDP socket */
	if ((sock = socket(PF_INET, SOCK_DGRAM, IPPROTO_UDP)) < 0)
		printf("socket() failed.\n");
	/* Construct the server address structure */
	memset(&echoServAddr, 0, sizeof(echoServAddr));/*Zero out structure*/
	echoServAddr.sin_family = AF_INET; /* Internet addr family */
	echoServAddr.sin_addr.s_addr = inet_addr(servIP);/*Server IP address*/
	echoServAddr.sin_port = htons(echoServPort); /* Server port */

	for (int i = 2; i < argc; i++) {
		echoString = argv[i]; /* Second arg: string to echo */
		if ((echoStringLen = strlen(echoString)) > ECHOMAX) /* Check input length */
			printf("Echo word too long.\n");
		/* Send the string to the server */
		if (sendto(sock, echoString, echoStringLen, 0, (struct sockaddr *) &echoServAddr, sizeof(echoServAddr)) != echoStringLen)
			printf("sendto() sent a different number of bytes than expected.\n");
		printf("sending data to '%s'\n", servIP);
	}

//	/* Recv a response */
//	fromSize = sizeof(fromAddr);
//	if ((respStringLen = recvfrom(sock, echoBuffer, ECHOMAX, 0, (struct sockaddr *) &fromAddr, &fromSize)) != echoStringLen)
//		printf("recvfrom() failed\n");
//
//	if (echoServAddr.sin_addr.s_addr != fromAddr.sin_addr.s_addr) {
//		printf("Error: received a packet from unknown source.\n");
//		exit(1);
//	}
//	/* null-terminate the received data */
//	echoBuffer[respStringLen] = '\0';
//	printf("Received: %s\n", echoBuffer);/*Print the echoed message*/
	close(sock);

	return 0;
}
{% endcodeblock %}
<!--more-->
{% codeblock l6-EchoServer.c lang:c https://github.com/real-neo/InternetApplications Github %}
#include <stdio.h> /* for printf() and fprintf() */
//#include <sys/socket.h> /* for socket(), bind(), sendto() and recvfrom() */
#include <arpa/inet.h> /* for sockaddr_in and inet_ntoa() */
//#include <stdlib.h> /* for atoi() and exit() */
#include <string.h> /* for memset() */
//#include <unistd.h> /* for close() */

#define ECHOMAX 255 /* Longest string to echo */

void main(int argc, char *argv[]) {
	int sock; /* Socket */
	struct sockaddr_in echoServAddr; /* Local address */
	struct sockaddr_in echoClntAddr; /* Client address */
	unsigned int cliAddrLen; /* Length of client address */
	char echoBuffer[ECHOMAX]; /* Buffer for echo string */
	unsigned short echoServPort; /* Server port */
	ssize_t recvMsgSize; /* Size of received message */

	echoServPort = 56325;
	/* Create socket for sending/receiving datagrams */
	if ((sock = socket(PF_INET, SOCK_DGRAM, 0)) < 0)
		printf("socket() failed.\n");
	/* Construct local address structure */
	memset(&echoServAddr, 0, sizeof(echoServAddr));
	echoServAddr.sin_family = AF_INET;
	echoServAddr.sin_addr.s_addr = htonl(INADDR_ANY);
	echoServAddr.sin_port = htons(echoServPort);
	/* Bind to the local address */
	if ((bind(sock, (struct sockaddr *) &echoServAddr, sizeof(echoServAddr))) < 0)
		printf("bind() failed.\n");

	for (;;) { /* Run forever */
		/* Set the size of the in-out parameter */
		cliAddrLen = sizeof(echoClntAddr);
		/* Block until receive message from a client */
		if ((recvMsgSize = recvfrom(sock, echoBuffer, ECHOMAX, 0, (struct sockaddr *) &echoClntAddr, &cliAddrLen)) < 0)
			printf("recvfrom() failed.\n");
		echoBuffer[recvMsgSize] = '\0';
		printf("from %s:UDP%d : %s\n", inet_ntoa(echoClntAddr.sin_addr), echoClntAddr.sin_port, echoBuffer);
//		/* Send received datagram back to the client */
//		if ((sendto(sock, echoBuffer, recvMsgSize, 0, (struct sockaddr *) &echoClntAddr, sizeof(echoClntAddr))) != recvMsgSize)
//			printf("sendto() sent a different number of bytes than expected.\n");
	}
}
{% endcodeblock %}
