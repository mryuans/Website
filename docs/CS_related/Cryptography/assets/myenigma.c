#include <stdio.h>
#include <string.h>
#include <stdlib.h>


char plugboard[27]="ABCDEFGHIJKLMNOPQRSTUVWXYZ";
char charlist[27] = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
char rotor_table[5][27] = {
   "EKMFLGDQVZNTOWYHXUSPAIBRCJ",
   "AJDKSIRUXBLHWTMCQGZNPYFVOE",
   "BDFHJLCPRTXVZNYEIWGAKMUSQO",
   "ESOVPZJAYQUIRHXLNFTGKDCMWB",
   "VZBRGITYUPSDNHLXAWMJQOFECK"
};
char rotorSpinningPoint[5][2] = {
    "Q",
    "E",
    "V",
    "J",
    "Z"
};
char reflactor[] = "YRUHQSLDPXNGOKMIEBFZCWVJAT";

char messageKey[4];
char rotorPattern[4];
char ringSetting[4];
char pluginInit[200];

void gearSpinning(char *currentRing) {
    int gearIndex = 2;
    if (currentRing[gearIndex] == rotorSpinningPoint[rotorPattern[gearIndex] - '0' - 1][0]) {
        currentRing[gearIndex] = ((currentRing[gearIndex] - 'A') + 1) % 26 + 'A';
        if (currentRing[gearIndex - 1] == rotorSpinningPoint[rotorPattern[gearIndex - 1] - '0' - 1][0]) {
            currentRing[gearIndex - 1] = ((currentRing[gearIndex - 1] - 'A') + 1) % 26 + 'A';
            currentRing[gearIndex - 2] = ((currentRing[gearIndex - 2] - 'A') + 1) % 26 + 'A';
        } else {
            currentRing[gearIndex - 1] = ((currentRing[gearIndex - 1] - 'A') + 1) % 26 + 'A';
        }
    } else {
        currentRing[gearIndex] = ((currentRing[gearIndex] - 'A') + 1) % 26 + 'A';
        if (currentRing[gearIndex - 1] == rotorSpinningPoint[rotorPattern[gearIndex - 1] - '0' - 1][0]) {
            currentRing[gearIndex - 1] = ((currentRing[gearIndex - 1] - 'A') + 1) % 26 + 'A';
            currentRing[gearIndex - 2] = ((currentRing[gearIndex - 2] - 'A') + 1) % 26 + 'A';
        }
    } 
}

char rotorEncode(char currentChar, char rotorNum, char *currentRing, int gearIndex, int isPositive) {
    char *index;
    char processedChar;
    int delta;
    int rotorIndex = rotorNum - '0' - 1;
    
    delta = currentRing[gearIndex] - ringSetting[gearIndex];
    currentChar = ((currentChar - 'A') + delta + 26) % 26 + 'A';
    if (isPositive) {
        index = strchr(charlist, currentChar);
        processedChar = rotor_table[rotorIndex][index - charlist];
    } else {
        index = strchr(rotor_table[rotorIndex], currentChar);
        processedChar = charlist[index - rotor_table[rotorIndex]];
    }
    processedChar = ((processedChar - 'A') - delta + 26) % 26 + 'A';
    return processedChar; 
}

char reflactorEncode(char currentChar) {
    char *index;
    char processedChar;
    index = strchr(charlist, currentChar);
    processedChar = reflactor[index - charlist];
    return processedChar;
}

int main() {
    char message[200];
    char encript[200];
    char currentChar;
    char currentRing[4];

    printf("This is Enigma\n");
    printf("please give the plugin board settings(put like 'AB CD EF GH'):");
    scanf("%[^\n]", pluginInit);
    printf("please give the pattern:(from left to right)");
    scanf("%s", rotorPattern);
    printf("please give the messageKey:");
    scanf("%s", messageKey);
    printf("please give the ringSetting:");
    scanf("%s", ringSetting);
    printf("please give the secret:(less than 200)");
    scanf("%s", message);

    int i;
    int strIndex;
    for (i = 0; message[i] != '\0'; i++) {
        currentChar = message[i];
        if (strchr(pluginInit, currentChar) != NULL) {
            strIndex = strchr(pluginInit, currentChar) - pluginInit;
            if (pluginInit[strIndex + 1] == ' ' || pluginInit[strIndex + 1] == '\0') {
                currentChar = pluginInit[strIndex - 1];
            } else {
                currentChar = pluginInit[strIndex + 1];
            }
        }
        gearSpinning(messageKey);
        for (int j = 2; j != -1; j--) {
            currentChar = rotorEncode(currentChar, rotorPattern[j], messageKey, j, 1);
        }

        currentChar = reflactorEncode(currentChar);

        for (int j = 0; j != 3; j++) {
            currentChar = rotorEncode(currentChar, rotorPattern[j], messageKey, j, 0);
        }

        if (strchr(pluginInit, currentChar) != NULL) {
            strIndex = strchr(pluginInit, currentChar) - pluginInit;
            if (pluginInit[strIndex + 1] == ' ' || pluginInit[strIndex + 1] == '\0') {
                currentChar = pluginInit[strIndex - 1];
            } else {
                currentChar = pluginInit[strIndex + 1];
            }
        }
        encript[i] = currentChar;
    }
    encript[i] = '\0';
    printf("The encript version: %s", encript);

    return 0;
}
